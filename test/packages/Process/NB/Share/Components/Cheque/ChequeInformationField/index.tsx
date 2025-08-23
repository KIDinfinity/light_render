import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import Section, { Fields } from './Section';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';

const Chequeinformationfield = ({ form, displayWarning }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable}>
      <Fields.Chequeno displayWarning={displayWarning} />

      <Fields.Chequedate />

      <Fields.Chequeissuebank />

      <Fields.Chequeamount />

      <Fields.Chequeformultipleapplication />

      <Fields.Chequecurrency />
    </Section>
  );
};

const ChequeSection = connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { data, dispatch, nameSpace } = props;
      dispatch({
        type: `${nameSpace}/setChequeInfo`,
        payload: {
          id: data?.id,
          changedFields,
        },
      });
    },
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields({
        ...data,
      });
    },
  })(Chequeinformationfield)
);

ChequeSection.displayName = 'ChequeField';

export default ChequeSection;
