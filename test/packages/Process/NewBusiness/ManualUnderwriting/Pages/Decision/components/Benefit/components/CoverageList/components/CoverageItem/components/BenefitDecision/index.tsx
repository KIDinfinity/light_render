import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/BenefitDecision';

const BenefitDecision = ({ form, record, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable}>
      <Fields.UwDecision id={id} isMain={record?.isMain} record={record} />
    </Section>
  );
};

const BenefitDecisionSection = connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, record }: any = props;
      const id = record?.id;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setBenefitSection',
          payload: {
            changedFields,
            id,
          },
        });
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
