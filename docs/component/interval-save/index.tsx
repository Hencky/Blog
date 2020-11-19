import React from 'react';
import { Button } from 'antd';
import IntervalSave from './IntervalSave';

export default () => {
  const ref = React.useRef<any>();

  const handleSave = React.useCallback(() => {
    ref.current.handleSave();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={handleSave}>
        保存
      </Button>
      <IntervalSave
        ref={ref}
        getConfig={() => ({ a: 123 })}
        request={Promise.resolve()}
        error={false}
        delay={2000}
      />
    </div>
  );
};
