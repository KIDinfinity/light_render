import type { FunctionComponent } from 'react';
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import { FormItemInput, FormItemSelect } from 'basic/components/Form/FormItem';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import { withContextData } from '@/components/_store';
import type { ContactModal } from '../../../_dto/Models';
import { shallowEqual } from '../../../_function';

export interface IContact extends IFormRegistProps {
  contactItem?: ContactModal;
  taskNotEditable?: boolean;
  withData?: any;
  validating?: boolean;
  Dropdown_POL_ContactNoType?: any[];
  Dropdown_CLM_SMS?: any[];
}

const Contact: FunctionComponent<IContact> = ({
  form,
  taskNotEditable,
  Dropdown_CLM_SMS,
  Dropdown_POL_ContactNoType,
}) => {
  return (
    <DataLayout span={8}>
      <FormItemSelect
        form={form}
        disabled={taskNotEditable}
        formName="contactType"
        labelId="ContactType"
        labelTypeCode="Label_BIZ_Policy"
        dicts={Dropdown_POL_ContactNoType}
      />
      <FormItemInput
        form={form}
        disabled={taskNotEditable}
        formName="telNo"
        labelId="PhoneNoAndFPSID"
        labelTypeCode="Label_BIZ_Individual"
      />
      <FormItemSelect
        form={form}
        disabled={taskNotEditable}
        formName="sms"
        labelId="SMS"
        dicts={Dropdown_CLM_SMS}
      />
    </DataLayout>
  );
};

const FormWrap = Form.create<IContact>({
  mapPropsToFields(props) {
    const { contactItem } = props;

    return formUtils.mapObjectToFields(contactItem);
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, contactItem, withData, validating } = props;
    const payeeId = lodash.get(withData, 'payeeItem.id', '');

    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'saveContact',
            payload: {
              changedFields,
              id: contactItem?.id,
              payeeId,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'saveContact',
          payload: {
            changedFields,
            id: contactItem?.id,
            payeeId,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(Contact, shallowEqual)));

export default connect(({ claimEditable, formCommonController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
  Dropdown_POL_ContactNoType: dictionaryController.Dropdown_POL_ContactNoType,
  Dropdown_CLM_SMS: dictionaryController.Dropdown_CLM_SMS,
}))(withContextData(FormWrap));
