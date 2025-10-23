import { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const getOptionName = (optionName: string) => {
  const mapping = {
    initial: 'Initial Version',
    increasePrem: formatMessageApi({
      Label_BIZ_policy: 'increasePrem',
    }),
    reduceSA: formatMessageApi({
      Label_BIZ_policy: 'reduceSA',
    }),
    prolongTerm: formatMessageApi({
      Label_BIZ_policy: 'prolongTerm',
    }),
    RT: formatMessageApi({
      Label_BIZ_policy: 'RT',
    }),
    'increasePrem-RT': formatMessageApi({
      Label_BIZ_policy: 'increasePrem-RT'
    })
  };

  const keys = lodash
    .chain(optionName)
    .split('&')
    .filter((key) => !!key)
    .value();
  return lodash
    .chain(keys)
    .map((key) => {
      return mapping[key] || formatMessageApi({
        Label_BIZ_policy: key
      });
    })
    .join(' & ')
    .value();
}

export default ({ optionName }: any) => {
  return useMemo(() => {
    return getOptionName(optionName);
  }, [optionName]);
};
