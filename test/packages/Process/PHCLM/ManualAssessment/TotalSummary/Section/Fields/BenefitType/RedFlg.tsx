import React, { useEffect } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { NAMESPACE } from '../../../../activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './RedFlg.config';

export { localFieldConfig } from './RedFlg.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isrelationshipWithInsuredSelf,
}: any) => {
  const dispatch = useDispatch();

  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });

  const { id, incidentId, coverageKey, benefitTypeCode, redFlag } =
    form.getFieldsValue([
      'id',
      'redFlag',
      'incidentId',
      'coverageKey',
      'benefitTypeCode',
      'redFlag',
    ]) || {};

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );
  const { policyCoverageList } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.c360PolicyInfo || {}
  );

  const { incidentDate } = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    formUtils.cleanValidateData(modelnamepsace.claimEntities.incidentListMap?.[incidentId] || {})
  );

  useEffect(() => {
    const waitingPeriod =
      lodash
        .chain(listPolicy)
        .find({ benefitTypeCode, coverageKey })
        .get('waitingPeriod')
        .value() || '';
    const issueEffectiveDate =
      lodash.chain(policyCoverageList).find({ coverageKey }).get('issueEffectiveDate').value() ||
      '';

    const waitingDay = moment(incidentDate).diff(moment(issueEffectiveDate), 'days');

    if (
      !!waitingPeriod &&
      !!issueEffectiveDate &&
      !!incidentDate &&
      (waitingDay <= 0 || waitingDay <= waitingPeriod)
    ) {
      // isEarlyClaim
      dispatch({
        type: `${NAMESPACE}/totalBenefitTypeBasicUpdate`,
        payload: {
          changedFields: {
            redFlag: 'EarlyClaim',
          },
          id,
        },
      });
    } else {
      if (redFlag === 'EarlyClaim') {
        // reset redFlag
        dispatch({
          type: `${NAMESPACE}/totalBenefitTypeBasicUpdate`,
          payload: {
            changedFields: {
              redFlag: '',
            },
            id,
          },
        });
      }
    }
  }, [coverageKey, benefitTypeCode, listPolicy, policyCoverageList, incidentDate]);

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          disabled={
            !editable ||
            isrelationshipWithInsuredSelf ||
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
        />
      </Col>
    )
  );
};

const RedFlg = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  isrelationshipWithInsuredSelf,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf}
    />
  </Authority>
);

RedFlg.displayName = localFieldConfig.field;

export default RedFlg;
