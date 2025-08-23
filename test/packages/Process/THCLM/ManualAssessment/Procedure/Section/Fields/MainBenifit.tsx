import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';

import { TherapiesType } from 'claim/pages/Enum';
import { localFieldConfig } from './MainBenifit.config';

export { localFieldConfig } from './MainBenifit.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const mainBenefitList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.mainBenefitList
  );
  const mainBenefitListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.mainBenefitListMap
  );
  const existMainBenefitItems = lodash.map(
    lodash
      .values(mainBenefitListMap)
      .filter((item) => lodash.compact(mainBenefitList).includes(item.id)),
    (item) => formUtils.queryValue(item?.mainBenefit)
  );
  const TherapiesTypeValue = form.getFieldValue('therapiesType');

  const visibleConditions = TherapiesTypeValue === TherapiesType.MainBenefit;
  const editableConditions = true;
  const requiredConditions = true;

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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          existCodes={existMainBenefitItems}
          labelType="inline"
        />
      </Col>
    )
  );
};

const MainBenifit = ({ field, config, isShow, layout, form, editable, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
    />
  </Authority>
);

MainBenifit.displayName = localFieldConfig.field;

export default MainBenifit;
