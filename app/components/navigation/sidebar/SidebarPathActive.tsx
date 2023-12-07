"use client"
import React from "react";
import { useState, useRef } from "react";
import { BsArrowLeftShort} from "react-icons/bs";
import { PiPathFill } from "react-icons/pi";
import { FaRegWindowClose, FaRegTrashAlt, FaRegSave, FaBuffer} from "react-icons/fa";
import Popup from "reactjs-popup";
import SubMenuTemplates from "./utils/SubMenuTemplates";

// import CreateNewPath from "./CreateNewPath";
// import OpenExistingPath from "./OpenExistingPath";
// import shortUUID from "short-uuid";
// const short = require('short-uuid')

const SidebarPathActive = ({setPathOpen, setCurrentPath}) => {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const delete_popup_ref = useRef();
  const close_popup_ref = useRef();
  const [open, setOpen]  = useState(true)
  const [openMenuTemplates, setOpenMenuTemplates] = useState(false)

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

function handleClose(){
  console.log("i close")
  //save changes
  close_popup_ref.current.close();
  setPathOpen(false)
}

function handleDelete(){
  console.log("i delte")
  delete_popup_ref.current.close();
  setPathOpen(false)
}
  console.log('sidebar render')

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

      {/* ${importMenu ? "bg-white/30" : "bg-white/10"} */}

      {/* start from template */}
      {/* <button className={`sidebar-button bg-white/10 ${!open ? "px-2.5" : "px-4"}`} onClick={() => setOpenMenuTemplates(!openMenuTemplates)}>
        <FaBuffer className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Templates</p>
      </button>

      {open && openMenuTemplates ?
        <SubMenuTemplates
          setCurrentPath={setCurrentPath}
          setPathOpen={setPathOpen}
        />
      : null} */}


      {/* save path */}
      <button className={`sidebar-button bg-white/10 ${!open ? "px-2.5" : "px-4"}`} onClick={() => console.log('save path')}>
        <FaRegSave className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Save</p>
      </button>

      {/* close path */}
      <Popup 
        trigger={
          <button className={`sidebar-button bg-white/10 ${!open ? "px-2.5" : "px-4"}`}>
            <FaRegWindowClose className={`sidebar-button-icon ${open && "mr-2"}`} />
            <p className={`sidebar-button-text ${!open && "hidden"}`}>Close</p>
          </button>
        } 
        position={open? 'bottom center' : 'right center'}
        closeOnDocumentClick
        ref={close_popup_ref}
        >
          <div className="w-60 h-min-20 bg-white rounded-md flex flex-col p-1">
            <p className="p-1">Do you want to save the changes?</p>
            <span className="flex gap-2">
              <button onClick={handleClose} className="flex-1 bg-gray-400 rounded-md hover:bg-gray-300 mt-2">Yes</button>
              <button onClick={() => close_popup_ref.current.close()} className="flex-1 bg-gray-400 rounded-md hover:bg-red-500 mt-2">No</button>
            </span>
          </div>
      </Popup>



      {/* delete path */}
      <Popup 
        trigger={
          <button className={`sidebar-button bg-white/10 hover:bg-red-500 ${!open ? "px-2.5" : "px-4"}`}>
            <FaRegTrashAlt className={`sidebar-button-icon ${open && "mr-2"}`} />
            <p className={`sidebar-button-text ${!open && "hidden"}`}>Delete</p>
          </button>
        } 
        position={open? 'bottom center' : 'right center'}
        closeOnDocumentClick
        ref={delete_popup_ref}
        >
          <div className="w-60 h-min-20 bg-white rounded-md flex flex-col p-1">
            <p className="p-1">Are you sure you want to delete this path?</p>
            <span className="flex gap-2">
              <button onClick={() => delete_popup_ref.current.close()} className="flex-1 bg-gray-400 rounded-md hover:bg-gray-300 mt-2">No</button>
              <button onClick={handleDelete} className="flex-1 bg-gray-400 rounded-md hover:bg-gray-300 mt-2">Yes</button>
            </span>
          </div>
      </Popup>

      {/* create a copy */}
      <button className={`sidebar-button bg-white/10 ${!open ? "px-2.5" : "px-4"}`} onClick={() => console.log('save as path')}>
        <FaRegSave className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Create a copy..</p>
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



