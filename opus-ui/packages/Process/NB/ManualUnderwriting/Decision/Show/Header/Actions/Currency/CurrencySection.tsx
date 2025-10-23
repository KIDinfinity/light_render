import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, { Fields } from 'process/NB/ManualUnderwriting/Decision/Policy/Decision/Section';

const CurrencySection = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="UWDecision.Currency">
      <Fields.CurrencyCode />
    </Section>
  );
};

const DataComponent = connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  policyList: lodash.get(modelnamepsace, 'businessData.policyList[0]', {}),
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setCurrencySection',
              payload: {
                currencyCode: formUtils.queryValue(changedFields?.currencyCode),
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setCurrencySection',
            payload: {
              currencyCode: formUtils.queryValue(changedFields?.currencyCode),
            },
          });
        }
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
