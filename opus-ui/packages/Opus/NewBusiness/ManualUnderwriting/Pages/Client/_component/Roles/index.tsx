import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';

const Roles = ({ clientId, readOnly = true }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );

  const modalCustomerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );

  const _role = formUtils.queryValue(readOnly ? customerRole : modalCustomerRole);

  return (
    <div className={styles.roles}>
      {lodash.map(_role, (role: any) => {
        return (
          <div className={styles.role} key={role}>
            {formatMessageApi({
              Dropdown_Opus_CustomerRole: role,
            })}
            <JointLite clientId={clientId} />
          </div>
        );
      })}
    </div>
  );
};

function JointLite({ clientId }: any) {
  const isJointLifeClient = useSelector(({ [NAMESPACE]: namespacemodel }: any) => {
    return namespacemodel.processData.coverageList?.some((coverage: any) =>
      coverage?.coverageInsuredList?.some(
        (coverageInsured: any) =>
          Number(coverageInsured?.unionInsuredSeqNum) > 1 && coverageInsured?.clientId === clientId
      )
    );
  });

  return isJointLifeClient ? (
    <span className={styles.jointLifeRole}>
      (
      {formatMessageApi({
        Dropdown_POL_InsuredRole: 'UI',
      })}
      )
    </span>
  ) : null;
}

Roles.displayName = 'roles';

export default Roles;
