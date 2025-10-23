import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Col, Button, Icon } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
} from 'basic/components/Form';
import styles from '../../../Outpatient.less';
import { showDeleteConfirmModal } from 'opus/Components/Modals/DeleteModal';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Treatment.Basic',
  field: 'outpatientDate',
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
        order: 10,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  isTreatmentTypeOP,
  field,
  config,
  treatmentId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();
  const requiredConditions = !isTreatmentTypeOP;
  const [open, setOpen] = useState(false);
  const opTreatmentList = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.opTreatmentList
  );

  const opTreatmentListObj = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
  );

  const onChange = (date: any) => {
    if (!open && date) {
      dispatch({
        type: 'opusClaimDataCapture/saveOpTreatmentList',
        payload: {
          treatmentId,
          opTreatmentList: [date],
        },
      });
      return;
    }

    dispatch({
      type: 'opusClaimDataCapture/addOpTreatmentList',
      payload: {
        date,
      },
    });
  };
  const onOpenChange = (e: any) => {
    if (e) setOpen(e);
  };

  const deleteItem = (index: any) => () => {
    dispatch({
      type: 'opusClaimDataCapture/updateOpTreatmentList',
      payload: {
        index,
      },
    });
  };

  const disabledDate = (current: any) => {
    return lodash.some(
      [
        ...(lodash.map(opTreatmentListObj, 'outpatientTreatmentDate') || ''),
        ...(opTreatmentList || ''),
      ],
      (item) => {
        return moment(item).format('YYYY/MM/DD') === moment(current).format('YYYY/MM/DD');
      }
    );
  };

  const hadleButton = () => {
    dispatch({
      type: 'opusClaimDataCapture/saveOpTreatmentList',
      payload: {
        treatmentId,
        opTreatmentList,
      },
    });

    dispatch({
      type: 'opusClaimDataCapture/updateOpTreatmentList',
      payload: {
        index: '-1',
      },
    });

    setOpen(false);
    form.resetFields();
  };

  const renderExtraFooter = () => (
    <>
      <div className={styles.list}>
        <div className={styles.button}>
          <Button type="primary" onClick={hadleButton}>
            確認
          </Button>
        </div>
        {lodash.map(opTreatmentList, (item, index) => (
          <div className={styles.footerItem} key={index}>
            <div className={styles.date}>{moment(item).format('YYYY/MM/DD')}</div>
            <div className={styles.close}>
              <Icon
                onClick={() => showDeleteConfirmModal({ onConfirm: deleteItem(index) })}
                type="close"
              />
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
        disabledDate={disabledDate}
        open={open}
        onOpenChange={onOpenChange}
        renderExtraFooter={renderExtraFooter}
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !isTreatmentTypeOP
            : config?.editable === Editable.No)
        }
        required={
          config?.required === Required.Conditions
            ? requiredConditions
            : (config.required || fieldProps.required) === Required.Yes
        }
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        labelType={config.label?.type || fieldProps.label.type}
        name={config?.name}
      />
    </Col>
  );
};

const OutpatientDate = ({
  field,
  config,
  form,
  editable,
  isTreatmentTypeOP,
  layout,
  isShow,
  treatmentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isTreatmentTypeOP={isTreatmentTypeOP}
      treatmentId={treatmentId}
    />
  </Authority>
);

OutpatientDate.displayName = fieldConfig.field;

export default OutpatientDate;
