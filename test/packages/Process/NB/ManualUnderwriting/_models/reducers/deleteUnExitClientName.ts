import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { businessData } = state;
    const clientInfoList = lodash.get(businessData, 'policyList[0].clientInfoList', []);

    const clientIds = clientInfoList?.reduce((data: any[], { id, roleList: roles }: any) => {
      return lodash.isEmpty(roles?.filter(roleData => !roleData.deleted)) ? data : [...data, id]
    }, [])
    // eslint-disable-next-line no-param-reassign
    draftState.businessData.policyList[0].coverageList = draftState.businessData.policyList[0].coverageList?.map((item: any) =>
    ({
      ...item,
      coverageInsuredList: item?.coverageInsuredList?.map((el: any) => {
        const clientId = formUtils.queryValue(el?.clientId)
        if (clientId && !lodash.includes(clientIds, clientId)) {
          return {
            ...el,
            clientId: null
          }
        }
        return el
      })
    })
    )
  });
  return { ...nextState }
}


