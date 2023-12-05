import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#static-route-handlers

export async function GET(req: NextRequest) {
  const level = req.nextUrl.searchParams.get("level")
  const id = req.nextUrl.searchParams.get("id")

  var templates = []
  if (level){templates = await prisma.templates.findMany({where: {level: level}})}
  if (id){templates = await prisma.templates.findMany({where: {id: id}})}

  console.log(templates)
  return Response.json({ templates })
  //return NextResponse.json({data})
}

export async function POST(request: Request) {
  const data = await request.json()

  const templates = await prisma.templates.create(
    {data: {
      name: data.templateTitle,
      level: data.level,
      reactFlowInstance: data.flow_str,
    }})

  return NextResponse.json(data)
}


// export const queryPaths = async (searchTerm: String) => {
//   const query = await prisma.path.findMany({
//       where: {
//         OR: [
//           {leistungsgruppe: {contains: searchTerm},},
//           {name: {contains: searchTerm}}
//         ]
//       }
//   })
//   return query 
// }

