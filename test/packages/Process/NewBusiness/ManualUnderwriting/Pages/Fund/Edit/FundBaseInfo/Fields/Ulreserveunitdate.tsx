import React from 'react';
import { Col } from 'antd';
import { FormItemDatePicker } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/FundField/Ulreserveunitdate.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { useUlReserveUnitDateDisplay } from '../../../hooks';
import useGetProcessInfo from 'basic/components/Elements/hooks/useGetProcessInfo';
import CaseCategory from 'enum/CaseCategory';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Ulreserveunitdate = ({ layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = useUlReserveUnitDateDisplay();
  const propsConfig = {
    field,
    editable,
    isShow: visibleConditions,
    form,
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
  } = useGetFieldConfig(propsConfig, config, fieldProps);
  const { caseCategory } = useGetProcessInfo();

  return (calculatedVisible && caseCategory === CaseCategory.BP_AP_CTG02) ? (
    <Col {...layout}>
      <FormItemDatePicker
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

Ulreserveunitdate.displayName = 'ulReserveUnitDate';

export default Ulreserveunitdate;
