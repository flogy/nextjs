'use server'
import { revalidatePath } from "next/cache"
//import { allPaths } from "@/lib/paths"

//it is also possible to put all the prisma stuff in here but we'd rather keep it separated

// export async function createTodoAction(title: string){
//   await createTodo(title)
//   revalidatePath('/')
// }

// export async function updateTodoAction(id: Number, isCompleted: boolean){
//   //perform update on prisma client
//   updateTodo(id, isCompleted)

//   //revalidate path
//   revalidatePath('/')

// }