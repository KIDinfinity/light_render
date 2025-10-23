import React from 'react';
import { useSelector } from 'dva';
import { cutStr } from '@/utils/utils';
import Title from 'bpm/pages/OWBEntrance/Header/Title';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const CaseInformation = () => {
  const { DataItem } = DataLayout;
  const caseInfo = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.caseInfo);

  return (
    <div className={styles.caseInfoWrap}>
      <Title title="JSON File" status="" urgent={false} slaTime={0} />
      <DataLayout className={styles.caseInfo} rowProps={{ align: 'middle' }}>
        <DataItem title="app.navigator.task-detail-of-data-capture.label.case-no">
          {caseInfo?.caseNo}
        </DataItem>
        <DataItem title="app.navigator.task-detail-of-data-capture.label.case-category">
          {cutStr(formatMessageApi({ Label_BPM_CaseCategory: caseInfo?.caseCategory }), 100)}
        </DataItem>
        <DataItem
          title={formatMessageApi({
            Label_COM_General: 'BusinessNo',
          })}
        >
          {caseInfo?.businessNo}
        </DataItem>
      </DataLayout>
    </div>
  );
};

export default CaseInformation;
