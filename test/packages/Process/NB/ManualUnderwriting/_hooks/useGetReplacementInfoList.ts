import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useHandleGetReplacementInfoDefaultClientName from 'process/NB/ManualUnderwriting/_hooks/useHandleGetReplacementInfoDefaultClientName';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const clientNameDicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientNameDicts,
    shallowEqual
  );
  const defaultDicts = useHandleGetReplacementInfoDefaultClientName({
    dicts: clientNameDicts,
  });
  const applicationNo = lodash.get(businessData, 'applicationNo');
  const ownReplacementInfoList = lodash.get(businessData, 'policyList[0].replacementInfoList');

  return useMemo(() => {
    const newReplacementInfoList = lodash.map(ownReplacementInfoList, (item: any) => {
      const clientName = lodash.find(
        defaultDicts,
        (client: any) => client?.dictCode === item?.insuredSeqNo
      );
      return {
        ...item,
        clientName: clientName?.dictName,
      };
    });
    return newReplacementInfoList;
  }, [applicationNo, clientNameDicts, ownReplacementInfoList]);
};
