import type { FunctionComponent } from 'react';
import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Panel from '../../_components/Panel';
import type { PolicyBenefitModal, BeneficiaryModal } from '../../_dto/Models';
import PolicyInfo from './PolicyInfo';
import Beneficiary from './Beneficiary';

import styles from './styles.less';

export interface IPolicyBenefit {
  benefitItem: PolicyBenefitModal;
  taskNotEditable?: boolean;
  dispatch?: any;
  c360BeneficiaryInfo?: any;
}

const PolicyBenefit: FunctionComponent<IPolicyBenefit> = ({
  benefitItem,
  taskNotEditable,
  dispatch,
  c360BeneficiaryInfo,
}) => {
  const { policyNo, policyHolder, policyType, clientId } = lodash.pick(benefitItem, [
    'policyNo',
    'policyHolder',
    'policyType',
    'clientId',
  ]);
  const { beneficiaryList, id } = lodash.pick(benefitItem, ['beneficiaryList', 'id']);
  const { firstName, surname } =
    lodash.find(c360BeneficiaryInfo?.policyOwnerList, {
      clientId,
    }) || {};

  const handleAdd = () => {
    dispatch({
    type: 'paymentAllocation/addBenefitciary',
      payload: {
        benefitItem,
      },
    });
  };

  const handleClose = (beneficiary: BeneficiaryModal) => {
    dispatch({
      type: 'paymentAllocation/deleteBeneficiary',
      payload: {
        policyBenefitId: id,
        beneficiaryId: beneficiary.id,
        policyNo,
      },
    });
  };

  return (
    <div className={styles.PolicyBenefit}>
      <PolicyInfo policy={{ policyNo, policyHolder, policyType, firstName, surname }} />
      {lodash
        .chain(beneficiaryList)
        .compact()
        .map((beneficiaryItem: BeneficiaryModal, index: number) => (
          <Panel.BackColor
            className={styles.PolicyBenefitItem}
            onClose={() => handleClose(beneficiaryItem)}
            closable={!taskNotEditable}
            key={`${beneficiaryItem.id}-${index}`}
          >
            <Beneficiary beneficiaryItem={beneficiaryItem} benefitItem={benefitItem} />
          </Panel.BackColor>
        ))
        .value()}
      {!taskNotEditable && (
        <ButtonOfClaim
          handleClick={handleAdd}
          className={styles.AddPolicyBenefit}
          buttonText={formatMessageApi({
            Label_BPM_Button: 'AddBE',
          })}
        />
      )}
    </div>
  );
};

export default connect(({ claimEditable, paymentAllocation }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  c360BeneficiaryInfo: paymentAllocation.claimData?.c360BeneficiaryInfo,
}))(PolicyBenefit);
