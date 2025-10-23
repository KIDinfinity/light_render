import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash, { compact } from 'lodash';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PolicyBenefitItem from './PolicyBenefitListItem';

import styles from './PolicyList.less';

interface ISProps {
  daOfClaimAssessmentController?: any;
  policyBenefitList?: any;
}

@connect(({ daOfClaimAssessmentController }: any) => ({
  claimEntities: daOfClaimAssessmentController.claimEntities,
  policyBenefitList: lodash.get(
    daOfClaimAssessmentController,
    'claimProcessData.policyBenefitList'
  ),
}))
class PolicyBenefitList extends PureComponent<ISProps> {
  render() {
    const { policyBenefitList } = this.props;

    return (
      <div className={styles.PolicyListWrap}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-claim-assessment.beneficiary.titel.policy-benefit',
          })}
          bordered={false}
        >
          {lodash.map(compact(policyBenefitList), (id: any) => (
            // @ts-ignore
            <PolicyBenefitItem policyBenefitId={id} key={id} />
          ))}
        </Card>
      </div>
    );
  }
}

export default PolicyBenefitList;
