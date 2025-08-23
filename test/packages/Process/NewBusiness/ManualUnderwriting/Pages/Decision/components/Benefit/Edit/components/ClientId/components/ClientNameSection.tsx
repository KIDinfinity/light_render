import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection/index';
import useGetPlaninfotableEditable from 'decision/components/Benefit/_hooks/useGetPlaninfotableEditable';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Fields, localConfig } from 'decision/SectionFields/UWDecision-Table';

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
      formId={`UWDecision-Table-ClientName${item.id}`}
    >
      <Fields.Clientid disabledForMain={disabledForMain} item={item} />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, data, item }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setClientNameSection',
          payload: {
            insuredId: data?.id,
            coverageId: item?.id,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(ClientNameSection)
);
