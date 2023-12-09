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
  const [allSecNodes, setAllSecNodes] = useState([])
  const [selectedSecNode, setSelectedSecNode] = useState(null)


  const fetchData = useCallback(async (id) => {
    //get the main path
    const response = await fetch(`http://localhost:3000/api/primarypaths?parentPathId=${id}`)
    const { path } = await response.json()
    if (path){ //for new paths this does not yet exist
      const flow = JSON.parse(path.reactFlowInstance)
      console.log('flow to to be set ', flow)
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
    //wenn die prev-node eine andere ist als die jetzige dann speicher die prev node ab
    if (previsouslySelectedPrimNode && selectedPrimNode !== previsouslySelectedPrimNode){
      //in this case we save our flowchart instance (if exists)
      if (!reactFlowInstanceSecondary){return}
      const flow = reactFlowInstanceSecondary.toObject()
      console.log('saving a flowobject here!')
      const newSecNodes = allSecNodes.concat({id: previsouslySelectedPrimNode.id, reactFlowInstance:flow})
      setAllSecNodes(newSecNodes)

      //and present the user with either empty canvas or a previous sub-flowchart
      // (selectedPrimNode is null if none is selected)
      if (selectedPrimNode){// && //is in allSecNodes ){
        //load old flowchart
        console.log('hi')
      } else {
        //present the user with a new and empty flowchart canvas
        console.log('bye')
      }

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



  // console.log('selected primary node: ', selectedPrimNode)
  // console.log('React flow instance secondary: ', reactFlowInstanceSecondary)
  console.log('All secondary nodes: ', allSecNodes)
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
          <div className={`flex flex-col border-4 border-slate-300 ${!selectedPrimNode ? 'hidden basis-0' : 'basis-4/6'}`}>
            <h2 className='text-3xl text-center bg-slate-300'>{selectedPrimNode ? 'Detail View: ' + selectedPrimNode.data.label : 'Select a node to proceed'}</h2>
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

          <div className={`flex flex-col border-4 border-slate-300 text-xl ${selectedPrimNode ? 'hidden basis-0' : 'basis-4/6'}`}>
            <h2 className='text-3xl text-center bg-slate-300'>Secondary Path</h2>
            <p className='h-full flex flex-col justify-center items-center'>Select a primary node to proceeed..</p>
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