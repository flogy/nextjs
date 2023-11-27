"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  Controls,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {StartNode, RoutineNode, OperationNode, SubroutineNode, ConditionNode, AdminNode, EndNode} from './CustomNodes'
import Sidebar from '../components/navigation/sidebar/Sidebar'


const nodeTypes = {
  start: StartNode,
  routine: RoutineNode,
  operation: OperationNode,
  subroutine: SubroutineNode,
  condition: ConditionNode,
  admin: AdminNode,
  end: EndNode
};

//let id = 0;
//const getId = () => `dndnode_${id++}`;
const short = require('short-uuid')
const getId = () => `${short.generate()}`;
//const getId = () => `${short.generate()}_${id++}`;

const FlowChartEditor = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const [pathSaved, setPathSaved] = useState(true)
  const [pathList, setPathList] = useState([{uuid: '9Hpt1sckPcroQozmFEQAPZ', name: "Overview Path", parentId: null}])
  const [currentPath, setCurrentPath] = useState({uuid: '9Hpt1sckPcroQozmFEQAPZ', name: "Overview Path", parentId: null})



  useEffect(() => {
    const edgesWithUpdatedTypes = edges.map((edge) => {
      edge.type = 'smoothstep'
      return edge
    })
    setEdges(edgesWithUpdatedTypes)
  }, [edges]);



  const onConnect = useCallback((params) => {
    setEdges((edges) => addEdge(params, edges))
    },[]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const onNameChange = (event, id) => {
    console.log(event, id)
  }


  const onDrop = useCallback((event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: {label: '...', onNameChange: onNameChange},//{ label: `${type}` },
      };

      setNodes((nodes) => nodes.concat(newNode));
      console.log('nodes after drop:')
      console.log(nodes)
      
    },
    [reactFlowInstance, nodes],
  );


  const printNodes = () => {
    console.log('current nodes:')
    console.log(nodes)
  }


  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem('temporaryFlowId', JSON.stringify(flow)); //replace with SQL
    }
  }, [reactFlowInstance, nodes]);



  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem('temporaryFlowId')); //replace with SQL
      console.log(flow)

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;

        //this is a hack: restore the callback function
        //No idea what it actually does because we don't set the return value but it works wtf?
        flow.nodes.map((node) => node.data['onNameChange'] = onNameChange)

        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);



  return (
    <div className='flex flex-grow'>
      <Sidebar 
        pathList={pathList}
        setPathList={setPathList}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
      
      <div className="h-[800px] w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          >
          <Controls />
          <Panel position="top-right">
            <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onSave}>save</button>
            <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onRestore}>restore</button>
            <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={printNodes}>current node array</button>
          </Panel>
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <FlowChartEditor />
  </ReactFlowProvider>
);




