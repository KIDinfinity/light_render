import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/financialInfoTable';


const FinancialItem = ({ clientId, form, crtInfoList }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  // useEffect(() => {
  //   form.resetFields();
  // }, [form]);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
      itemTable
      distinguishFormId="taxCountryAdd"
    >
      <Fields.CountryofTaxResidenceAdd crtInfoList={crtInfoList} />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any) => ({
  addFinancial: modelnamepsace.modalData.addFinancial,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    // onValuesChange(props: any, changedValues: any) {
    //   const { dispatch, clientId } = props;
    //   dispatch({
    //     type: `${NAMESPACE}/addFinancialInfo`,
    //     payload: {
    //       id: clientId,
    //       changedValues,
    //     },
    //   });
    // },
    onFieldsChange(props: any, changedFields: any) {
      const { loadingStatus, dispatch, clientId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'addFinancialInfo',
          payload: {
            changedFields,
            id: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { addFinancial } = props;
      return formUtils.mapObjectToFields(addFinancial);
    },
  })(FinancialItem)
);
