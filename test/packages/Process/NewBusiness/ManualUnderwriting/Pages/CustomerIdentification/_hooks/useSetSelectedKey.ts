import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Selection } from '../Enum';
import { NAMESPACE } from '../activity.config';
import { useGetPolicyOwnerId } from './';

export default ({ setSelectedKey, id }: any) => {
  const dispatch = useDispatch();
  const policyList = useSelector(
    (state: any) => state[NAMESPACE].claimProcessData?.policyList,
    shallowEqual
  );
  const currentPolicy = lodash
    .chain(policyList)
    .find((policy: any) => policy?.id === id)
    .value();
  const policyOwnerId = useGetPolicyOwnerId({ policy: currentPolicy });
  const clientInfoList = lodash.get(currentPolicy, 'clientInfoList', []);

  const selected = useMemo(() => {
    const selectedSet = new Set();
    let policyOwnerSelect: any;
    lodash.forEach(clientInfoList, (client) => {
      if (client?.newClientFlag === 'Y') {
        selectedSet.add(client?.id);
        policyOwnerSelect = client?.id;
      }
      if (client?.newClientFlag === 'N') {
        const selectedIndentificationItem = lodash
          .chain(client)
          .get('identificationList', [])
          .find((item: any) => item.selection === Selection.Y)
          .value();
        if (selectedIndentificationItem) {
          selectedSet.add(selectedIndentificationItem?.id);
          policyOwnerSelect = selectedIndentificationItem?.id;
        }
      }
      if (client?.id === policyOwnerId) {
        dispatch({
          type: `${NAMESPACE}/updatePolicyOwnerSelect`,
          payload: {
            id: policyOwnerSelect,
          },
        });
      }
    });
    return Array.from(selectedSet);
  }, [policyOwnerId, clientInfoList, dispatch]);
  useEffect(() => {
    setSelectedKey(selected);
  }, [selected, setSelectedKey]);
};
