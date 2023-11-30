"use client"
import React, {useEffect, useState} from 'react'
import FlowChartEditor from './FlowChartEditor'
import Sidebar from '../components/navigation/sidebar/Sidebar'

const page = () => {
  const [pathSaved, setPathSaved] = useState(true)
  const [pathList, setPathList] = useState([{uuid: '9Hpt1sckPcroQozmFEQAPZ', name: "Overview Path", parentId: null}])
  const [currentPath, setCurrentPath] = useState({uuid: '9Hpt1sckPcroQozmFEQAPZ', name: "Overview Path", parentId: null})

  const [selectedPrimNode, setSelectedPrimNode] = useState(null)
  const [selectedSecNode, setSelectedSecNode] = useState(null)
  const [editorLocked, setEditorLocked] = useState(false)

  console.log('Coming to you from page: ', (selectedSecNode && selectedSecNode.data))

  useEffect(() => {
    selectedPrimNode ? setEditorLocked(false) : setEditorLocked(true)
  },[selectedPrimNode])


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
          <FlowChartEditor 
            level='primary' //needed
            editorLocked={false}
            selectedPrimNode={selectedPrimNode}
            setSelectedPrimNode={setSelectedPrimNode} //neded
            setSelectedSecNode={setSelectedSecNode}
          />
        </div>
        <div className='flex basis-4/6 flex-col border-4 border-slate-300'>
          <h2 className='text-3xl text-center bg-slate-300'>{selectedPrimNode ? 'Detail View: ' + selectedPrimNode.data.label : 'Subpath'}</h2>
          <FlowChartEditor 
            level={'secondary'} //neded
            editorLocked={editorLocked}
            selectedPrimNode={selectedPrimNode} //neded
            setSelectedPrimNode={setSelectedPrimNode}
            setSelectedSecNode={setSelectedSecNode} //neded
          />
        </div>
      </div>
    </div>
  )
}

export default page