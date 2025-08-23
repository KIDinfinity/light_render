import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { useDispatch } from 'umi';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/DistributionChannelField/ServicingBranch.config';
import { requiredChannel } from '../../../validators';
import {
  useBranchStaffNoDictsByBankNo,
  useServicingBranchListDictsByAgentNo,
} from '../../../hooks';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  id: string;
}
const ServicingBranch = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const bankNo = formUtils.queryValue(form.getFieldValue('bankNo'));
  const agentNo = formUtils.queryValue(form.getFieldValue('agentNo'));
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const { calculatedEditable, calculatedVisible, label, name } = useGetFieldConfig(
    propsConfig,
    config,
    fieldProps
  );

  const required = tenant.region({
    [Region.VN]: false,
    notMatch: requiredChannel(form),
  });

  const dicts = useBranchStaffNoDictsByBankNo(bankNo);
  const IDdicts = useServicingBranchListDictsByAgentNo(agentNo);

  const onChange = (value: string, dropDicts: any) => {
    dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: 'updateDistributionChannel',
      payload: {
        changedFields: {
          id: form.getFieldValue('id'),
          servicingBranchDesc: lodash.find(dropDicts, { dictCode: value })?.dictName,
        },
        errorId: form.getFieldValue('id'),
      },
    });
  };

  return isShow && calculatedVisible ? (
    <Col {...layout}>
      {tenant.region({
        [Region.KH]: (
          <FormItemSelect
            dicts={dicts}
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={required}
            getPopupContainer={() => document.body}
            onChange={(value: string) => onChange(value, dicts)}
          />
        ),
        [Region.ID]: (
          <FormItemSelect
            dicts={IDdicts}
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={required}
            getPopupContainer={() => document.body}
            optionShowType="both"
            onChange={(value: string) => onChange(value, IDdicts)}
          />
        ),
        notMatch: (
          <FormItemInput
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={required}
          />
        ),
      })}
    </Col>
  ) : null;
};

ServicingBranch.displayName = 'servicingBranch';

export default ServicingBranch;
