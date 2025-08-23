import { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ config, displayWarning }: any) => {
  return useMemo(() => {
    return displayWarning
      ? lodash.map(config, (item: any) => {
          if (item.field === 'chequeNo') {
            return {
              ...item,
              showWarning: true,
              warningMessage: formatMessageApi({
                Label_COM_WarningMessage: 'MSG_001259',
              }),
            };
          }
          return item;
        })
      : config;
  }, [config, displayWarning]);
};
