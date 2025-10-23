import { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useGetBasicProductData } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
import AgentType from 'opus/NewBusiness/Enum/AgentType';
import { getFactoringHouseByConditions } from '@/services/owbNbCfgControllerService';

export default (form: any) => {
  const dispatch = useDispatch();
  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.agentList,
    shallowEqual
  );
  const currencyCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.currencyCode,
    shallowEqual
  );
  const submissionChannel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.submissionChannel,
    shallowEqual
  );
  const mainCoverage = useGetBasicProductData();

  return useCallback(
    async (extra: any) => {
      // 调用接口后端匹配factoring house
      const { renewalPayType } = form.getFieldsValue();
      const currentAgent = lodash.find(agentList, (item) => item.agentType === AgentType.Primary);
      const agentChannelCode =
        !!currentAgent && formUtils.queryValue(lodash.get(currentAgent, 'agentChannelCode'));
      const requestParams = {
        agentChannelCode,
        currencyCode,
        mainProductCode: mainCoverage?.coreCode,
        renewalPayType,
        submissionChannel,
        ...extra,
      };

      const response = await getFactoringHouseByConditions(requestParams);

      if (response.success) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveBankInfo',
          payload: {
            changedFields: {
              bankAcctFactoryHouse: response?.resultData?.factoringHouse,
              accType: response?.resultData?.accType,
              bankCode: response?.resultData?.bankCode,
            },
            id: form.getFieldValue('id'),
          },
        });
      }
    },
    [agentList, currencyCode, dispatch, form, mainCoverage, submissionChannel]
  );
};
