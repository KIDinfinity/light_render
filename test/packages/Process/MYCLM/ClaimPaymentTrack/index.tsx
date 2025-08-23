import React, { Component } from 'react';
import { NAMESPACE } from './activity.config';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import type { IPolicy } from '@/dtos/claim';
import PageContainer from 'basic/components/Elements/PageContainer';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import eSubmimnssionValidation from 'bpm/components/Hoc/eSubmimnssionValidation';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import AssessmentInfo from './AssessmentInfo';
import PaymentTrackDetailList from './PaymentTrackDetailList';
import PolicyPaymentInfoList from './PolicyPaymentInfoList';

import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  claimEntities: any;
  userId: string;
  submited: boolean;
  taskDetail: any;
  dictsClaimType: IDictionary[];
  saveSnapshot: Function;
  listPolicy: IPolicy[];
}

@connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  return: modelnamepsace,
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
@eSubmimnssionValidation(NAMESPACE)
class ClaimPaymentTrack extends Component<IProps> {
  componentDidMount = async () => {
    const { dispatch, businessData = {} }: any = this.props;

    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: { businessData },
    });
  };

  render() {
    const { taskDetail } = this.props;

    return (
      <div className={styles.wrap}>
        <PageContainer pageConfig={taskDetail}>
          <AssessmentInfo />
          <PolicyPaymentInfoList />
          <PaymentTrackDetailList />
        </PageContainer>
      </div>
    );
  }
}

export default ClaimPaymentTrack;
