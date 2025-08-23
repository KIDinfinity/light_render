import React from 'react';
import Layout from './Layout';
import Description from './Description';
import Answers from './Answers';

const Selection = ({ question }: any) => {
  return (
    <Layout>
      <Description description={question?.text} />
      <Answers options={question?.optionsList} answers={question?.answer} />
    </Layout>
  );
};

export default Selection;
