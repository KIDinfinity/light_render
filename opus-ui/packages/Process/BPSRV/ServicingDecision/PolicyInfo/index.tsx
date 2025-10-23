import React from 'react';
import { FormAntCard } from 'basic/components/Form';
import { Input, Icon } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import Item from './Item';
import { SectionTitle } from './Section';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

let prevAbortController: any = null;

const PolicyInfo = ({ servicingHistory }) => {
  const dispatch = useDispatch();

  const editableRefresh = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const editable = false;
  const isLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/policyInfoRemote`]
  );

  const refreshLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/policyInfoRefresh`]
  );

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const getPolicyNo = async (policyNo: any) => {
    const abortController = new AbortController();
    if (prevAbortController) {
      prevAbortController.abort();
    }
    prevAbortController = abortController;

    await dispatch({
      type: `${NAMESPACE}/policyInfoRemote`,
      signal: abortController.signal,
      payload: {
        policyNo,
      },
    });
  };

  const setPolicyNo = (policyNo: any) => {
    dispatch({
      type: `${NAMESPACE}/policyIdUpdate`,
      payload: {
        policyId: policyNo,
      },
    });
  };

  const refreshPolicyInfo = () => {
    if (refreshLoading) {
      return;
    }
    dispatch({
      type: `${NAMESPACE}/policyInfoRefresh`,
    });
  };

  return (
    <div className={styles.policyInfo}>
      <FormAntCard
        title={
          <SectionTitle
            suffix={
              <div className={styles.policyIdBox}>
                <Input
                  allowClear
                  value={mainPolicyId}
                  onChange={(e) => {
                    setPolicyNo(e.target?.value);
                  }}
                  onBlur={(e) => {
                    setPolicyNo(lodash.trim(e.target?.value));
                    getPolicyNo(lodash.trim(e.target?.value));
                  }}
                  disabled={!editable}
                  suffix={isLoading && <Icon type="loading" />}
                />
                {tenant.region() === Region.ID && editableRefresh && !servicingHistory && (
                  <Icon
                    type="redo"
                    className={styles.refresh}
                    onClick={refreshPolicyInfo}
                    spin={refreshLoading}
                  />
                )}
              </div>
            }
          />
        }
      >
        <Item />
      </FormAntCard>
    </div>
  );
};

export default PolicyInfo;
