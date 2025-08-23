import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Col, Button, Icon } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required } from 'basic/components/Form';
import { SourceSystem } from 'process/Enum';
import styles from '../../../List.less';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'OtherProcedure.RadiationDate',
  field: 'radioDateList',
  'field-props': {
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'radioTherapyReasonDateGroup',
    },
    visible: 'Y',
    editable: 'C',
    required: 'N',
    'x-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  policyNo,
  radioDateList,
  isAdd,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();
  const requiredConditions = false;
  const [open, setOpen] = useState(false);

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.listPolicy
  );

  const sourceSystem =
    lodash.chain(listPolicy).find({ policyNo }).get('sourceSystem').value() || SourceSystem.Klip;

  const onChange = (date: any) => {
    if (
      (sourceSystem === SourceSystem.Klip && lodash.size(radioDateList) === 2) ||
      (sourceSystem === SourceSystem.Lifej && lodash.size(radioDateList) === 4)
    )
      return;
    if (open && date) {
      dispatch({
        type: 'JPCLMOfClaimAssessment/otherProcedurePayableReasonDateGroupAdd',
        payload: {
          id,
          date,
          isAdd,
        },
      });
    }
  };

  const deleteItem = (index: any) => () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/otherProcedurePayableReasonDateGroupRemove',
      payload: {
        id,
        index,
        isAdd,
      },
    });
  };

  const disabledDate = (current: any) => {
    return lodash.some(radioDateList, (item) => {
      return moment(item).format('YYYY/MM/DD') === moment(current).format('YYYY/MM/DD');
    });
  };

  const hadleButton = () => {
    setOpen(false);
    dispatch({
      type: 'JPCLMOfClaimAssessment/otherProcedurePayableReasonDateUpdate',
      payload: {
        id,
        radioDateList,
        isAdd,
      },
    });
    form.resetFields();
  };

  const renderExtraFooter = () => (
    <>
      <div className={styles.reasonDateList}>
        <div className={styles.button}>
          <Button type="primary" onClick={hadleButton}>
            確認
          </Button>
        </div>
        {lodash.map(radioDateList, (item, index) => (
          <div className={styles.footerItem} key={index}>
            <div className={styles.date}>{moment(item).format('YYYY/MM/DD')}</div>
            <div className={styles.close}>
              <Icon onClick={deleteItem(index)} type="close" />
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const editableConditions = true;

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        disabledDate={disabledDate}
        open={open}
        onChange={onChange}
        onOpenChange={(e: any) => {
          e && setOpen(e);
        }}
        renderExtraFooter={renderExtraFooter}
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? !editableConditions
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        required={
          config?.required === Required.Conditions
            ? requiredConditions
            : (config.required || fieldProps.required) === Required.Yes
        }
        formName={field || fieldProps.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        labelType={config.label?.type || fieldProps.label.type}
        name={config?.name}
        placeholder=""
      />
    </Col>
  );
};

const RadioDateList = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  id,
  policyNo,
  radioDateList,
  isAdd,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      radioDateList={radioDateList}
      policyNo={policyNo}
      isAdd={isAdd}
    />
  </Authority>
);

RadioDateList.displayName = 'RadioDateList';

export default RadioDateList;
