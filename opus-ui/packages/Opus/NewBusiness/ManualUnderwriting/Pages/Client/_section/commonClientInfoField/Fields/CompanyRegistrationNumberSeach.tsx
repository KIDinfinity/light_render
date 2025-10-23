import React, { useState } from 'react';
import { Col } from 'antd';
import { Icon } from 'opus/Components/Antd';
import { Button } from 'antd';
import { Authority, Visible, Editable, FormItemInput, Rule } from 'basic/components/Form';

import { fieldConfig } from './CompanyRegistrationNumberSeach.config';
import styles from '../index.less';
import { useDispatch } from 'dva';
import useGetProcessApplicationNo from 'bpm/pages/OWBEntrance/Entrance/_hooks/useGetProcessApplicationNo';
import { dedupCheckAndenquiryCorporate } from '@/services/owbNbProposalControllerService';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import CustomerRole from 'basic/enum/CustomerRole';
import lodash from 'lodash';
import { AddressType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import useRetrieveExistCorpFromLAToggle from '../../../_hooks/useRetrieveExistCorpFromLAToggle';
import { Action } from '@/components/AuditLog/Enum';

export { fieldConfig } from './CompanyRegistrationNumberSeach.config';

const getCompanyRegistrationInfo = (clientInfoList: any[]) => {
  const payor = lodash.find(
    clientInfoList,
    (c: any) =>
      c.customerType === CustomerType.Entity &&
      c.roleList.map((r: { customerRole: string }) => r.customerRole).includes(CustomerRole.Payor)
  );

  const addressItem =
    lodash.find(payor?.addressList, (a: any) => a.addrType === AddressType.Business) ??
    payor?.addressList?.[0];

  return {
    companyName: payor?.customerEnSurname ?? 'N/A',
    registrationNumber: payor?.companyRegistrationNumber ?? 'N/A',
    fullAddress: addressItem?.fullAddress ?? 'N/A',
  };
};

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = Rule(config?.['visible-condition'], form, '');
  const editableConditions = !Rule(config?.['editable-condition'], form, '');
  const requiredConditions = false;
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState('');
  const applicationNo = useGetProcessApplicationNo();
  const dispatch = useDispatch();
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();
  const labelTypeCode = config?.label?.dictTypeCode || fieldProps.label.dictTypeCode;
  const labelDictCode = config?.label?.dictCode || fieldProps.label.dictCode;
  const fieldName = config.name || field;

  const auditLog = ({ action, newValue }: { action: Action; newValue: string }) => {
    const auditlogContent = {
      type: Action.SaveUpdate,
      newValue,
      section: formatMessageApi({ [labelTypeCode]: labelDictCode }),
    };

    dispatch({
      type: 'auditLogController/logButton',
      payload: {
        action,
        content: [auditlogContent],
      },
    });
  };

  const onCheck = async () => {
    if (companyRegistrationNumber.length === 0) {
      return;
    }
    await dispatch({
      type: `login/saveLoadingStatus`,
      payload: { loadingStatus: true },
    });
    const response = await dedupCheckAndenquiryCorporate({
      companyRegistrationNumber,
      applicationNo,
    });
    const companyRegistrationNumberFormValue = {
      value: companyRegistrationNumber,
      name: 'companyRegistrationNumber',
      touched: true,
      label: formatMessageApi({ [labelTypeCode]: labelDictCode }),
      locale_old: '',
      locale_new: '',
      format: '',
      dirty: false,
      validating: false,
    };
    await dispatch({
      type: `login/saveLoadingStatus`,
      payload: { loadingStatus: false },
    });
    if (!!response?.success && !!response?.resultData && !response?.resultData?.['x-error-nonce']) {
      const { resultData } = response;
      const companyInfo = getCompanyRegistrationInfo(resultData);
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001313' }),
          },
          {
            content: formatMessageApi(
              { Label_COM_WarningMessage: 'MSG_001304' },
              companyInfo.registrationNumber
            ),
          },
          {
            content: formatMessageApi(
              { Label_COM_WarningMessage: 'MSG_001305' },
              companyInfo.companyName
            ),
          },
          {
            content: formatMessageApi(
              { Label_COM_WarningMessage: 'MSG_001306' },
              companyInfo.fullAddress
            ),
          },
        ],
        {
          okFn: () => {
            dispatch({
              type: `${NAMESPACE}/updateCompanyClientInfo`,
              payload: {
                clientInfoList: resultData,
                companyRegistrationNumber,
              },
            });
            auditLog({ action: Action.ConfirmWarningCorp, newValue: companyRegistrationNumber });
          },
          cancelFn: () => {
            console.log({ id, fieldConfig });
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'savePersonalInfo',
              payload: {
                changedFields: { companyRegistrationNumber: companyRegistrationNumberFormValue },
                id,
                errorId: id,
              },
            });
            auditLog({ action: Action.DiscardWarningCorp, newValue: companyRegistrationNumber });
          },
        }
      );
    }
    if (
      !response?.success &&
      response?.warnData?.['x-error-nonce'] &&
      response?.promptMessages?.[0]?.code === 'MSG_001290'
    ) {
      dispatch({
        type: `${NAMESPACE}/handleCompanyMismatch`,
        payload: {
          companyRegistrationNumber,
          clientId: id,
        },
      });
      auditLog({ action: Action.ConfrimWarningnNewCorp, newValue: companyRegistrationNumber });
    }
  };

  return (
    isShow &&
    retrieveExistCorpFromLAToggle &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} className={styles.companyregistrationnumber}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.visible || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.visible || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={fieldName}
          labelId={labelDictCode}
          labelTypeCode={labelTypeCode}
          required={requiredConditions}
          precision={0}
          noFormItemAppend
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onBlur={({ target: { value } }: any) => setCompanyRegistrationNumber(value)}
          suffix={
            <Button size="small" type="primary" onClick={onCheck}>
              Check
            </Button>
          }
        />
      </Col>
    )
  );
};

const CompanyRegistrationNumberSeach = ({ isShow, layout, form, editable, config, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      id={id}
    />
  </Authority>
);

CompanyRegistrationNumberSeach.displayName = 'companyRegistrationNumberSearch';

export default CompanyRegistrationNumberSeach;
