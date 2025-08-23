import { useMemo } from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useJudgeCurrentClientHasMobileContact from 'process/NB/ManualUnderwriting/_hooks/useJudgeCurrentClientHasMobileContact';

export default ({ config, fieldConfig, contactSeqNum, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const defaultDicts = getDrowDownList({ config, fieldProps });
  const haveMBContactType = useJudgeCurrentClientHasMobileContact({ id });

  return useMemo(() => {
    return tenant.region({
      [Region.ID]:
        contactSeqNum === 1 || !haveMBContactType
          ? lodash.filter(defaultDicts, (item) => ['MB'].includes(item.dictCode))
          : lodash.filter(defaultDicts, (item) => ['HM', 'OF'].includes(item.dictCode)),
      notMatch: defaultDicts,
    });
  }, [contactSeqNum, defaultDicts]);
};
