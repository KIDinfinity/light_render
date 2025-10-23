import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const Fundfield = ({ form }: any) => {
  const editable = true;

  return (
    <Section form={form} editable={editable}>
      <Fields.Portfolioid />
      <Fields.Portfoliotype />
      <Fields.Autorebalancingtype />
      <Fields.Autorebalancingstatus />
      <Fields.Ulreserveunitdate />
    </Section>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  portfolioId: modelnamepsace?.businessData?.policyList?.[0]?.fundInfo?.portfolioId,
  portfolioType: modelnamepsace?.businessData?.policyList?.[0]?.fundInfo?.portfolioType,
  totalFundAllocation: modelnamepsace?.businessData?.policyList?.[0]?.fundInfo?.totalFundAllocation,
  ulReserveUnitDate: modelnamepsace?.businessData?.policyList?.[0]?.fundInfo?.ulReserveUnitDate,
  autoRebalancingStatus:
    modelnamepsace?.businessData?.policyList?.[0]?.fundInfo?.autoRebalancingStatus,
  autoRebalancingType: modelnamepsace?.businessData?.policyList?.[0]?.fundInfo?.autoRebalancingType,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setFundFieldData',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setFundFieldData',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const {
        portfolioId,
        portfolioType,
        totalFundAllocation,
        ulReserveUnitDate,
        autoRebalancingStatus,
        autoRebalancingType,
      } = props;

      return formUtils.mapObjectToFields({
        portfolioId,
        portfolioType,
        totalFundAllocation,
        ulReserveUnitDate,
        autoRebalancingStatus,
        autoRebalancingType,
      });
    },
  })(Fundfield)
);
