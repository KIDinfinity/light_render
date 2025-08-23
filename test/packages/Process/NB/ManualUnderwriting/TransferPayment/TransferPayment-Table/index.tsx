import React from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { localConfig } from './Section';
import useGetPremiumTransferListFilteredCancel from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumTransferListFilteredCancel';
import EditableTable from 'process/NB/ManualUnderwriting/_components/EditableTable';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import Item from './Item';
import ItemForAdd from './ItemForAdd';
import styles from './index.less';
import useHandleDeleteAddingTransferPaymentItem from '../../_hooks/useHandleDeleteAddingTransferPaymentItem';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

const Transferpaymenttable = () => {
  const editable = false;
  const list = useGetPremiumTransferListFilteredCancel();
  const config = useGetSectionAtomConfig({
    section: 'TransferPayment-Table',
    localConfig,
  });
  const handleDelete = useHandleDeleteAddingTransferPaymentItem();
  const transferAddItem = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.transferAddItem,
    shallowEqual
  );
  return (
    <div className={styles.transferPaymentTable}>
      <EditableTable config={config} editable={editable} handleDelete={handleDelete} displayStatus>
        {lodash.map(list, (item: any) => {
          return (
            <div
              className={styles.transferPaymentItem}
              id={item?.id}
              key={item?.id}
              status={item?.status}
            >
              <Item item={item} key={item?.id} id={item?.id} />
            </div>
          );
        })}
        <div className={styles.transferPaymentItem} data-hiddenDeleteButton={true}>
          <ItemForAdd transferAddItem={transferAddItem} />
        </div>
      </EditableTable>
    </div>
  );
};

export default Transferpaymenttable;
