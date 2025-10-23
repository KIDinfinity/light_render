import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Icon } from 'antd';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import {
  useFilterAddrTypeDicts,
  useAllExistCodes,
} from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useAddressType';

import { localConfig } from '../../../../_section/contactInfoTable';
import AddressItem from './AddressItem';
import styles from './index.less';
import useJudgeIsCoInsured from '../../../../_hooks/useJudgeIsCoInsured';

const useIsSelectdAllItem = ({ id }: any) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `modalData.entities.clientMap.${id}.contactInfoList`),
    shallowEqual
  );
  const contactInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `modalData.entities.contactInfoMap`),
    shallowEqual
  );

  const sectionConfig = useGetSectionAtomConfig({
    section: localConfig.section,
    localConfig,
  });
  const config = lodash.find(sectionConfig, { field: 'contactType' });
  const fieldProps = lodash.find(localConfig.configs, { field: 'contactType' })?.['field-props'];
  const defaultDicts = getDrowDownList({ config, fieldProps });
  const existCodes = lodash
    .chain(contactInfoList)
    .map((itemId) => formUtils.queryValue(lodash.get(contactInfoMap, `${itemId}.contactType`)))
    .value();
  return lodash.every(defaultDicts, (item) => existCodes.includes(item.dictCode));
};

const AddButton = ({ clientId }: any) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `modalData.entities.clientMap.${clientId}.contactInfoList`),
    shallowEqual
  );
  const dispatch = useDispatch();
  const isSelectdAllItem = useIsSelectdAllItem({ id: clientId });
  const dicts = useFilterAddrTypeDicts({ readOnly: false, id: clientId });
  const existCodes = useAllExistCodes({ id: clientId, readOnly: false, field: 'addrType' });

  const isDisplayAddAddress = lodash.every(dicts, (item) =>
    existCodes.includes(item.specifyInfoType)
  );

  const isCoInsured = useJudgeIsCoInsured({ clientId });

  const showAddAddress = !isCoInsured && !isDisplayAddAddress;

  const showAddContact = isCoInsured ? (contactInfoList?.length ?? 0) < 1 : !isSelectdAllItem;

  const addAddress = () => {
    dispatch({
      type: `${NAMESPACE}/addAddressInfo`,
      payload: {
        id: clientId,
        changedValues: {},
      },
    });
  };
  const addContact = () => {
    dispatch({
      type: `${NAMESPACE}/addContactInfo`,
      payload: {
        id: clientId,
        changedValues: {},
      },
    });
  };

  return (
    <div className={styles.addButton}>
      {showAddAddress && (
        <div className={styles.addItem} onClick={addAddress}>
          <Icon type="plus" /> Add Address
        </div>
      )}
      {showAddContact && (
        <div className={styles.addItem} onClick={addContact}>
          <Icon type="plus" /> Add Contact Type
        </div>
      )}
    </div>
  );
};

export default ({ clientId }: any) => {
  const AddressInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.addressInfoList
  );
  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.entities?.addressInfoMap
  );
  const filterAddressInfoList = useMemo(() => {
    return lodash
      .chain(AddressInfoList)
      .filter((id) => {
        const currentAddressItem = addressInfoMap[id];
        return currentAddressItem?.addrType !== 'US';
      })
      .value();
  }, [AddressInfoList]);

  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <Icon type="contacts" />
        </div>
        <AddButton clientId={clientId} />
      </div>
      {filterAddressInfoList?.map((id: string) => {
        return <AddressItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
