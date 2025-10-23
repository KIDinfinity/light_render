import React from 'react';
import { useSelector, useDispatch } from 'dva';
import ResizeModal from '@/components/ResizeModal';
import type { Dispatch } from 'redux';
import styles from './index.less';
import Sider from './Sider';
import { Spin } from 'antd';
function PreviewModal() {
  const dispatch: Dispatch = useDispatch();
  const previewModal: boolean = useSelector(
    (state: any) => state.reportCenterController.previewModal
  );
  const pdfData: object = useSelector((state: any) => state.reportCenterController?.pdfData);
  const loading: boolean = useSelector(
    (state: any) => state.loading.effects['reportCenterController/preViewReportPDF']
  );
  const height = (document.body?.getBoundingClientRect()?.height + 100) * 0.8;
  const onCancel = async () => {
    dispatch({
      type: 'reportCenterController/savePreviewModal',
      payload: {
        visible: false,
      },
    });
  };

  return (
    <>
      <ResizeModal
        className={styles.previewModal}
        visible={previewModal}
        height={(document.body?.getBoundingClientRect()?.height + 100) * 0.8}
        width={(document.body?.getBoundingClientRect()?.width + 100) * 0.8}
        moveTop={56}
        footer={false}
        onCancel={onCancel}
        setVisible={onCancel}
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      >
        <div className={styles.container}>
          <div className={styles.buttonGroup}>
            <Sider />
          </div>
          <div className={styles.content}>
            {loading ? (
              <div className={styles.emptyBox}>
                <Spin tip="Loading..." size="large" />
              </div>
            ) : (
              <iframe
                src={`data:application/pdf;base64,${pdfData?.fileData}`}
                style={{ width: '100%', height: `${height - 88}px` }}
               />
            )}
          </div>
        </div>
      </ResizeModal>
    </>
  );
}
export default PreviewModal;
