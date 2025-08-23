import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';

import { cityInformation } from '@/services/miscCityInformationControllerService.ts';
import FormSection from 'basic/components/Form/FormSection';
import {
  FormItemInput,
  FormItemSelect,
  FormItemSelectPlus,
  formUtils,
} from 'basic/components/Form';
import ChoiceType from './ChoiceType';
import { namespace } from '../../_models';
import ApplyTo from '../ApplyTo';
import { FormId } from '../../Enum';
import getData from '../../Utils/getData';
import styles from './index.less';

class MailingAddress extends Component<any> {
  get dataChanged() {
    const { InitChangePreferredMailingAddress, changePreferredMailingAddress } = this.props;
    const nextObject = lodash.omit(InitChangePreferredMailingAddress, ['applyTo']);
    const object = lodash.omit(changePreferredMailingAddress, ['applyTo']);
    return !lodash.isEqual(getData(nextObject), getData(formUtils.cleanValidateData(object)));
  }

  OnRecover = async (changedFields: any) => {
    const { dispatch, InitChangePreferredMailingAddress } = this.props;
    dispatch({
      type: `${namespace}/updateMailingAddress`,
      payload: {
        changedFields,
        InitChangePreferredMailingAddress,
      },
    });
  };

  render() {
    const {
      form,
      InitChangePreferredMailingAddress,
      isNotEditable,
      loadingData,
      dictsCountry,
      taskNotEditable,
    } = this.props;
    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId={FormId.MailingAddress}
          title="CHG_PreferredMailingAddr"
          layConf={{
            default: 6,
            emailAddress: 24,
            choiceTypeLayout: 24,
            ApplyToTypeLayout: 24,
          }}
          isMargin
          formatType="Label_BIZ_POS"
        >
          <FormItemInput
            form={form}
            formName="address1"
            disabled={isNotEditable || taskNotEditable}
            labelId="Street"
            recoverValue={InitChangePreferredMailingAddress.address1}
            OnRecover={this.OnRecover}
          />
          <FormItemInput
            form={form}
            disabled={isNotEditable || taskNotEditable}
            formName="address2"
            labelId="Addr1"
            recoverValue={InitChangePreferredMailingAddress.address2}
            OnRecover={this.OnRecover}
          />
          <FormItemInput
            form={form}
            disabled={isNotEditable || taskNotEditable}
            formName="address3"
            labelId="Addr2"
            recoverValue={InitChangePreferredMailingAddress.address3}
            OnRecover={this.OnRecover}
          />
          {/* <FormItemInput
            form={form}
            disabled={isNotEditable || taskNotEditable}
            formName="address4"
            labelId="Addr3"
            recoverValue={InitChangePreferredMailingAddress.address4}
            OnRecover={this.OnRecover}
          /> */}
          <FormItemSelectPlus
            form={form}
            disabled={isNotEditable || taskNotEditable}
            internationalizationType="city"
            searchCustom={cityInformation}
            optionShowType="name"
            formName="city"
            labelId="City"
            name="city"
            selectCallbackExProp="postalCode"
            onSelectCallback={(value, typeCode, exProps) => {
              form.setFieldsValue({ zipCode: exProps });
            }}
            recoverValue={InitChangePreferredMailingAddress.city}
            OnRecover={this.OnRecover}
          />
          <FormItemSelect
            form={form}
            formName="country"
            disabled={isNotEditable || taskNotEditable}
            loading={loadingData}
            dicts={dictsCountry}
            labelId="Country"
            // @ts-ignore
            recoverValue={InitChangePreferredMailingAddress.country}
            OnRecover={this.OnRecover}
          />
          <FormItemInput
            form={form}
            disabled
            formName="zipCode"
            labelId="ZipCode"
            recoverValue={InitChangePreferredMailingAddress.zipCode}
            // OnRecover={this.OnRecover}
          />
          <FormItemInput
            form={form}
            formName="emailAddress"
            disabled={isNotEditable || taskNotEditable}
            labelId="EmailAddress"
            recoverValue={InitChangePreferredMailingAddress.emailAddress}
            OnRecover={this.OnRecover}
          />
          <ChoiceType
            name="choiceTypeLayout"
            recoverValue={InitChangePreferredMailingAddress.preferredMailingAddress}
            form={form}
            formName="preferredMailingAddress"
            disabled={isNotEditable || taskNotEditable}
          />
          <ApplyTo
            // @ts-ignore
            name="ApplyToTypeLayout"
            required={this.dataChanged}
            disabled={isNotEditable || taskNotEditable}
            form={form}
            formName="applyTo"
            labelId="ApplyTo"
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({ phowbDataCaptureController, loading, dictionaryController, claimEditable }: any) => ({
    changePreferredMailingAddress:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.changePreferredMailingAddress ||
      {},
    InitChangePreferredMailingAddress:
      phowbDataCaptureController?.claimProcessData?.originalSectionData
        ?.changePreferredMailingAddress || {},
    loadingData: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    dictsCountry: dictionaryController.Dropdown_CFG_Country,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      dispatch({
        type: `${namespace}/updateMailingAddress`,
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { changePreferredMailingAddress }: any = props;

      return formUtils.mapObjectToFields(
        {
          address1: changePreferredMailingAddress.address1,
          address2: changePreferredMailingAddress.address2,
          address3: changePreferredMailingAddress.address3,
          address4: changePreferredMailingAddress.address4,
          zipCode: changePreferredMailingAddress.zipCode,
          emailAddress: changePreferredMailingAddress.emailAddress,
          preferredMailingAddress: changePreferredMailingAddress.preferredMailingAddress,
          applyTo: changePreferredMailingAddress.applyTo || [],
          city: changePreferredMailingAddress.city,
          country: changePreferredMailingAddress.country,
        },
        {}
      );
    },
  })(MailingAddress)
);
