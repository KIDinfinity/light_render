import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, FormAntCard } from 'basic/components/Form';
import { formatExchangeRecord } from 'claim/pages/utils/formatExchangeRecord';
import Section, { SectionTitle, Fields } from './Section';
import styles from './AssessmentResult.less';

const AssessmentResult = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.result}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="ClaimResult">
          <Fields.AssessmentDecision />
          <Fields.TotalPayableAmount />
          <Fields.SkipIntegration />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  claimDecision: lodash.get(modelnamepsace, 'claimProcessData.claimDecision'),
  skipIntegration: lodash.get(modelnamepsace, 'claimProcessData.skipIntegration', 'N'),
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveClaimDecision',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveClaimDecision',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { claimDecision, skipIntegration }: any = props;
      return formUtils.mapObjectToFields(
        { ...claimDecision, rateRecord: claimDecision?.exchangeRateRecord, skipIntegration },
        {
          totalPayableAmount: (value: any) => value,
          assessmentDecision: (value: any) => value,
          rateRecord: (value: any) => formatExchangeRecord(value),
        }
      );
    },
  })(AssessmentResult)
);
