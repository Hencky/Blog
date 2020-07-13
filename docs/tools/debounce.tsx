import React from 'react';
import { Button, message } from 'antd';
import { isFunction } from 'lodash';

export default () => {
  const handleClick = (...arg: any) => {
    console.log(...arg);
    message.success('Click Debounce Button');
  };

  return (
    <Button
      onClick={debounce2(() => {
        handleClick('arg1', 'arg2');
      })}
    >
      Debounce
    </Button>
  );
};

function debounce(fn: any, wait: number = 1000) {
  if (!isFunction(fn)) return;
  let timeout: NodeJS.Timeout;
  return (...arg: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...arg);
    }, wait);
  };
}

function debounce2(fn: any, wait: number = 1000) {
  if (!isFunction(fn)) return;
  let timeout: NodeJS.Timeout | undefined;
  return (...arg: any) => {
    if (timeout) clearTimeout(timeout);
    const leading: boolean = !timeout;
    timeout = setTimeout(() => {
      timeout = undefined;
    }, wait);
    if (leading) {
      fn(...arg);
    }
  };
}
