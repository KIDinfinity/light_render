import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import DocumentTypes from './DocumentTypes';
import AddDocumentTypes from './AddDocumentTypes';
import layout from './Layout';
import styles from './ApplicationListItem.less';

const FORMID_PRFIX = 'ApplicationListItem';

@connect(
  (
    {
      dictionaryController,
      JPCLMOfClaimRegistrationController,
      claimEditable,
      formCommonController,
    },
    { applicationId }
  ) => ({
    applicationOptions: lodash.get(dictionaryController, 'applicationType'),
    documentTypeOptions: lodash.get(dictionaryController, 'documentType_i18n'),
    // 由于数据结构改变，下拉框只使用五位数的字典值
    documentTypeOptionsNew: lodash.get(dictionaryController, 'documentTypeMandatory_jp'),
    applicationItem:
      JPCLMOfClaimRegistrationController.claimEntities.applicationListMap[applicationId],
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, applicationId } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'saveApplicationItem',
            payload: {
              changedFields,
              applicationId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
          target: 'saveApplicationItem',
          payload: {
            changedFields,
            applicationId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { applicationItem } = props;
    return formUtils.mapObjectToFields(applicationItem, {
      policyNoArray: (value) => value || [],
      reminderRecipientName: (value: any) => value,
      applicationTypeArray: (value) => value || [],
      recipientName: (value: any) => value,
      recipientPostCode: (value) => value,
      recipientAddress: (value: any) => value,
      documentTypeArray: (value) => value || [],
    });
  },
})
class PolicyListItem extends Component {
  registeForm = () => {
    const { dispatch, form, applicationId }: any = this.props;
    if (applicationId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PRFIX}_${applicationId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, applicationId }: any = this.props;

    if (applicationId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PRFIX}_${applicationId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, applicationId }: any = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/removeApplicationItem',
      payload: {
        applicationId,
      },
    });
  };

  handleDeleteDocument = (value) => {
    const { dispatch, applicationId }: any = this.props;
    dispatch({
      type: 'JPCLMOfClaimRegistrationController/removeDocumentItem',
      payload: {
        applicationId,
        removeCode: value,
      },
    });
  };

  handleSelectDocument = (value) => {
    const { dispatch, applicationId }: any = this.props;
    dispatch({
      type: 'JPCLMOfClaimRegistrationController/addDocumentItem',
      payload: {
        applicationId,
        addCodes: value,
      },
    });
  };

  getPendingToRoles = () => {
    const { applicationItem } = this.props;
    const pendingToRoles = lodash.map(applicationItem.pendingToRoles, (item) => ({
      dictCode: item,
      dictName: formatMessageApi({
        Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item}`,
      }),
    }));

    return pendingToRoles;
  };

  getDocumentsByClaimData = (value) => {
    const { dispatch, applicationId }: any = this.props;
    dispatch({
      type: 'JPCLMOfClaimRegistrationController/getDocumentsByPolicy',
      payload: {
        applicationId,
        policyNoArray: value,
      },
    });
  };

  getPolicyOptions = () => {
    const { policyNoList } = this.props;
    const policyOptions = [];
    lodash.map(policyNoList, (item) => {
      policyOptions.push({ dictCode: item.policyNo, dictName: item.policyNo });
    });

    return policyOptions;
  };

  render() {
    const {
      form,
      applicationOptions,
      documentTypeOptions,
      documentTypeOptionsNew,
      applicationNo,
      taskNotEditable,
    } = this.props;
    // const pendingToRolesList = this.getPendingToRoles();
    const policyNoArray = form.getFieldValue('policyNoArray');
    const isRecipientRequire = !lodash.isEmpty(policyNoArray);
    const documentTypeArray = form.getFieldValue('documentTypeArray');
    const policyOptions = this.getPolicyOptions();
    return (
      <div className={styles.policyListItem}>
        <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
          <div className={styles.card}>
            <div className={styles.title}>
              {formatMessageApi({ Label_BIZ_Claim: 'app.claim.applicationNo' })}
              {applicationNo.toString().padStart(3, '0')}
            </div>
            <div className={styles.main}>
              <Form layout="vertical">
                <FormLayout json={layout}>
                  <FormItemSelect
                    form={form}
                    disabled={taskNotEditable}
                    required
                    formName="policyNoArray"
                    mode="multiple"
                    labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
                    dicts={policyOptions}
                    onBlur={this.getDocumentsByClaimData}
                  />
                  <FormItemSelect
                    form={form}
                    disabled={taskNotEditable}
                    required={isRecipientRequire}
                    formName="applicationTypeArray"
                    mode="multiple"
                    labelId="app.claim.documentTypeArray"
                    dicts={applicationOptions}
                  />
                  <FormItemInput
                    form={form}
                    disabled={taskNotEditable}
                    required
                    formName="reminderRecipientName"
                    labelId="app.navigator.drawer.pending.title.reminder-role"
                  />
                  <FormItemInput
                    form={form}
                    disabled={taskNotEditable}
                    required={isRecipientRequire}
                    formName="recipientName"
                    labelId="app.claim.recipientName"
                  />
                  <FormItemInput
                    form={form}
                    disabled={taskNotEditable}
                    required={isRecipientRequire}
                    formName="recipientPostCode"
                    labelId="app.claim.recipientPostCode"
                  />
                  <FormItemInput
                    form={form}
                    disabled={taskNotEditable}
                    required={isRecipientRequire}
                    formName="recipientAddress"
                    labelId="app.claim.recipientAddress"
                  />
                  <DocumentTypes
                    form={form}
                    disabled={taskNotEditable}
                    required={isRecipientRequire}
                    formName="documentTypeArray"
                    name="documentTypeArray"
                    labelId="app.claim.applicationTypeArray"
                    dicts={documentTypeOptions}
                    handleDeleteDocument={this.handleDeleteDocument}
                  />
                </FormLayout>
              </Form>
            </div>
          </div>
          <AddDocumentTypes
            selectedOptions={documentTypeArray}
            disabled={taskNotEditable}
            dicts={documentTypeOptionsNew}
            handleSelectDocument={this.handleSelectDocument}
          />
        </CardOfClaim>
      </div>
    );
  }
}

export default PolicyListItem;
