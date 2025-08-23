import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CommonResizeModal from 'basic/components/CommonResizeModal';

import useGetWindowDimensions from 'process/NB/ManualUnderwriting/_hooks/useGetWindowDimensions';
import Header from './Header';
import Benefit from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit';
import Options from './Options';
import CheckingProvider from './CheckingProvider';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const visible = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.sustainabilityModalVisible,
    shallowEqual
  );

  const handleConfirm = () => {
    dispatch({
      type: `${NAMESPACE}/confirmSustainability`,
    });
  };
  const handleClose = () => {
    dispatch({
      type: `${NAMESPACE}/setSustainabilityModalVisible`,
      payload: {
        visible: false,
      },
    });
  };
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
          <Benefit editable={false} windowWidth={width - 100} windowHeight={height * 0.62} />
        </div>
      </CheckingProvider>
    </CommonResizeModal>
  );
};
