import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import ProcessStatus from 'navigator/enum/ProcessStatus';

export default ({ response }: any) => {
  const infoData = useSelector((state: any) => state.workspaceCases.infoData, shallowEqual);
  return useMemo(() => {
    return (
      lodash.chain(infoData).get('fullStp').isEqual('Y').value() ||
      [
        ProcessStatus.cancelled,
        ProcessStatus.completed,
        ProcessStatus.withdrawal,
        ProcessStatus.NTU,
      ].includes(lodash.chain(response).get('resultData.status').value())
    );
  }, [response, infoData]);
};
