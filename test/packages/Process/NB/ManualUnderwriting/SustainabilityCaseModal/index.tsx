import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import useHandleCloseSustainabilityCaseModalVisible from 'process/NB/ManualUnderwriting/_hooks/useHandleCloseSustainabilityCaseModalVisible';
import useHandleConfirmSustainabilityCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleConfirmSustainabilityCallback';
import useGetWindowDimensions from 'process/NB/ManualUnderwriting/_hooks/useGetWindowDimensions';
import Header from './Header';
import Benefit from 'process/NB/ManualUnderwriting/Decision/Benefit/Show';
import Options from './Options';
import CheckingProvider from './CheckingProvider';
import styles from './index.less';

export default () => {
  const visible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sustainabilityCaseModalVisible,
    shallowEqual
  );

  const handleConfirm = useHandleConfirmSustainabilityCallback();
  const handleClose = useHandleCloseSustainabilityCaseModalVisible();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { height, width, pLeft, pTop } = useGetWindowDimensions();

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
      <CheckingProvider>
        <Header />
        <Options />
        <div
          className={styles.listDiv}
          style={{
            width: width - 120,
            height: 0.62 * height,
          }}
        >
          <Benefit windowWidth={width - 100} windowHeight={height * 0.62} />
        </div>
      </CheckingProvider>
    </CommonResizeModal>
  );
};
