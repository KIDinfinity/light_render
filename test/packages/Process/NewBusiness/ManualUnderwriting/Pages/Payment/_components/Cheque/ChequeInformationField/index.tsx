import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ChequeEditStatus from 'process/NewBusiness/Enum/ChequeEditStatus';
import { formUtils } from 'basic/components/Form';

const Chequeinformationfield = ({ form, showOnly = false, displayWarning }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const chequeEditStatus: any =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeEditStatus) || '';
  return (
    <Section
      form={form}
      editable={editable && !showOnly && chequeEditStatus !== ChequeEditStatus.Verified}
      formId="ChequeInformation-Field"
      showOnly={showOnly}
      register={!showOnly}
    >
      <Fields.Chequeno displayWarning={displayWarning} />
      <Fields.Chequedate />
      <Fields.Chequeissuebank />
      <Fields.Chequeamount />
      <Fields.Chequeformultipleapplication />
      <Fields.Chequecurrency />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      dispatch({
        type: `${NAMESPACE}/saveChequeInfo`,
        payload: {
          id: data?.id,
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields({
        ...data,
      });
    },
  })(Chequeinformationfield)
);
