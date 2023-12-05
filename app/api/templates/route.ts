import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#static-route-handlers

export async function GET(req: NextRequest) {
  const level = req.nextUrl.searchParams.get("level")
  const templates = await prisma.templates.findMany(
    {
    where: {
      level: level, //primary or secondary
    }
    }
  )

  console.log(templates)
  return Response.json({ templates })
  //return NextResponse.json({data})
}

export async function POST(request: Request, res: Response) {
  const data = await request.json()
  
  const templates = await prisma.templates.create(
    {data: {
      name: data.name,
      level: data.level,
      nodes: data.nodes,
      edges: data.edges
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

