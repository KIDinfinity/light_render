import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { FormItemSelect } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/FundField/Portfolioid.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { useAutoAttachFundStatus } from '../../../hooks';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Portfolioid = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const autoAttachFundStatus = useAutoAttachFundStatus();
  const propsConfig = {
    field,
    editable,
    isShow: !autoAttachFundStatus && isShow,
    form,
  };
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
        dicts={dicts}
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
      />
    </Col>
  ) : null;
};

Portfolioid.displayName = 'portfolioId';

export default Portfolioid;
