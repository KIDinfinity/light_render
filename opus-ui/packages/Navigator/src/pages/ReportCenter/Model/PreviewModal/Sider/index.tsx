import React from 'react';
import { Button, Icon } from 'antd';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as closeSvg } from 'bpm/assets/close.svg';
import { ReactComponent as sentSvg } from 'navigator/assets/sent.svg';
import styles from './index.less';
import { handleSuccessMessageModal } from '@/utils/commonMessage';
import { ReportCenterEnum } from '@/enum/GolbalAuthority';
import Authorized from '@/utils/Authorized';

function ButtonGroup() {
  const dispatch = useDispatch();
  const pdfData: boolean = useSelector((state: any) => state.reportCenterController?.pdfData);
  const commonAuthorityList: boolean = useSelector(
    (state: any) => state.authController.commonAuthorityList
  );
  const loading: boolean = useSelector(
    (state: any) => state.loading.effects['reportCenterController/sendPDF']
  );

  const list = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result)
    .map((item) => item.authorityCode)
    .value();

  const onClose = async () => {
    dispatch({
      type: 'reportCenterController/savePreviewModal',
      payload: {
        visible: false,
      },
    });
  };
  const onSend = async () => {
    const result = await dispatch({
      type: 'reportCenterController/sendPDF',
    });
    if (result?.success) {
      handleSuccessMessageModal(formatMessageApi({ Label_COM_Notification: 'MSG_000750' }), {
        okFn: () => {
          dispatch({
            type: 'reportCenterController/savePreviewModal',
            payload: {
              visible: false,
            },
          });
        },
      });
    }
  };

  return (
    <div className={styles.buttonBox}>
      <>
        <Button onClick={onClose}>
          <span>{formatMessageApi({ Label_COM_CorrespondencePreview: 'Cancel' })}</span>
          <Icon component={closeSvg} />
        </Button>
        <Authorized
          authority={[ReportCenterEnum.RS_BP_SendButtonforReport]}
          currentAuthority={list}
        >
          <Button onClick={onSend} loading={loading} disabled={!pdfData}>
            <span>{formatMessageApi({ Label_COM_CorrespondencePreview: 'Send' })}</span>
            <Icon component={sentSvg} className={styles.fileCopy} />
          </Button>
        </Authorized>
      </>
    </div>
  );
}

export default ButtonGroup;
