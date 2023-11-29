import React, { memo, useCallback, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position, useUpdateNodeInternals } from 'reactflow';


export const StartNode = function CustomNode({}) {
  return (
    <>
      <div className='start-node'>
        <p className="node-text-white">Start</p>
        <Handle 
          type="source" 
          position={Position.Right} 
          id="out1" />
      </div>
    </>
  );
}

export const RoutineNode = function CustomNode({id, data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [label, setLabel] = useState<string>(data.label)

  const onLabelInputBlur = () => {
    data.label = label
    updateNodeInternals(id);
  }

  return (
    <>
      <div className="routine-node-parent">
        <div className="routine-node-child">
          <input 
            type="text" 
            placeholder='...'
            value={label}
            onChange={e => setLabel(e.target.value)}
            onBlur={onLabelInputBlur} 
            className='w-24 text-center bg-transparent text-white text-2xl nodrag'
          />
        </div>
        <Handle type="target" position={Position.Left} id="in1" />
        <Handle type="source" position={Position.Bottom} id="out1" />
        <Handle type="source" position={Position.Right} id="out2" />
      </div>
    </>
  );
}

export const OperationNode = function CustomNode({}) {
  return (
    <>
      <div className='operation-node'>
        <p className="node-text-white">Operation</p>
        <Handle type="target" position={Position.Top} id="in1" />
        <Handle type="source" position={Position.Right} id="out1" />
        <Handle type="source" position={Position.Bottom} id="out2" />
        <Handle type="target" position={Position.Left} id="in2" />
      </div>
    </>
  );
}

export const SubroutineNode = function CustomNode({}) {
  return (
    <>
      <div className='subroutine-node'>
        <p className="text-2xl text-violet-600">Subroutine</p>
        <Handle type="target" position={Position.Top} id="in1" />
        <Handle type="source" position={Position.Right} id="out1" />
        <Handle type="source" position={Position.Bottom} id="out2" />
        <Handle type="target" position={Position.Left} id="in2" />
      </div>
    </>
  );
}

export const ConditionNode = function CustomNode({}) {
  return (
    <>
      <div className='condition-node-parent'>
        <p className='absolute top-[5.5rem] left-[5.25rem] z-50'>yes</p>
        <p className='absolute top-6 right-[-1rem] z-50'>no</p>
        <div className='condition-node-child'>
          <p className="text-2xl text-white absolute top-8">Condition</p>
        </div>
          <Handle type="target" position={Position.Top} id="in1" />
          <Handle type="target" position={Position.Left} id="in2" />
          <Handle type="source" position={Position.Right} id="no" />
          <Handle type="source" position={Position.Bottom} id="yes" />
      </div>
    </>
  );
}


export const AdminNode = function CustomNode({}) {
  return (
    <>
      <div className='admin-node'>
        <p className="node-text-white">Admin</p>
        <Handle type="target" position={Position.Top} id="in1" />
        <Handle type="source" position={Position.Right} id="out1" />
        <Handle type="source" position={Position.Bottom} id="out2" />
        <Handle type="target" position={Position.Left} id="in2" />
      </div>
    </>
  );
}

export const EndNode = function CustomNode({}) {
  return (
    <>
      <div className='end-node'>
        <p className="node-text-white">End</p>
        <Handle type="target" position={Position.Left} id="in1" />
      </div>
    </>
  );
}