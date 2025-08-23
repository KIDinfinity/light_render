import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Icon } from 'antd';
import PolicynoItem from './PolicynoItem';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import styles from './index.less';

export default ({ linkedPolicyForms, setLinkedPolicyForms }: any) => {
  const dispatch = useDispatch();
  const policyNoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.policyNoList
  );
  const deleteLinkedPolicy = ({ policyNoIndex }: any) => {
    dispatch({
      type: `${NAMESPACE}/deleteLinkedPolicy`,
      payload: {
        policyNoIndex,
      },
    });
  };
  return (
    <>
      {lodash.map(policyNoList, (policyNo, policyNoIndex) => (
        <div className={styles.PolicynoItem}>
          <PolicynoItem
            policyNo={policyNo}
            policyNoIndex={policyNoIndex}
            linkedPolicyForms={linkedPolicyForms}
            setLinkedPolicyForms={setLinkedPolicyForms}
          />
          <div className={styles.icon} onClick={() => deleteLinkedPolicy({ policyNoIndex })}>
            <Icon type="close" />
          </div>
        </div>
      ))}
      <div className={styles.AddPolicynoItem}>
        <PolicynoItem isLast={true} />
      </div>
    </>
  );
};
