import React from 'react';
import { Form } from 'antd';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import useGetInsuredId from 'documentManage/pages/_hooks/useGetInsuredId';
import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { Fields, SectionTitle } from './Section/index';
import styles from './index.less';

const Information = ({
  form,
  taskNotEditable,
  dispatch,
  taskDetail,
}: {
  form: any;
  taskNotEditable: boolean;
  dispatch: Dispatch;
  taskDetail: any;
}) => {
  useGetInsuredId(taskDetail);
  return (
    <div className={styles.indexInformation}>
      <FormAntCard title={<SectionTitle />}>
        <Section
          editable={!taskNotEditable}
          dispatch={dispatch}
          form={form}
          section="IndexingInformation"
        >
          <Fields.PolicyNo />
          <Fields.InsuredId />
          <Fields.InsuredName />
          <Fields.ClaimType />
          <Fields.ApplicationNo />
          <Fields.WakeUpSkipFlag />
        </Section>
      </FormAntCard>
    </div>
  );
};

const FormComponent = connect(
  ({ documentScanningController, claimEditable, formCommonController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    indexInformation: documentScanningController?.claimProcessData?.indexInformation || {},
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'documentScanningController/saveEntry',
              target: 'saveInformation',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'documentScanningController/saveFormData',
            target: 'saveInformation',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { indexInformation } = props;
      return formUtils.mapObjectToFields(indexInformation);
    },
  })(Information)
);

export default (props: any) => (
  <CaseTaskDetail.Consumer {...props}>
    <FormComponent />
  </CaseTaskDetail.Consumer>
);
