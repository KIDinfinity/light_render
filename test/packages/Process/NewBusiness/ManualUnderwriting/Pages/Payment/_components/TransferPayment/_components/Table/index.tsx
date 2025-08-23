import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { TransferPaymentStatus } from 'process/NewBusiness/ManualUnderwriting/_enum';
import EditableTable from 'process/NewBusiness/ManualUnderwriting/_components/EditableTable';

import { localConfig } from '../../Sections/Table';

import Item from './Item';
import Add from './Add';

import styles from './index.less';

const Transferpaymenttable = () => {
  const dispatch = useDispatch();
  const editable = false;

  const premiumTransferList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.modalData?.processData?.premiumTransferList
  );

  const list = lodash.filter(
    premiumTransferList || [],
    ({ status }: any) => status !== TransferPaymentStatus.Cancel
  );

  const config = useGetSectionAtomConfig({
    section: 'TransferPayment-Table',
    localConfig,
  });

  return (
    <div className={styles.transferPaymentTable}>
      <EditableTable
        config={config}
        editable={editable}
        handleDelete={({ id }: any) => {
          dispatch({
            type: `${NAMESPACE}/deleteTransferPaymentItem`,
            payload: {
              id,
            },
          });
        }}
        displayStatus
      >
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
        <div className={styles.transferPaymentItem}>
          <Add />
        </div>
      </EditableTable>
    </div>
  );
};

export default Transferpaymenttable;
