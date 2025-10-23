import React from 'react';
import LeftBlock from './LeftBlock';
import RightBlock from './RightBlock';
import Layout from './Layout';

const Header = () => {
  return (
    <>
      <Layout>
        <LeftBlock />
        <RightBlock />
      </Layout>
    </>
  );
};

Header.displayName = 'Header';

export default Header;
