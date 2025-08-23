import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { history, useParams } from 'umi';
import { get, isEmpty } from 'lodash';
import { POSEntrance as ServicingEntrance } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getIndicator from 'bpm/pages/OWBEntrance/Header/getIndicator';
import getHeaderInfo from './getHeaderInfo';
import Decision from '../BaseProduct/index';
import { NAMESPACE } from '../Decision/activity.config';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { tenant } from '@/components/Tenant';
import { Spin } from 'antd';

interface IHistoryState {
  activityKey?: string | null;
  caseAssessor?: string | null;
  caseCategory?: string;
  caseNo?: string;
  cfgFundList?: any | null;
  cft?: boolean;
  cftFlag?: string | null;
  creator?: string;
  crsFACTAUpdateFlag?: string | null;
  decision?: string;
  deleted?: number;
  externalCaseStatus?: string | null;
  fatcaInfo?: any | null;
  gmtCreate?: string;
  gmtModified?: string;
  id?: string;
  inquiryBusinessNo?: string | null;
  inquirySrvNo?: string;
  integrationLogList?: any[] | null;
  mainCompanyCode?: string | null;
  mainInsuredClientId?: string | null;
  mainOwnerClientId?: string;
  mainPayorClientId?: string | null;
  mainPolicyId?: string;
  modifier?: string;
  ntuFlag?: string | null;
  policyInfo?: any;
  preDecision?: string | null;
  qaRequired?: string | null;
  rcsApplicable?: string;
  regionCode?: string;
  skipSettlement?: string | null;
  sourceSystem?: string | null;
  srvCaseIndicatorList?: any[] | null;
  srvNo?: string;
  srvUiSectionEditControlList?: any | null;
  stpFlag?: string | null;
  stpResult?: string | null;
  subCaseSubmissionChannel?: string | null;
  subCaseSubmissionDate?: string | null;
  submissionChannel?: string;
  submissionDate?: string;
  submissionId?: string | null;
  taskId?: string | null;
  transId?: string;
  transactionTypes?: string[];
  businessNo?: string;
  companyCode?: string;
}

const PHCFTDecision = (props: any) => {
  const params = useParams();
  const { setTaskDetail, taskDetail } = props;
  const businessNo = params?.businessNo;
  const dispatch = useDispatch();
  const processData = useSelector((state: any) => get(state, `${NAMESPACE}.processData`, {}));
  const taskInfo = useSelector(({ insured360 }: any) => insured360?.taskInfo);
  const isLoading = useSelector(({ loading }: any) => loading.effects[`${NAMESPACE}/getSrvCase`]);
  const [indicator, setIndicator] = useState({});

  useEffect(() => {
    if (setTaskDetail) {
      if (isEmpty(taskDetail)) {
        const processInfo = {
          caseCategory: params?.caseCategory || 'BP_POS_CTG001',
          activityKey: 'BP_POS_ACT002',
          taskDefKey: 'BP_POS_ACT002',
          taskStatus: 'completed',
        };
        dispatch({
          type: 'processTask/save',
          payload: {
            getTask: processInfo,
          },
        });
        setTaskDetail(processInfo);
        (window as any).taskDetail = processInfo;
      }
    }
  }, [setTaskDetail]);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getSrvCase`,
      payload: {
        businessNo,
      },
    });
  }, []);
  useEffect(() => {
    if (!isEmpty(processData?.caseNo)) {
      getIndicator({ caseNo: processData.caseNo, setIndicator });
    }
    if (isEmpty(taskInfo) && !isEmpty(processData)) {
      dispatch({
        type: 'processTask/save',
        payload: {
          getTask: {
            ...processData,
            businessNo,
            caseCategory: params?.caseCategory || 'BP_POS_CTG001',
            activityKey: 'BP_POS_ACT002',
            taskDefKey: 'BP_POS_ACT002',
            taskStatus: 'completed',
          },
        },
      });
      const companyCode = window.history?.state?.companyCode;
      const historyState: IHistoryState = { ...processData, businessNo, companyCode };
      window.history.replaceState(historyState, '');
      setTaskDetail({
        ...processData,
        businessNo,
        activityKey: 'BP_POS_ACT002',
        taskDefKey: 'BP_POS_ACT002',
        taskStatus: 'completed',
      });
      (window as any).taskDetail = {
        ...processData,
        businessNo,
        activityKey: 'BP_POS_ACT002',
        taskDefKey: 'BP_POS_ACT002',
        taskStatus: 'completed',
      };
    }
  }, [processData, taskInfo, businessNo]);

  const buttonList = [
    {
      buttonCode: 'image',
      title: formatMessageApi({ Label_BPM_Button: 'image' }),
      action: () => {
        if (processData?.caseNo) {
          window.open(`/documentManage/${processData?.caseNo}`);
        }
      },
    },
    {
      buttonCode: 'back',
      title: formatMessageApi({ Label_BPM_Button: 'back' }),
      action: () => {
        history.back();
      },
    },
  ];

  return (
    <ServicingEntrance
      buttonList={buttonList}
      title={formatMessageApi({
        Label_BIZ_SRV: 'ServicingHistory',
      })}
      headerInfoConfig={getHeaderInfo({
        ...processData,
      })}
      indicator={indicator}
    >
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          {' '}
          <Spin />
        </div>
      ) : (
        <Decision
          taskDetail={{
            ...processData,
            businessNo,
            caseCategory: 'BP_POS_CTG001',
            activityKey: 'BP_POS_ACT002',
            taskDefKey: 'BP_POS_ACT002',
            taskStatus: 'completed',
          }}
          businessData={{
            ...processData,
            businessNo,
            caseCategory: 'BP_POS_CTG001',
            activityKey: 'BP_POS_ACT002',
            taskDefKey: 'BP_POS_ACT002',
            regionCode: tenant.region(),
          }}
          servicingHistory={{
            businessNo,
          }}
        />
      )}
    </ServicingEntrance>
  );
};

export default (props) => (
  <CaseTaskDetail.Consumer>
    <PHCFTDecision {...props} />
  </CaseTaskDetail.Consumer>
);
