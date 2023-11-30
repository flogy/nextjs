"use client"
import React, {useState} from 'react'
import FlowChartEditor from './FlowChartEditor'
import Sidebar from '../components/navigation/sidebar/Sidebar'

const page = () => {
  const [pathSaved, setPathSaved] = useState(true)
  const [pathList, setPathList] = useState([{uuid: '9Hpt1sckPcroQozmFEQAPZ', name: "Overview Path", parentId: null}])
  const [currentPath, setCurrentPath] = useState({uuid: '9Hpt1sckPcroQozmFEQAPZ', name: "Overview Path", parentId: null})

  return (
    <div className='flex flex-grow'>
      <Sidebar 
        pathList={pathList}
        setPathList={setPathList}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
      <div className='flex flex-col flex-1 gap-6'>
        <div className='flex basis-2/6 flex-col border-4 border-slate-300'>
          <h2 className='text-3xl text-center bg-slate-300'>Overview Path</h2>
          <FlowChartEditor />
        </div>
        <div className='flex basis-4/6 flex-col border-4 border-slate-300'>
          <h2 className='text-3xl text-center bg-slate-300'>Subpath</h2>
          <FlowChartEditor />
        </div>
      </div>
    </div>
  )
}

export default page