import React, { useCallback } from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { FormItemSelect } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/FundField/Portfoliotype.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { useAutoAttachFundStatus } from '../../../hooks';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Portfoliotype = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const dispatch = useDispatch();
  const autoAttachFundStatus = useAutoAttachFundStatus();
  const resetAllocations = useCallback(
    (portfolioType: string) => {
      dispatch({
        type: `${NAMESPACE}/attachFund`,
        payload: {
          portfolioType,
        },
      });
      dispatch({
        type: `${NAMESPACE}/clearError`,
      });
    },
    [dispatch]
  );
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    propsRequiredCondition: autoAttachFundStatus,
  };
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
        onChange={(value: any) => {
          resetAllocations(value);
        }}
      />
    </Col>
  ) : null;
};

Portfoliotype.displayName = 'portfolioType';

export default Portfoliotype;
