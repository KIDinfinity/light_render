import React from 'react';
import { useSelector } from 'dva';
import { useParams } from 'umi';

import { QuestionnaireModal } from 'basic/components/QuestionnaireV2';

import useLoadUWMELinkRule from '../_hooks/useLoadUWMELinkRule';
import ClientDetailList from './ClientDetailList';
import ClientSelectList from './ClientSelectList';
import styles from '../index.less';

const NbQuestionnaireModal = () => {
  const { businessNo, caseCategory, inquiryBusinessNo } = useSelector(
    ({ processTask }: any) => processTask.getTask || {}
  );
  const businessNoProps = businessNo || useParams()?.businessNo || inquiryBusinessNo;

  return <QuestionnaireModal businessNo={businessNoProps} caseCategory={caseCategory} isNB />;
};

export default () => {
  useLoadUWMELinkRule();
  return (
    <div className={styles.clientSection}>
      <ClientDetailList />
      <ClientSelectList />
      <NbQuestionnaireModal />
    </div>
  );
};
