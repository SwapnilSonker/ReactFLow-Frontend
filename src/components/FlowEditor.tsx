
import React, { useCallback, useState } from 'react';
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
import CustomNode from './Customnode';
import NodeModel from './NodeModel';

const initialNodes: Node[] = [
  { id: '1', type: 'custom', data: { label: 'Start', showPlus: true, onAddNode: () => {} }, position: { x: 250, y: 0 } },
];

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const FlowEditorContent: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);

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

  const addNode = (type: string, data: { email: string; subject: string; body: string }) => {
    const id = uuidv4();
    const newNode: Node = {
      id,
      data: { label: `${type} Node: ${data.email || ''}`, ...data },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: 'custom',
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleAddNode = (nodeId: string) => {
    setCurrentNodeId(nodeId);
    setIsModalOpen(true);
  };

  const handleSave = (type: string, data: { email: string; subject: string; body: string }) => {
    addNode(type, data);
    setIsModalOpen(false);
    setCurrentNodeId(null);
  };

  // Update the initial "Start" node to include the handleAddNode function
  if (nodes.length > 0 && nodes[0].id === '1') {
    nodes[0].data.onAddNode = () => handleAddNode('1');
  }

  return (
    <div className="flow-editor" style={{ height: '100vh' }}>
      <NodeModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        deleteKeyCode={"46"} 
        nodeTypes={nodeTypes} 
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
