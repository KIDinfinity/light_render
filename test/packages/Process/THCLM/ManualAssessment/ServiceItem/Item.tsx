import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form, Row, Col, Button } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard, formUtils } from 'basic/components/Form';

import PayableList from './PayableList';
import Section, { BasicFields } from './Section';
import styles from './ServiceList.less';

const ServiceItem = ({
  form,
  invoiceId,
  serviceItemId,
  treatmentId,
  incidentId,
  item,
  incidentItem,
  lenght,
  index,
}: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );

  const showAddPayable = async (e: any) => {
    const { top } = e.target.getBoundingClientRect();
    await dispatch({
      type: `${NAMESPACE}/popUpPablePoint`,
      payload: {
        top: Number(top),
      },
    });
    await dispatch({
      type: `${NAMESPACE}/popUpPableInit`,
      payload: {
        serviceItemId,
        treatmentId,
        incidentId,
      },
    });
  };
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeServiceItem`,
      payload: {
        invoiceId,
        serviceItemId,
      },
    });

    lodash.map(
      lodash.filter(serviceItemPayableListMap, (map) => map.serviceItemId === serviceItemId),
      (list) => {
        dispatch({
          type: `${NAMESPACE}/removeServicePayableItem`,
          payload: {
            invoicePayableItemId: list?.invoicePayableId,
            serviceItemPayableItemId: list?.id,
          },
        });
      }
    );
  };

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;
  return (
    <div className={styles.serviceItem}>
      <Row type="flex" gutter={0}>
        <Col
          span={10}
          className={classNames(
            styles.left,
            Number(lenght) === Number(index) + 1 && styles.lastServerList
          )}
        >
          <FormBorderCard
            button={{
              visiable: editable,
              callback: () => {
                handleDelete();
              },
            }}
            className={classNames(styles.borderCard, isAdjustMent && styles.isAdjustment)}
          >
            <div className={styles.main} id={serviceItemId}>
              <Section form={form} editable={editable} section="Service">
                <BasicFields.Expense invoiceId={invoiceId} />
                <BasicFields.OtherInsurerPaidAmount />
                <BasicFields.ServiceItem
                  invoiceId={invoiceId}
                  claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
                />
                <BasicFields.SurgeryClass />
                <BasicFields.Unit treatmentId={treatmentId} />
                <Col span={8} order={6} className={styles.addPayable}>
                  <Button icon="plus" onClick={showAddPayable}>
                    Payable
                  </Button>
                </Col>
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
    incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId] || {},
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
        unit: (value: any) => value,
      });
    },
  })(ServiceItem)
);
