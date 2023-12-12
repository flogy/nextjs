"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react';
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

const FlowChartEditor = ({level, setSelectedPrimNode, setSelectedSecNode, reactFlowInstanceInit, reactFlowInstance, setReactFlowInstance}) => {
  // level: <'primay' or 'seconday'> identifies the flowchart editor in the GUI (primary = top)
  // selectedPrimNode/setSelectedPrimNode: node selected in primary editor
  // setSelectedSecNode: node selected in seconday editor
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();
  const [editableFlowCanvas, setEditableFlowCanvas] = useState(true)

  const selectedNodes = nodes.filter(node => node.selected);

  //keep track of renders
  // const rendercount = useRef(0)
  // useEffect(() => {
  //   rendercount.current = rendercount.current + 1;
  // });
  // console.log("iteration: ", rendercount.current)
  
  //when a new flowInstance is set from the parent then load it
  useEffect(() => {
    if (reactFlowInstanceInit){
      //unselect all selected nodes
      onRestore(reactFlowInstanceInit)
    } 
  }, [reactFlowInstanceInit])


  //modify all edges to be of smoothstep type
  const edgesWithUpdatedType = edges.map((edge) => {
    edge.type = 'smoothstep'
    return edge
  })


  useEffect(() => {    
    //when a node is selected we set its selection property to true and the deletable property to false
    //deletable is false for all nodes when editableFlowCanvas is false (so that elements in the sub-flowchart can be deleted without deleting the elmenent in the parent)
    const newNodes = nodes.map((node) => {
      var nde;
      if(editableFlowCanvas){
        nde = {...node, deletable: true, selected: false}
        nde.data = { ...nde.data, disabled:false}
      } else {
        nde = {...node, deletable: false, selected: false}
        nde.data = {...nde.data, disabled:true}
      }
      return nde
    })

    if (level === 'primary') setSelectedPrimNode(null)
    if (level === 'secondary') setSelectedSecNode(null)
    setNodes(newNodes)

  }, [editableFlowCanvas])

  React.useEffect(() => {
    if (editableFlowCanvas){return}
      if (selectedNodes.length === 1){ //we only want to handle this case
        if (level === 'primary'){
          setSelectedPrimNode(selectedNodes[0])} //for primary (upper) editor
        if (level === 'secondary'){
          setSelectedSecNode(selectedNodes[0]) //for secondary (lower) editor
          }
      } else {
        setSelectedPrimNode(null)
        setSelectedSecNode(null)
        console.log('unexpected length of selectedNodes array.. ', selectedNodes)
      }
  }, [selectedNodes]);

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

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const flow_str = JSON.stringify(flow)
      return flow_str
    }
  }, [reactFlowInstance, nodes]);


  const onRestore = useCallback((flow) => {
    const restoreFlow = (flow) => {
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    }

    restoreFlow(flow);
  }, [setNodes, setViewport]);



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
          >
          <Controls />
          <PathwayCreatorControls
            level={level}
            onSave={onSave}
            onRestore={onRestore}
            editableFlowCanvas={editableFlowCanvas}
            setEditableFlowCanvas={setEditableFlowCanvas}
          /> 
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
  );
};

export default (props) => (
  <ReactFlowProvider>
    <FlowChartEditor
      {...props}
    />
  </ReactFlowProvider>
);