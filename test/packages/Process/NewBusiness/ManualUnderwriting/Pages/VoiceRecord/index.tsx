import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';
import React from 'react';
import styles from './index.less';
import Show from './_components/Show';
import { Region } from '@/components/Tenant/constants';
import { tenant } from '@/components/Tenant';

export default () => {
  const voiceRecord = useSelector(
    ({ [NAMESPACE]: modelNameSpace }: any) => modelNameSpace.voiceRecord
  );

  const regionCode = tenant.region();

  return regionCode == Region.VN ? (
    <ExpandableCard
      contentClassName={styles.wrap}
      title={formatMessageApi({
        Label_BIZ_Policy: 'VoiceRecord',
      })}
    >
      <Show data={voiceRecord} />
    </ExpandableCard>
  ) : null;
};
