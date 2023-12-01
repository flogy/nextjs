"use client"
import React from "react";
import { useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { PiPathFill } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaFileImport } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import CreateNewPath from "./CreateNewPath";
import OpenExistingPath from "./OpenExistingPath";
import shortUUID from "short-uuid";
const short = require('short-uuid')

const SidebarPathInactive = ({pathList, setPathList, currentPath, setCurrentPath}) => {



  const [open, setOpen]  = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [openPath, setOpenPath] = useState(false)

  
  // const handleNewPathSubmit = (e) => {
  //   e.preventDefault()
  //   const pathName = e.target.newPathName.value;
  //   const parentId = e.target.parentId.value;

  //   const uuid = short.generate()
    
  //   const newPath = {uuid: uuid, name: pathName, parentId: parentId}
  //   setCurrentPath(newPath)

  //   const updatedPaths = [ ...pathList, newPath]
  //   setPathList(updatedPaths)

  //   e.target.reset()
  //   setCreateOpen(false)
  // }


  return (
    <div className={`bg-dark-purple p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
      <BsArrowLeftShort 
        className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${!open && "rotate-180"} duration-300`}
        onClick={() => {setOpen(!open)}}/>
      <div className="inline-flex">
        <PiPathFill className={`bg-amber-300 text-4xl rounded cursor-pointer float-left mr-2 ${open && "rotate-[360deg]"} duration-500`}/>
        <h1 className={`text-white origin-left font-medium text-2xl duration-300 mb-4 ${!open && "scale-0"}`}>Path Editor</h1>
      </div>

      {/* open an existing path */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"} `} onClick={() => {setOpen(true);setOpenPath(!openPath)}}>
        <FaRegFolderOpen className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Open</p>
      </button>

      {/* fixme import path from somewhere */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"}`} onClick={() => {setOpen(true);setOpenPath(!openPath)}}>
        <FaFileImport className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Import</p>
      </button>

      {/* create new path */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"}`} onClick={() => {setOpen(true);setCreateOpen(!createOpen)}}>
        <FaRegPlusSquare className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Create New</p>
      </button>

      {/* <div className={`mt-6 text-white text-md mb-4 ${!open && "hidden"}`}>
        <p className="text-xs text-gray-400">Current Path:</p>
        <p>{currentPath.name}</p>
        <p className="text-xs mt-2 text-gray-400">Parent ID:</p>
        <p>{`${currentPath.parentId !== null ? currentPath.parentId : "Path has no parent"}`}</p>
      </div> */}




      {/* {createOpen && open ?
        <CreateNewPath 
          handleNewPathSubmit={handleNewPathSubmit}
        />
      : null}



      {openPath && open?
        <OpenExistingPath
          pathList={pathList}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
        />
      : null}

      <button className={`flex items-center whitespace-nowrap w-full rounded-md bg-light-white mt-6 ${!open ? "px-2.5" : "px-4"} py-2 hover:bg-`}>
        <FaRegSave className={`text-white text-lg float-left cursor-pointer ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Save</p>
      </button>

      <button className={`flex items-center whitespace-nowrap w-full rounded-md bg-light-white mt-6 ${!open ? "px-2.5" : "px-4"} py-2 hover:bg-red-500`}>
        <FaRegTrashAlt className={`text-white text-lg float-left cursor-pointer ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Delete</p>
      </button> */}

    </div>
  )
}

export default SidebarPathInactive



