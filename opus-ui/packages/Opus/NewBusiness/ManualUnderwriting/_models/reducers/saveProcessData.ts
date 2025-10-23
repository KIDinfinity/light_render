import { produce } from 'immer';
import lodash from 'lodash';

import { createNormalizeData } from 'opus/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import CustomerRole from 'opus/NewBusiness/Enum/CustomerRole';

export default (state: any, action: any) => {
  let businessData = lodash.get(action, 'payload.businessData', {});
  //解决排序start
  const clientInfoList = businessData?.clientInfoList?.sort((a, b) => {
    return a.syncSuccessfully - b.syncSuccessfully;
  });
  const dealSuccessfulEqualNull = [];
  clientInfoList?.forEach((item) => {
    if (/^[0-9]$/.test(item?.syncSuccessfully)) {
      dealSuccessfulEqualNull.push(item);
    } else {
      dealSuccessfulEqualNull.unshift(item);
    }
  });
  businessData = { ...businessData };
  businessData.clientInfoList = dealSuccessfulEqualNull;
  //解决排序end
  const taskDetail = lodash.get(action, 'payload.taskDetail', {});

  const nextState = produce(state, (draftState: any) => {
    const { processData, entities } = createNormalizeData(businessData);
    draftState.processData = processData;
    draftState.entities = entities;

    // client data transform
    const list = lodash.filter(processData.clientInfoList, (id) => {
      const roleList = lodash.get(entities, `clientMap.${id}.personalInfo.customerRole`, []);
      return !lodash.isEqual([CustomerRole.AuthorisedSignatory], roleList);
    });
    draftState.authorisedSignatoryClientId = lodash.difference(
      lodash.sortBy(processData.clientInfoList),
      lodash.sortBy(list)
    )[0];
    if (!lodash.isEmpty(taskDetail)) {
      draftState.taskDetail = taskDetail;
    }
    draftState.initState = true;
  });
  return {
    ...nextState,
  };
};
