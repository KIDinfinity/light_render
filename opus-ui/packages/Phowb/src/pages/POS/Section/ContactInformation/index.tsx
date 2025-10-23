import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';

import FormSection from 'basic/components/Form/FormSection';
import { FormItemInput, formUtils } from 'basic/components/Form';
import { namespace } from '../../_models';
import ApplyTo from '../ApplyTo';
import { FormId } from '../../Enum';
import getData from '../../Utils/getData';
import styles from './index.less';

class ContactInformation extends Component<any> {
  get dataChanged() {
    const { initChangeContactInformation, changeContactInformation } = this.props;
    const nextObject = lodash.omit(initChangeContactInformation, ['applyTo']);
    const object = lodash.omit(changeContactInformation, ['applyTo']);
    return !lodash.isEqual(getData(nextObject), getData(formUtils.cleanValidateData(object)));
  }

  OnRecover = (changedFields: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/updateContactInformation`,
      payload: {
        changedFields,
      },
    });
  };

  render() {
    const { form, isNotEditable, taskNotEditable } = this.props;
    const { initChangeContactInformation }: any = this.props;
    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId={FormId.ContactInformation}
          title="CHG_Contact"
          layConf={{
            default: 4,
            ApplyToTypeLayout: 24,
          }}
          isMargin
          formatType="Label_BIZ_POS"
        >
          <FormItemInput
            form={form}
            disabled={isNotEditable || taskNotEditable}
            formName="residenceTelNo"
            maxLength={30}
            labelId="ResidenceTelNo"
            recoverValue={initChangeContactInformation.residenceTelNo}
            OnRecover={this.OnRecover}
          />
          <FormItemInput
            form={form}
            disabled={isNotEditable || taskNotEditable}
            formName="businessTelNo"
            labelId="BusinessTelNo"
            recoverValue={initChangeContactInformation.businessTelNo}
            OnRecover={this.OnRecover}
          />
          <FormItemInput
            form={form}
            disabled={isNotEditable || taskNotEditable}
            formName="mobileTelNo"
            labelId="MobilePhoneNo"
            recoverValue={initChangeContactInformation.mobileTelNo}
            OnRecover={this.OnRecover}
          />
          <ApplyTo
            //@ts-ignore
            name="ApplyToTypeLayout"
            required={this.dataChanged}
            form={form}
            disabled={isNotEditable || taskNotEditable}
            formName="applyTo"
            labelId="ApplyTo"
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(({ phowbDataCaptureController, claimEditable }: any) => ({
  changeContactInformation:
    phowbDataCaptureController.claimProcessData.posDataDetail?.changeContactInformation || {},
  initChangeContactInformation:
    phowbDataCaptureController.claimProcessData.originalSectionData?.changeContactInformation || {},
  taskNotEditable: claimEditable.taskNotEditable,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      dispatch({
        type: `${namespace}/updateContactInformation`,
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { changeContactInformation }: any = props;
      return formUtils.mapObjectToFields({
        residenceTelNo: changeContactInformation?.residenceTelNo,
        businessTelNo: changeContactInformation?.businessTelNo,
        mobileTelNo: changeContactInformation?.mobileTelNo,
        applyTo: changeContactInformation?.applyTo || [],
      });
    },
  })(ContactInformation)
);
