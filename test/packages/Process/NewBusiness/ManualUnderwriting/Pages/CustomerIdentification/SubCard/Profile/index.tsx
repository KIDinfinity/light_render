import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { useGetFullNameByClientInfo } from '../../_hooks';
import { clientIsSelected } from '../../Utils';
import CustomerRoleList from '../../CustomerRoleList';
import CustomerType from '../../CustomerType';
import styles from './index.less';
import useGetCustomerType from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCustomerType';

const Profile = ({ item }: any) => {
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const getCleintName = useGetFullNameByClientInfo();
  return (
    <>
      <div className={styles.account}>
        <div className={styles.info}>
          <div className={styles.userName}>
            <span className={styles.errorToolTip}>
              {submited && clientIsSelected(item) && (
                <ErrorTooltipManual
                  // @ts-ignore
                  manualErrorMessage={
                    <>
                      <p>
                        {formatMessageApi(
                          { Label_COM_WarningMessage: 'MSG_000528' },
                          getCleintName({ clientInfo: item })
                        )}
                      </p>
                    </>
                  }
                />
              )}
            </span>
            <Ellipsis lines={2} tooltip forceTooltip>
              <span>{getCleintName({ clientInfo: item })}</span>
            </Ellipsis>
          </div>
          <CustomerRoleList roleList={item?.roleList} />
          <CustomerType customerType={useGetCustomerType(item)} />
        </div>
      </div>
    </>
  );
};

Profile.displayName = 'profile';

export default Profile;
