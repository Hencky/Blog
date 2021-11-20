import React, { useEffect } from 'react';

const Wrapper: React.FC = props => {
  useEffect(() => {
    console.log('didmount');
  }, []);

  return <div>{React.cloneElement(props.children, { time: 1 })}</div>;
};

function Demo(props: any) {
  console.log('demo', props);
  return <div>子组件</div>;
}

export default () => {
  return (
    <Wrapper>
      <Demo count={1} />
    </Wrapper>
  );
};
