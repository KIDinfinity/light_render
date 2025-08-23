import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { FormItemSelect } from 'basic/components/Form';

import { fieldConfig } from '../../../_config/PolicyReplacementTableField/Clientname.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

import { useReplacementInfoDefaultClientName } from '../../../hooks';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Clientname = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];

  const defaultDicts = useReplacementInfoDefaultClientName();
  const dicts = getDrowDownList({ config, fieldProps });
  const index = form.getFieldValue('index');

  const propsConfig = {
    field,
    editable,
    isShow: isShow,
    form,
    propsRequiredCondition: index === 0,
  };
  const isLast = form.getFieldValue('isLast');
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
  } = useGetFieldConfig(propsConfig, config, fieldProps);
  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemSelect
        dicts={defaultDicts || dicts}
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={!isLast && calculatedRequired}
        getPopupContainer={() => document.body}
        labelType="inline"
        placeholder=""
      />
    </Col>
  ) : null;
};

Clientname.displayName = 'insuredSeqNo';

export default Clientname;
