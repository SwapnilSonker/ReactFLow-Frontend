// src/components/FlowEditor.tsx
import React, { useCallback } from 'react';
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
  NodeTypes,
} from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';
import  {CustomNode}  from './Customnode.tsx';

 // Import the custom node

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 0 } },
];

const nodeTypes: NodeTypes = {
  custom: CustomNode, // Register the custom node
};

const FlowEditorContent: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onNodesDelete = useCallback(
    (nodesToRemove: Node[]) => {
      setNodes((nds) => nds.filter((node) => !nodesToRemove.some((el) => el.id === node.id)));
    },
    [setNodes]
  );

  const onEdgesDelete = useCallback(
    (edgesToRemove: Edge[]) => {
      setEdges((eds) => eds.filter((edge) => !edgesToRemove.some((el) => el.id === edge.id)));
    },
    [setEdges]
  );

  const onConnect = (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds));

  const addNode = (type: string) => {
    const id = uuidv4();
    const newNode: Node = {
      id,
      data: { label: `${type} Node` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: type === 'Cold Email' ? 'custom' : 'default', // Use custom node type for Cold Email
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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        deleteKeyCode={"46"} // 'delete' key
        nodeTypes={nodeTypes} // Set the node types
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

const FlowEditor: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowEditorContent />
    </ReactFlowProvider>
  );
};

export default FlowEditor;
