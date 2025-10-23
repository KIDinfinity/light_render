import React from 'react';
import { useSelector } from 'dva';
import { Spin } from 'antd';
import Layout from './Layout';
import Clients from './Clients';
import Questions from './Questions';
import QuestionnaireTitles from './QuestionnaireTitles';
import Actions from './Actions';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default () => {
  const NAMESPACE = useGetNamespace();

  const loading = useSelector(
    (state: any) => state.loading.effects[`${NAMESPACE}/getAllQuestionConfig`]
  );

  const disabled = true;

  return (
    <>
      {loading ? (
        <div
          style={{
            width: '1000px',
            height: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Layout>
          <Actions disabled={disabled} />
          <QuestionnaireTitles />
          <Clients />
          <Questions disabled={disabled} />
        </Layout>
      )}
    </>
  );
};
