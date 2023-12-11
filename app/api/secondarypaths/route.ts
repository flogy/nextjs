import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import type { PrimaryPaths } from "@prisma/client"

//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#static-route-handlers


export async function POST(request: Request) {
  const data = await request.json() //array with few entries (== max num of parent nodes)
  
  const promises = data.map(async path => {
    return await prisma.secondaryPaths.upsert({
      where: { parentPathId: path.parentPathId, parentNodeId: path.parentNodeId },
      update: { reactFlowInstance: path.reactFlowInstance },
      create: { parentPathId: path.parentPathId, parentNodeId: path.parentNodeId, reactFlowInstance: path.reactFlowInstance },
    })
  })
  const paths = await Promise.all(promises)
  return new NextResponse('Success!', { status: 201 })
}

export async function GET(req: NextRequest) {
  const parentPathId = Number(req.nextUrl.searchParams.get("parentPathId"))
  if (parentPathId) { 
    const paths = await prisma.secondaryPaths.findMany({where: {parentPathId}})
    return Response.json(paths)
  }
}
