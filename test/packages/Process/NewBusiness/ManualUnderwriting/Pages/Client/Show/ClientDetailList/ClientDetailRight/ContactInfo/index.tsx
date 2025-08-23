import React from 'react';
import Section from './Section';
import Table from './Table';

export default (props: any) => {
  return (
    <>
      <Section {...props} />
      <Table {...props} />
    </>
  );
};
