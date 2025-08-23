import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, FormAntCard } from 'basic/components/Form';
import { formatExchangeRecord } from 'claim/pages/utils/formatExchangeRecord';
import { getClaimResultUncoverAmount } from '../_utils/getClaimResultUncoverAmount';
import Section, { SectionTitle, Fields } from './Section';
import styles from './AssessmentResult.less';

const AssessmentResult = ({
  form,
  dispatch,
  claimDecision,
  invoiceListMap,
  invoicePayableListMap,
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    const oldUncoverAmount = claimDecision?.uncoverAmount;
    const newUncoverAmount = getClaimResultUncoverAmount({
      invoiceListMap,
      invoicePayableListMap,
    });

    if (
      Number(formUtils.queryValue(oldUncoverAmount)) !==
      Number(formUtils.queryValue(newUncoverAmount))
    ) {
      dispatch({
        type: `${NAMESPACE}/saveClaimDecision`,
        payload: {
          changedFields: {
            uncoverAmount: newUncoverAmount,
          },
        },
      });
    }
  }, [invoiceListMap, invoicePayableListMap]);

  return (
    <div className={styles.result}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="ClaimResult" justify="center">
          <Fields.AssessmentDecision />
          <Fields.AssessmentRemark />
          <Fields.RateRecord />
          <Fields.TotalPayableAmount />
          <Fields.UncoverAmount />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimDecision: lodash.get(modelnamepsace, 'claimProcessData.claimDecision'),
  invoiceListMap: lodash.get(modelnamepsace, 'claimEntities.invoiceListMap') || {},
  invoicePayableListMap: lodash.get(modelnamepsace, 'claimEntities.invoicePayableListMap') || {},
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveClaimDecision',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { claimDecision }: any = props;
      return formUtils.mapObjectToFields(
        {
          ...claimDecision,
          rateRecord: claimDecision?.exchangeRateRecord,
        },
        {
          totalPayableAmount: (value: any) => value,
          assessmentDecision: (value: any) => value,
          rateRecord: (value: any) => formatExchangeRecord(value),
        }
      );
    },
  })(AssessmentResult)
);
