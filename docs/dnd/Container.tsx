import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

type ContainerProps = {
  setLeft: (x: number) => void;
  setTop: (y: number) => void;
};

const style: React.CSSProperties = {
  width: 200,
  height: 200,
  background: '#0f8',
};

const Container: React.FC<ContainerProps> = props => {
  const { setLeft, setTop } = props;

  const [{ isOver }, drop] = useDrop({
    // 和 drag 的 item.type 保持一致
    accept: 'dragtest',

    // 放下时触发
    drop: (item, monitor: DropTargetMonitor) => {
      const { x, y } = monitor.getDifferenceFromInitialOffset() || {
        x: 0,
        y: 0,
      };
      setLeft(x + item.left);
      setTop(y + item.top);
    },

    // hover时触发
    hover: (item, monitor: DropTargetMonitor) => {},

    // 是否可drop
    canDrop: () => true,

    // 返回对象将作为useDrop第一个参数
    collect: (monitor: DropTargetMonitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  // ref绑定drop
  return (
    <div
      ref={drop}
      style={{ ...style, border: isOver ? '1px solid #f08' : '' }}
    >
      Container
    </div>
  );
};

export default Container;
