import { useMemo, useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useExistEntityPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useExistEntityPolicyOwner';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const list = useGetClientDetailList();
  const existEntityPolicyOwner = useExistEntityPolicyOwner();
  const clientIdList = lodash.map(list, (client) => client.id);
  const currentClientsIsInsured = useMemo(() => {
    const relationOfProposer = lodash
      .chain(list)
      .find((client: any) => {
        return client.id === clientId;
      })
      .get('roleList', [])
      .some((roleItem) => {
        const role = formUtils.queryValue(roleItem.customerRole);
        return role === CustomerRole.Insured && role !== CustomerRole.PolicyOwner;
      })
      .value();
    return formUtils.queryValue(relationOfProposer);
  }, [list, clientId]);
  return useCallback(() => {
    if (currentClientsIsInsured && existEntityPolicyOwner) {
      dispatch({
        type: `${NAMESPACE}/setPlanFieldData`,
        payload: {
          changedFields: {
            purposeOfInsurance: null,
          },
        },
      });
      lodash.forEach(clientIdList, (id: any) => {
        dispatch({
          type: `${NAMESPACE}/changeBasicInfoFields`,
          payload: {
            changedFields: {
              relationOfInsured: null,
            },
            id,
          },
        });
      });
    }
  }, [currentClientsIsInsured, existEntityPolicyOwner, dispatch, clientIdList]);
};
