"use client"
import React, {useEffect, useState} from 'react'
import FlowChartEditor from './FlowChartEditor'
import SidebarPathInactive from '../components/navigation/sidebar/SidebarPathInactive'
import SidebarPathActive from '../components/navigation/sidebar/SidebarPathActive'

const page = () => {
  //sidebar UI-hooks
  const [pathOpen, setPathOpen] = useState(false) //determines the switch between SidebarPathInactive and SidebarPathActive
  
  //holds all data for the flowcharts
  const [reactFlowInstancePrimary, setReactFlowInstancePrimary] = useState(null);
  const [reactFlowInstanceSecondary, setReactFlowInstanceSecondary] = useState(null);
  const [currentPath, setCurrentPath] = useState(null) //current parent Path (see Paths DB-Schema: Paths)
  const [primaryPath, setPrimaryPath] = useState(null) //the one primary path (see DB-Schema: PrimaryPaths)
  const [secondaryPaths, setSecondaryPaths] = useState([]) //all children(secondary) paths of primary paths (see DB-Schema: SecondaryPaths)

  //editor hooks
  const [selectedPrimNode, setSelectedPrimNode] = useState(null)
  const [selectedSecNode, setSelectedSecNode] = useState(null)


  // parentPathId      Int
  // reactFlowInstance String

  const onSave = async() => {
    var url, submitData

    //saving primary path
    if (currentPath && reactFlowInstancePrimary){
      url = 'http://localhost:3000/api/primarypaths'
      const flow = reactFlowInstancePrimary.toObject();
      const reactFlowInstance = JSON.stringify(flow)
      submitData = {parentPathId: currentPath.id, reactFlowInstance}
      console.log(submitData)
      const res = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (!res.ok){console.log("Debug: saving main path didn't work - please try again.")}
    }

    //saving all secondary paths associated to primary path
  }

  const onDelete = async() => {
    
    //delete path from Paths
    if (currentPath){
      url = 'http://localhost:3000/api/paths'
      submitData = {operation: 'delete', id: currentPath.id}
      const res = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (!res.ok){console.log("Debug: saving main path didn't work - please try again.")}
    }

    //delete relevant PrimaryPaths

    //delete relevant SecondaryPaths
  
  }




  return (
    <div className='h-full flex flex-grow'>
      
      {/* sidebar */}
      {pathOpen ?
        <SidebarPathActive
          setPathOpen={setPathOpen}
          currentPath={currentPath}
          onSave={onSave}
          onDelete={onDelete}
        />
      :
        <SidebarPathInactive
          setPathOpen={setPathOpen}
          setCurrentPath={setCurrentPath}
        />
      }
      
      
      <div className='flex flex-col flex-1 gap-6'>

        {/* primary flow chart editor */}
        <div className='flex basis-2/6 flex-col border-4 border-slate-300'>
          <h2 className='text-3xl text-center bg-slate-300'>Overview Path</h2>
          <FlowChartEditor 
            level='primary' //needed
            setSelectedPrimNode={setSelectedPrimNode}
            setSelectedSecNode={setSelectedSecNode}
            reactFlowInstance={reactFlowInstancePrimary}
            setReactFlowInstance={setReactFlowInstancePrimary}
          />
        </div>

        {/* secondary flow chart editor */}
        <div className='flex basis-4/6 flex-col border-4 border-slate-300'>
          <h2 className='text-3xl text-center bg-slate-300'>{selectedPrimNode ? 'Detail View: ' + selectedPrimNode.data.label : 'Subpath'}</h2>
          <FlowChartEditor 
            level={'secondary'} //neded
            setSelectedPrimNode={setSelectedPrimNode}
            setSelectedSecNode={setSelectedSecNode} //neded
            reactFlowInstance={reactFlowInstanceSecondary}
            setReactFlowInstance={setReactFlowInstanceSecondary}
          />
        </div>

      </div>
    </div>
  )
}

export default page