import React, { useEffect, useCallback } from 'react';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { tenant, Region } from '@/components/Tenant';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { getAuth } from '@/auth/Utils';
import {
  formUtils,
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Identitytype.config';
export { fieldConfig } from './Identitytype.config';

const useUpdateIdentityType = ({ customerAge, id, form, readOnly }: any) => {
  const dispatch = useDispatch();

  const nationality =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace?.modalData?.entities?.clientMap?.[id]?.nationalityInfo?.nationality
    ) || '';

  return useEffect(() => {
    if (!readOnly) {
      tenant.region({
        [Region.ID]: () => {
          const changedFields = { identityType: '' };
          if (formUtils.queryValue(nationality) === 'RI') {
            if (customerAge < 18) {
              changedFields.identityType = 'BC';
            } else {
              changedFields.identityType = 'ID';
            }
          } else {
            changedFields.identityType = 'PP';
          }
          if (changedFields.identityType !== form.getFieldValue('identityType')) {
            dispatch({
              type: `${NAMESPACE}/savePersonalInfo`,
              payload: {
                changedFields,
                id,
              },
            });
          }
        },
        notMatch: null,
      });
    }
  }, [nationality, customerAge, readOnly]);
};

const useResetDateByIdentityType = ({ id }: any) => {
  const dispatch = useDispatch();

  return useCallback(
    (identityType: any) => {
      if (identityType === 'NI') {
        dispatch({
          type: `${NAMESPACE}/savePersonalInfo`,
          payload: {
            changedFields: {
              expiryDate: '',
            },
            id,
          },
        });
      }
    },
    [dispatch, id]
  );
};

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const MYIdentityType = ['PP', 'ID'];
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );

  let dicts = getDrowDownList({ config, fieldProps });
  if (regionCode === Region.MY)
    dicts = dicts.filter((item) => MYIdentityType.includes(item.dictCode));

  const visibleConditions = true;
  const editableConditions = tenant.region({
    [Region.ID]: true,
    [Region.TH]: !getAuth(commonAuthorityList, {
      authorityCode: 'PrimaryIDType',
    }),
    notMatch: !RuleByForm(config?.['editable-condition'], form),
  });
  const requiredConditions = false;

  useUpdateIdentityType({
    customerAge: form.getFieldValue('customerAge'),
    id,
    form,
    readOnly,
  });

  const handleChange = useResetDateByIdentityType({ id });
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
        <FormItemSelect
          dicts={dicts}
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
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Identitytype = ({ form, editable, layout, isShow, config, id, readOnly }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        readOnly={readOnly}
        id={id}
      />
    </Authority>
  );
};

Identitytype.displayName = 'identityType';

export default Identitytype;
