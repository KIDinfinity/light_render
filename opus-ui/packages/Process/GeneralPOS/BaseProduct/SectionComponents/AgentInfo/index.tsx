import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import Item from './Item';
import classNames from 'classnames';
import { tenant } from '@/components/Tenant';
import ShowButton from 'process/GeneralPOS/common/AgentQuestionnaire/ShowButton';
import AgentQuestionnaire from 'process/GeneralPOS/common/AgentQuestionnaire';

const AgentInfo = () => {
  const policyInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};

  const { caseCategory, businessNo } =
    useSelector(({ processTask }: any) => processTask.getTask) || {};

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const OtherRoleList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientRole?.OtherRoleList
    ) || [];

  const roleList = ['SA'];

  const info =
    lodash.find(policyInfo.policyAgentList, (item) => item.policyId === mainPolicyId) || {};

  return (
    <div className={styles.agentInfo}>
      <div
        className={classNames(styles.nameRole, {
          [styles.autoSpace]: OtherRoleList?.length > 1 && tenant.isTH(),
          [styles.fixSpace]: OtherRoleList?.length <= 1,
        })}
      >
        <div>
          <div className={styles.userName}>
            {[info.firstName, info.middleName, info.surname].filter((item) => item).join(' ')}
          </div>
          <div className={styles.roleList}>
            {lodash
              .chain(roleList)
              .map((roleItem: any) => (
                <div className={styles.role} key={roleItem}>
                  <div className={styles.flag} />
                  {formatMessageApi({ Dropdown_SRV_AgentType: roleItem })}
                </div>
              ))
              .value()}
          </div>
        </div>
        <ShowButton />
      </div>
      <div className={styles.splitLine} />
      <div className={styles.info}>
        <Item info={info} />
      </div>
      <AgentQuestionnaire caseCategory={caseCategory} businessNo={businessNo} agentInfo={info} />
    </div>
  );
};

export default AgentInfo;
