import React from 'react';
import Layout from './Layout';
import Process from './Process';
import Container from './Container';
import CaseContainer from 'basic/components/CaseContainer';

export default () => {
  return (
    <CaseContainer>
      <Container>
        <Layout>
          <Process />
        </Layout>
      </Container>
    </CaseContainer>
  );
};
