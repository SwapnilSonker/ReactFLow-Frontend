
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = ({ data }: any) => {
  return (
    <div className="custom-node">
      <div>{data.label}</div>
      {data.showPlus && (
        <button className="add-node-btn" onClick={data.onAddNode}>
          +
        </button>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
