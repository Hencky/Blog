import React from 'react';
import { Button, message } from 'antd';
import { isFunction } from 'lodash';

export default () => {
  const handleClick = (...arg: any) => {
    console.log(...arg);
    message.success('Click Throttle Button');
  };

  return (
    <Button
      onClick={throttle(() => {
        handleClick('arg1', 'arg2');
      })}
    >
      Throttle
    </Button>
  );
};

function throttle(fn: any, wait: number = 1000) {
  if (!isFunction(fn)) return;
  let timeout: NodeJS.Timeout | undefined;
  return (...arg: any): void => {
    const leading: boolean = !timeout;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = undefined;
      }, wait);
    }
    if (leading) {
      fn(...arg);
    }
  };
}
