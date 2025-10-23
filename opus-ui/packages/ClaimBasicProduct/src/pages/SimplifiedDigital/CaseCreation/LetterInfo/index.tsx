import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './index.less';

const Index = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.letterInfo}>
      <div className={styles.icon} />
      <div className={styles.box}>
        <div className={styles.header}>
          <div className={styles.title}>Letter Inforamtion.</div>
        </div>
        <Section form={form} editable={editable} section="letterInfo">
          <Fields.ClaimNumber />
          <Fields.Claimant />
          <Fields.EventDate />
          <Fields.AddressLine1 />
          <Fields.AddressLine2 />
          <Fields.AddressLine3 />
          <Fields.AddressLine4 />
          <Fields.Postcode />
          <Fields.Town />
          <Fields.State />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ formCommonController, simplifiedDigitalController }: any) => ({
  letterInfo: simplifiedDigitalController?.processData?.letterInfo,
  businessType: simplifiedDigitalController?.processData?.businessType,
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
              target: 'saveLetterInfo',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'simplifiedDigitalController/saveFormData',
            target: 'saveLetterInfo',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { businessType, letterInfo } = props;
      return formUtils.mapObjectToFields({ ...letterInfo, businessType });
    },
  })(Index)
);
