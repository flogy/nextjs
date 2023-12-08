import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#static-route-handlers

export async function GET(req: NextRequest) {
  const parentPathId = Number(req.nextUrl.searchParams.get("parentPathId")) //path-id
  if (parentPathId) { 
    const path = await prisma.primaryPaths.findUnique({where: {parentPathId}})
    return Response.json({ path })
  }
}

export async function POST(request: Request) {
  const {parentPathId, reactFlowInstance} = await request.json()

  const pathExists = await prisma.primaryPaths.findFirst({ where: { parentPathId } })
    if (pathExists === null) {
        await prisma.primaryPaths.create({ data: { parentPathId, reactFlowInstance } })
        return new NextResponse('Success!', { status: 201 })
    } else {
        await prisma.primaryPaths.update({where: { parentPathId }, data: {parentPathId, reactFlowInstance}})
        return new NextResponse('Success!', { status: 201 })
    }
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

