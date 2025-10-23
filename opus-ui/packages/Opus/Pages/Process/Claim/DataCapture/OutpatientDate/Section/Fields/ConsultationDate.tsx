import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
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
import styles from './ConsultationDate.less';
import { EProcedureType } from 'process/Enum';

export const fieldConfig = {
  section: 'OutpatientDateGroup',
  field: 'outpatientTreatmentDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
    },
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    'x-layout': {
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
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
  groupId,
  filteredTreatmentList,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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

  const opTreatmentListObj = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
  );
  const incidentId = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.incidentId
  );

  const isDateDuplicated = (current: moment.Moment) => {
    const duplicateDate = opTreatmentListObj
      ?.filter(({ group }) => group !== groupId)
      ?.some((item) => {
        return moment(item?.outpatientTreatmentDate).isSame(current, 'day');
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
      type: 'opusClaimDataCapture/opTreatmentListAdd',
      payload: {
        treatmentId,
        groupId,
        incidentId,
        dateList: lodash.map(dates, (item) => moment(item).valueOf()),
        procedureType: EProcedureType.OP,
      },
    });
    setOpen(false);
  };

  const onChange = (date: string) => {
    const newList = lodash.uniq([...dateList, moment(date).valueOf()]);
    if (!open && date) {
      dispatch({
        type: 'opusClaimDataCapture/opTreatmentListAdd',
        payload: {
          treatmentId,
          incidentId,
          groupId,
          dateList: newList,
          procedureType: EProcedureType.OP,
        },
      });
      return;
    }
    setDateListOrdered(newList);
  };

  const renderExtraFooter = () => (
    <div className={styles.datelist} style={{ marginTop: '5px' }}>
      <div className={styles.dateWrap}>
        {lodash.map(dateList, (item, index) => (
          <div className={styles.dateItem} key={index}>
            {moment(item).format('YYYY/MM/DD')}
            <Icon
              type="close"
              onClick={() => setDateListOrdered(dateList.filter((i, idx) => idx !== index))}
            />
          </div>
        ))}
      </div>
      <div className={styles.buttonWrap}>
        <Button type="primary" onClick={onConfirm} size="small">
          {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
        </Button>
        <Button size="small" onClick={() => setOpen(false)}>
          {formatMessageApi({ Label_COM_Opus: 'cancel' })}
        </Button>
      </div>
    </div>
  );

  const currentDateList = opTreatmentListObj
    ?.filter(({ group, outpatientTreatmentDate }) => group === groupId && outpatientTreatmentDate)
    ?.map(({ outpatientTreatmentDate }) => outpatientTreatmentDate);

  const deleteDates = (deleteDate?: Date) => () => {
    dispatch({
      type: 'opusClaimDataCapture/opTreatmentListDelete',
      payload: {
        treatmentId,
        groupId,
        deleteDate,
      },
    });
  };

  const footerDateList =
    lodash
      .chain(filteredTreatmentList || [])
      .map(({ outpatientTreatmentDate }: any) => outpatientTreatmentDate)
      .compact()
      .sort()
      .value() || [];

  // 初始化
  useEffect(() => {
    if (footerDateList?.length) {
      setDateListOrdered(footerDateList);
    }
  }, []);

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        open={open}
        onOpenChange={(isOpen: boolean) => {
          if (isOpen) {
            setDateListOrdered(currentDateList);
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
          {lodash.map(footerDateList, (item, index) => (
            <div className={styles.dateItem} key={index}>
              {moment(item).format('L')}
              <Icon type="close" onClick={deleteDates(item)} />
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
};

const OutpatientDate = ({
  form,
  editable,
  section,
  layout,
  isShow,
  treatmentId,
  groupId,
  filteredTreatmentList,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        treatmentId={treatmentId}
        groupId={groupId}
        filteredTreatmentList={filteredTreatmentList}
      />
    </ElementConfig.Field>
  </Authority>
);

OutpatientDate.displayName = fieldConfig.field;

export default OutpatientDate;
