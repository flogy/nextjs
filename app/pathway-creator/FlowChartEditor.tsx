"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useOnSelectionChange,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {StartNode, RoutineNode, OperationNode, SubroutineNode, ConditionNode, AdminNode, EndNode} from './CustomNodes'
import { overviewNodes, overviewEdges} from "./TemplateFlows"
import PathwayCreatorControls from './utils/PathwayCreatorControls';

const nodeTypes = {
  start: StartNode,
  routine: RoutineNode,
  operation: OperationNode,
  subroutine: SubroutineNode,
  condition: ConditionNode,
  admin: AdminNode,
  end: EndNode
};

const short = require('short-uuid')
const getId = () => `${short.generate()}`;

const FlowChartEditor = ({level, editorLocked, selectedPrimNode, setSelectedPrimNode, setSelectedSecNode}) => {
  console.log(level)
  // level: <'primay' or 'seconday'> identifies the flowchart editor in the GUI (primary = top)
  // selectedPrimNode/setSelectedPrimNode: node selected in primary editor
  // setSelectedSecNode: node selected in seconday editor

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const { setViewport } = useReactFlow();
  const [totheLeft, setToTheLeft] = useState(0.1)
  const [editableCanvas, setEditableCanvas] = useState(true)

  //custom:
  const rendercount = useRef(0)
  
  const edgesWithUpdatedType = edges.map((edge) => {
    edge.type = 'smoothstep'
    return edge
  })

  useEffect(() => {
    rendercount.current = rendercount.current + 1;
  });

  useEffect(() => {
    triggerARerender()
  },[editorLocked])


  useEffect(() => {
    //console.log('Selected nodes: ', selectedNodes)
    
    const newNodes = nodes.map((node) => {
      editableCanvas ? node.data.disabled = false : node.data.disabled = true
      if (selectedNodes.includes(node.id) && !node.data.selected){
        node.data.selected = true
      } else {
        node.data.selected = false
      }
      return node
    })

    setNodes(newNodes)
    triggerARerender()
  }, [selectedNodes, editableCanvas])


  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (editableCanvas){return}
      setSelectedNodes(nodes.map((node) => node.id))

      if (nodes.length === 1){ //nodes should always only contain max 1 entry
        if (level === 'primary'){
          setSelectedPrimNode(nodes[0])} 
        if (level === 'secondary'){
          setSelectedSecNode(nodes[0])
          }
      } else {
        setSelectedPrimNode(null)
        setSelectedSecNode(null)
      }
    },      
  })

  const triggerARerender = () => {
    //Reactflow sometimes doesn't 'react' to changes, this forces a re-render
    const newNodes = nodes.map((node) => {
      node.position = {
            x: node.position.x + totheLeft,
            y: node.position.y
          };
      return node
    })
    setNodes(newNodes)
    setToTheLeft(totheLeft * -1) //move back
  }

  const handleEditableCanvasClick = () => {
    if (editableCanvas == false){
      setSelectedNodes([])
      if (level === 'primary'){setSelectedPrimNode(null)} 
      if (level === 'secondary'){setSelectedSecNode(null)}
    }
    setEditableCanvas(!editableCanvas)
  }

  const onConnect = useCallback((params) => {
    setEdges((edges) => addEdge(params, edges))
    },[]
  );


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const onDrop = useCallback((event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // check if we're in locked state
      if (editorLocked === true){return}

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${level}_${type}_${getId()}`,
        type,
        position,
        data: {label: `${type.charAt(0).toUpperCase() + type.slice(1)}`, 
               width: 8,
               selected: false,
               disabled: false
              } 
        //...(type === 'routine' && {data: {label: ''}})
      };

      setNodes((nodes) => nodes.concat(newNode));
      
    },
    [reactFlowInstance, nodes],
  );


  const printNodes = () => {
    console.log('current nodes:')
    console.log('locked? ', editorLocked)
    console.log(nodes)

    // setNodes(overviewNodes)
    // setNodes(overviewEdges)

    console.log(nodes)
    const all_nodes = nodes.map((node) => {
      let nde = {
        id: node.id, 
        type: node.type, 
        data: {
          label: node.data.label, 
          width: node.data.width, 
          selected: node.data.selected, 
          disabled: node.data.disabled
        },
        position: {
          x: node.position.x,
          y: node.position.y
        }
      }
      return nde
    })
    console.log(all_nodes)
    console.log(edges)



  }

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(`${level}_temporaryFlowId`, JSON.stringify(flow)); //replace with SQL
    }
  }, [reactFlowInstance, nodes]);



  const onRestore = useCallback((flow) => {
    const restoreFlow = async () => {
      // const flow = JSON.parse(localStorage.getItem(`${level}_temporaryFlowId`)); //replace with SQL
      // //console.log(flow)

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;

        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);






  console.log("iteration: ", rendercount.current)
  //nodes.map((node) => console.log(`${node.id} ${node.data.selected}`))

  return (
      <div className={'w-full h-full'} ref={reactFlowWrapper}> 
        <ReactFlow
          nodes={nodes}
          edges={edgesWithUpdatedType}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          minZoom={0.2}
          onDragOver={onDragOver}
          edgesUpdatable={!editorLocked}
          edgesFocusable={!editorLocked}
          nodesDraggable={!editorLocked}
          nodesConnectable={!editorLocked}
          nodesFocusable={!editorLocked}
          elementsSelectable={!editorLocked}
          >
          <Controls />
          <PathwayCreatorControls
            level={level}
            reactFlowInstance={setReactFlowInstance} 
            setReactFlowInstance={setReactFlowInstance}
            onRestore={onRestore}
            editableCanvas={editableCanvas}
            handleEditableCanvasClick={handleEditableCanvasClick}
            onSave={onSave}
            printNodes={printNodes}
          /> {/*custom component in utils folder*/}
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
  );
};

export default ({level, editorLocked, selectedPrimNode, setSelectedPrimNode, setSelectedSecNode}) => (
  <ReactFlowProvider>
    <FlowChartEditor
      level={level}
      editorLocked={editorLocked}
      selectedPrimNode={selectedPrimNode}
      setSelectedPrimNode={setSelectedPrimNode}
      setSelectedSecNode={setSelectedSecNode}
    />
  </ReactFlowProvider>
);