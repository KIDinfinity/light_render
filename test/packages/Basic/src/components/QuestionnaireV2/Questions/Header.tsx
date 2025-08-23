import React from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import {
  FormItemNumber,
  FormItemDatePicker,
  FormItemInput,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import styles from './header.less';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
function Header({ disabled = true, form, totalScore, fundRiskLevel, investorType }) {
  const NAMESPACE = useGetNamespace();
  const isNB = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isNB);
  const hiddenHeaderForm = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.hiddenHeaderForm
  );

  const dicts = getDrowDownList('Dropdown_FND_CustomerRiskTolerance');
  return (
    !isNB &&
    !hiddenHeaderForm && (
      <div className={styles.box}>
        <div className={styles.top}>
          <FormItemDatePicker
            form={form}
            labelId="submission_date"
            labelTypeCode="Label_COM_ReportCenter"
            formName="submissionDate"
            disabled={disabled}
          />
          <FormItemInput
            form={form}
            labelId="submission_channel"
            labelTypeCode="Label_COM_ReportCenter"
            formName="sourceType"
            disabled={disabled}
          />
        </div>
        <div className={styles.bottom}>
          {!lodash.isNil(totalScore) && (
            <FormItemNumber
              form={form}
              labelId="qnscore"
              labelTypeCode="Label_BIZ_Individual"
              formName="totalScore"
              precision={0}
              disabled={disabled}
            />
          )}
          {!lodash.isNil(fundRiskLevel) && (
            <FormItemNumber
              form={form}
              labelId="CustomerRiskLevel"
              labelTypeCode="Label_BIZ_Individual"
              formName="fundRiskLevel"
              precision={0}
              disabled={disabled}
            />
          )}
          {!lodash.isNil(investorType) && (
            <FormItemSelect
              dicts={dicts}
              form={form}
              labelId="CustomerRiskcategory"
              labelTypeCode="Label_BIZ_Individual"
              formName="investorType"
              disabled={disabled}
            />
          )}
        </div>
      </div>
    )
  );
}

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    // onFieldsChange(props: any, changedFields: any) {
    //   const { dispatch, validating } = props;
    //   // if (formUtils.shouldUpdateState(changedFields)) {
    //   //   if (validating) {
    //   //     setTimeout(() => {
    //   //       dispatch({
    //   //         type: `${NAMESPACE}/saveEntry`,
    //   //         target: 'saveRenewalPaymentFieldData',
    //   //         payload: {
    //   //           changedFields,
    //   //         },
    //   //       });
    //   //     }, 0);
    //   //   } else {
    //   //     dispatch({
    //   //       type: `${NAMESPACE}/saveFormData`,
    //   //       target: 'saveRenewalPaymentFieldData',
    //   //       payload: {
    //   //         changedFields,
    //   //       },
    //   //     });
    //   //   }
    //   // }
    // },
    mapPropsToFields(props) {
      return formUtils.mapObjectToFields(props);
    },
  })(Header)
);
