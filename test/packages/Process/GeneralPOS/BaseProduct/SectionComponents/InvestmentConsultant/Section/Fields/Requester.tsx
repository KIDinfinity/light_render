import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemRadioGroup,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { localFieldConfig } from './Requester.config';
import { NAMESPACE } from '../../../../activity.config';
import styles from './Requester.less';
export { localFieldConfig } from './Requester.config';
import VerifyICInfo from '../../VerifyICInfo';
import VerificationPage from '../../VerificationPage';
import { formUtils } from 'basic/components/Form';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  remark,
  ICCode,
  fullName,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts =
    useSelector(
      ({ dictionaryController }: any) =>
        dictionaryController[
          config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
        ]
    ) || [];
  const requester = formUtils.queryValue(
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.investmentConsultant
          ?.requester
    ) || 'IC'
  );
  const dispatch = useDispatch();
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};
  const handleChange = (val: any) => {
    if (val.target.value === 'Self') {
      dispatch({
        type: 'GeneralPOSController/clearInvestmentConsultant',
        payload: {
          transactionId,
        },
      });
    }
  };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.requesterBox}>
          <FormItemRadioGroup
            dicts={dicts}
            type="wave"
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            onChange={handleChange}
            form={form}
            formName={config.name || field}
            labelId={''}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
          />
          {requester === OptionEnum.IC && (
            <div>
              <VerifyICInfo ICCode={ICCode} transactionId={transactionId} fullName={fullName} />
              <VerificationPage remark={remark} />
            </div>
          )}
        </div>
      </Col>
    )
  );
};

const Requester = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  remark,
  ICCode,
  fullName,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      remark={remark}
      ICCode={ICCode}
      fullName={fullName}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

Requester.displayName = localFieldConfig.field;

export default Requester;
