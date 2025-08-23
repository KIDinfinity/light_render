import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';

import { ESubjectType } from '@/components/SolutionRead/Enums';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleMessageModal } from '@/utils/commonMessage';
import { LS, LSKey } from '@/utils/cache';

import styles from './index.less';

export default ({ children, type }: any) => {
  const dispatch = useDispatch();
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const readItem = useSelector((state: any) => state.documentManagement?.readItem);

  const onClick = () => {
    const auth = lodash.find(commonAuthorityList, {
      authorityCode: 'RS_BP_Button_DocMgm_Acknowledge',
      type: 'comm',
    });

    if (auth && auth?.result) {
      dispatch({
        type: 'solutionRead/setReadItem',
        payload: {
          subjectIdList: [readItem?.docId],
          subjectType: ESubjectType.DOC,
          callback: () => {
            dispatch({
              type: 'documentManagement/logButton',
              payload: {
                name: readItem?.name,
              },
            });
            dispatch({
              type: 'documentManagement/saveReadItem',
              payload: {
                readItem: {
                  docId: '',
                  unRead: false,
                  mustRead: false,
                  name: '',
                },
              },
            });
            const pathname = window.location.pathname;
            if (pathname.includes('documentStream')) {
              LS.setItem(LSKey.WINDOW_COMMUNICATION_READ_DOC, readItem?.docId);
            }
          },
        },
      });
    } else {
      handleMessageModal([
        { messageCode: 'MSG_001280', code: 'VLD_001127', content: 'MSG_001280' },
      ]);
    }
  };
  return (
    <div className={styles.acknowledgeView}>
      {children}
      {readItem?.mustRead && readItem?.unRead && (
        <div
          className={classnames({
            [styles.buttonView]: true,
            [styles.pdfType]: type === 'pdf',
          })}
        >
          <Button type="primary" className={styles.button} onClick={onClick}>
            {formatMessageApi({ Label_BPM_Button: 'acknowledge' })}
          </Button>
        </div>
      )}
    </div>
  );
};
