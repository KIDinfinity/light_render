import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { PolicyBenefitModal } from '../../_dto/Models';
import PolicyBenefit from './PolicyBenefit';

interface IPolicyBenefits {
  policyBenefitList?: any;
}

const PolicyBenefits: FunctionComponent<IPolicyBenefits> = ({ policyBenefitList }) => {
  return (
    <div>
      {lodash
        .chain(policyBenefitList)
        .orderBy('policyNo')
        .map((benefitItem: PolicyBenefitModal, index: number) => (
          <PolicyBenefit
            benefitItem={benefitItem}
            key={`${benefitItem?.policyNo}-${index}-${benefitItem?.id}`}
          />
        ))
        .value()}
    </div>
  );
};

export default connect(({ paymentAllocation }: any) => ({
  policyBenefitList: paymentAllocation.claimData.policyBenefitList,
}))(PolicyBenefits);
