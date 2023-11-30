import React, { memo, useCallback, useState } from 'react';
import { Handle, useReactFlow, useStoreApi, Position, useUpdateNodeInternals } from 'reactflow';


export const StartNode = function CustomNode({id, data}) {
  return (
    <div className='start-node'>
      <p className="node-text-white">Start</p>
      <Handle 
        type="source" 
        position={Position.Right} 
        id="out1" />
    </div>
  );
}

export const RoutineNode = function CustomNode({id, data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [label, setLabel] = useState<string>(data.label)
  const [width, setWidth] = useState(data.width)

  const onLabelInputBlur = () => {
    data.label = label
    data.width = width
    updateNodeInternals(id);
  }

  return (
    <div className={`flex justify-center ${data.selected ? 'bg-red-500' : 'bg-cyan-600'} h-12 ${width < 10 && 'w-32' || width >=10 && 'w-72'}`}>
      <div className={`flex flex-col justify-center items-center h-12 border-r-4 border-l-4 ${width < 10 && 'w-28' || width >=10 && 'w-[68]'}`}>
        <input 
          type="text" 
          placeholder='...'
          value={label}
          onInput={(e) => setWidth(e.target.value.length)}
          onChange={e => setLabel(e.target.value)}
          onBlur={onLabelInputBlur} 
          className={`text-center bg-transparent ${data.disabled && 'pointer-events-none'} text-white text-2xl nodrag focus:outline-none ${width < 10 && 'w-28' || width >=10 && 'w-[68]'}`}
        />
      </div>
      <Handle type="target" position={Position.Left} id="in1" />
      <Handle type="source" position={Position.Bottom} id="out1" />
      <Handle type="source" position={Position.Right} id="out2" />
    </div>
  );
}


export const OperationNode = function CustomNode({id, data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [label, setLabel] = useState<string>(data.label)
  const [width, setWidth] = useState(data.width)

  const onLabelInputBlur = () => {
    data.label = label
    data.width = width
    updateNodeInternals(id);
  }

  return (
    <div className={`flex justify-center items-center ${data.selected ? 'bg-red-500' : 'bg-emerald-600'} h-12 ${width < 10 && 'w-32' || width >=10 && 'w-72'}`}>
      <input 
        type="text" 
        placeholder='...'
        value={label}
        onInput={(e) => setWidth(e.target.value.length)}
        onChange={e => setLabel(e.target.value)}
        onBlur={onLabelInputBlur} 
        className={`text-center ${data.disabled && 'pointer-events-none'} bg-transparent text-white text-2xl nodrag focus:outline-none ${width < 10 && 'w-28' || width >= 10 && 'w-[68]'}`}
      />
      <Handle type="target" position={Position.Top} id="in1" />
      <Handle type="source" position={Position.Right} id="out1" />
      <Handle type="source" position={Position.Bottom} id="out2" />
      <Handle type="target" position={Position.Left} id="in2" />
    </div>
  );
}

export const SubroutineNode = function CustomNode({id, data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [label, setLabel] = useState<string>(data.label)
  const [width, setWidth] = useState(data.width)

  const onLabelInputBlur = () => {
    data.label = label
    data.width = width
    updateNodeInternals(id);
  }

  return (
    <div className={`flex justify-center items-center ${data.selected ? 'bg-red-500' : 'bg-white'} border-4 ${data.selected ? 'border-white' : 'border-violet-600'} h-12 ${width < 10 && 'w-32' || width >=10 && 'w-72' }`}>
      <input 
        type="text" 
        placeholder='...'
        value={label}
        onInput={(e) => setWidth(e.target.value.length)}
        onChange={e => setLabel(e.target.value)}
        onBlur={onLabelInputBlur} 
        className={`text-center bg-transparent ${data.disabled && 'pointer-events-none'} ${data.selected ? 'text-white' : 'text-violet-600'} text-2xl nodrag focus:outline-none ${width < 10 && 'w-28' || width >= 10 && 'w-[68]'}`}
      />
      <Handle type="target" position={Position.Top} id="in1" />
      <Handle type="source" position={Position.Right} id="out1" />
      <Handle type="source" position={Position.Bottom} id="out2" />
      <Handle type="target" position={Position.Left} id="in2" />
    </div>
  );
}

export const ConditionNode = function CustomNode({id, data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [label, setLabel] = useState<string>(data.label)
  const [width, setWidth] = useState(0)

  const onLabelInputBlur = () => {
    data.label = label
    updateNodeInternals(id);
  }

  return (
    <div className='condition-node-parent'>
      <p className='absolute top-[5.5rem] left-[5.25rem] z-50'>yes</p>
      <p className='absolute top-6 right-[-1rem] z-50'>no</p>
      <div className={`flex justify-center clip-raute ${data.selected ? 'bg-red-500' : 'bg-orange-300'} w-36 h-24 relative`}>
        <input 
        type="text" 
        placeholder='...'
        value={label}
        onInput={(e) => setWidth(e.target.value.length)}
        onChange={e => setLabel(e.target.value)}
        onBlur={onLabelInputBlur} 
        className={`text-center bg-transparent ${data.disabled && 'pointer-events-none'} text-white text-2xl nodrag focus:outline-none ${width < 10 && 'w-28' || width >= 10 && 'w-[68]'}`}
        />
      </div>
        <Handle type="target" position={Position.Top} id="in1" />
        <Handle type="target" position={Position.Left} id="in2" />
        <Handle type="source" position={Position.Right} id="no" />
        <Handle type="source" position={Position.Bottom} id="yes" />
    </div>
  );
}


export const AdminNode = function CustomNode({id, data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [label, setLabel] = useState<string>(data.label)
  const [width, setWidth] = useState(data.width)

  const onLabelInputBlur = () => {
    data.label = label
    data.width = width
    updateNodeInternals(id);
  }

  return (
    <div className={`flex justify-center items-center ${data.selected ? 'bg-red-500' : 'bg-violet-600'} border-4 border-white h-12 ${width < 10 && 'w-32' || width >=10 && 'w-72'}`}>
    <input 
        type="text" 
        placeholder='...'
        value={label}
        onInput={(e) => setWidth(e.target.value.length)}
        onChange={e => setLabel(e.target.value)}
        onBlur={onLabelInputBlur} 
        className={`text-center bg-transparent ${data.disabled && 'pointer-events-none'} text-white text-2xl nodrag focus:outline-none ${width < 10 && 'w-28' || width >= 10 && 'w-[68]'}`}
      />
      <Handle type="target" position={Position.Top} id="in1" />
      <Handle type="source" position={Position.Right} id="out1" />
      <Handle type="source" position={Position.Bottom} id="out2" />
      <Handle type="target" position={Position.Left} id="in2" />
    </div>
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