import type { FunctionComponent } from 'react';
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemNumber,
  FormItemSelect,
  FormItemCheckbox,
  FormItemDatePicker,
  FormItemAutoComplete,
} from 'basic/components/Form/FormItem';
import claimSearchAddressService from '@/services/claimSearchAddressService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import { ActivityStatus } from 'bpm/pages/Information/enum/index';
import CaseCategory from 'enum/CaseCategory';
import getByMessageType from 'claim/utils/getByMessageType';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import type { PayeeModal } from '../../../_dto/Models';
import { callReducer, actions } from '../../../_hooks';
import { shallowEqual } from '../../../_function';
import { VLD_000332 } from '../../../_validators/fieldValidators';

import styles from './styles.less';
import stylesGlobal from '../../../styles.less';

export interface IInformation extends IFormRegistProps {
  payeeItem?: PayeeModal;
  taskNotEditable?: boolean;
  Dropdown_CLM_PaymentMethod?: any[];
  Gender?: any[];
  Dropdown_POL_IdentityType?: any[];
  Dropdown_CLM_PaymentType?: any[];
  validating?: boolean;
  claimData?: any;
  taskDetail?: any;
  taskNotEditablePermission?: any;
}

let addressSearchResult: string = '';
let ditcPostCode: any = null;

const Information: FunctionComponent<IInformation> = ({
  form,
  payeeItem,
  taskNotEditable,
  Gender,
  Dropdown_CLM_PaymentType,
  Dropdown_POL_IdentityType,
  Dropdown_CLM_PaymentMethod,
  taskNotEditablePermission,
  taskDetail,
  claimData,
}) => {
  const [state, uDispatch]: any = callReducer({ warningMessage: '' });

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
    addressSearchResult = !lodash.isEmpty(target)
      ? `${target?.cityTown}${target?.prefecture}${target?.street}`
      : '';
  };

  const isCorporation = !form.getFieldValue('organization');
  const isActivityForCTA = taskDetail?.taskDefKey === TaskDefKey.PH_CLM_ACT005;
  const taskStatus = taskDetail?.taskStatus === ActivityStatus.Completed;
  const isShowForPH = claimData.caseCategory === CaseCategory.PH_CLM_CTG001;

  return (
    <>
      <DataLayout className={styles.PayeeInformation} span={12}>
        <DataLayout span={12}>
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
            formName="firstName"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.first-name"
            rules={[{ validator: VLD_000332(claimData.payeeList, payeeItem) }]}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
            formName="surname"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.surname"
            rules={[{ validator: VLD_000332(claimData.payeeList, payeeItem) }]}
          />
        </DataLayout>
        <DataLayout span={12}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="paymentMethod"
            labelId="PaymentMethod"
            dicts={Dropdown_CLM_PaymentMethod}
            required
          />
          <FormItemNumber
            form={form}
            formName="paymentAmount"
            labelId="PaymentAmount"
            disabled
            min={-Number.MAX_VALUE}
            pattern={
              /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
            }
            formatter={fnPrecisionFormatNegative}
          />
        </DataLayout>
        <DataLayout span={12}>
          <DataLayout span={12}>
            <FormItemCheckbox
              form={form}
              disabled={taskNotEditable}
              formName="organization"
              labelId="IsCorporation"
              labelTypeCode="Label_BIZ_Policy"
            />
            {isCorporation && (
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                formName="gender"
                labelId="Gender"
                labelTypeCode="Label_BIZ_Individual"
                dicts={Gender}
              />
            )}
          </DataLayout>
          {isCorporation && (
            <DataLayout.DataWrap className={stylesGlobal.DataPickerWrap}>
              <FormItemDatePicker
                form={form}
                disabled={taskNotEditable}
                formName="dateOfBirth"
                labelId="DOB"
                labelTypeCode="Label_BIZ_Individual"
              />
            </DataLayout.DataWrap>
          )}
        </DataLayout>
        <DataLayout span={12}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="identityType"
            labelId="IdentityType"
            labelTypeCode="Label_BIZ_Individual"
            dicts={Dropdown_POL_IdentityType}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="identityNo"
            labelId="IdentityNumber"
            labelTypeCode="Label_BIZ_Individual"
          />
        </DataLayout>
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="email"
          labelId="EmailAddress"
          labelTypeCode="Label_BIZ_Policy"
        />
        <DataLayout span={12}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="paymentModel"
            labelId="TypeOfPayment"
            dicts={Dropdown_CLM_PaymentType}
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="scheduledDate"
            labelId="Scheduleddate"
          />
        </DataLayout>
        <DataLayout.DataWrap span={6}>
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
          />
        </DataLayout.DataWrap>
        <DataLayout.DataWrap span={18}>
          <DataLayout span={12}>
            <FormItemInput
              form={form}
              disabled
              formName="addressSearchResult"
              maxLength={240}
              labelId="ContactAddr"
              labelTypeCode="Label_BIZ_Policy"
            />
            <FormItemInput form={form} disabled={taskNotEditable} formName="address" labelId=" " />
          </DataLayout>
        </DataLayout.DataWrap>
      </DataLayout>
      {isShowForPH && (
        <DataLayout>
          <FormItemInput
            form={form}
            disabled={!isActivityForCTA || taskNotEditablePermission || taskStatus}
            required={isActivityForCTA}
            formName="ctaCheckNo"
            maxLength={40}
            labelId={formatMessageApi({ Label_CLM_PHPayee: 'CTACheckNo' })}
          />
          <DataLayout.DataWrap className={stylesGlobal.DataPickerWrap}>
            <FormItemDatePicker
              form={form}
              disabled={!isActivityForCTA || taskNotEditablePermission || taskStatus}
              required={isActivityForCTA}
              formName="ctaCheckDate"
              labelId={formatMessageApi({ Label_CLM_PHPayee: 'CTACheckDate' })}
              format="L"
            />
          </DataLayout.DataWrap>
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="paidOut"
            labelId="PaidOut"
            labelTypeCode="Label_CLM_PHPayee"
          />
        </DataLayout>
      )}
    </>
  );
};

const FormWrap = Form.create<IInformation>({
  mapPropsToFields(props) {
    const { payeeItem } = props;

    return formUtils.mapObjectToFields(payeeItem, {
      organization: (value: string | object) => !!value,
      paidOut: (value: string | object) => !!value,
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeItem, validating } = props;
    const changedFieldsTemp = { ...changedFields };
    if (lodash.keys(changedFields).length === 1 && lodash.has(changedFields, 'postCode')) {
      changedFieldsTemp.addressSearchResult = addressSearchResult;
    }
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
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(Information, shallowEqual)));

export default connect(
  ({
    claimEditable,
    formCommonController,
    dictionaryController,
    processTask,
    paymentAllocation,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    taskNotEditablePermission: claimEditable.taskNotEditablePermission,
    validating: formCommonController.validating,
    Dropdown_CLM_PaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod,
    Gender: dictionaryController.Gender,
    Dropdown_POL_IdentityType: dictionaryController.Dropdown_POL_IdentityType,
    Dropdown_CLM_PaymentType: dictionaryController.Dropdown_CLM_PaymentType,
    taskDetail: processTask.getTask,
    claimData: paymentAllocation.claimData,
  })
)(FormWrap);
