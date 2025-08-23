import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemAutoComplete,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import { useDispatch, useSelector } from 'dva';
import { VLD_000930 } from 'claim/pages/validators/fieldValidators';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { localFieldConfig } from './PayeeName.config';

export { localFieldConfig } from './PayeeName.config';
const getClientName = (client) =>
  lodash
    .compact(
      [client.firstName, client.middleName, client.surname].map((data) =>
        formUtils.queryValue(data)
      )
    )
    .join(' ');

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  benefitItem,
  id,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const payee = benefitItem.beneficiaryList.find((beneficiary) => beneficiary.id === id);
  const payeeId = payee?.payeeId;
  const payToType = form.getFieldValue('payTo');
  const payeeList = useSelector(({ paymentAllocation }) => paymentAllocation.claimData?.payeeList);
  const payeeNames =
    payeeList
      ?.filter((payee) => formUtils.queryValue(payee.payeeType) === payToType)
      ?.map(getClientName) || [];
  const currentPayee = payeeList?.find((payee) => payee.id === payeeId);
  const isSelfOrOwner = [
    relationshipWithInsuredForHK.policyOwner,
    relationshipWithInsuredForHK.self,
  ].includes(payToType);

  const visibleConditions = true;
  const editableConditions = isSelfOrOwner || currentPayee?.isNewClient !== false;
  const requiredConditions = true;

  const currepntPayeeNames =
    benefitItem.beneficiaryList
      .filter((beneficiary) => beneficiary.id !== id)
      .map((beneficiary) => beneficiary?.payeeName) || [];
  const c360PolicyInfo = useSelector(
    ({ paymentAllocation }) => paymentAllocation.claimData?.c360PolicyInfo
  );
  const get360Names = (list) =>
    lodash
      .compact(
        list?.map(({ clientId }) =>
          c360PolicyInfo?.clientInfoList?.find((clientInfo) => clientId === clientInfo?.clientId)
        )
      )
      ?.map(getClientName) || [];
  const beneficiaryNames = get360Names(c360PolicyInfo?.policyBeneficiaryList || []);
  const ownerNames = get360Names(c360PolicyInfo?.policyOwnerList || []);
  const insuredNames = get360Names(c360PolicyInfo?.policyInsuredList || []);

  const dispatch = useDispatch();
  const otherPayeeNames = benefitItem.beneficiaryList
    .filter((beneficiary) => beneficiary.id !== id)
    .map(getClientName);

  if (isSelfOrOwner) {
    const matchedNames =
      relationshipWithInsuredForHK.policyOwner === payToType ? ownerNames : insuredNames;

    return (
      isShow &&
      ((config?.visible || fieldProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || fieldProps.visible) === Visible.Yes) && (
        <Col {...layout}>
          <FormItemSelect
            isInline
            dicts={lodash
              .uniq(matchedNames)
              .filter((name) => !otherPayeeNames.includes(name))
              .map((name) => ({
                dictCode: name,
                dictName: name,
              }))}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            rules={[
              {
                validator: VLD_000930(currepntPayeeNames, benefitItem?.policyNo),
              },
            ]}
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            maxLength={config?.maxLength || fieldProps.maxLength}
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
          />
        </Col>
      )
    );
  }

  let dataSource = [];
  if (!payeeId) {
    if (payToType === relationshipWithInsuredForHK.beneficiary) {
      dataSource = lodash.uniq([...payeeNames, ...beneficiaryNames]);
    } else {
      dataSource = lodash.uniq(payeeNames);
    }
  }
  const filteredDataSource = lodash.compact(
    dataSource.filter((name) => !otherPayeeNames.includes(name))
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemAutoComplete
          isInline
          dataSource={filteredDataSource}
          onSearch={() => filteredDataSource}
          onBlur={(fullName) => {
            dispatch({
              type: 'paymentAllocation/payeeAllocationLinkPayee',
              payload: {
                benefitItemId: benefitItem.id,
                id,
                fullName,
              },
            });
          }}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          rules={[
            {
              validator: VLD_000930(currepntPayeeNames, benefitItem?.policyNo),
            },
          ]}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const PayeeName = ({ field, config, isShow, layout, form, editable, benefitItem, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      benefitItem={benefitItem}
      id={id}
    />
  </Authority>
);

PayeeName.displayName = localFieldConfig.field;

export default PayeeName;
