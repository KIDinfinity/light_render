import React from 'react';
import { NAMESPACE } from '../activity.config';

import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import CommonModal from 'basic/components/CommonModal';
import styles from './style.less';
import InvoiceListItem from './InvoiceListItem';
import InvoiceAddItem from './Add/InvoiceAddItem';

const InvoiceItemList = ({ incidentId }: any) => {
  const dispatch = useDispatch();
  const invoiceList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpInvoiceList
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const popUpstatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpstatus
  );
  const popUpAddInvoiceItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpAddInvoiceItem
  );
  const closePopUp = () => {
    dispatch({
      type: `${NAMESPACE}/setPopUpStatus`,
      payload: {
        popUpstatus: false,
      },
    });
  };

  const confirm = () => {
    dispatch({
      type: `${NAMESPACE}/updateMainInvoiceList`,
      payload: { incidentId },
    });
    dispatch({
      type: `${NAMESPACE}/setPopUpStatus`,
      payload: {
        popUpstatus: false,
      },
    });
  };
  return (
    <CommonModal
      visible={popUpstatus}
      onCancel={closePopUp}
      onConfirm={confirm}
      onReturn={closePopUp}
      confirmAuth={popUpstatus}
      returnAuth={popUpstatus}
      width="76%"
    >
      <div className={styles.wrapper}>
        {lodash.map(invoiceList, (item: any) => (
          <InvoiceListItem key={item?.id} invoiceId={item?.id} invoiceItem={item} />
        ))}
        {editable && !lodash.isEmpty(popUpAddInvoiceItem) && (
          <InvoiceAddItem invoiceAddItem={popUpAddInvoiceItem} />
        )}
      </div>
    </CommonModal>
  );
};

export default InvoiceItemList;
