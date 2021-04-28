import React, { useState } from 'react';
import { Button, Select, InputNumber, Space } from 'antd';

import produce, { applyPatches, enablePatches } from 'immer';

enablePatches();

// const doList: any[] = [];
let unDoList: any[] = [];
let reDoList: any[] = [];

type Operator = '+' | '-' | '*' | '/';

const Revoke: React.FC = () => {
  const [value, setValue] = useState<{
    x: number;
    y: number;
    operator: Operator;
  }>({
    x: 0,
    y: 0,
    operator: '+',
  });
  const [obj, setObj] = useState<{
    x: number;
    y: number;
    operator: Operator;
    result: number;
  }>({
    x: 0,
    y: 0,
    operator: '+',
    result: 0,
  });
  const [idx, setIdx] = useState(-1);

  const onRun = () => {
    const op = (val1: number, val2: number, ope: Operator): number => {
      const opMap = {
        '+': val1 + val2,
        '-': val1 - val2,
        '*': val1 * val2,
        '/': val1 / val2,
      };

      const result = produce(
        obj,
        draft => {
          draft.x = value.x;
          draft.y = value.y;
          draft.operator = value.operator;
          draft.result = opMap[ope];
        },
        (r: any, u: any) => {
          unDoList = unDoList.slice(0, idx + 1);
          reDoList = reDoList.slice(0, idx + 1);
          setIdx(idx + 1);

          unDoList.push(u);
          reDoList.push(r);
          console.log('xxx', reDoList, unDoList, idx);
        },
      );

      return result.result;
    };

    setObj({
      x: value.x,
      y: value.y,
      operator: value.operator,
      result: op(value.x, value.y, value.operator),
    });
  };

  const onValueChange = (val: number | string, type: 'x' | 'y' | 'operator') => {
    setValue({
      ...value,
      [type]: val,
    });
  };

  const unDo = () => {
    const op = unDoList[idx];
    if (!op) return;

    setIdx(idx - 1);

    const unDoObj = applyPatches(obj, op);

    setObj(unDoObj);
    setValue(unDoObj);

    console.log('xxx', reDoList, unDoList, idx);
  };

  const reDo = () => {
    const op = reDoList[idx + 1];

    if (!op) return;
    setIdx(idx + 1);

    const reDoObj = applyPatches(obj, op);

    setObj(reDoObj);
    setValue(reDoObj);

    console.log('xxx', reDoList, unDoList, idx);
  };

  return (
    <div>
      <Space>
        <InputNumber
          value={value.x}
          onChange={value => onValueChange(value, 'x')}
          style={{ width: 100 }}
          placeholder="输入值1"
        />
        <Select
          style={{ width: 100 }}
          value={value.operator}
          onChange={value => onValueChange(value, 'operator')}
          placeholder="选择运算符"
        >
          <Select.Option value="+">+</Select.Option>
          <Select.Option value="-">-</Select.Option>
          <Select.Option value="*">x</Select.Option>
          <Select.Option value="/">÷</Select.Option>
        </Select>
        <InputNumber
          value={value.y}
          onChange={value => onValueChange(value, 'y')}
          style={{ width: 100 }}
          placeholder="输入值2"
        />
        <Button onClick={onRun}>=</Button>
        <InputNumber style={{ width: 100 }} disabled value={obj.result} />
      </Space>

      {idx > -1 ? <Button onClick={unDo}>UnDo</Button> : null}
      {true ? <Button onClick={reDo}>Redo</Button> : null}
    </div>
  );
};

export default Revoke;
