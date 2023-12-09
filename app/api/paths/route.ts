import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#static-route-handlers

export async function GET() {
  const paths = await prisma.paths.findMany()
  return Response.json({ paths })
  //return NextResponse.json({data})
}

export async function POST(request: Request, res: Response) {
  const data = await request.json()
  const paths = await prisma.paths.create(
    {data: {
      leistungsgruppe: data.perfGroup,
      name: data.name
    }})

    return NextResponse.json({ paths })
  }
  
export async function DELETE(request: Request, res: Response){
  //all children are deleted also (cascade in DB definition)
  const { id } = await request.json()
  const paths = await prisma.paths.delete({where: {id}})
  return Response.json({ paths })
}

