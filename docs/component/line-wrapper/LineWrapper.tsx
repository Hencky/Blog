import React from 'react';

import './index.less';

const prefixCls = 'component-line-wrapper';

interface LineItemProps {
  index: number;
  length: number;
  gutter?: number;
}

interface LineProps {
  title: string;
  children: React.ReactElement[];
  gutter?: number;
}

const LineItem: React.FC<LineItemProps> = (props) => {
  const { children, length, gutter = 0, index, ...restProps } = props;

  if (length <= 1) {
    return <div>{children}</div>;
  }

  const isLast = length - 1 === index;

  return (
    <div className={`${prefixCls}-item`} style={{ marginBottom: !isLast ? gutter : 0 }}>
      <div className={`${prefixCls}-item-line`}>
        {index > 0 && <div className={`${prefixCls}-item-line-top`} />}
        <div className={`${prefixCls}-item-line-left`} />
        {!isLast && (
          <div
            className={`${prefixCls}-item-line-bottom`}
            style={{ height: `calc(50% + ${gutter}px)` }}
          />
        )}
      </div>
      <div {...restProps}>{children}</div>
    </div>
  );
};

const LineWrapper: React.FC<LineProps> = (props) => {
  const { children, title, gutter } = props;

  const renderLineItem = React.useCallback(() => {
    return children.map((item, index, { length }) => {
      return React.createElement(LineItem, { index, length, gutter, key: index }, item);
    });
  }, [children]);

  return (
    <div className={prefixCls}>
      {children.length > 1 && <div className={`${prefixCls}-title`}>{title}</div>}
      {renderLineItem()}
    </div>
  );
};

export default LineWrapper;