import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Col, Button, Icon } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemDatePicker,
  Required,
} from 'basic/components/Form';
import { localConfig as localSectionConfig } from '../index';
import styles from '../../Item.less';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'OutpatientDateGroup.Add',
  field: 'outpatientDateAdd',
  'field-props': {
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'outpatientDate',
    },
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  treatmentId,
  incidentId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dateList, setDateList] = useState<string[]>([]);

  const opTreatmentListObj = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
  );

  const onChange = (date: string) => {
    if (!open && date) {
      dispatch({
        type: 'JPCLMOfClaimAssessment/opTreatmentListAdd',
        payload: {
          treatmentId,
          incidentId,
          opTreatmentList: [date],
        },
      });
      return;
    }
    if (open) {
      setOpen(true);
    }
    setDateList([...dateList, date]);
  };

  const deleteDate = (index: any) => () => {
    const newDateList = dateList.filter((i, idx) => idx !== index);
    setDateList(newDateList);
  };

  const disabledDate = (current: any) => {
    return lodash.some(
      [...(lodash.map(opTreatmentListObj, 'outpatientTreatmentDate') || ''), ...(dateList || '')],
      (item) => {
        return moment(item).format('YYYY/MM/DD') === moment(current).format('YYYY/MM/DD');
      }
    );
  };

  const handleChange = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/opTreatmentListAdd',
      payload: {
        treatmentId,
        incidentId,
        opTreatmentList: dateList,
      },
    });

    setDateList([]);
    setOpen(false);
    form.resetFields();
  };

  const renderExtraFooter = () => (
    <>
      <div className={styles.datelist}>
        <div className={styles.button}>
          <Button type="primary" onClick={handleChange}>
            確認
          </Button>
        </div>
        {lodash.map(dateList, (item, index) => (
          <div className={styles.footerItem} key={index}>
            <div className={styles.date}>{moment(item).format('YYYY/MM/DD')}</div>
            <div className={styles.close}>
              <Icon type="close" onClick={deleteDate(index)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        open={open}
        onChange={onChange}
        onOpenChange={(isOpen: boolean) => {
          setOpen(isOpen);
        }}
        disabledDate={disabledDate}
        renderExtraFooter={renderExtraFooter}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        labelType={config.label?.type || fieldProps.label.type}
        name={config?.name}
        disabled={!editable || config?.editable === Editable.No}
        required={(config.required || fieldProps.required) === Required.Yes}
      />
    </Col>
  );
};

const OutpatientDateAdd = ({
  form,
  editable,
  section,
  layout,
  isShow,
  treatmentId,
  incidentId,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        treatmentId={treatmentId}
        incidentId={incidentId}
      />
    </ElementConfig.Field>
  </Authority>
);

OutpatientDateAdd.displayName = fieldConfig.field;

export default OutpatientDateAdd;
