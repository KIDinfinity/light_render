import React, { useEffect, useState } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import useCloseIndentificationModal from 'process/NB/ManualUnderwriting/_hooks/useCloseIndentificationModal';
import useCustomerIndentificationConfirmCallback from 'process/NB/ManualUnderwriting/_hooks/useCustomerIndentificationConfirmCallback';
import CustomerIdentification from 'process/NB/CustomerIdentification/ProposalContentWrap';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const editable = true;
  const [loading, setLoading] = useState(false);
  const indentificationModalVisible = useSelector(
    (state: any) => state.manualUnderwriting.indentificationModalVisible,
    shallowEqual
  );
  const customerIndentificationData = useSelector(
    (state: any) => state.manualUnderwriting.customerIndentificationData,
    shallowEqual
  );
  const handleClose = useCloseIndentificationModal();
  const businessNo = useSelector(
    (state: any) => state.manualUnderwriting?.taskDetail?.businessNo,
    shallowEqual
  );
  const handleConfirm = useCustomerIndentificationConfirmCallback({ setLoading });

  useEffect(() => {
    return () => {
      dispatch({
        type: `${NAMESPACE}/setIndentificationModalVisible`,
        payload: {
          indentificationModalVisible: false,
        },
      });
    };
  }, []);
  return (
    <>
      <CommonResizeModal
        confirmAuth={editable}
        visible={indentificationModalVisible}
        onReturn={handleClose}
        onCancel={handleClose}
        onConfirm={handleConfirm}
        returnAuth
        width={1200}
        height={400}
        loading={loading}
        className={styles.CommonResizeModal}
      >
        <CustomerIdentification
          businessData={customerIndentificationData}
          businessNo={businessNo}
        />
      </CommonResizeModal>
    </>
  );
};
