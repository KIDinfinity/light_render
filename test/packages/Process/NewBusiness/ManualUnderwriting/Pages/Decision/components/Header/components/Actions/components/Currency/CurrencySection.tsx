import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/UWDecision';

const CurrencySection = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="UWDecision.Currency">
      <Fields.CurrencyCode />
    </Section>
  );
};

const DataComponent = connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  policyList: lodash.get(modelnamepsace, 'processData.planInfoData', {}),
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setCurrencySection',
          payload: {
            currencyCode: formUtils.queryValue(changedFields?.currencyCode),
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { policyList } = props;
      return formUtils.mapObjectToFields(policyList);
    },
  })(CurrencySection)
);

DataComponent.displayName = 'currencySection';

export default DataComponent;
