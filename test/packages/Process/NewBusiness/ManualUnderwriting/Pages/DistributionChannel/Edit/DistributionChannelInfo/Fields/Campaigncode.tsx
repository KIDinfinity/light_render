import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { FormItemInput, FormItemSelect } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/DistributionChannelField/Campaigncode.config';
import { campaignDictsSelector } from '../../../selectors';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Campaigncode = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
  } = useGetFieldConfig(propsConfig, config, fieldProps);

  const planInfoData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.planInfoData,
    shallowEqual
  );
  const campaignList = useSelector(campaignDictsSelector);
  const gsIndicator = lodash.get(planInfoData, 'gsIndicator');
  const dicts: any[] = lodash
    .chain(campaignList)
    .filter((item) => gsIndicator !== 'S' || item.gsIndicator === 'S')
    .value();

  return isShow && calculatedVisible ? (
    <Col {...layout}>
      {tenant.region({
        [Region.MY]: (
          <FormItemSelect
            dicts={dicts}
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={calculatedRequired}
            getPopupContainer={() => document.body}
          />
        ),
        [Region.VN]: (
          <FormItemSelect
            dicts={dicts}
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={calculatedRequired}
            getPopupContainer={() => document.body}
          />
        ),
        notMatch: (
          <FormItemInput
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={calculatedRequired}
          />
        ),
      })}
    </Col>
  ) : null;
};
Campaigncode.displayName = 'campaignCode';

export default Campaigncode;
