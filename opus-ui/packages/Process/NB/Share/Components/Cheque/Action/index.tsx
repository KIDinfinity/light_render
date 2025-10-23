import React from 'react';
import Layout from './Layout';
import Refresh from './Refresh';
import Verify from './Verify';
import Edit from './Edit';
import Save from './Save';

const Action = ({useHandleRefreshCallback}: any) => {
  return (
    <Layout>
      <Edit />
      <Save />
      <Refresh />
      <Verify useHandleRefreshCallback={useHandleRefreshCallback}/>
    </Layout>
  );
};
Action.displayName = 'Action';

export default Action;
