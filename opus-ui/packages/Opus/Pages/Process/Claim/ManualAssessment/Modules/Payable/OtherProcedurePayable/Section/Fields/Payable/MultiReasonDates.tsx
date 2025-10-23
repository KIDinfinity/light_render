import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import moment from 'moment';
import { Col, Button, Icon, Tag } from 'antd';
import {
  Rule,
  Visible,
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
} from 'basic/components/Form';
import classnames from 'classnames';
import styles from './MultiReasonDates.less';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

export const fieldConfig = {
  section: 'OtherProcedure.Payable',
  field: 'multiReasonDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'clmReferenceDate',
    },
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'benefitItemCode',
          },
          operator: '===',
          right: '464',
        },
      ],
    },
    editable: 'N',
    required: 'N',
    expand: 'N',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
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
  otherProcedurePayableId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dateList, setDateList] = useState<string[]>([]);
  const setDateListOrdered = (nextDateList: any) => {
    setDateList(
      lodash
        .chain(nextDateList)
        .orderBy((item) => moment(item).format(), ['asc'])
        .uniq()
        .value()
    );
  };

  const { multiReasonDates } = form.getFieldsValue(['multiReasonDates']);

  const footerDateList = multiReasonDates
    ? lodash.isArray(multiReasonDates)
      ? lodash.map(multiReasonDates, (item) => moment(item).format()).filter((date) => !!date)
      : [multiReasonDates]
    : [];

  const isDateDuplicated = (current: moment.Moment) => {
    const duplicateDate = lodash.some(footerDateList, (item) => {
      return moment(item).isSame(current, 'day');
    });
    const selectedDate = dateList?.some((date) => {
      return moment(date).isSame(current, 'day');
    });
    return {
      isDuplicated: duplicateDate || selectedDate,
      isSelected: selectedDate,
    };
  };

  const disabledDate = (current: any) => {
    return isDateDuplicated(current).isDuplicated;
  };

  const onConfirm = (_: any, list?: any[]) => {
    const dates = list || dateList;

    dispatch({
      type: `${NAMESPACE}/saveOtherProcedurePayableItem`,
      payload: {
        id: otherProcedurePayableId,
        changedFields: {
          multiReasonDates: dates,
        },
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
            {moment(item).format('YYYY/MM/DD')}
            <Icon
              type="close"
              onClick={() => setDateListOrdered(dateList?.filter((i, idx) => idx !== index))}
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

  const deleteDates = (deleteDate?: Date) => () => {
    dispatch({
      type: `${NAMESPACE}/saveOtherProcedurePayableItem`,
      payload: {
        id: otherProcedurePayableId,
        changedFields: {
          multiReasonDates: lodash.filter(
            footerDateList,
            (item) => !moment(item).isSame(deleteDate, 'day')
          ),
        },
      },
    });
  };

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');

  const editableConditions = true;
  const disabled =
    !editable ||
    ((config?.editable || fieldProps.editable) === Editable.Conditions
      ? !editableConditions
      : (config?.editable || fieldProps.editable) === Editable.No);

  // 初始化
  useEffect(() => {
    if (footerDateList?.length) {
      setDateListOrdered(footerDateList);
    }
  }, []);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          form={form}
          open={open}
          onOpenChange={(isOpen: boolean) => {
            if (isOpen) {
              setDateListOrdered(footerDateList);
              setOpen(isOpen);
            }
          }}
          renderExtraFooter={renderExtraFooter}
          onChange={onChange}
          disabledDate={disabledDate}
          dateRender={(currentDate: moment.Moment) => {
            const { isDuplicated, isSelected } = isDateDuplicated(currentDate);
            if (!isDuplicated)
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
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          required={(config?.required || fieldProps.required) === Required.Yes}
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          labelType={config?.label?.type || fieldProps.label.type}
          name={config?.name}
        />
        <div className={styles.datelist}>
          <div className={styles.dateWrap}>
            {lodash.map(footerDateList, (item, index) => (
              <Tag key={index} closable={!disabled} onClose={deleteDates(item)}>
                {moment(item).format('YYYY/MM/DD')}
              </Tag>
            ))}
          </div>
        </div>
      </Col>
    )
  );
};

const OutpatientDate = ({ form, editable, layout, isShow, otherProcedurePayableId }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      otherProcedurePayableId={otherProcedurePayableId}
    />
  </Authority>
);

OutpatientDate.displayName = fieldConfig.field;

export default OutpatientDate;
