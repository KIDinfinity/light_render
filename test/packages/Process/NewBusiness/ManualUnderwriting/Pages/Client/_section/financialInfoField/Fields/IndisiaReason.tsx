import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import {
  Authority,
  Editable,
  FormItemInput,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './IndisiaReason.config';
export { fieldConfig } from './IndisiaReason.config';

const useJudgeIndisiaReasonRequired = ({ id, readOnly, form }: any) => {
  const nationality = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.nationalityInfo.nationality`
          : `modalData.entities.clientMap.${id}.nationalityInfo.nationality`
      ),
    shallowEqual
  );
  const ctfCountryCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.nationalityInfo.ctfCountryCode`
          : `modalData.entities.clientMap.${id}.nationalityInfo.ctfCountryCode`
      ),
    shallowEqual
  );
  const cardIssuerCountry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.cardIssuerCountry`
          : `modalData.entities.clientMap.${id}.cardIssuerCountry`
      ),
    shallowEqual
  );
  const usTaxFlag = form.getFieldValue('usTaxFlag');
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.contactInfoList`
          : `modalData.entities.clientMap.${id}.contactInfoList`
      ),
    shallowEqual
  );
  const addressList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.addressInfoList`
          : `modalData.entities.clientMap.${id}.addressInfoList`
      ),
    shallowEqual
  );
  const contactInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly ? `entities.contactInfoMap` : `modalData.entities.contactInfoMap`
      ),
    shallowEqual
  );
  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly ? `entities.addressInfoMap` : `modalData.entities.addressInfoMap`
      ),
    shallowEqual
  );

  const countryCodeList = lodash
    .chain(contactInfoList)
    .map((contactInfoId) => formUtils.queryValue(contactInfoMap?.[contactInfoId]?.countryCode))
    .compact()
    .value();
  const addressCountryList = lodash.map(addressList, (addressId) =>
    formUtils.queryValue(addressInfoMap?.[addressId]?.country)
  );
  const ctfCountryCodeValue = formUtils.queryValue(ctfCountryCode);

  const countryList = lodash.compact([
    formUtils.queryValue(nationality),
    ctfCountryCodeValue,
    ...addressCountryList,
  ]);
  const cardIssuerCountryIsRI = lodash.isEmpty(cardIssuerCountry)
    ? true
    : cardIssuerCountry === 'RI';
  const countryListEveryRI = lodash.every(
    countryList,
    (item) => formUtils.queryValue(item) === 'RI'
  );
  
  const countryCodeListEveryRI = lodash.every(countryCodeList, (item) => {
    const code = lodash.split(formUtils.queryValue(item), '-')[0].trim();
    return code === '055' || code === '62';
  });

  return cardIssuerCountryIsRI && countryListEveryRI && countryCodeListEveryRI
    ? false
    : usTaxFlag === 'N';
};

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = useJudgeIndisiaReasonRequired({ id, readOnly, form });
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = visibleConditions;

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const IndisiaReason = ({ form, editable, layout, isShow, id, config, readOnly }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        readOnly={readOnly}
      />
    </Authority>
  );
};

IndisiaReason.displayName = 'indisiaReason';

export default IndisiaReason;
