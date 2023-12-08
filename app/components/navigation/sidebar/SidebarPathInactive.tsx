import React, { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeftShort} from "react-icons/bs";
import { PiPathFill } from "react-icons/pi";
import { FaRegFolderOpen, FaRegPlusSquare, FaFileImport } from "react-icons/fa";
import SubMenuOpen from "./utils/SubMenuOpen";
import SubMenuCreate from "./utils/SubMenuCreate";
import SubMenuImport from "./utils/SubMenuImport";


const SidebarPathInactive = ({setPathOpen, setCurrentPath}) => {
  const [open, setOpen]  = useState(true) //for showing/hiding sidebar
  const [openMenu, setOpenMenu] = useState(false)
  const [importMenu, setImportMenu] = useState(false)
  const [createMenu, setCreateMenu] = useState(false)
  //const [selectedPath, setSelectedPath] = useState(null)


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
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"} ${openMenu ? "bg-white/30" : "bg-white/10"} `} onClick={() => setOpenMenu(!openMenu)}>
        <FaRegFolderOpen className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Open..</p>
      </button>

      {open && openMenu ?
        <SubMenuOpen
          setCurrentPath={setCurrentPath}
          setPathOpen={setPathOpen}
        />
      : null}


      {/* fixme import path from somewhere */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"} ${importMenu ? "bg-white/30" : "bg-white/10"}`} onClick={() => setImportMenu(!importMenu)}>
        <FaFileImport className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Import..</p>
      </button>

      {open && importMenu ?
        <SubMenuImport
        />
      : null}

      {/* create new path */}
      <button className={`sidebar-button ${!open ? "px-2.5" : "px-4"} ${createMenu ? "bg-white/30" : "bg-white/10"} `} onClick={() => setCreateMenu(!createMenu)}>
        <FaRegPlusSquare className={`sidebar-button-icon ${open && "mr-2"}`} />
        <p className={`sidebar-button-text ${!open && "hidden"}`}>Create New..</p>
      </button>

      {open && createMenu ?
        <SubMenuCreate
          setCurrentPath={setCurrentPath}
          setPathOpen={setPathOpen}
        />
      : null}

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



