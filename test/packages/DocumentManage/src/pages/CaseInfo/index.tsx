import type { FunctionComponent } from 'react';
import React from 'react';
import { useSelector } from 'dva';
import DataLayout from '@/components/DataLayout';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { cutStr } from '@/utils/utils';
import type { CaseInfoModel } from '../_dto/model';

import styles from './styles.less';

interface ICaseInfo {
  caseInfo?: CaseInfoModel;
}

const CaseInformation: FunctionComponent<ICaseInfo> = () => {
  const { caseInfo }: ICaseInfo = useSelector(({ documentManagement }: any) => documentManagement);

  const { DataItem } = DataLayout;
  return (
    <div className={styles.caseInfoWrap}>
      <DataLayout className={styles.caseInfo} rowProps={{ align: 'middle' }}>
        <DataItem title="app.navigator.task-detail-of-data-capture.label.case-no">
          {caseInfo?.processInstanceId}
        </DataItem>
        <DataItem title="app.navigator.task-detail-of-data-capture.label.case-category">
          {cutStr(formatMessageApi({ Label_BPM_CaseCategory: caseInfo?.caseCategory }), 100)}
        </DataItem>
        <DataItem
          title={formatMessageApi({
            Label_BIZ_Claim: 'BusinessNo',
          })}
        >
          {caseInfo?.inquiryBusinessNo}
        </DataItem>
      </DataLayout>
    </div>
  );
};

export default CaseInformation;
