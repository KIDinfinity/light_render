import React from 'react';
import Layout from './Layout';
import Summary from './Summary';
import MaxPerLife from './MaxPerLife';
import TSAR from './TSAR';

export default ({ roleDataItem }: any) => {
  return (
    <Layout>
      <Summary summary={roleDataItem?.summary} role={roleDataItem.role} />
      <TSAR tsarCategoryData={roleDataItem?.tsarCategoryData} />
      <MaxPerLife maxPerLifeData={roleDataItem?.maxPerLifeData} />
    </Layout>
  );
};
