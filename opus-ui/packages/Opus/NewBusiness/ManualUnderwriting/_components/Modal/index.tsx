import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon, Modal, Spin } from 'antd';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { ReactComponent as EditIcon } from 'opus/Assets/icon-edit.svg';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

interface IParams {
  show: boolean;
  setShow: Function;
  onConfirm: () => Promise<any>;
  onBack?: () => Promise<void>;
  onBeforeBack?: () => Promise<void>;
  children: any;
  width?: number | string;
  forceRender?: boolean;
  loading?: boolean;
  actionConfig?: any;
  visibility?: boolean;
  maskClosable?: boolean;
}

const handleAction = ({ result, actionConfig }: any) => {
  const actions = lodash.keys(actionConfig);
  lodash.forEach(actions, (action) => {
    switch (action) {
      case 'CallBack':
        if (lodash.isFunction(actionConfig[action])) {
          actionConfig[action](result);
        }
        break;
      case 'successCallBack':
        if (result) {
          if (lodash.isFunction(actionConfig[action])) {
            actionConfig[action](result);
          }
        }
        break;
      case 'failureCallBack':
        if (!result) {
          if (lodash.isFunction(actionConfig[action])) {
            actionConfig[action](result);
          }
        }
        break;
      default:
        break;
    }
  });
};

const Modals = ({
  show,
  setShow,
  children,
  onBack,
  width,
  loading = true,
  onBeforeBack,
  forceRender,
  actionConfig,
  visibility,
  maskClosable = false,
  onConfirm,
}: IParams) => {
  const dispatch = useDispatch();
  const errorCount =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.errorLog?.errorCount,
      shallowEqual
    ) || 0;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const progressData =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.progressData) || [];

  const handleConfirmLoading = (state: boolean) => {
    dispatch({
      type: `${NAMESPACE}/saveConfirmLoading`,
      payload: {
        show: state,
      },
    });
    if (!loading) {
      return;
    }
    setConfirmLoading(state);
  };

  const onCancel = async () => {
    if (lodash.isFunction(onBeforeBack)) {
      await onBeforeBack();
    }
    setShow(false);
    if (lodash.isFunction(onBack)) {
      await onBack();
    }
  };

  const onOk = async () => {
    dispatch({
      type: `login/saveLoadingStatus`,
      payload: { loadingStatus: true },
    });
    setTimeout(async () => {
      if (lodash.isFunction(onConfirm)) {
        const afterConfirm = await onConfirm();
        if (!!afterConfirm) {
          setShow(false);
        }
        if (!lodash.isEmpty(actionConfig)) {
          handleAction({ result: afterConfirm, actionConfig });
        }
      }
    });
  };

  useEffect(() => {
    if (show) {
      dispatch({
        type: `${NAMESPACE}/clearError`,
      });
    }
  }, [dispatch, show]);

  useEffect(() => {
    if (!lodash.isEmpty(progressData)) {
      setShow(false);
    }
  }, [progressData, setShow]);

  return (
    !!show && (
      <Modal
        title={
          <div className={styles.modalTitle}>
            <Icon component={EditIcon} />
            {lodash.capitalize(
              formatMessageApi({
                Label_BIZ_Claim: 'form.edit',
              })
            )}
          </div>
        }
        width={width || '70%'}
        centered
        className={classNames(styles.modalWrap, { [styles.modalWrapHidden]: visibility })}
        visible={show}
        onCancel={onCancel}
        onOk={onOk}
        okText={formatMessageApi(
          errorCount > 0
            ? { Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.error' }
            : { Label_BIZ_Claim: 'Confirm' }
        )}
        cancelButtonProps={{ type: 'ghost' }}
        okButtonProps={{ disabled: errorCount > 0 }}
        mask={!visibility}
        maskClosable={maskClosable}
        forceRender={forceRender || false}
      >
        <div className={styles.wrap}>
          <div className={styles.content}>{children}</div>
        </div>
        {!!confirmLoading && lodash.isEmpty(progressData) && (
          <div className={styles.loadingWrap}>
            <div className={styles.loading}>
              <Spin size="large" />
            </div>
          </div>
        )}
      </Modal>
    )
  );
};

export default Modals;
