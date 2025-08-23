import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Card, Form } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemInput,
  FormItemDatePicker,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import json from './InsuredInfo.json';
import styles from './InsuredInfo.less';

@connect(({ dictionaryController, bpProcessController }) => ({
  dictsOfIdentityType: dictionaryController.IdentityType,
  dictsOfGender: dictionaryController.Gender,
  dictsOfOccupation: dictionaryController.Occupation,
  nationalityDropdown: lodash.get(dictionaryController, 'nationalityDropdown.list'),
  occupationDropdown: lodash.get(dictionaryController, 'occupationDropdown.list'),
  insured: bpProcessController.claimProcessData.insured,
}))
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;
    dispatch({
      type: 'bpProcessController/saveInsured',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { insured } = props;
    return formUtils.mapObjectToFields(insured, {
      firstName: (value) => value,
      surname: (value) => value,
      gender: (value) => value,
      identityType: (value) => value,
      identityNo: (value) => value,
      dateOfBirth: (value) => (value ? moment(value) : null),
      nationality: (value) => value,
      email: (value) => value,
      phoneNo: (value) => value,
      address: (value) => value,
      occupation: (value) => value,
    });
  },
})
class InsuredInfo extends Component {
  render() {
    const {
      form,
      dictsOfIdentityType,
      dictsOfGender,
      nationalityDropdown,
      occupationDropdown,
    } = this.props;

    return (
      <div className={styles.insured}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={json}>
              <FormItemInput
                form={form}
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemSelect
                form={form}
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
              />
              <FormItemSelect
                form={form}
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
              />
              <FormItemInput
                form={form}
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemDatePicker
                form={form}
                required
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
                format="L"
              />
              <FormItemSelect
                form={form}
                formName="nationality"
                labelId="app.navigator.task-detail-of-data-capture.label.nationality"
                dicts={nationalityDropdown}
                dictCode="nationalityCode"
                dictName="nationalityName"
              />
              <FormItemSelect
                form={form}
                formName="occupation"
                labelId="app.usermanagement.basicInfo.label.occupation"
                dicts={occupationDropdown}
                dictCode="occupationCode"
                dictName="occupationName"
              />
              <FormItemInput
                form={form}
                formName="email"
                maxLength={60}
                rules={[
                  {
                    type: 'email',
                    message: 'The email address you supplied is invalid.',
                  },
                ]}
                labelId="app.navigator.task-detail-of-data-capture.label.email"
              />
              <FormItemInput
                form={form}
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemInput
                form={form}
                formName="address"
                maxLength={240}
                labelId="app.navigator.task-detail-of-data-capture.label.address"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default InsuredInfo;
