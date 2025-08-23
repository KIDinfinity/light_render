import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'dva';
import lodash from 'lodash';
import SectionTitle from 'claim/components/SectionTitle';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PhilipinsAppeal from 'claim/pages/Philippines/ProcessOfPHICLM/ClaimAppeal/ClaimHistory';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HistorySider from 'claim/pages/HistorySider';
import { denormalizeClaimData } from '@/utils/claimUtils';
import AppealInformation from '../ManualAssessment/AppealInformation/Common';
import CaseInformation from '../ManualAssessment/CaseInformation';
import BasicInfo from './BasicInfo';

import styles from './styles.less';

interface IProps {
  params: any;
  businessData: any;
  getCaseNoByBusinessNo: string;
}

const AppealHistory: FunctionComponent<IProps> = ({
  claimProcessData,
  claimEntities,
  params,
  getCaseNoByBusinessNo,
  ...res
}) => {
  const dispatch = useDispatch();

  const { claimData, appealRelateCase, taskNotEditable } = useSelector(
    ({ MaAppealCaseController, claimEditable }: any) => ({
      claimData: MaAppealCaseController.originalCase,
      appealRelateCase: MaAppealCaseController.appealRelateCase,
      taskNotEditable: claimEditable.taskNotEditable,
    })
  );

  const dataEditable = taskNotEditable;

  useEffect(() => {
    return () => {
      dispatch({
        type: 'MaAppealCaseController/clearClaimProcessData',
      });
    };
  }, []);
  const result = denormalizeClaimData(claimProcessData, claimEntities);

  return (
    <>
      <TaskDetailHeader
        taskStatus=""
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail.title.claim-inquiry',
        })}
      >
        {claimData && (
          <BasicInfo
            caseNo={getCaseNoByBusinessNo}
            caseCategory={params.caseCategory}
            claimProcessData={claimData}
          />
        )}
      </TaskDetailHeader>
      <div className={styles.container}>
        <HistorySider
          claimNo={params.claimNo}
          caseCategory={params.caseCategory}
          caseNo={getCaseNoByBusinessNo}
          result={result}
        />
        <div style={{flex: 1}}>
          <SectionTitle
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.claim.appealInformation',
            })}
          />
          <AppealInformation dataEditable={dataEditable} />
          {lodash.size(appealRelateCase) > 0 && (
            <SectionTitle
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.claim.caseInformation',
              })}
            />
          )}
          <CaseInformation hasInquiryClaimNo={dataEditable} />
          {!lodash.isEmpty(claimData) && (
            <SectionTitle
              title={formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-claim-assessment.title.assessment-information',
              })}
            />
          )}
          {!lodash.isEmpty(claimData) && (
            <PhilipinsAppeal businessData={claimData} params={params} {...res} />
          )}
        </div>
      </div>
    </>
  );
};

export default connect(({ workspaceHistory, PHCLMOfAppealCaseController }: any) => ({
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
  claimProcessData: PHCLMOfAppealCaseController.claimProcessData,
  claimEntities: PHCLMOfAppealCaseController.claimEntities,
}))(setClaimEditableHoc(AppealHistory));
