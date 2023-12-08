"use client"
import React, {useEffect, useState, useCallback} from 'react'
import FlowChartEditor from './FlowChartEditor'
import SidebarPathInactive from '../components/navigation/sidebar/SidebarPathInactive'
import SidebarPathActive from '../components/navigation/sidebar/SidebarPathActive'

const page = () => {
  //sidebar UI-hooks
  const [pathOpen, setPathOpen] = useState(false) //determines the switch between SidebarPathInactive and SidebarPathActive and what to show
  
  //holds all data for the flowcharts
  const [reactFlowInstancePrimary, setReactFlowInstancePrimary] = useState(null);
  const [reactFlowInstanceSecondary, setReactFlowInstanceSecondary] = useState(null);
  const [currentPath, setCurrentPath] = useState(null) //current parent Path (see Paths DB-Schema: Paths)
  // const [primaryPath, setPrimaryPath] = useState(null) //the one primary path (see DB-Schema: PrimaryPaths)
  // const [secondaryPaths, setSecondaryPaths] = useState([]) //all children(secondary) paths of primary paths (see DB-Schema: SecondaryPaths)

  //editor hooks
  const [selectedPrimNode, setSelectedPrimNode] = useState(null)
  const [selectedSecNode, setSelectedSecNode] = useState(null)

  const fetchData = useCallback(async (id) => {
      const response = await fetch(`http://localhost:3000/api/primarypaths?parentPathId=${id}`)
      const { path } = await response.json()
      const flow = JSON.parse(path.reactFlowInstance)
      console.log('flow to to be set ', flow)
      setReactFlowInstancePrimary(flow) //continue: and now re-render the flowchart
    },[])


  useEffect(() => {
    if (currentPath){
      fetchData(currentPath.id)
    }
  }, [pathOpen, fetchData])


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

  const onClose = () =>{
    setReactFlowInstancePrimary(null)
    setReactFlowInstanceSecondary(null)
    setCurrentPath(null)
  }

  const onDelete = async() => {
    //delete path from Paths
    if (currentPath){
      url = 'http://localhost:3000/api/paths'
      submitData = {id: currentPath.id}
      const res = await fetch(url,
      {
        method: 'DELETE',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (!res.ok){console.log("Debug: saving main path didn't work - please try again.")}
    }  
  }




  return (
    <div className='h-full flex flex-grow'>
      
      {/* sidebar */}
      {pathOpen ?
        <SidebarPathActive
          setPathOpen={setPathOpen}
          currentPath={currentPath}
          onSave={onSave}
          onClose={onClose}
          onDelete={onDelete}
        />
      :
        <SidebarPathInactive
          setPathOpen={setPathOpen}
          setCurrentPath={setCurrentPath}
        />
      }
      
      {pathOpen ? 
        <div className='flex flex-col flex-1 gap-6'>
          {/* primary flow chart editor */}
          <div className='flex basis-2/6 flex-col border-4 border-slate-300'>
            <h2 className='text-3xl text-center bg-slate-300'>Overview Path</h2>
            <FlowChartEditor 
              level='primary' //needed
              pathOpen={pathOpen} //to restore reactflow upon loading a new path
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
              pathOpen={pathOpen}
              setSelectedPrimNode={setSelectedPrimNode}
              setSelectedSecNode={setSelectedSecNode} //neded
              reactFlowInstance={reactFlowInstanceSecondary}
              setReactFlowInstance={setReactFlowInstanceSecondary}
            />
          </div>
        </div>
      :
      <div className='flex flex-col flex-grow justify-center items-center text-xl'>
        <p>Open, import or create path to proceed..</p>
      </div>
      }     

    </div>
  )
}

export default page