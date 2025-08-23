import type { FunctionComponent } from 'react';
import React from 'react';
import { Form, Input } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemAutoComplete,
} from 'basic/components/Form/FormItem';
import claimSearchAddressService from '@/services/claimSearchAddressService';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getByMessageType from 'claim/utils/getByMessageType';
import { formUtils } from 'basic/components/Form';
import { withContextData } from '@/components/_store';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { callReducer, actions } from '../../../_hooks';
import type { ContactModal, PayeeModal } from '../../../_dto/Models';
import { shallowEqual } from '../../../_function';
import { EPaymentMethod, EContactType } from '../../../_dto/Enums';

export interface IContact extends IFormRegistProps {
  contactItem: ContactModal;
  payeeItem: PayeeModal;
  taskNotEditable?: boolean;
  withData?: any;
  validating?: boolean;
  Dropdown_POL_ContactNoType?: any[];
  Dropdown_CLM_SMS?: any[];
}

let address: string = '';
let ditcPostCode: any = null;

const Contact: FunctionComponent<IContact> = ({
  form,
  payeeItem,
  contactItem,
  taskNotEditable,
  Dropdown_CLM_SMS,
  Dropdown_POL_ContactNoType,
}) => {
  const [state, uDispatch]: any = callReducer({ warningMessage: '' });
  const { paymentMethod } = payeeItem;
  const { contactType } = contactItem;
  const paymentMethodVal = formUtils.queryValue(paymentMethod);
  const contactTypeVal = formUtils.queryValue(contactType);
  const VLD_000344 = paymentMethodVal === EPaymentMethod.FasterPayment;
  const VLD_000342 = paymentMethodVal === EPaymentMethod.ElevenCash;
  const VLD_000345 =
    VLD_000344 && lodash.includes([EContactType.FPSId, EContactType.MobilePhone], contactTypeVal);

  const VLD_000346 = VLD_000344 && contactTypeVal === EContactType.Email;
  const handleZipCodeSearch = async (value: string) => {
    if (lodash.size(value) < 6) return [];

    const param = (value.match(/[0-9]\d*/g) || []).join('');
    const response: any = await claimSearchAddressService.search(param);
    if (response?.success && response?.resultData) {
      const fieldName = formatMessageApi({
        Label_BIZ_Policy: 'ZipCode',
      });
      ditcPostCode = response.resultData;
      if (lodash.isEmpty(ditcPostCode)) {
        const messageType = getByMessageType('WRN_000053', MessageType.Information);
        const warningMessage = [
          {
            messageType,
            message: formatMessageApi({ Label_COM_WarningMessage: 'WRN_000053' }, fieldName),
          },
        ];
        uDispatch({
          type: actions.SAVEWARNINGMESSAGE,
          payload: {
            warningMessage,
          },
        });
      }
      return lodash.map(ditcPostCode, (item: any) => item.postCode);
    }

    return [];
  };
  const handleZipCodeChange = (value: string) => {
    const target = lodash.find(ditcPostCode, { postCode: value });
    address = !lodash.isEmpty(target)
      ? `${target?.cityTown}${target?.prefecture}${target?.street}`
      : '';
  };

  return (
    <>
      <DataLayout span={8}>
        <FormItemSelect
          form={form}
          required={VLD_000344}
          disabled={taskNotEditable}
          formName="contactType"
          labelId="ContactType"
          labelTypeCode="Label_BIZ_Policy"
          dicts={Dropdown_POL_ContactNoType}
        />
        <FormItemInput
          form={form}
          required={VLD_000342 || VLD_000345}
          disabled={taskNotEditable}
          formName="telNo"
          maxLength={20}
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
      <DataLayout span={12}>
        <FormItemInput
          form={form}
          required={VLD_000346}
          disabled={taskNotEditable}
          formName="email"
          labelId="EmailAddress"
          maxLength={60}
          labelTypeCode="Label_BIZ_Policy"
        />
        <FormItemAutoComplete
          form={form}
          disabled={taskNotEditable}
          formName="postCode"
          defaultValue={form.getFieldValue('postCode')}
          onSearch={handleZipCodeSearch}
          onChange={handleZipCodeChange}
          warningMessage={state?.warningMessage}
          labelId="ZipCode"
          labelTypeCode="Label_BIZ_Policy"
        >
          <Input maxLength={40} />
        </FormItemAutoComplete>
      </DataLayout>
      <DataLayout span={24}>
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="address"
          maxLength={240}
          labelId="ContactAddr"
          labelTypeCode="Label_BIZ_Policy"
        />
      </DataLayout>
    </>
  );
};

const FormWrap = Form.create<IContact>({
  mapPropsToFields(props) {
    const { contactItem } = props;
    return formUtils.mapObjectToFields(contactItem, {
      contactType: (value: any) => value,
      telNo: (value: any) => value,
      sms: (value: any) => value,
      email: (value: any) => value,
      postCode: (value: any) => value,
      address: (value: any) => value,
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, contactItem, withData, validating } = props;
    const payeeId = lodash.get(withData, 'payeeItem.id', '');
    const changedFieldsTemp = { ...changedFields };
    if (lodash.keys(changedFields).length === 1 && lodash.has(changedFields, 'postCode')) {
      changedFieldsTemp.address = address;
    }

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
