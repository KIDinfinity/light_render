import type { FunctionComponent} from 'react';
import React, { useMemo } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import DataLayout from '@/components/DataLayout';
import { FormItemSelect } from 'basic/components/Form/FormItem';
import type { PayeeModal } from '../../../_dto/Models';
import { shallowEqual } from '../../../_function';

export interface IBankAccount extends IFormRegistProps {
  taskNotEditable?: boolean;
  forms?: any;
  payeeItem?: PayeeModal;
  validating?: boolean;
  payeeMapform?: any;
  Dropdown_POS_SrcBank_Bank?: any[];
}

const BankCheckAccount: FunctionComponent<IBankAccount> = ({
  taskNotEditable,
  form,
  payeeItem,
  Dropdown_POS_SrcBank_Bank,
}) => {
  return useMemo(() => {
    return (
      <DataLayout span={24} style={{ width: '50%' }}>
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="sourceBank"
          dicts={Dropdown_POS_SrcBank_Bank}
          labelId="SrcBank"
          required
        />
      </DataLayout>
    );
  }, [payeeItem, Dropdown_POS_SrcBank_Bank, form]);
};

const FormWrap = Form.create<IBankAccount>({
  mapPropsToFields(props) {
    const { payeeItem } = props;
    const { sourceBank } = payeeItem || {};

    return formUtils.mapObjectToFields(
      { sourceBank },
      {
        sourceBank: (value: any) => value,
      }
    );
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeItem, validating } = props;
    const changedFieldsTemp = { ...changedFields };
    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'savePayeeInfo',
            payload: {
              changedFields: {
                ...changedFieldsTemp,
              },
              id: payeeItem?.id,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'savePayeeInfo',
          payload: {
            changedFields: {
              ...changedFieldsTemp,
            },
            id: payeeItem?.id,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(BankCheckAccount, shallowEqual)));

export default connect(
  ({ formCommonController, claimEditable, dictionaryController, paymentAllocation }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    forms: paymentAllocation.forms,
    Dropdown_POS_SrcBank_Bank: dictionaryController.Dropdown_POS_SrcBank_Bank,
    validating: formCommonController.validating,
  })
)(FormWrap);
