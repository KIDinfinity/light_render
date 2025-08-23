import React, { useEffect, useState } from 'react';
import { history, useParams } from 'umi';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Spin } from 'antd';
import lodash from 'lodash';

import { NBEntrance } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal from '@/utils/commonMessage';
import { ButtonCode, auth } from 'bpm/enum';
import NBHistory from '../../NewBusiness/ManualUnderwriting';
import getHeaderInfo from './getHeaderInfo';
import {
  tarckInquiryLoad,
  tarckUnload,
  eEventName,
  eEventOperation,
} from '@/components/TarckPoint';
import { tenant, Region } from '@/components/Tenant';
import getNBHistoryData from './getNBHistoryData';
import useJudgeChecklistCanUse from '@/_hooks/useJudgeChecklistCanUse';
import styles from './index.less';

export default (props: any) => {
  const {  setProcessInstanceId, setDataSource }: any = props;
  const params = useParams();
  const businessNo = params?.businessNo;
  const caseNo = params?.caseNo;
  const dispatch = useDispatch();
  const [nbHistoryData, setNBHistoryData]: [any, Function] = useState({});
  const [loading, setLoading] = useState(true);
  const caseDetail = useSelector((state: any) => state.manualUnderwriting.caseDetail, shallowEqual);
  const activityList = useSelector((state: any) => state.workspaceCases.activityList, shallowEqual);
  const userId = useSelector((state: any) => state.user.currentUser.userId, shallowEqual);
  const checklistOpen = useJudgeChecklistCanUse();
  const inquiryBusinessNo = caseDetail?.inquiryBusinessNo;
  const permissionMenus = useSelector(
    (state: any) => state.authController?.permissionMenus,
    shallowEqual
  );

  useEffect(() => {
    if (caseNo) {
      dispatch({
        type: 'integration/getDataParams',
        payload: {
          caseNo,
        },
      });
    }
  }, [caseNo, checklistOpen]);
  useEffect(() => {
    setProcessInstanceId(caseNo);
    setDataSource('CASE');
    dispatch({
      type: 'newBusinessEWS/getCaseDetail',
      payload: {
        caseNo,
      },
    });
    (async () => {
      setLoading(true);
      const response = await getNBHistoryData({
        businessNo,
        inquiryBusinessNo,
        caseCategory: 'BP_NB_CTG001',
      });
      if (
        lodash.isPlainObject(response) &&
        response.success &&
        !lodash.isEmpty(response.responseData)
      ) {
        const businessData = lodash.get(response, 'responseData');
        setNBHistoryData(businessData);
        tarckInquiryLoad({
          dispatch,
          businessData: businessData,
          caseNo,
          eventName: eEventName.nbHistory,
          eventOperation: eEventOperation.viewDetail,
        });
      }
      setLoading(false);
    })();
    dispatch({
      type: 'workspaceCases/activityList',
      payload: {
        processInstanceId: caseNo,
      },
    });
    dispatch({
      type: 'claimEditable/set',
      payload: {
        taskStatus: false,
        taskDefKey: '',
        submissionChannel: '',
        procActOrder: '',
      },
    });

    return () => {
      dispatch({
        type: 'newBusinessManualUnderwriting/resetBizData',
      });
      tarckUnload({ dispatch });
    };
  }, []);

  const buttonList = [
    {
      buttonCode: 'back',
      title: formatMessageApi({ Label_BPM_Button: 'back' }),
      action: () => {
        history.back();
      },
    },
  ];

  if (permissionMenus.includes(auth.authNBHistoryAFI)) {
    buttonList.unshift({
      buttonCode: 'appeal',
      title: 'Reversal',
      action: async () => {
        // const preSubmitValidate = await dispatch({
        //   type: 'workspaceCases/preSubmitValidation',
        //   payload: {
        //     submitParams: {
        //       businessNo,
        //       caseCategory: 'BP_NB_CTG001',
        //       caseNo,
        //     },
        //   },
        // });
        // if (!preSubmitValidate) {
        //   return false;
        // }
        const caseCategory = nbHistoryData?.caseCategory;

        const checkResult = await dispatch({
          type: 'workspaceCases/checkInformation',
          payload: {
            extraParams: {
              activityCode: lodash.chain(activityList).first().get('processActivityKey').value(),
              buttonCode: ButtonCode.Appeal,
              activityStatus: 'completed',
              caseCategory,
              caseNo,
              businessNo,
              inquiryBusinessNo,
            },
          },
        });
        if (!checkResult) {
          return false;
        }
        const createCaseCategory = (() => {
          switch (caseCategory) {
            case 'BP_NB_CTG001':
            default:
              return 'BP_AP_CTG02';
            case 'BP_NB_CTG005':
              return 'BP_AP_CTG03';
          }
        })();

        const params = {
          activityVariables:
            tenant.region() !== Region.TH
              ? {
                  applicant: userId,
                }
              : null,
          businessNo,
          caseCategory: createCaseCategory,
          operationType: 'asyncAppealCreate',
          caseNo,
        };
        const response = await dispatch({
          type: 'workspaceCases/asyncTouch',
          payload: {
            params,
          },
        });
        if (response?.success) {
          history.push(`/process/task/detail/${lodash.get(response, 'resultData.taskId')}`);
        } else {
          handleMessageModal(response?.promptMessages);
        }
      },
    });
  }

  const headerInfo = {
    ...nbHistoryData,
    caseNo,
  };
  return (
    <NBEntrance
      buttonList={buttonList}
      title={formatMessageApi({
        Label_COM_General: 'NBHistory',
      })}
      headerInfoConfig={getHeaderInfo(headerInfo)}
      appealFlag={lodash.get(caseDetail, 'appealFlag')}
    >
      {loading ? (
        <div className={styles.spin}>
          <Spin />
        </div>
      ) : (
        <NBHistory
          taskDetail={{ businessNo, caseCategory: nbHistoryData?.caseCategory }}
          businessData={nbHistoryData}
        />
      )}
    </NBEntrance>
  );
};
