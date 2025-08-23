import React from 'react';
import { Form } from 'antd';
import { NAMESPACE } from '../activity.config';
import { connect, useSelector } from 'dva';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './index.less';

const DetailInformation = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.Basic}>
      <FormAntCard>
        <Row>
          <Col span={2}>
            <Icon style={{ fontSize: '50px' }} type="credit-card" />
          </Col>
          <Col span={20}>
            <Section form={form} editable={editable} section="DetailInformation">
              <Fields.ChequeAmount />
              <Fields.PayeeName />
              <Fields.DoctorName />
              <Fields.BudgetCode />
              <Fields.CostCentre />
              <Fields.Reason />
            </Section>
          </Col>
        </Row>
      </FormAntCard>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, processTask }: any) => ({
  chequeCase: modelnamepsace?.businessData?.chequeCase || {},
  isAssurance: processTask.getTask?.companyCode === 'Assurance'
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, isAssurance }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/updateBusinessData`,
          payload: {
            changedFields,
            isAssurance
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { chequeCase } = props;
      return formUtils.mapObjectToFields(chequeCase);
    },
  })(DetailInformation)
);
