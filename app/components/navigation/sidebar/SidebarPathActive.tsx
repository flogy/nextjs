"use client"
import React from "react";
import { useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { PiPathFill } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaBuffer } from "react-icons/fa";
import CreateNewPath from "./CreateNewPath";
import OpenExistingPath from "./OpenExistingPath";
import shortUUID from "short-uuid";
const short = require('short-uuid')

const SidebarPathActive = ({setPathOpen, currentPath}) => {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

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

      <aside className={`mt-6 text-white text-md mb-6 ${!open && "hidden"}`}>
        <p className="text-xs text-gray-400">Now editing:</p>
        <p>PathName</p>
      </aside>

      {/* start from template */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"}`} onClick={() => console.log('templates')}>
        <FaBuffer className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Templates</p>
      </button>

      {/* save path */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"}`} onClick={() => console.log('save path')}>
        <FaRegSave className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Save</p>
      </button>

      {/* close path */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"}`} onClick={() => setPathOpen(false)}>
        <FaRegWindowClose className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Close</p>
      </button>

      {/* delete path */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"}`} onClick={() => console.log('delete path')}>
        <FaRegTrashAlt className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Delete</p>
      </button>


      <div className={`flex flex-col items-center gap-4 mt-10 duration-300 ${!open && "scale-0 gap-12"}`}>
        <div className="start-node" onDragStart={(event) => onDragStart(event, 'start')} draggable><p className="node-text-white">Start</p></div>
        <div className="routine-node-parent" onDragStart={(event) => onDragStart(event, 'routine')} draggable>
          <div className="routine-node-child">
            <p className="node-text-white">Routine</p>
          </div>
        </div>
        <div className="operation-node" onDragStart={(event) => onDragStart(event, 'operation')} draggable><p className="node-text-white">Operation</p></div>
        <div className="subroutine-node" onDragStart={(event) => onDragStart(event, 'subroutine')} draggable><p className="text-2xl text-violet-600">Suboutine</p></div>
        <div className="condition-node-parent" onDragStart={(event) => onDragStart(event, 'condition')} draggable>
          <div className="condition-node-child">
            <p className="text-2xl text-white absolute top-8">Condition</p>
          </div>
        </div>
        <div className="admin-node" onDragStart={(event) => onDragStart(event, 'admin')} draggable><p className="node-text-white">Admin</p></div>
        <div className="end-node" onDragStart={(event) => onDragStart(event, 'end')} draggable><p className="node-text-white">End</p></div>
      </div>
    </div>
  )
}

export default SidebarPathActive



