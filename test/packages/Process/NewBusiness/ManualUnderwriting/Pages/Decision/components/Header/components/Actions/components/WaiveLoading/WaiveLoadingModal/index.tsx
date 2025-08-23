import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import useGetWindowDimensions from './_hooks/useGetWindowDimensions';
import useHaveError from './_hooks/useHaveError';
import Header from './Header';
import Button from './Button';
import Total from './Total';
import WaiveLoadingScreen from './WaiveLoadingScreen';

export default () => {
  const dispatch = useDispatch();
  const visible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.waiveLoadingModalVisible,
    shallowEqual
  );
  const haveError = useHaveError();
  const handleClose = () => {
    dispatch({
      type: `${NAMESPACE}/setWaiveLoadingModalVisible`,
      payload: {
        waiveLoadingModalVisible: false,
      },
    });
  };
  const handleConfirm = useCallback(() => {
    if (haveError) {
      Modal.error({
        content: 'Waive Term cannot be 0 and cannot be greater than Duration Life',
        okText: 'GOT IT',
      });
    } else {
      dispatch({
        type: `${NAMESPACE}/premiumCalculation`,
        payload: {
          operationType: 'manual.uw.waive.recal',
          isWaive: true,
        },
      });
      handleClose();
    }
  }, []);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { height, pLeft, pTop, width } = useGetWindowDimensions();

  return (
    <CommonResizeModal
      visible={visible}
      width={width}
      height={height}
      onCancel={handleClose}
      onReturn={handleClose}
      onConfirm={handleConfirm}
      returnAuth
      confirmAuth={editable}
      moveTop={pTop}
      moveLeft={pLeft}
      contentStyles={{ maxHeight: `${height}px` }}
    >
      <Header />
      {editable && <Button />}
      <WaiveLoadingScreen />
      <Total />
    </CommonResizeModal>
  );
};
