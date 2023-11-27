import prisma from './prismaClient'

// https://youtu.be/58NL3oAjOcs?t=1000

export const queryUsers = async () => {
  try{
    const query = await prisma.user.findMany({
      select: {
          id: true,
          email: true,
          password: true,
          userId: true
        },
        where: {
          password: {
            startsWith: 'h'
          }
        
        }
    })
    return query
  }catch (error) {
    console.log(error)
  } finally {
    prisma.$disconnect()
  }
}



export const createUser = async () => {
  try{
    const query = await prisma.user.create({
      data: {
        email: "test@test.com",
        password: "superpw2",
        userId: 56
      }
    })
    return query

  }catch (error) {
    console.log(error)
  } finally {
    prisma.$disconnect()
  }
}


export const updateUser = async () => {
  try {
    const result = await prisma.user.update({
      where: {
        userId: 56
      },
      data: {
        email: 'test@test2.com'
      }
    })
    return result
  } catch (error) {
    console.log(error)
    
  }


}

export const deleteUser = async () => {
  try {
    const result = await prisma.user.delete({
      where: {
        userId: 56
      }
    })
    return result 
  } catch (error) {
    console.log(error)
    
  }
}

export const deleteAllUsers = async () => {
  try {
    const result = await prisma.user.deleteMany()
    return result 
  } catch (error) {
    console.log(error)
    
  }
}
