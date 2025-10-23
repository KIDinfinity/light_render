import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import useGetFullNameByClientInfo from 'process/NB/CustomerIdentification/_hooks/useGetFullNameByClientInfo';
import { clientIsSelected } from 'process/NB/CustomerIdentification/Utils';
import CustomerRoleList from 'process/NB/CustomerIdentification/CustomerRoleList';
import CustomerType from 'process/NB/CustomerIdentification/CustomerType';
import styles from './index.less';

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
          <CustomerType customerType={item?.customerType} />
        </div>
      </div>
    </>
  );
};

Profile.displayName = 'profile';

export default Profile;
