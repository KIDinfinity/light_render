import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import classnames from 'classnames';
import useGetCompactAddressList from 'process/NB/ManualUnderwriting/_hooks/useGetCompactAddressList';
import useDeleteCurrentAddress from 'process/NB/ManualUnderwriting/_hooks/useDeleteCurrentAddress';
import useCopyCurrentAddressCallback from 'process/NB/ManualUnderwriting/_hooks/useCopyCurrentAddressCallback';
import useAutoAddEmptyAddressInfo from 'process/NB/ManualUnderwriting/_hooks/useAutoAddEmptyAddressInfo';
// import useAutoCompactAddressInfo from 'process/NB/ManualUnderwriting/_hooks/useAutoCompactAddressInfo';
import useHaveAddressItemConfig from 'process/NB/ManualUnderwriting/_hooks/useHaveAddressItemConfig';
import useGetCfgClientValidate from 'process/NB/ManualUnderwriting/_hooks/useGetCfgClientValidate';
import useGetAddressInfoTableDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetAddressInfoTableDisabled';
import dropEmptyData from 'process/NB/ManualUnderwriting/utils/dropEmptyData';
import { ReactComponent as CopyIcon } from '@/assets/copy.svg';
import AddressItem from './AddressItem';
import styles from './edit.less';

export default ({ id }: any) => {
  const addressInfoList = useGetCompactAddressList({ id });
  const haveAddressItemConfig = useHaveAddressItemConfig({ id });
  const deleteCurrentAddress = useDeleteCurrentAddress({ clientId: id });
  const copyCurrentAddress = useCopyCurrentAddressCallback({ id });
  const rowDisabled = useGetAddressInfoTableDisabled();
  useAutoAddEmptyAddressInfo({ id });
  // useAutoCompactAddressInfo({ id });
  useGetCfgClientValidate();
  return (
    <div>
      {!lodash.isEmpty(haveAddressItemConfig) && (
        <div className={styles.addressWarp}>
          <Icon type="contacts" className={styles.contactsIcon} />
          {!lodash.isEmpty(addressInfoList) && (
            <div className={styles.addressTitle}>Address Information</div>
          )}
          {lodash.map(addressInfoList, (addressInfo: any) => {
            const isDropEmptyData = dropEmptyData({
              objItem: addressInfo,
              loseFileds: ['id', 'communicationLane', 'addrType'],
            });
            return (
              <div className={styles.addressItem} key={addressInfo?.id}>
                <AddressItem
                  addressInfo={addressInfo}
                  id={id}
                  addressInfoId={lodash.get(addressInfo, 'id')}
                  isDropEmptyData={isDropEmptyData}
                />
                {!isDropEmptyData && !rowDisabled && (
                  <div className={classnames(styles.btnWrap)}>
                    <div
                      className={styles.icon}
                      onClick={() => deleteCurrentAddress({ addressItemId: addressInfo.id })}
                    >
                      <Icon type="close" />
                    </div>
                    <div
                      className={classnames(styles.icon, styles.copy)}
                      onClick={() => copyCurrentAddress({ addressItemId: addressInfo.id })}
                    >
                      <CopyIcon />
                      <span className={styles.copyText}>Copy</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
