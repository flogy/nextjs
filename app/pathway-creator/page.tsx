"use client"
import React, {useEffect, useState, useCallback} from 'react'
import FlowChartEditor from './FlowChartEditor'
import SidebarPathInactive from '../components/navigation/sidebar/SidebarPathInactive'
import SidebarPathActive from '../components/navigation/sidebar/SidebarPathActive'

const page = () => {
  //sidebar UI-hooks
  const [pathOpen, setPathOpen] = useState(false) //determines the switch between SidebarPathInactive and SidebarPathActive and what to show
  
  //holds all data for the flowchart editors
  const [currentPath, setCurrentPath] = useState(null) //current parent Path (see Paths DB-Schema: Paths)
  const [reactFlowInstancePrimaryInit, setReactFlowInstancePrimaryInit] = useState(null); //to initialize primary editor
  const [reactFlowInstanceSecondaryInit, setReactFlowInstanceSecondaryInit] = useState(null); //to initialize secondary editor
  
  const [reactFlowInstancePrimary, setReactFlowInstancePrimary] = useState(null); //working flowstate
  const [reactFlowInstanceSecondary, setReactFlowInstanceSecondary] = useState(null); //working flowstate

  
  const [selectedPrimNode, setSelectedPrimNode] = useState(null)
  const [previsouslySelectedPrimNode, setPrevisouslySelectedPrimNode] = useState(null)
  const [allSecPaths, setAllSecPaths] = useState([])
  const [selectedSecNode, setSelectedSecNode] = useState(null)


  const fetchData = useCallback(async (id) => {
    //get the main path
    const response = await fetch(`http://localhost:3000/api/primarypaths?parentPathId=${id}`)
    const { path } = await response.json()
    if (path){ //for new paths this does not yet exist
      const flow = JSON.parse(path.reactFlowInstance)
      setReactFlowInstancePrimaryInit(flow) //continue: and now re-render the flowchart
    }

    //get all children paths associated to parent path
  },[])


  //get data from DB once path was selected
  useEffect(() => {
    if (currentPath){
      fetchData(currentPath.id)
    }
  }, [pathOpen, fetchData])


  useEffect(() => {
    if (previsouslySelectedPrimNode && selectedPrimNode !== previsouslySelectedPrimNode){ //also fires if no new node is selected
      //we save our flowchart instance (if exists)
      if (reactFlowInstanceSecondary){
        const flow = reactFlowInstanceSecondary.toObject()
        //check if an entry exists?
        const exists = allSecPaths.filter((path) => path.id === previsouslySelectedPrimNode.id)
        if (exists.length !== 0){ //yes: replace
          const newSecPaths = allSecPaths.map((path) => (path.id !== previsouslySelectedPrimNode.id) ? path : {id: previsouslySelectedPrimNode.id, reactFlowInstance:flow})
          setAllSecPaths(newSecPaths)
        } else { //no: concat
          const newSecPaths = allSecPaths.concat({id: previsouslySelectedPrimNode.id, reactFlowInstance:flow})
          setAllSecPaths(newSecPaths)
        }
      }

      //and present the user with either empty canvas or a previous sub-flowchart
      if (selectedPrimNode){//setz jetztiges secondary flowchart lt datenbank
        const [path] = allSecPaths.filter((path) => path.id === selectedPrimNode.id)
        if (path){
          //load old flowchart from allSecPaths
          setReactFlowInstanceSecondaryInit(path.reactFlowInstance)

        } else {
          //just show new empty chart
          setReactFlowInstanceSecondaryInit({nodes: [], edges: [], viewport: {x:0, y:0, zoom:1}})
        }
      } //no selectedPrimNode --> no edit possible

    }
    setPrevisouslySelectedPrimNode(selectedPrimNode)
  }, [selectedPrimNode])





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
      const url = 'http://localhost:3000/api/paths'
      const submitData = {id: currentPath.id}
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
    setCurrentPath(null) 
  }



   console.log('selected primary node: ', selectedPrimNode)
  // console.log('React flow instance secondary: ', reactFlowInstanceSecondary)
  // console.log('All secondary nodes: ', allSecPaths)
  
  const selectableNode = selectedPrimNode && selectedPrimNode.type !== ('start' || 'end')
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
              reactFlowInstanceInit={reactFlowInstancePrimaryInit}
              reactFlowInstance={reactFlowInstancePrimary}
              setReactFlowInstance={setReactFlowInstancePrimary}
            />
          </div>

          {/* secondary flow chart editor */}
          <div className={`flex flex-col border-4 border-slate-300 ${selectableNode ? 'basis-4/6' : 'hidden basis-0'}`}>
            <h2 className='text-3xl text-center bg-slate-300'>{selectedPrimNode && selectableNode && 'Detail View: ' + selectedPrimNode.data.label}</h2>
            <FlowChartEditor 
              level={'secondary'} //neded
              pathOpen={pathOpen}
              setSelectedPrimNode={setSelectedPrimNode}
              setSelectedSecNode={setSelectedSecNode} //neded
              reactFlowInstanceInit={reactFlowInstanceSecondaryInit}
              reactFlowInstance={reactFlowInstanceSecondary}
              setReactFlowInstance={setReactFlowInstanceSecondary}
            />
          </div>

          <div className={`flex flex-col border-4 border-slate-300 text-xl ${selectableNode ? 'hidden basis-0' : 'basis-4/6'}`}>
            <h2 className='text-3xl text-center bg-slate-300'>Secondary Path</h2>
            <p className='h-full flex flex-col justify-center items-center'>{selectedPrimNode && !selectableNode ? 'Start and end nodes cannot be modified..' : 'Select a primary node to proceeed..'}</p>
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