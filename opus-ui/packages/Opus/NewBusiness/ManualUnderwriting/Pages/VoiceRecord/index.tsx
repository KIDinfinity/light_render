import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import ExpandableCard from 'opus/NewBusiness/ManualUnderwriting/_components/ExpandableCard';
import React from 'react';
import styles from './index.less';
import Show from './_components/Show';
import { Region } from '@/components/Tenant/constants';
import { tenant } from '@/components/Tenant';

export default () => {
  const voiceRecordSectionData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData.policyList?.[0]?.voiceRecord
  );
  const regionCode = tenant.region();
  return regionCode == Region.VN ? (
    <ExpandableCard
      contentClassName={styles.wrap}
      title={formatMessageApi({
        Label_BIZ_Policy: 'VoiceRecord',
      })}
    >
      <Show data={voiceRecordSectionData} />
    </ExpandableCard>
  ) : null;
};
