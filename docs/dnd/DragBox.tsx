import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

type DragBoxProps = {
  left: number;
  top: number;
};

const DragBox: React.FC<DragBoxProps> = props => {
  const { left, top } = props;

  const style: React.CSSProperties = {
    border: '1px solid #f90',
    width: 100,
    height: 20,
    position: 'absolute',
  };

  const [{ isDragging }, drag] = useDrag({
    // item.type 必填 和 drop的accept保持一致
    item: { type: 'dragtest', left, top },

    // 拖拽开始 无返回，或返回对象覆盖item
    // begin: (monitor: DragSourceMonitor) => {},

    // 拖拽结束
    end: (item, monitor: DragSourceMonitor) => {},

    // 是否可拖拽
    canDrag: (monitor: DragSourceMonitor) => {
      return true;
    },

    // 正在拖拽
    // isDragging: (monitor: DragSourceMonitor) => {},

    // collect的返回值，将作为useDrag的第一个参数
    collect: (monitor: DragSourceMonitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  return (
    // drag绑定到ref上，就可以进行拖拽了
    <div ref={drag} style={{ ...style, left, top }}>
      {isDragging ? 'Draging' : 'Drag Box'}
    </div>
  );
};

export default DragBox;
