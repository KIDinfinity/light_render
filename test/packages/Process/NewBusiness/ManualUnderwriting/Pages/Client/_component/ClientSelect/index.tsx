import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ClientName from '../ClientName';
import styles from './index.less';

export default ({ clientId, handleSelect, readOnly = true }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );
  const customerRoleEdit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );

  return (
    <div onClick={handleSelect} className={styles.clientSelectItem}>
      <div className={styles.name}>
        <ClientName clientId={clientId} readOnly={readOnly} />
      </div>
      <div className={styles.roles}>
        {lodash.map(
          formUtils.queryValue(readOnly ? customerRole : customerRoleEdit),
          (role: any, index) => {
            return (
              <div key={`${role}_${index}`} className={styles.role}>
                {formatMessageApi({
                  Dropdown_CLM_CustomerRole: role,
                })}
                <JointLite clientId={clientId} readOnly={readOnly} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

function JointLite({ clientId, readOnly }: any) {
  const isJointLifeClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities.clientMap?.[clientId]?.isJointLifeClient,
    shallowEqual
  );
  const isJointLifeClientEdit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData?.entities?.clientMap?.[clientId]?.isJointLifeClient,
    shallowEqual
  );
  const isShow = readOnly ? isJointLifeClient : isJointLifeClientEdit;

  return isShow ? (
    <span className={styles.jointLifeRole}>
      (
      {formatMessageApi({
        Dropdown_POL_InsuredRole: 'UI',
      })}
      )
    </span>
  ) : null;
}
