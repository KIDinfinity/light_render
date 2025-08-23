import React, { useState, useCallback, useMemo, useEffect } from 'react';
import RcViewer from '@hanyk/rc-viewer';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { EnovyEnclosureType, EnovyEnclosureImgTypes } from 'bpm/pages/Envoy/enum';
import styles from './ViewerEnclosure.less';
import { LoadingBox } from '../index';
import { Button } from 'antd';
import EditPDF from '../EditPDF';
import classnames from 'classnames';
import getEditedHtml from '../../../../_utils/getEditedHtml';

// const fileTypeMap = {
//   [EnovyEnclosureImgTypes.PNG]: 'data:image/png;base64,',
//   [EnovyEnclosureImgTypes.JPG]: 'data:image/jpeg;base64,',
//   [EnovyEnclosureImgTypes.GIF]: 'data:image/gif;base64,',
//   [EnovyEnclosureImgTypes.SVG]: 'data:image/svg+xml;base64,',
//   [EnovyEnclosureImgTypes.ICO]: 'data:image/x-icon;base64,',
//   [EnovyEnclosureImgTypes.BMP]: 'data:image/bmp;base64,',
//   [EnovyEnclosureType.PDF]: 'data:application/pdf;base64,',
// };

export default function ViewerEnclosure() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const previewSelectLetter = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectLetter,
    shallowEqual
  );
  const previewSelectEnclosureIndex = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectEnclosureIndex,
    shallowEqual
  );
  const previewSelectEnclosureEdit = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectEnclosureEdit,
    shallowEqual
  );
  const previewModeLetterData = useSelector(
    ({ envoyController }: any) => envoyController.previewModeData?.letters,
    shallowEqual
  );
  const previewEditContent = useSelector(
    ({ envoyController }: any) => envoyController.previewEditContent,
    shallowEqual
  );
  const previewUrl = useSelector(
    ({ envoyController }: any) => envoyController.previewUrl,
    shallowEqual
  );
  const selectEnclosure =
    previewModeLetterData?.[previewSelectLetter]?.after?.params?.previewAttachFiles?.[
      previewSelectEnclosureIndex
    ];
  const confirmLoading = useSelector(
    (state) => state.loading.effects['envoyController/confirmEditHtml'],
    shallowEqual
  );

  const currentType = useMemo(() => {
    return lodash
      .chain(selectEnclosure?.fileFullName)
      .split('.')
      .get(selectEnclosure?.fileFullName?.split('.').lastIndex)
      .toUpper()
      .value();
  }, [selectEnclosure]);

  const closeScreen = useCallback(() => {
    dispatch({
      type: 'envoyController/saveSelectEnclosureIndex',
      payload: {
        index: -1,
      },
    });
    setLoading(true);
  }, []);

  const confirmEdit = useCallback(() => {
    const finalPreviewHtml = getEditedHtml({
      template: selectEnclosure?.previewHtml,
      editContent: previewEditContent,
    });
    dispatch({
      type: 'envoyController/saveCurPreviewHtml',
      payload: {
        finalPreviewHtml: finalPreviewHtml || selectEnclosure?.previewHtml,
        previewSelectLetter,
        previewSelectEnclosureIndex,
        selectEnclosure,
      },
    });
    dispatch({
      type: 'envoyController/confirmEditHtml',
    });
  }, [selectEnclosure, previewEditContent]);
  const cancelEdit = useCallback(() => {
    dispatch({
      type: 'envoyController/saveSelectEnclosureEdit',
      payload: {
        previewSelectEnclosureEdit: false,
      },
    });
    dispatch({
      type: 'clearAttachmentData',
    });
  }, []);

  const isShowEditPdf = useMemo(() => {
    return (
      currentType === EnovyEnclosureType.PDF &&
      previewSelectEnclosureEdit &&
      selectEnclosure?.previewHtml
    );
  }, [currentType, previewSelectEnclosureEdit, selectEnclosure]);

  useEffect(() => {
    if (selectEnclosure) {
      dispatch({
        type: 'envoyController/getAttachmentFile',
        payload: {
          index: previewSelectEnclosureIndex,
          attachment: selectEnclosure,
          isEdit: previewSelectEnclosureEdit,
        },
      });
    }
  }, [previewSelectEnclosureEdit, previewSelectEnclosureIndex, previewSelectLetter]);
  return (
    <>
      {selectEnclosure && (
        <div className={styles.fullScreenBox}>
          {/* 编辑pdf不需要close，有单独的cancel */}
          <LoadingBox
            type="inline"
            loading={currentType === EnovyEnclosureType.PDF && loading}
            className={styles.loading}
          >
            {!previewSelectEnclosureEdit && (
              <div className={styles.close} onClick={closeScreen}>
                X
              </div>
            )}
            {previewSelectEnclosureEdit && (
              <div className={styles.operation}>
                <Button
                  type="primary"
                  onClick={confirmEdit}
                  className={classnames(styles.operatioButton, styles.confirm)}
                  loading={confirmLoading}
                >
                  Confirm
                </Button>
                <Button
                  onClick={cancelEdit}
                  className={classnames(styles.operatioButton, styles.cancel)}
                >
                  Cancel
                </Button>
              </div>
            )}
            <div className={styles.content}>
              {currentType === EnovyEnclosureType.PDF && !isShowEditPdf && previewUrl && (
                <iframe
                  title={selectEnclosure.fileFullName}
                  id="viewerIframe01"
                  src={previewUrl}
                  onLoad={(e) => {
                    if (
                      e.target.contentDocument?.activeElement?.innerText?.includes(
                        '"success":false'
                      )
                    ) {
                      e.target.contentDocument.activeElement.innerText = '';
                    }
                    setLoading(false);
                  }}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                />
              )}
              {currentType === EnovyEnclosureType.PDF && isShowEditPdf && (
                <EditPDF setEditLoading={setLoading} previewHtml={selectEnclosure?.previewHtml} />
              )}
              {Object.values(EnovyEnclosureImgTypes).includes(currentType) && previewUrl && (
                <RcViewer options={{ inline: true }}>
                  <img src={previewUrl} alt="" style={{ display: 'none' }} />
                </RcViewer>
              )}
            </div>
          </LoadingBox>
        </div>
      )}
    </>
  );
}
