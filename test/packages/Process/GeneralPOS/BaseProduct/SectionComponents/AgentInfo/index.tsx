import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from 'process/GeneralPOS/BaseProduct/page/UserInfo/roleBox.less';
import Item from './Item';
import classNames from 'classnames';
import ShowButton from 'process/GeneralPOS/common/AgentQuestionnaire/ShowButton';
import AgentQuestionnaire from 'process/GeneralPOS/common/AgentQuestionnaire';

const AgentInfo = ({ id }: { id: string }) => {
  const policyInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};
  const { caseCategory: caseCategoryByGetTask, inquiryBusinessNo: inquiryBusinessNoByGetTask } =
    useSelector(({ processTask }: any) => processTask.getTask) || {};

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const inquiryBusinessNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.inquiryBusinessNo
  );
  const inquirySrvNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.inquirySrvNo
  );
  const caseCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.caseCategory
  );

  const existInquiryBusinessNo = inquiryBusinessNo || inquiryBusinessNoByGetTask || inquirySrvNo;
  const existCaseCategory = caseCategory || caseCategoryByGetTask;

  const { name, roles } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortRoleByClientId?.[id]
    ) || {};

  const info =
    lodash.find(policyInfo.policyAgentList, (item) => item.policyId === mainPolicyId) || {};

  return (
    <div className={classNames(styles.roleInfo, 'pos-agent-info')}>
      <div
        className={classNames(styles.nameRole, {
          [styles.fixSpace]: true,
        })}
      >
        <div>
          <div className={classNames(styles.userName)}>{name}</div>
          <div className={classNames(styles.roleList)}>
            {lodash
              .chain(roles)
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
      <AgentQuestionnaire
        caseCategory={existCaseCategory}
        inquiryBusinessNo={existInquiryBusinessNo}
        agentInfo={info}
      />
    </div>
  );
};

export default AgentInfo;
