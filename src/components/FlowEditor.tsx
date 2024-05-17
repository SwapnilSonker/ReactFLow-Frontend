// src/components/FlowEditor.tsx
import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  Elements,
} from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 0 } },
];

const FlowEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onElementsRemove = (elementsToRemove: Elements) => {
    setNodes((nds) => nds.filter((node) => !elementsToRemove.some((el: { id: any; }) => el.id === node.id)));
    setEdges((eds) => eds.filter((edge) => !elementsToRemove.some((el: { id: any; }) => el.id === edge.id)));
  };

  const onConnect = (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds));

  const addNode = (type: string) => {
    const id = uuidv4();
    const newNode: Node = {
      id,
      data: { label: `${type} Node` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: 'default',
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ height: '100vh' }}>
      <div>
        <button onClick={() => addNode('Cold Email')}>Add Cold Email</button>
        <button onClick={() => addNode('Wait/Delay')}>Add Wait/Delay</button>
        <button onClick={() => addNode('Lead Source')}>Add Lead Source</button>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          deleteKeyCode={46 || null} // 'delete' key
        >
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowEditor;
