import React, { useEffect } from 'react';
import CustomerInfo from '../../SectionComponents/CustomerInfo';
import AgentInfo from '../../SectionComponents/AgentInfo';
import InsuredInfo from '../../SectionComponents/InsuredInfo';
import PayorInfo from '../../SectionComponents/PayorInfo';
import LoopBox from './LoopBox';
import styles from './index.less';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import classname from 'classnames';

const roleMap = {
  SA: <AgentInfo />,
  CUS005: <PayorInfo />,
  CUS001: <InsuredInfo />,
};

export default function Index() {
  const dispatch = useDispatch();
  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const OtherRoleList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientRole?.OtherRoleList
    ) || [];

  const selectRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.selectRole
  );

  const taskStatus = useSelector(({ processTask }: any) => processTask?.getTask?.taskStatus);

  const hasOtherRole = !lodash.isEmpty(OtherRoleList) && OtherRoleList?.length > 1;

  useEffect(() => {
    if (!lodash.isEmpty(policyInfo)) {
      dispatch({
        type: `${NAMESPACE}/clientRoleInit`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policyInfo]);

  useEffect(() => {
    if (['todo', 'pending'].includes(taskStatus)) {
      dispatch({
        type: `${NAMESPACE}/getAge`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskStatus]);

  const changeRoleHandle = (role: any) => {
    dispatch({
      type: `${NAMESPACE}/setSelectRole`,
      payload: {
        selectRole: role,
      },
    });
  };

  return (
    <div className={styles.userInfo}>
      <div
        className={classname({
          [styles.fix]: hasOtherRole,
          [styles.customerRole]: !hasOtherRole,
        })}
      >
        <CustomerInfo />
      </div>
      <div
        className={classname({
          [styles.fix]: hasOtherRole,
          [styles.otherRole]: !hasOtherRole,
        })}
      >
        {roleMap[selectRole]}
      </div>
      {hasOtherRole && (
        <div className={styles.loopBox}>
          <div className={styles.loopItem}>
            {OtherRoleList.map((item: any) => {
              if (selectRole !== item.role) {
                const roles = item.otherRoles ? [item.role, ...item.otherRoles] : [item.role];

                return (
                  <div
                    className={styles.showName}
                    onClick={() => {
                      changeRoleHandle(item.role);
                    }}
                  >
                    <LoopBox name={item.name} roleList={roles} />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
