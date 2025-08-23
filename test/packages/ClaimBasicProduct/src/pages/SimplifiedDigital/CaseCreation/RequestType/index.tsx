import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './index.less';

const Index = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.requestType}>
      <div className={styles.icon} />
      <div className={styles.box}>
        <Section form={form} editable={editable} section="RequestType">
          <Fields.BusinessType />
          <Fields.TransactionTypeCode />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ formCommonController, simplifiedDigitalController }: any) => ({
  processData: simplifiedDigitalController?.processData,
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'simplifiedDigitalController/saveEntry',
              target: 'saveRequestType',
              payload: {
                changedFields,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'simplifiedDigitalController/saveFormData',
            target: 'saveRequestType',
            payload: {
              changedFields,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      return formUtils.mapObjectToFields(props?.processData);
    },
  })(Index)
);
