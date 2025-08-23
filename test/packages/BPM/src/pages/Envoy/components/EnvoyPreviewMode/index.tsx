import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import styles from './index.less';
import { Icon } from 'antd';
import {
  Enclosure,
  LetterForm,
  RenderEmailContent,
  RenderSmsContent,
  FormButton,
  ViewerEnclosure,
  LoadingBox,
} from './components';
import classNames from 'classnames';
import lodash from 'lodash';
import { OperationType, LetterType, SendChannel } from './enum';

let timer = null;

function Index() {
  const dispatch = useDispatch();
  const [selectLoading, setSelectLoading] = useState(false);

  const title = useSelector(({ envoyController }: any) => envoyController.title, shallowEqual);
  const previewModeShow = useSelector(
    ({ envoyController }: any) => envoyController.previewModeShow,
    shallowEqual
  );
  const letters = useSelector(
    ({ envoyController }: any) => envoyController.previewModeData?.letters,
    shallowEqual
  );
  const previewCurrentReason = useSelector(
    ({ envoyController }: any) => envoyController.previewCurrentReason,
    shallowEqual
  );

  const operationType = useSelector(
    ({ envoyController }: any) => envoyController.previewModeData?.operationType,
    shallowEqual
  );
  const previewSelectLetter = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectLetter,
    shallowEqual
  );
  const loading = useSelector(
    (state) => state.loading.effects['envoyController/getPreivewModeData']
  );
  const previewModePageAtomConfig =
    useSelector(
      ({ envoyController }: any) => envoyController.previewModePageAtomConfig,
      shallowEqual
    ) || [];

  const EnclosureContentConfig =
    previewModePageAtomConfig.find((item) => item.field === 'attachment') || {};

  const selectLetterHandle = useCallback(
    async (index) => {
      if (index === previewSelectLetter || selectLoading || loading) return;
      const hasError = await dispatch({
        type: 'envoyController/validatePreview',
      });
      if (lodash.isEmpty(hasError)) {
        setSelectLoading(true);
        if (!timer) {
          timer = setTimeout(() => {
            dispatch({
              type: 'envoyController/savePreviewSelectLetter',
              payload: {
                index,
              },
            });
            dispatch({
              type: 'envoyController/saveState',
              payload: {
                isChange: false,
              },
            });
            //letter切换重置attachment的index
            dispatch({
              type: 'envoyController/saveSelectEnclosureIndex',
              payload: {
                index: -1,
              },
            });
            //重置附件url
            dispatch({
              type: 'envoyController/savePreviewUrl',
              payload: {
                previewUrl: '',
              },
            });
            //重置附件编辑内容
            dispatch({
              type: 'envoyController/clearPreviewEditContent',
            });
            setSelectLoading(false);
            timer = null;
          }, 300);
        }
      }
    },
    [dispatch, loading, previewSelectLetter, selectLoading]
  );

  const renderIcon = (type, index, show) => {
    const typeMap = {
      email: {
        type: 'mail',
        component: null,
      },
      sms: {
        type: 'message',
        component: null,
      },
      doc: {
        type: 'file',
        component: null,
      },
    };
    return (
      <Icon
        type={typeMap[type]?.type}
        // component={typeMap[type]?.component}
        onClick={selectLetterHandle.bind(null, index)}
        className={classNames(styles.icon, {
          [styles.iconSelected]: previewSelectLetter === index,
          [styles.iconHidden]: !show,
        })}
      />
    );
  };

  const { letterType, sendChannel } = letters?.[previewSelectLetter] || {};

  useEffect(() => {
    if (previewModeShow) {
      dispatch({ type: 'envoyController/getPreviewModePageAtomConfig' });
    }
  }, [previewModeShow]);

  const contentRender = {
    [OperationType.envoyManualSend]: {
      [LetterType.email]: {
        [SendChannel.mc_crpd]: <RenderEmailContent />,
      },
      [LetterType.sms]: {
        [SendChannel.mc_crpd]: <RenderSmsContent />,
      },
      [LetterType.doc]: {
        [SendChannel.mc_crpd]: <RenderEmailContent />,
      },
    },
  };

  const LeftRender = {
    [OperationType.envoyManualSend]: {
      [LetterType.email]: {
        [SendChannel.mc_crpd]: EnclosureContentConfig?.['field-props']?.visible === 'Y' && (
          <Enclosure />
        ),
      },
      [LetterType.doc]: {
        [SendChannel.mc_crpd]: EnclosureContentConfig?.['field-props']?.visible === 'Y' && (
          <Enclosure />
        ),
      },
    },
  };

  return ReactDOM.createPortal(
    <>
      {previewModeShow && (
        <>
          <div className={styles.mask} />
          <div className={styles.fullScreenBox}>
            <LoadingBox loading={loading}>
              <div className={styles.header}>
                <div className={styles.title}>
                  <div>PREVIEW</div>
                  <div className={styles.line} />
                  <div className={styles.reasonCode}>{title}</div>
                </div>
                <div className={styles.letterList}>
                  {(letters || [])
                    ?.map((item, index) => {
                      return { ...item, sortIndex: index };
                    })
                    ?.sort((a) => (a?.letterType === 'email' ? -1 : 0))
                    ?.map((item) =>
                      renderIcon(
                        item?.letterType,
                        item.sortIndex,
                        ['email', 'sms', 'doc'].includes(item?.letterType)
                      )
                    )}
                </div>
              </div>
              <LoadingBox loading={selectLoading}>
                <div className={styles.content}>
                  <div className={styles.left}>
                    <div className={styles.leftContent}>
                      <LetterForm />
                      {LeftRender?.[operationType]?.[letterType]?.[sendChannel] || <></>}
                    </div>
                    <FormButton previewCurrentReason={previewCurrentReason} />
                  </div>
                  <div className={styles.right}>
                    <ViewerEnclosure />
                    {contentRender?.[operationType]?.[letterType]?.[sendChannel] || <></>}
                  </div>
                </div>
              </LoadingBox>
            </LoadingBox>
          </div>
        </>
      )}
    </>,
    document.body
  );
}
export default Index;
