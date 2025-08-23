import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './index.less';

const Index = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.customer}>
      <div className={styles.icon} />
      <div className={styles.box}>
        <div className={styles.header}>
          <div className={styles.title}>Client Info.</div>
        </div>
        <Section form={form} editable={editable} section="CustomerInfo">
          <Fields.OwnerName />
          <Fields.ContactNo />
          <Fields.Email />
          <Fields.InsuredName />
          <Fields.DateofBirth />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ formCommonController, simplifiedDigitalController }: any) => ({
  clientInfo: simplifiedDigitalController?.processData?.clientInfo,
  validating: formCommonController.validating,
  businessType: simplifiedDigitalController?.processData?.businessType,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'simplifiedDigitalController/saveEntry',
              target: 'saveCustomerInfo',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'simplifiedDigitalController/saveFormData',
            target: 'saveCustomerInfo',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { businessType, clientInfo } = props;
      return formUtils.mapObjectToFields({ ...clientInfo, ...businessType });
    },
  })(Index)
);
