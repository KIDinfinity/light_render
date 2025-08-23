import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from './activity.config';
import DataLayout from '@/components/DataLayout';
import { cutStr } from '@/utils/utils';
import styles from './index.less';

export default () => {
  const caseInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.caseInfo) || {};

  console.log('caseInfo', caseInfo);

  const { DataItem } = DataLayout;

  return (
    <div className={styles.casseWrap}>
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
