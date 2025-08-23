import type { FunctionComponent} from 'react';
import React, { useMemo } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import { FormItemInput, FormItemSelect } from 'basic/components/Form/FormItem';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal } from '../../_dto/Models';
import { shallowEqual, getBeneficiaryName, getStrVal } from '../../_function';

export interface IPolicy extends IFormRegistProps {
  policy?: PolicyBenefitModal;
  validating?: boolean;
  Dropdown_POL_PolicyType: any[];
}

const Policy: FunctionComponent<IPolicy> = ({ form, Dropdown_POL_PolicyType, policy }) => {
  const { policyNo, policyHolder, policyType } = policy || {};

  return useMemo(() => {
    return (
      <DataLayout span={8} style={{ width: '75%', marginBottom: '8px' }}>
        <FormItemInput form={form} formName="policyNo" labelId="PolicyNo" disabled />
        <FormItemSelect
          form={form}
          formName="policyType"
          labelId="PolicyType"
          dicts={Dropdown_POL_PolicyType}
          disabled
        />
        <FormItemInput
          form={form}
          formName="policyHolder"
          labelId="PolicyOwner"
          labelTypeCode="Label_BIZ_Individual"
          disabled
        />
      </DataLayout>
    );
  }, [policyNo, policyHolder, policyType, Dropdown_POL_PolicyType]);
};

const FormWrap = Form.create<IPolicy>({
  mapPropsToFields(props) {
    const { policy } = props;
    const { firstName, surname } = policy || {};
    const beneficiaryVal = getBeneficiaryName(firstName, surname);

    return formUtils.mapObjectToFields(policy, {
      policyHolder: (value: string) => (firstName || surname ? getStrVal(beneficiaryVal) : value),
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, policy, validating } = props;

    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'savePolicy',
            payload: {
              changedFields,
              policyNo: formUtils.queryValue(policy?.policyNo),
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'savePolicy',
          payload: {
            changedFields,
            policyNo: formUtils.queryValue(policy?.policyNo),
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(Policy, shallowEqual)));

export default connect(({ formCommonController, dictionaryController }: any) => ({
  validating: formCommonController.validating,
  Dropdown_POL_PolicyType: dictionaryController.Dropdown_POL_PolicyType,
}))(FormWrap);
