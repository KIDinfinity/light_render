import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
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
import { errorMessageModal } from 'claim/pages/utils/popModel';
import { localConfig as localSectionConfig } from '../index';
import classnames from 'classnames';
import styles from './TherapeuticDateList.less';

export const fieldConfig = {
  section: 'TherapeuticMonthList',
  field: 'therapeuticDateList',
  'field-props': {
    label: {
      dictTypeCode: 'Label_COM_Opus',
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

const FormItem = ({ isShow, layout, form, editable, field, config, item }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // dateList might container mms from redux & string from antd. wrap it with moment before using it
  const [dateList, setDateList] = useState<string[]>([]);

  const {
    therapeuticDateList = '[]',
    therapeuticMonthList,
    id,
    otherProcedureId,
    NAMESPACE,
  } = item || {};

  const otherProcedureList =
    useSelector(
      ({ [NAMESPACE]: modelnamepspace }: any) =>
        lodash.values(modelnamepspace.claimEntities?.otherProcedureListMap) || []
    ) || [];

  const monthList = useMemo(() => {
    return lodash
      .chain(therapeuticMonthList)
      .reduce((arr: any, { therapeuticDateList }: any) => {
        return [...arr, ...JSON.parse(therapeuticDateList || '[]')];
      }, [])
      .value();
  }, [otherProcedureList]);

  const setDateListOrdered = (nextDateList: any) => {
    setDateList(
      lodash
        .chain(nextDateList)
        .orderBy((item) => moment(item).valueOf(), ['asc'])
        .uniq()
        .value()
    );
  };

  const isDateOutOfRange = (current: moment.Moment) => {
    const firstDate = !lodash.isEmpty(monthList) ? monthList[0] : dateList[0];

    const notSameMonth = firstDate && !moment(firstDate).isSame(current, 'month');

    const selectedDate = dateList?.some((date) => {
      return moment(date).isSame(current, 'day');
    });
    return {
      isOutOfRange: notSameMonth || selectedDate,
      isSelected: selectedDate,
    };
  };

  const disabledDate = (current: any) => {
    return isDateOutOfRange(current).isOutOfRange;
  };

  const onConfirm = (_: any, list?: any[]) => {
    const dates = list || dateList;
    dispatch({
      type: `${NAMESPACE}/therapeuticMonthListUpdate`,
      payload: {
        id,
        otherProcedureId,
        changedFields: {
          therapeuticDateList: `[${lodash.map(dates, (item) => moment(item).valueOf())}]`,
          therapeuticMonth: moment(dates?.[0]).format('YYYY-M'),
        },
      },
    });
    setOpen(false);
  };

  const onChange = (date: string) => {
    if (!date) {
      return;
    }

    const newList = lodash.uniq([...dateList, moment(date).valueOf()]);
    if (newList.length > 6) {
      errorMessageModal([{ Label_COM_ErrorMessage: 'MSG_001356' }]);
      return;
    }

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

  const parsedFooterDateList = JSON.parse(therapeuticDateList);
  const deleteDates = (therapeuticDate: Date) => () => {
    dispatch({
      type: `${NAMESPACE}/therapeuticMonthListUpdate`,
      payload: {
        id,
        otherProcedureId,
        changedFields: {
          therapeuticDateList: `[${lodash.filter(parsedFooterDateList, (item) => item !== therapeuticDate)}]`,
        },
      },
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
        formName={field || fieldConfig.field}
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

const OutpatientDate = ({ form, editable, section, layout, isShow, item }: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} item={item} />
    </ElementConfig.Field>
  </Authority>
);

OutpatientDate.displayName = fieldConfig.field;

export default OutpatientDate;
