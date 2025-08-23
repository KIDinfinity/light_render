import React from 'react';
import { NAMESPACE } from '../activity.config';

import type { Dispatch } from 'redux';
import { connect, useSelector, useDispatch } from 'dva';
import { Form, Row, Col } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './InvoiceList.less';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  procedureId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
}

const InvoiceItem = ({ form, invoiceId, item, treatmentId, expand }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.serviceItemPayableListMap
  );

  const exchangeDate = async (value: any) => {
    if (!moment(formUtils.queryValue(item?.exchangeDate)).isSame(value)) {
      const newDate = moment(value);
      if (newDate.isValid()) {
        const newData = await dispatch({
          type: `${NAMESPACE}/getExchangeRate`, //入口处请求汇率
          payload: { dateList: [newDate.format('YYYY-MM-DD')] },
        });
        if (newData) {
          dispatch({
            type: `${NAMESPACE}/handleExchangeRateForInvoiceCurrencyPayout`,
          });
        }
      }

      dispatch({
        type: `${NAMESPACE}/handleExchangeRateForExchangeDate`,
        payload: {
          invoiceId,
          exchangeDate: value,
          oldExchangeDate: formUtils.queryValue(item?.exchangeDate),
        },
      });
    }
  };

  const handleDelete = async () => {
    await dispatch({
      type: `${NAMESPACE}/removeInvoiceItem`,
      payload: {
        treatmentId,
        invoiceId,
      },
    });

    lodash.map(
      lodash.filter(serviceItemPayableListMap, { invoiceId }),
      ({ booster: boosterId, id }) => {
        dispatch({
          type: `${NAMESPACE}/removeServicePayableItem`,
          payload: {
            boosterId,
            id,
          },
        });
      }
    );
  };

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  return (
    <div className={styles.invoiceItem}>
      <Row type="flex" gutter={0} className={styles.container}>
        <Col span={10} className={styles.left}>
          <FormBorderCard
            button={{ visiable: editable, callback: handleDelete }}
            className={isAdjustMent && styles.isAdjustment}
          >
            <Section form={form} editable={editable} section="Invoice">
              <Fields.InvoiceDate />
              <Fields.Expense invoiceId={invoiceId} />
              <Fields.InvoiceNo />
              {/* <Fields.OtherInsurerPaidAmount /> */}
              {/* <Fields.IsClaimWithOtherInsurer /> */}
              {/* <Fields.ExchangeDate exchangeDate={exchangeDate} /> */}
            </Section>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right}>
          <></>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { invoiceId }: any) => ({
    item: modelnamepsace.claimEntities.invoiceListMap[invoiceId],
    validating: formCommonController.validating,
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, invoiceId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveInvoiceItem',
              payload: {
                changedFields,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveInvoiceItem',
            payload: {
              changedFields,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(InvoiceItem)
);
