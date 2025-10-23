import React from 'react';
import Layout from './Layout';
import SectionName from './SectionName';
import Questions from './Questions';

const Section = ({ item }: any) => {
  return (
    <Layout>
      <SectionName sectionName={item?.text} />
      <Questions questions={item?.questionList} />
    </Layout>
  );
};

export default React.memo(Section);
