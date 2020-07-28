import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragBox from './DragBox';
import Container from './Container';

const DargDemo: React.FC = () => {
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  return (
    <div style={{ position: 'relative' }}>
      <DndProvider backend={HTML5Backend}>
        <DragBox left={left} top={top} />
        <Container setLeft={setLeft} setTop={setTop} />
      </DndProvider>
    </div>
  );
};

export default DargDemo;
