import React from 'react';
import { connect, useSelector } from 'dva';
import { Form, Row, Col } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { getDefaultUnit, isServiceItemRequired } from 'claim/pages/utils/isServiceItemRequired';
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';
import Fees from 'process/PHCLM/ManualAssessment/Fees/List';
import PayableList from './PayableList';
import { useHandleSearchSurageryInfoCallback } from 'process/MYCLM/ManualAssessment/_hooks';
import Section, { BasicFields } from './Section';
import ButtonGroup from './ButtonGroup';
import styles from './ServiceList.less';

const ServiceItem = ({
  form,
  invoiceId,
  serviceItemId,
  treatmentId,
  incidentId,
  item,
  incidentItem,
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isAdjustment = item?.isAdjustment === IsAdjustment.Yes;

  useHandleSearchSurageryInfoCallback({
    isAdjustment,
    originServiceItemId: item.originServiceItemId,
  });

  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
  );

  const serviceItemFeesListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.serviceItemFeesListMap
  );

  const isShowFee = (id: any) => {
    const isNoEmptyServiceItemFeesListMap = !lodash.isEmpty(
      serviceItemFeesListMap?.[incidentItem?.id]?.[
        formUtils.queryValue(serviceItemListMap?.[id]?.serviceItem)
      ] || []
    );

    const isNoEmptyFeeItemList = !lodash.isEmpty(serviceItemListMap?.[id]?.feeItemList || []);

    return isNoEmptyFeeItemList || isNoEmptyServiceItemFeesListMap;
  };

  return (
    <div className={styles.serviceItem}>
      <Row type="flex" gutter={0}>
        <Col span={10} className={classNames(styles.left)}>
          <FormBorderCard
            className={classNames(styles.borderCard, isAdjustment && styles.isAdjustment)}
          >
            <div className={styles.main} id={serviceItemId}>
              <ButtonGroup
                incidentId={incidentId}
                treatmentId={treatmentId}
                invoiceId={invoiceId}
                serviceItemId={serviceItemId}
              />
              <Section form={form} editable={editable} section="Service">
                <BasicFields.Expense invoiceId={invoiceId} serviceItemId={serviceItemId} />
                <BasicFields.Unit treatmentId={treatmentId} serviceItemId={serviceItemId} />
                <BasicFields.ServiceItem
                  serviceItemId={serviceItemId}
                  incidentId={incidentId}
                  invoiceId={invoiceId}
                  treatmentId={treatmentId}
                  claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
                />
              </Section>
              {isShowFee(serviceItemId) && (
                <Fees
                  incidentId={incidentId}
                  treatmentId={treatmentId}
                  invoiceId={invoiceId}
                  serviceItemId={serviceItemId}
                />
              )}
              <Section form={form} editable={editable} section="Service">
                <BasicFields.OtherInsurerPaidAmount />
                <BasicFields.SurgeryClass />
                <BasicFields.NetExpense />
                <BasicFields.VatExpense invoiceId={invoiceId} serviceItemId={serviceItemId} />
                <BasicFields.ProcedureCode treatmentId={treatmentId} isAdjustment={isAdjustment} />
              </Section>
            </div>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right}>
          <PayableList serviceItemId={serviceItemId} />
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { serviceItemId, incidentId }: any
  ) => ({
    item: modelnamepsace.claimEntities.serviceItemListMap[serviceItemId],
    incidentItem: modelnamepsace.claimEntities.incidentListMap?.[incidentId] || {},
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, serviceItemId, invoiceId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServiceItem',
              payload: {
                changedFields,
                serviceItemId,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServiceItem',
            payload: {
              changedFields,
              serviceItemId,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item, {
        unit: (value: any) =>
          isServiceItemRequired(formUtils.queryValue(item?.serviceItem))
            ? value || getDefaultUnit(item?.unit, item?.serviceItem)
            : '',
      });
    },
  })(ServiceItem)
);
