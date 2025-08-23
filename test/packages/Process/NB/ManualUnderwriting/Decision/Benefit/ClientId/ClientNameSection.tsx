import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import useGetPlaninfotableEditable from 'process/NB/ManualUnderwriting/_hooks/useGetPlaninfotableEditable';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from 'process/NB/ManualUnderwriting/Decision/Benefit/Section';

const ClientNameSection = ({ form, item, disabled }: any) => {
  const disabledForMain = item?.isMain === 'Y';
  const editable = useGetPlaninfotableEditable();
  const notManualRemove = lodash.get(item, 'notManualRemove') === 'Y';
  return (
    <Section
      editable={editable && !notManualRemove}
      section="UWDecision-Table"
      form={form}
      localConfig={localConfig}
      layoutName="clientNameList"
      disabled={disabled}
    >
      <Fields.Clientid disabledForMain={disabledForMain} item={item} />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, data, item }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setClientNameSection',
              payload: {
                insuredId: data?.id,
                coverageId: item?.id,
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'setClientNameSection',
              payload: {
                insuredId: data?.id,
                coverageId: item?.id,
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(ClientNameSection)
);
