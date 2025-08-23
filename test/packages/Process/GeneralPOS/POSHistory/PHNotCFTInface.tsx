import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { history } from 'umi';
import { get, isEmpty } from 'lodash';
import { POSEntrance as ServicingEntrance } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getHeaderInfo from './getHeaderInfo';
import { NAMESPACE } from './activity.config';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { tenant } from '@/components/Tenant';
import { Spin } from 'antd';
import Inface from '../PHNotCFT';
import { useParams } from 'umi';

interface IHistoryState {
  activityKey?: string | null;
  businessData?: any;
  caseAssessor?: string | null;
  caseCategory?: string;
  caseNo?: string;
  cfgFundList?: any | null;
  cft?: boolean;
  cftFlag?: string | null;
  creator?: string;
  crsFACTAUpdateFlag?: string | null;
  deleted?: number;
  externalCaseStatus?: string | null;
  fatcaInfo?: any | null;
  gmtCreate?: string;
  gmtModified?: string;
  id?: string;
  inquiryBusinessNo?: string | null;
  inquirySrvNo?: string;
  insuredInformation?: any;
  integrationLogList?: any[] | null;
  mainCompanyCode?: string | null;
  mainInsuredClientId?: string;
  mainOwnerClientId?: string;
  mainPayorClientId?: string | null;
  mainPolicyId?: string;
  modifier?: string;
  ntuFlag?: string | null;
  policyInfo?: any;
  policyOwnerInformation?: any;
  posRequestInformation?: any;
  preDecision?: string | null;
  qaRequired?: string | null;
  rcsApplicable?: string | null;
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
  transactionTypes?: any[];
  businessNo?: string;
  companyCode?: string;
}

const PHNotCFTInface = (props: any) => {
  const params = useParams();
  const { setTaskDetail, taskDetail } = props;
  const businessNo = params?.businessNo;
  const caseCategory = params?.caseCategory;
  const taskInfo = useSelector(({ insured360 }: any) => insured360?.taskInfo);
  const dispatch = useDispatch();
  const processData = useSelector((state: any) =>
    get(state, `${NAMESPACE}.claimProcessData.businessData`, {})
  );
  const isLoading = useSelector(({ loading }: any) => loading.effects[`${NAMESPACE}/getSrvCase`]);
  useEffect(() => {
    if (setTaskDetail) {
      if (isEmpty(taskDetail)) {
        const processInfo = {
          caseCategory: caseCategory,
          activityKey: 'BP_POS_ACT006',
          taskDefKey: 'BP_POS_ACT006',
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
    if (isEmpty(taskInfo) && !isEmpty(processData)) {
      const processInfo = {
        ...processData,
        businessNo,
        caseCategory: caseCategory,
        activityKey: 'BP_POS_ACT006',
        taskDefKey: 'BP_POS_ACT006',
        taskStatus: 'completed',
      };
      dispatch({
        type: 'processTask/save',
        payload: {
          getTask: processInfo,
        },
      });
      const companyCode = window.history?.state?.companyCode;
      const historyState: IHistoryState = { ...processData, businessNo, companyCode };
      window.history.replaceState(historyState, '');
      setTaskDetail(processInfo);
      // 为了获取数据字典的时候通过节点去过滤
      (window as any).taskDetail = processInfo;
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
    >
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          {' '}
          <Spin />
        </div>
      ) : (
        <Inface
          isPosHistory
          taskDetail={{
            ...processData,
            businessNo,
            caseCategory: caseCategory,
            activityKey: 'BP_POS_ACT006',
            taskDefKey: 'BP_POS_ACT006',
            taskStatus: 'completed',
          }}
          businessData={{
            ...processData,
            businessNo,
            caseCategory: caseCategory,
            activityKey: 'BP_POS_ACT006',
            taskDefKey: 'BP_POS_ACT006',
            regionCode: tenant.region(),
          }}
        />
      )}
    </ServicingEntrance>
  );
};

export default (props) => (
  <CaseTaskDetail.Consumer>
    <PHNotCFTInface {...props} />
  </CaseTaskDetail.Consumer>
);
