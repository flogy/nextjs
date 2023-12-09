import { useState } from "react"

const SubMenuCreate = ({setCurrentPath, setPathOpen}) => {
  const [perfGroup, setPerfGroup] = useState('')
  const [name, setName] = useState('')

 const handleSubmit = async (e) => {
    e.preventDefault()
    const submitData = {perfGroup, name}

    const res = await fetch('http://localhost:3000/api/paths',
      {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })

    if (!res.ok){
      console.log("Debug: POST didn't work please try again.")
    }else{
      setPerfGroup('')
      setName('')
      const { paths } = await res.json()
      setCurrentPath({id: paths.id, name: paths.name})
      setPathOpen(true)
    }
  }


  return (
    <>
      <form className="flex flex-col bg-white mt-2 rounded-md p-1" onSubmit={e => handleSubmit(e)}>

        <label htmlFor="perf_group" className="text-md">Leistungsgruppe:</label>
        <input 
          className='border h-8 p-1'
          id="perf_group"
          type="text"
          required
          value={perfGroup}
          onChange={(e) => setPerfGroup(e.target.value)}
          />

        <label htmlFor="perf_group_name" className="text-md">Name:</label>
        <input 
          className="border h-8 p-1"
          id="perf_group_name"
          type="text" 
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          />

        <button className=" bg-gray-400 rounded-md hover:bg-gray-300 mt-2">Create</button>

      </form>
    </>
  )
}

export default SubMenuCreate