import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Col, Icon, Button } from 'antd';
import {
  Authority,
  ElementConfig,
  FormItemDatePicker,
  Editable,
  Required,
} from 'basic/components/Form';
import { localConfig as localSectionConfig } from '../index';
import styles from '../../Item.less';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'therapeuticMonthList.Add',
  field: 'therapeuticDateAdd',
  'field-props': {
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'therapeuticDate',
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

const FormItem = ({ isShow, layout, form, editable, field, config, otherProcedureId }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const [open, setOpen] = useState(false);

  const therapeuticMonthList = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities.otherProcedureListMap[otherProcedureId]?.therapeuticMonthList
  );

  const opTreatmentList = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.opTreatmentList
  );

  const disabledDate = (current: any) => {
    return (
      lodash.some(
        [...(lodash.map(therapeuticMonthList, 'therapeuticMonth') || [])],
        (item) => moment(item).format('YYYY/MM') === moment(current).format('YYYY/MM')
      ) ||
      lodash.some(
        [...(opTreatmentList || [])],
        (item) =>
          moment(item).format('YYYY/MM') !== moment(current).format('YYYY/MM') ||
          moment(item).format('YYYY/MM/DD') === moment(current).format('YYYY/MM/DD')
      )
    );
  };

  const onChange = (date: any) => {
    dispatch({
      type: 'JPCLMOfDataCapture/addOpTreatmentList',
      payload: {
        date,
      },
    });
  };

  const onOpenChange = (e: any) => {
    if (e) setOpen(e);
  };

  const deleteDate = (index: any) => () => {
    dispatch({
      type: 'JPCLMOfDataCapture/updateOpTreatmentList',
      payload: {
        index,
      },
    });
  };

  const handleChange = () => {
    if (!lodash.isEmpty(opTreatmentList)) {
      dispatch({
        type: 'JPCLMOfDataCapture/therapeuticMonthListAdd',
        payload: {
          otherProcedureId,
          therapeuticDateList: lodash.map(opTreatmentList, (item) => moment(item).valueOf()),
        },
      });
    }

    dispatch({
      type: 'JPCLMOfDataCapture/updateOpTreatmentList',
      payload: {
        index: '-1',
      },
    });
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
        {lodash.map(opTreatmentList, (item, index) => (
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
        onChange={onChange}
        open={open}
        onOpenChange={onOpenChange}
        renderExtraFooter={renderExtraFooter}
        disabledDate={disabledDate}
        disabled={!editable || config?.editable === Editable.No}
        required={(config.required || fieldProps.required) === Required.Yes}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        labelType={config.label?.type || fieldProps.label.type}
        name={config?.name}
      />
    </Col>
  );
};

const TherapeuticDateAdd = ({ form, editable, section, layout, isShow, otherProcedureId }: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        otherProcedureId={otherProcedureId}
      />
    </ElementConfig.Field>
  </Authority>
);

TherapeuticDateAdd.displayName = fieldConfig.field;

export default TherapeuticDateAdd;
