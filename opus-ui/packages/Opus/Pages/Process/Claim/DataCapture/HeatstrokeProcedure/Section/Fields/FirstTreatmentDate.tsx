import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
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
import classnames from 'classnames';
import styles from './FirstTreatmentDate.less';

export const localFieldConfig = {
  section: 'HeatstrokeTherapy',
  field: 'therapeuticMonthList',
  'field-props': {
    label: {
      dictTypeCode: 'Label_COM_Opus',
      dictCode: 'therapeuticDate',
    },
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // dateList might container mms from redux & string from antd. wrap it with moment before using it
  const [dateList, setDateList] = useState<string[]>([]);
  const setDateListOrdered = (nextDateList: any) => {
    setDateList(
      lodash
        .chain(nextDateList)
        .orderBy((item) => moment(item).valueOf(), ['asc'])
        .uniq()
        .value()
    );
  };

  const { otherProcedureId, therapeuticMonthList } = form.getFieldsValue([
    'otherProcedureId',
    'therapeuticMonthList',
  ]);

  const isDateOutOfRange: any = (current: moment.Moment) => {
    // const firstDate = dateList[0];

    // const notSameMonth = firstDate && !moment(firstDate).isSame(current, 'month');

    const selectedDate = dateList?.some((date) => {
      return moment(date).isSame(current, 'day');
    });
    return {
      isOutOfRange: selectedDate,
      isSelected: selectedDate,
    };
  };

  const disabledDate = (current: any) => {
    return isDateOutOfRange(current).isOutOfRange;
  };

  const onConfirm = (_: any, list?: any[]) => {
    const dates = list || dateList;

    dispatch({
      type: 'opusClaimDataCapture/therapeuticMonthFirstDateAdd',
      payload: {
        otherProcedureId,
        therapeuticMonthList: lodash
          .chain(dates || [])
          .map((el) => ({ firstTreatmentDate: moment(moment(el).valueOf()).format() }))

          .value(),
      },
    });

    setOpen(false);
  };

  const onChange = (date: string) => {
    if (!date) {
      return;
    }
    const newList = lodash.uniq([...dateList, date]);
    setDateListOrdered(newList);

    if (!open) {
      onConfirm(undefined, newList);
    }
  };

  const renderExtraFooter = () => (
    <div className={styles.datelist} style={{ marginTop: '5px' }}>
      <div className={styles.dateWrap}>
        {lodash.map(dateList, (item, index) => (
          <div className={styles.dateItem} key={index}>
            {moment(item).format('L')}
            <Icon
              type="close"
              onClick={() => setDateListOrdered(dateList.filter((i, idx) => idx !== index))}
            />
          </div>
        ))}
      </div>
      <div className={styles.buttonWrap}>
        <Button type="primary" onClick={onConfirm} size="small">
          {formatMessageApi({ Label_BPM_Button: 'confirm' })}
        </Button>
        <Button size="small" onClick={() => setOpen(false)}>
          {formatMessageApi({ Label_BPM_Button: 'Cancel' })}
        </Button>
      </div>
    </div>
  );

  const parsedFooterDateList = lodash
    .map(therapeuticMonthList, (item) => item.firstTreatmentDate)
    .filter((date) => !!date);

  const deleteDates = (treatmentDate: Date) => () => {
    dispatch({
      type: 'opusClaimDataCapture/therapeuticMonthFirstDateDelete',
      payload: { otherProcedureId, firstTreatmentDate: treatmentDate },
    });
  };

  // 初始化
  useEffect(() => {
    if (parsedFooterDateList?.length) {
      setDateListOrdered(parsedFooterDateList);
    }
  }, []);

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        open={open}
        onOpenChange={(isOpen: boolean) => {
          if (isOpen) {
            setDateListOrdered(parsedFooterDateList);
            setOpen(isOpen);
          }
        }}
        renderExtraFooter={renderExtraFooter}
        onChange={onChange}
        disabledDate={disabledDate}
        dateRender={(currentDate: moment.Moment) => {
          const { isOutOfRange, isSelected } = isDateOutOfRange(currentDate);
          if (!isOutOfRange)
            return (
              <div className={classnames(styles.availableDate, styles.date)}>
                {currentDate.date()}
              </div>
            );
          return (
            <div
              className={classnames({
                [styles.date]: true,
                [styles.selectedDate]: isSelected,
                [styles.duplicatedDate]: !isSelected,
              })}
            >
              {currentDate.date()}
            </div>
          );
        }}
        disabled={!editable || config?.editable === Editable.No}
        required={(config.required || fieldProps.required) === Required.Yes}
        formName={field || localFieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        labelType={config.label?.type || fieldProps.label.type}
        name={config?.name}
      />
      <div className={styles.datelist}>
        <div className={styles.dateWrap}>
          {lodash.map(parsedFooterDateList, (item, index) => (
            <div className={styles.dateItem} key={index}>
              {moment(item).format('YYYY/MM/DD')}
              <Icon type="close" onClick={deleteDates(item)} />
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
};

const OutpatientDate = ({ form, editable, section, layout, isShow }: any) => (
  <Authority>
    <ElementConfig.Field
      config={localSectionConfig}
      section={section}
      field={localFieldConfig.field}
    >
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

OutpatientDate.displayName = localFieldConfig.field;

export default OutpatientDate;
