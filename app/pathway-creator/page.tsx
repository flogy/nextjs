"use client"
import React, {useEffect, useState} from 'react'
import FlowChartEditor from './FlowChartEditor'
import SidebarPathInactive from '../components/navigation/sidebar/SidebarPathInactive'
import SidebarPathActive from '../components/navigation/sidebar/SidebarPathActive'

const page = () => {
  //sidebar hooks
  const [pathOpen, setPathOpen] = useState(false) //determines the switch between SidebarPathInactive and SidebarPathActive
  const [currentPath, setCurrentPath] = useState(null)

  //editor hooks
  const [selectedPrimNode, setSelectedPrimNode] = useState(null)
  const [selectedSecNode, setSelectedSecNode] = useState(null)

  console.log('path open? ', pathOpen)
  return (
    <div className='h-full flex flex-grow'>
      
      {pathOpen ?
        <SidebarPathActive
          setPathOpen={setPathOpen}
          currentPath={currentPath}
        />
      :
        <SidebarPathInactive
          setPathOpen={setPathOpen}
          setCurrentPath={setCurrentPath}
        />
      }
      
      <div className='flex flex-col flex-1 gap-6'>
        <div className='flex basis-2/6 flex-col border-4 border-slate-300'>
          <h2 className='text-3xl text-center bg-slate-300'>Overview Path</h2>
          <FlowChartEditor 
            level='primary' //needed
            selectedPrimNode={selectedPrimNode}
            setSelectedPrimNode={setSelectedPrimNode} //neded
            setSelectedSecNode={setSelectedSecNode}
          />
        </div>
        <div className='flex basis-4/6 flex-col border-4 border-slate-300'>
          <h2 className='text-3xl text-center bg-slate-300'>{selectedPrimNode ? 'Detail View: ' + selectedPrimNode.data.label : 'Subpath'}</h2>
          <FlowChartEditor 
            level={'secondary'} //neded
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