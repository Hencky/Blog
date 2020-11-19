import React from 'react';
import LineWrapper from './LineWrapper';

export default () => {
  const list = [
    {
      key: 'a',
      style: {
        background: 'red',
        width: 100,
        height: 100,
      },
      children: <div>a</div>,
    },
    {
      key: 'b',
      style: {
        background: 'yellow',
        width: 100,
        height: 200,
      },
      children: <div>b</div>,
    },
    {
      key: 'c',
      style: {
        background: 'green',
        width: 100,
        height: 150,
      },
      children: <div>c</div>,
    },
  ];

  return (
    <LineWrapper title="或">
      {list.map(item => (
        <div {...item} />
      ))}
    </LineWrapper>
  );
};
