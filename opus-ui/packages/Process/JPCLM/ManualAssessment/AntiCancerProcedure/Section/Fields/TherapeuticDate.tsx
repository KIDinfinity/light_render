import React from 'react';
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
  section: 'TherapeuticMonthList',
  field: 'therapeuticDate',
  'field-props': {
    label: '',
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    'x-layout': {
      xs: {
        span: 22,
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
  datepickerOpen,
  setDatepickerOpen,
  otherProcedureId,
  therapeuticMonth,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];

  const opTreatmentList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.opTreatmentList
  );

  const therapeuticMonthList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.otherProcedureListMap[otherProcedureId]
        ?.therapeuticMonthList
  );

  const therapeuticDateList = JSON.parse(
    lodash.find(therapeuticMonthList, (item) => item.therapeuticMonth === therapeuticMonth)
      ?.therapeuticDateList
  );

  const disabledDate = (current: any) => {
    return (
      lodash.some([...([therapeuticMonth] || [])], (item) => {
        return moment(item).format('YYYY/MM') !== moment(current).format('YYYY/MM');
      }) ||
      lodash.some(
        [...(opTreatmentList || []), ...(therapeuticDateList || [])],
        (item) => moment(item).format('YYYY/MM/DD') === moment(current).format('YYYY/MM/DD')
      )
    );
  };

  const onChange = (date: any) => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/addOpTreatmentList',
      payload: {
        date,
      },
    });
  };

  const deleteDate = (index: any) => () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/updateOpTreatmentList',
      payload: {
        index,
      },
    });
  };

  const handleChange = () => {
    if (!lodash.isEmpty(opTreatmentList)) {
      dispatch({
        type: 'JPCLMOfClaimAssessment/therapeuticDateListAdd',
        payload: {
          otherProcedureId,
          therapeuticMonth,
          therapeuticDateList: lodash.map(opTreatmentList, (item) => moment(item).valueOf()),
        },
      });
    }

    dispatch({
      type: 'JPCLMOfClaimAssessment/updateOpTreatmentList',
      payload: {
        index: '-1',
      },
    });
    setDatepickerOpen(false);
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
        open={datepickerOpen}
        renderExtraFooter={renderExtraFooter}
        disabledDate={disabledDate}
        defaultPickerValue={moment(therapeuticDateList?.[0] || '')}
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

const TherapeuticDate = ({
  form,
  editable,
  datepickerOpen,
  setDatepickerOpen,
  section,
  layout,
  isShow,
  otherProcedureId,
  therapeuticMonth,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        datepickerOpen={datepickerOpen}
        setDatepickerOpen={setDatepickerOpen}
        otherProcedureId={otherProcedureId}
        therapeuticMonth={therapeuticMonth}
      />
    </ElementConfig.Field>
  </Authority>
);

TherapeuticDate.displayName = fieldConfig.field;

export default TherapeuticDate;
