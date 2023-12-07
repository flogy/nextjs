"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  applyNodeChanges,
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
import { parse } from 'path';

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

const FlowChartEditor = ({level, selectedPrimNode, setSelectedPrimNode, setSelectedSecNode}) => {
  // level: <'primay' or 'seconday'> identifies the flowchart editor in the GUI (primary = top)
  // selectedPrimNode/setSelectedPrimNode: node selected in primary editor
  // setSelectedSecNode: node selected in seconday editor
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const { setViewport } = useReactFlow();
  const [editableFlowCanvas, setEditableFlowCanvas] = useState(true)


  //keep track of renders
  const rendercount = useRef(0)
  useEffect(() => {
    rendercount.current = rendercount.current + 1;
  });
  console.log("iteration: ", rendercount.current)
  

  //modify all edges to be of smoothstep type
  const edgesWithUpdatedType = edges.map((edge) => {
    edge.type = 'smoothstep'
    return edge
  })


  useEffect(() => {    
    //when a node is selected we set its selection property to true and the deletable property to false
    //deletable is false for all nodes when editableFlowCanvas is false (so that elements in the sub-flowchart can be deleted without deleting the elmenent in the parent)

    const newNodes = nodes.map((node) => {

      if(selectedNodes.includes(node.id)){
        node.data =  {...node.data, selected: true} 
      } else {
        node.data = {...node.data, selected: false}
      }
      return node
    })

    setNodes(newNodes)

  }, [selectedNodes])


  useEffect(() => {    
    //when a node is selected we set its selection property to true and the deletable property to false
    //deletable is false for all nodes when editableFlowCanvas is false (so that elements in the sub-flowchart can be deleted without deleting the elmenent in the parent)
    setSelectedNodes([])
    if (level === 'primary') setSelectedPrimNode(null)
    if (level === 'secondary') setSelectedSecNode(null)

    const newNodes = nodes.map((node) => {
      var nde;
      if(editableFlowCanvas){
        nde = {...node, deletable: true}
        nde.data = { ...nde.data, disabled:false }
      } else {
        nde = {...node, deletable: false}
        nde.data = {...nde.data, disabled:true}
      }
      return nde
    })

    setNodes(newNodes)

  }, [editableFlowCanvas])


  useOnSelectionChange({
    // when a node was selected we add its ID locally to selectedNodes and depening on which editor we are in also passing it to the parent element
    onChange: ({ nodes }) => {
      if (editableFlowCanvas){return}
      setSelectedNodes(nodes.map((node) => node.id))
      if (nodes.length === 1){ //we only want to handle this case
        if (level === 'primary'){
          setSelectedPrimNode(nodes[0])} //for primary (upper) editor
        if (level === 'secondary'){
          setSelectedSecNode(nodes[0]) //for secondary (lower) editor
          }
      } else {
        setSelectedPrimNode(null)
        setSelectedSecNode(null)
        console.log('unexpected length of selectedNodes array.. ', selectedNodes)
      }
    },      
  })


  const onConnect = useCallback((params) => {
    if (!editableFlowCanvas) return
    setEdges((edges) => addEdge(params, edges))
    },[]
  );


  const onDragOver = useCallback((event) => {
    if (!editableFlowCanvas) return
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  },[]);


  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');

    // check if the dropped element is valid and we can edit
    if ((typeof type === 'undefined' || !type) && editableFlowCanvas) {
      return;
    }

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${level}_${type}_${getId()}`,
      type,
      position,
      deletable: true,
      data: {label: `${type.charAt(0).toUpperCase() + type.slice(1)}`, 
              width: 8,
              selected: false,
              disabled: false 
            } 
    };
    setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance, nodes],
  );


  const onSaveTemplate = useCallback(async (templateTitle, level) => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const flow_str = JSON.stringify(flow)
      const submitData = {templateTitle, level, flow_str}

      const res = await fetch('http://localhost:3000/api/templates',
      {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (!res.ok){console.log("Debug: POST template path didn't work please try again.")}
    }
  }, [reactFlowInstance, nodes]);



  const onRestore = useCallback((flow) => {
    const restoreFlow = () => {
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  console.log(level, editableFlowCanvas, nodes)
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
          // edgesUpdatable={editableFlowCanvas}
          // nodesUpdatable={editableFlowCanvas}
          // edgesFocusable={editableFlowCanvas}
          // nodesDraggable={editableFlowCanvas}
          // nodesConnectable={editableFlowCanvas}
          // elementsSelectable={!editableFlowCanvas}
          >
          <Controls />
          <PathwayCreatorControls
            level={level}
            onSaveTemplate={onSaveTemplate}
            onRestore={onRestore}
            editableFlowCanvas={editableFlowCanvas}
            setEditableFlowCanvas={setEditableFlowCanvas}
          /> {/*custom component in utils folder*/}
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
  );
};

export default ({level, selectedPrimNode, setSelectedPrimNode, setSelectedSecNode}) => (
  <ReactFlowProvider>
    <FlowChartEditor
      level={level}
      selectedPrimNode={selectedPrimNode}
      setSelectedPrimNode={setSelectedPrimNode}
      setSelectedSecNode={setSelectedSecNode}
    />
  </ReactFlowProvider>
);