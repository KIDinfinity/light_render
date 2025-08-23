import React from 'react';
import Layout from './Layout';
import ProductSelect from './DPRemark-Popup';
import DPRemarkItems from './DPRemarkItems';
import AddButton from './AddButton';

export default () => {
  return (
    <Layout>
      <ProductSelect />
      <DPRemarkItems />
      <AddButton />
    </Layout>
  );
};
