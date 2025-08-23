import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector, connect } from 'dva';
import lodash from 'lodash';
import SectionTitle from 'claim/components/SectionTitle';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PhilipinsAppeal from 'claim/pages/Philippines/ProcessOfPHICLM/ClaimAppeal/Entry';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import AppealInformation from './AppealInformation/Common';
import CaseInformation from './CaseInformation';
import styles from './index.less';

interface IProps {
  taskDetail: any;
  businessData: any;
  loading?: boolean;
}

const AppealLayout: FunctionComponent<IProps> = ({ taskDetail, businessData, loading }) => {
  const dispatch = useDispatch();

  const { claimData, appealRelateCase, taskNotEditable } = useSelector(
    ({ MaAppealCaseController, claimEditable }: any) => ({
      claimData: MaAppealCaseController.originalCase,
      appealRelateCase: MaAppealCaseController.appealRelateCase,
      taskNotEditable: claimEditable.taskNotEditable,
    })
  );
  const dataEditable = taskNotEditable || !!taskDetail.inquiryBusinessNo;

  useEffect(() => {
    dispatch({
      type: 'MaAppealCaseController/saveClaimProcessData',
      payload: {
        businessData,
        taskNotEditable: !!taskDetail.inquiryBusinessNo,
      },
    });
    const claimAppealRelateCaseInfo = lodash.get(businessData, 'claimAppealRelateCaseInfo', {});

    if (!lodash.isEmpty(claimAppealRelateCaseInfo)) {
      dispatch({
        type: 'MaAppealCaseController/saveAppealRelateCase',
        payload: [claimAppealRelateCaseInfo],
      });
    }
    return () => {
      dispatch({
        type: 'MaAppealCaseController/clearClaimProcessData',
      });
    };
  }, []);

  return (
    <>
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
      <SectionTitle
        title={formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-claim-assessment.title.assessment-information',
        })}
      />
      {loading ? (
        <div className={styles.spinLoading}>
          <Spin />
        </div>
      ) : null}
      {!lodash.isEmpty(claimData) && (
        <PhilipinsAppeal taskDetail={taskDetail} businessData={claimData} />
      )}
    </>
  );
};

export default connect(({ loading }: any) => ({
  loading: loading.effects['MaAppealCaseController/copyOriginalCase'],
}))(setClaimEditableHoc(AppealLayout));
