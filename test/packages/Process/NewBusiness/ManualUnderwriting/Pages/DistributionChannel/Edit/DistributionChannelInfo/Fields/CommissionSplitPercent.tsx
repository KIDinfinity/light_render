import React from 'react';
import { Col } from 'antd';
import { FormItemNumber, Validator } from 'basic/components/Form';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/DistributionChannelField/CommissionSplitPercent.config';
import { useSelector, useDispatch } from 'dva';
import { commissionSplitPercentListSelector } from '../../../selectors';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  id: string;
}

const CommissionSplitPercent = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
}: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const commissionSplitPercentList = useSelector(commissionSplitPercentListSelector);
  const dispatch = useDispatch();
  const Rules = {
    VLD_000701: Validator.VLD_000701({
      agentData: commissionSplitPercentList,
      id,
    }),
  };
  const handleChange = () => {
    setTimeout(() => {
      dispatch({ type: `${NAMESPACE}/validateCommissionSplit` });
    }, 200);
  };

  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    Rules,
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    calculatedRules,
    label,
    name,
  } = useGetFieldConfig(propsConfig, config, fieldProps);

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemNumber
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        suffix={
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            %
          </div>
        }
        rules={calculatedRules}
        precision={0}
        onChange={handleChange}
      />
    </Col>
  ) : null;
};

CommissionSplitPercent.displayName = 'commissionSplitPercent';

export default CommissionSplitPercent;
