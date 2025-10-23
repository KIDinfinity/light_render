import { Button } from 'antd';
import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import InfoHistory from './_component/InfoHistory';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { namespace } from './_models';
import { BusinessCode } from 'claim/enum/BusinessCode';
import styles from './index.less';
import { Action } from '@/components/AuditLog/Enum';
import { ReactComponent as InfoHistoryIcon } from 'opus/Assets/infoHistory.svg';
import { getAuthByAuthorityCode } from '@/auth/Utils';
import { MatchTypeEnum } from '@/auth/Constant';

const Extension = ({
  editable,
  curInfoHistory,
  isShowDropDown,
}: {
  editable: boolean;
  curInfoHistory: any[];
  isShowDropDown: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector<any>((state) => state?.infoController?.caseInfo) as any;
  const businessCode = task?.businessCode;
  const historyCaseNo = useSelector<any>(
    (state) => state?.workspaceHistory?.getCaseNoByBusinessNo
  ) as any;
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );
  const btnAuth = getAuthByAuthorityCode(
    commonAuthorityList,
    {
      authorityCode: 'RS_OPUS_Info_GenWorksheet',
    },
    { type: MatchTypeEnum.NeedExist }
  );
  const caseNo = task?.caseNo || historyCaseNo;

  return editable ? (
    <div className={styles.extension}>
      <div className={styles.header}>
        <div className={styles.title}>
          <InfoHistoryIcon />
          <span className={styles.text}>
            {formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.remark.title.history' })}
          </span>
        </div>
        {btnAuth && (
          <Button
            icon="table"
            className={styles.worksheetBtn}
            onClick={() => {
              dispatch({
                type: `${namespace}/setGenerateUWWorksheetModal`,
                payload: {
                  caseNo: caseNo,
                  fileName: `${task?.inquiryBusinessNo}_${
                    businessCode === BusinessCode.nb ? 'UW' : 'Claims'
                  } Assessment Worksheet_${moment().format('DD/MM/YYYY HH:mm:ss')}.pdf`,
                  show: true,
                },
              });
              dispatch({
                type: 'auditLogController/logTask',
                payload: {
                  action: Action.Generate,
                },
              });
            }}
          >
            {formatMessageApi({
              Label_BPM_Button:
                businessCode === BusinessCode.nb ? 'generateUwWorksheet' : 'generateClaimWorksheet',
            })}
          </Button>
        )}
      </div>
      <InfoHistory
        isShowDropDown={isShowDropDown}
        curInfoHistory={curInfoHistory}
        className={styles.infoHistory}
      />
    </div>
  ) : null;
};

export default Extension;
