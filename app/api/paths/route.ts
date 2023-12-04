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

