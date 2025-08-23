import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form, Row, Col } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';
import Section, { BasicFields } from './Section';
import styles from './BreakdownList.less';

const BreakdownItem = ({ form, data }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const claimServiceItemBreakDownList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimServiceItemBreakDownList
  );
  const breakdownList: any = lodash.first(claimServiceItemBreakDownList);

  const invoiceId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[breakdownList?.serviceItemId]?.invoiceId
  );

  const treatmentId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.invoiceListMap?.[invoiceId]?.treatmentId
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveServiceItemBreakdownForms`,
      payload: {
        form,
      },
    });
  }, []);

  return (
    <div>
      <Row>
        <Col span={10}>
          <div className={styles.breakdownPeriod}>
            {`${moment(data.fromDate).format('L')} ~ ${moment(data.toDate).format('L')}`}
          </div>
        </Col>
        <Col span={14}>
          <Section form={form} editable={editable} section="serviceItemBreakdown">
            <BasicFields.Expense invoiceId={invoiceId} breakDownId={data.id} />
            <BasicFields.Unit treatmentId={treatmentId} breakDownId={data.id} />
          </Section>
        </Col>
      </Row>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, data } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServiceItemBreakdown',
              payload: {
                changedFields,
                serviceItemBreakdownId: data.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServiceItemBreakdown',
            payload: {
              changedFields,
              serviceItemBreakdownId: data.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(BreakdownItem)
);
