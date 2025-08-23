import { useMemo } from 'react';
import lodash from 'lodash';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';

const hideFieldId = [
  'ctfCountryCode',
  'nationality',
  'customerAge',
  'dateOfBirth',
  'gender',
  'trusteeName',
  'ctfPlace',
];

export default ({ id, config }: any) => {
  const existEntityPolicyOwner = useJudgeIsTargetRelationOfInsured({ id });
  return useMemo(() => {
    if (existEntityPolicyOwner) {
      return lodash
        .chain(config)
        .filter((item: any) => {
          return !lodash.includes(hideFieldId, item.field);
        })
        .value();
    }
    return config;
  }, [existEntityPolicyOwner, config]);
};
