import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import ExpandableCard from 'process/NB/ManualUnderwriting/_components/ExpandableCard';
import styles from './index.less';
import Show from './_components/Show';
import { Region } from '@/components/Tenant/constants';
import { tenant } from '@/components/Tenant';
import React from 'react';

const VoiceRecord = () => {
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

VoiceRecord.displayName = 'voiceRecord';

export default VoiceRecord;
