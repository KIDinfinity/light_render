import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import BenefitLevelDecision from 'process/NB/Enum/BenefitLevelDecision';
import Section, { Fields } from './Section';

const BenefitDecision = ({ form, record, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable}>
      <Fields.UwDecision id={id} isMain={record?.isMain} />
    </Section>
  );
};

const BenefitDecisionSection = connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, record }: any = props;
      const { id }: any = record;
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
      return formUtils.mapObjectToFields({
        ...record?.coverageDecision,
        uwDecision: ![
          BenefitLevelDecision.Standard,
          BenefitLevelDecision.Postpone,
          BenefitLevelDecision.Decline,
          BenefitLevelDecision.NonStandard,
        ].includes(formUtils.queryValue(lodash.get(record?.coverageDecision, 'uwDecision')))
          ? formatMessageApi({
              Dropdown_UW_BenefitDecision: formUtils.queryValue(
                lodash.get(record?.coverageDecision, 'uwDecision')
              ),
            })
          : formUtils.queryValue(lodash.get(record?.coverageDecision, 'uwDecision')),
      });
    },
  })(BenefitDecision)
);

BenefitDecisionSection.displayName = 'benefitDecisionSection';

export default BenefitDecisionSection;
