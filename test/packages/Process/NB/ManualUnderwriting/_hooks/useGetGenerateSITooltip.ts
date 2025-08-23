import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import GenerateSIStatus from 'process/NB/ManualUnderwriting/Enum/GenerateSIStatus';

export default () => {
  const generateSIStatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.generateSIStatus,
    shallowEqual
  );
  return useMemo(() => {
    switch (generateSIStatus) {
      case GenerateSIStatus.InProgress:
        return formatMessageApi({
          Label_COM_WarningMessage: 'MSG_000681',
        });
      case GenerateSIStatus.Init:
      case GenerateSIStatus.PermiumChanged:
      default:
        return formatMessageApi({
          Label_COM_WarningMessage: 'MSG_000691',
        });
    }
  }, [generateSIStatus]);
};
