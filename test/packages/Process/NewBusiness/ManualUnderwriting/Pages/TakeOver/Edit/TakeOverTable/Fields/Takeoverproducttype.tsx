import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { FormItemSelect, formUtils } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/TakeOverTableField/Takeoverproducttype.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { CommonYN } from 'claim/enum';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Takeoverproducttype = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const takeOverFlag = formUtils.queryValue(form.getFieldValue('takeOverFlag'));
  const propsRequiredCondition = takeOverFlag === CommonYN.YES;

  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    propsRequiredCondition,
  };
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemSelect
        dicts={dicts}
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        labelType="inline"
        placeholder=" "
      />
    </Col>
  ) : null;
};

Takeoverproducttype.displayName = 'takeoverProductType';

export default Takeoverproducttype;
