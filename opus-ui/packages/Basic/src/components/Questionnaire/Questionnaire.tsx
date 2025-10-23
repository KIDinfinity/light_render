import React from 'react';
import useSetQuestionnaire from 'basic/components/Questionnaire/_hooks/useSetQuestionnaire';
import useSetSelectedClient from 'basic/components/Questionnaire/_hooks/useSetSelectedClient';
import useSetActionConfig from 'basic/components/Questionnaire/_hooks/useSetActionConfig';
import Layout from './Layout';
import Clients from './Clients';
import Sections from './Sections';
import Actions from './Actions';
import Provider from './Context/Provider';

const Questionnaire = ({ questionnaireData, selectedClientId, sectionHash, actionConfig }: any) => {
  useSetQuestionnaire({ questionnaireData });
  useSetSelectedClient({ selectedClientId, sectionHash });
  useSetActionConfig({
    actionConfig,
  });
  return (
    <Layout>
      <Actions />
      <Clients />
      <Sections />
    </Layout>
  );
};

export default (props: any) => {
  return (
    <Provider>
      <Questionnaire {...props} />
    </Provider>
  );
};
