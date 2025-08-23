import React from 'react';
import { Form } from 'antd';
import { NAMESPACE } from '../activity.config';
import { connect, useSelector } from 'dva';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import { ReactComponent as BasicSvg } from 'bpm/assets/basic.svg';
import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './index.less';

const Basic = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.Basic}>
      <FormAntCard>
        <Row>
          <Col span={2}>
            <Icon style={{ fontSize: '50px' }} component={BasicSvg} />
          </Col>
          <Col span={22}>
            <Section form={form} editable={editable} section="Basic">
              <Fields.PolicyNo />
              <Fields.InsuredName />
              <Fields.BusinessNo />
              <Fields.ChequeCategory />
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
  })(Basic)
);
