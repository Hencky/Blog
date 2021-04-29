import React, { useState, useCallback } from 'react';
import { Button, Select, InputNumber, Space } from 'antd';

import produce, { applyPatches, enablePatches, Patch } from 'immer';

enablePatches();

let unDoList: Patch[][] = [];
let reDoList: Patch[][] = [];

type Operator = '+' | '-' | '*' | '/';

type Value = {
  x: number;
  y: number;
  operator: Operator;
};

interface RevokeProps {
  limit?: number;
}

const Revoke: React.FC<RevokeProps> = props => {
  const { limit = 20 } = props;

  const [value, setValue] = useState<Value>({
    x: 0,
    y: 0,
    operator: '+',
  });
  const [obj, setObj] = useState<Value & { result: number }>({
    x: 0,
    y: 0,
    operator: '+',
    result: 0,
  });
  const [idx, setIdx] = useState(-1);
  const [isChanged, setChanged] = useState(false);

  const op = useCallback(
    (val1: number, val2: number, ope: Operator): number => {
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
        (r: Patch[], u: Patch[]) => {
          if (!isChanged) return;
          unDoList = unDoList.slice(0, idx + 1);
          reDoList = reDoList.slice(0, idx + 1);
          unDoList.push(u);
          reDoList.push(r);
          setChanged(false);
          if (unDoList.length > limit) {
            unDoList.shift();
            reDoList.shift();
          } else {
            setIdx(idx + 1);
          }
        },
      );

      return result.result;
    },
    [value, idx],
  );

  const onRun = useCallback(() => {
    setObj({
      x: value.x,
      y: value.y,
      operator: value.operator,
      result: op(value.x, value.y, value.operator),
    });
  }, [value]);

  const onValueChange = useCallback(
    (val: number | string, type: 'x' | 'y' | 'operator') => {
      setChanged(true);
      setValue({
        ...value,
        [type]: val,
      });
    },
    [value],
  );

  const onClick = useCallback(
    (type: 'redo' | 'undo') => {
      const isRedo = type === 'redo';
      const op = isRedo ? reDoList[idx + 1] : unDoList[idx];
      if (!op) return;

      setIdx(isRedo ? idx + 1 : idx - 1);
      const resultObj = applyPatches(obj, op);
      setObj(resultObj);
      setValue(resultObj);
    },
    [obj],
  );

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

      <div style={{ marginTop: 16 }}>
        <Space>
          <Button disabled={idx === -1} onClick={() => onClick('undo')}>
            UnDo
          </Button>
          <Button disabled={reDoList.length === idx + 1} onClick={() => onClick('redo')}>
            Redo
          </Button>
        </Space>
      </div>

      <div>JSON</div>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </div>
  );
};

export default Revoke;
