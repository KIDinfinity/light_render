import React from 'react';
import Layout from './Layout';
import LoadingItems from './LoadingItems';
import ProductSelect from './Loading-Popup';
import AddButton from './AddButton';

export default () => {
  return (
    <Layout>
      <ProductSelect />
      <LoadingItems />
      <AddButton />
    </Layout>
  );
};
