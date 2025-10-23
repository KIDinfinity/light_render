import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import BenefitLevelDecision from 'opus/NewBusiness/Enum/BenefitLevelDecision';
import Section, {
  Fields,
} from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/BenefitDecision';

const BenefitDecision = ({ form, record, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable}>
      <Fields.UwDecision id={id} isMain={record?.isMain} record={record} />
    </Section>
  );
};

const BenefitDecisionSection = connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, record }: any = props;
      const id = record?.id;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setBenefitSection',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setBenefitSection',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { record } = props;
      const value = formUtils.queryValue(lodash.get(record?.coverageDecision, 'uwDecision'));
      return formUtils.mapObjectToFields({
        ...record?.coverageDecision,
        uwDecision:
          value &&
          ![
            BenefitLevelDecision.Standard,
            BenefitLevelDecision.Postpone,
            BenefitLevelDecision.Decline,
            BenefitLevelDecision.NonStandard,
          ].includes(value)
            ? formatMessageApi({
                Dropdown_UW_BenefitDecision: value,
              })
            : lodash.get(record?.coverageDecision, 'uwDecision'),
      });
    },
  })(BenefitDecision)
);

BenefitDecisionSection.displayName = 'benefitDecisionSection';

export default BenefitDecisionSection;
