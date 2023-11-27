import React from 'react'

const CreateNewPath = ({handleNewPathSubmit}) => {
  return (
    <>
      <form className="flex flex-col bg-white mt-2 rounded-md p-1" onSubmit={e => handleNewPathSubmit(e)}>
        
        <label htmlFor="newPathName" className="input-label">Path Name:</label>
        <input
          className="input-field"
          id="newPathName"
          type="text" 
          required
          placeholder="Save path as.."
        />
        
        <label htmlFor="parentId" className="input-label">Parent ID:</label>
        <input 
          className="input-field mb-2"
          id="parentId"
          type="text"
          placeholder="ID if parent exists.."
        />
        <button className=" bg-gray-400 rounded-md hover:bg-gray-300">Create</button>

      </form>
    </>
  )
}

export default CreateNewPath