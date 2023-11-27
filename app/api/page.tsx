import React from 'react'
import { queryUsers, createUser, updateUser, deleteUser } from '../utils/Crud';

const page = async () => {
  const queryOutput = await queryUsers();
  console.log(JSON.stringify(queryOutput, null, 2))

  const createdUser = await createUser()
  console.log(createdUser)

  const updatedUser = await updateUser()
  console.log(updatedUser)

  const deltedUser = await deleteUser()
  console.log(deltedUser)

  return (
    <div>page</div>
  )
}

export default page