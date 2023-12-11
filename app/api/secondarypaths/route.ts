import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import type { PrimaryPaths } from "@prisma/client"

//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#static-route-handlers

// export async function GET(req: NextRequest) {
//   const level = req.nextUrl.searchParams.get("level")
//   const id = req.nextUrl.searchParams.get("id")

//   var templates = []
//   if (level){templates = await prisma.templates.findMany({where: {level: level}})}
//   if (id){templates = await prisma.templates.findMany({where: {id: id}})}

//   console.log(templates)
//   return Response.json({ templates })
//   //return NextResponse.json({data})
// }

export async function POST(request: Request) {
  const data = await request.json() //array with few entries (== max num of parent nodes)
  
  const promises = data.map(async path => {
    //const newPath = {id: 12} as PrimaryPaths
    return await prisma.secondaryPaths.upsert({
      where: { parentPathId: path.parentPathId, parentNodeId: path.parentNodeId },
      update: { reactFlowInstance: path.reactFlowInstance },
      create: { parentPathId: path.parentPathId, parentNodeId: path.parentNodeId, reactFlowInstance: path.reactFlowInstance },
    })
  })

  const paths = await Promise.all(promises)
  const resp = JSON.stringify(paths)
  return NextResponse.json(paths)
  //return NextResponse.json(data)
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

