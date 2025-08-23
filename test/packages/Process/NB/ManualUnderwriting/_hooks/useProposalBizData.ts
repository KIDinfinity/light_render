import { useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { v4 as uuid }  from 'uuid';

const getBusinessData = (businessData: any) => {
  const policyList = lodash.get(businessData, 'policyList', []);
  const newPolicyList = lodash.map(policyList, (item: any) => {
    const clientInfoList = lodash.get(item, 'clientInfoList', []);
    const newClientList = lodash.map(clientInfoList, (clientItem: any) => {
      const crtInfoList = lodash.get(clientItem, 'crtInfoList', []);
      if (!lodash.isArray(crtInfoList) || crtInfoList?.length === 0) {
        return {
          ...clientItem,
          crtInfoList: [
            {
              id: uuid(),
            },
          ],
        };
      }
      return clientItem;
    });
    return {
      ...item,
      clientInfoList: newClientList,
    };
  });
  return {
    ...businessData,
    policyList: newPolicyList,
  };
};

export default ({ businessData }: any) => {
  const dispatch = useDispatch();

  const data = useMemo(() => {
    return getBusinessData(businessData);
  }, [businessData]);

  useEffect(() => {
    dispatch({
      type: 'manualUnderwriting/saveBizData',
      payload: {
        businessData: data,
      },
    });
    return () => {
      dispatch({
        type: 'manualUnderwriting/clearBizData',
      });
    };
  }, []);
};
