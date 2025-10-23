import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils, FormAntCard } from 'basic/components/Form';
import { formatExchangeRecord } from 'claim/pages/utils/formatExchangeRecord';
import Section, { SectionTitle, Fields } from './AssessmentResultSection';
import styles from './AssessmentResult.less';

const AssessmentResult = ({ form }: any) => {
  return (
    <div className={styles.result}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={false} section="ClaimResult">
          <Fields.AssessmentDecision />
          <Fields.AssessmentRemark />
          <Fields.TotalPayableAmount />
          <Fields.SettlementDate />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  claimDecision: lodash.get(modelnamepsace, 'claimProcessData.claimDecision'),
  externalSettledDate: lodash.get(modelnamepsace, 'claimProcessData.externalSettledDate'),
  validating: formCommonController.validating,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { claimDecision, externalSettledDate }: any = props;

      return formUtils.mapObjectToFields(
        { ...claimDecision, rateRecord: claimDecision?.exchangeRateRecord, settlementDate: externalSettledDate },
        {
          totalPayableAmount: (value: any) => value,
          assessmentDecision: (value: any) => value,
          rateRecord: (value: any) => formatExchangeRecord(value)?.replace(/\(.*\)/, ''),
        }
      );
    },
  })(AssessmentResult)
);
