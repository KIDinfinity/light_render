import React from 'react';
import Layout from './Layout';
import Dropdown from './Dropdown';
import SendButton from './SendButton';

export default () => {
  return (
    <Layout>
      <Dropdown />
      <SendButton />
    </Layout>
  );
};
