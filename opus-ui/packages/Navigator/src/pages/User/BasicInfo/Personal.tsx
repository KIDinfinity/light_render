import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import classnames from 'classnames';
import { Form, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import {
  FormItemDatePicker,
  FormItemPhone,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';

import ChangePassword from './ChangePassword';
import RightForm from '../_components/RightForm';
import basicStyles from './index.less';
import styles from './Personal.less';
import useRegisteForm from '../_hooks/useRegisteForm';
import useUnRegisterForm from '../_hooks/useUnRegisterForm';

const FORMID = 'userPersonInfo';

const Personal = ({ form, dictionaryController }: any) => {
  useRegisteForm(form, FORMID);
  useUnRegisterForm(form, FORMID);

  return (
    <div className={classnames(basicStyles.layoutBlock, styles.wrap)}>
      <div className={styles.changePasswordWrap}>
        <ChangePassword />
      </div>
      <RightForm formTitle="person">
        <div className={styles.content}>
          <Form layout="vertical" className={styles.form}>
            <Row gutter={32}>
              <Col span={8}>
                <FormItemInput
                  form={form}
                  required
                  formName="firstName"
                  name="firstName"
                  maxLength={30}
                  labelId="app.usermanagement.basicInfo.label.first-name"
                />
              </Col>
              <Col span={8}>
                <FormItemInput
                  form={form}
                  required
                  formName="lastName"
                  name="lastName"
                  maxLength={30}
                  labelId="app.usermanagement.basicInfo.label.last-name"
                />
              </Col>
              <Col span={8}>
                <FormItemInput
                  form={form}
                  required
                  formName="englishName"
                  name="englishName"
                  maxLength={60}
                  labelId="app.usermanagement.basicInfo.label.english-name"
                />
              </Col>
              <Col span={8}>
                <FormItemDatePicker
                  form={form}
                  required
                  formName="birthday"
                  format="L"
                  labelId="app.usermanagement.basicInfo.label.birthday"
                />
              </Col>
              <Col span={8}>
                <FormItemSelect
                  form={form}
                  required
                  formName="gender"
                  labelId="app.usermanagement.basicInfo.label.gender"
                  dicts={[
                    {
                      dictCode: 'F',
                      dictName: formatMessageApi({
                        Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.female',
                      }),
                    },
                    {
                      dictCode: 'M',
                      dictName: formatMessageApi({
                        Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.male',
                      }),
                    },
                  ]}
                />
              </Col>
              <Col span={8}>
                <FormItemSelect
                  form={form}
                  required
                  formName="maritalStatus"
                  labelId="app.usermanagement.basicInfo.label.marital-status"
                  dicts={lodash.get(dictionaryController, 'findDictionaryByTypeCode_marital', [])}
                />
              </Col>
              <Col span={8}>
                <FormItemSelect
                  form={form}
                  required
                  formName="identityType"
                  labelId="app.usermanagement.basicInfo.label.identity-type"
                  dicts={lodash.get(
                    dictionaryController,
                    'findDictionaryByTypeCode_IdentityType',
                    []
                  )}
                />
              </Col>
              <Col span={8}>
                <FormItemPhone
                  form={form}
                  required
                  formName="identityNo"
                  maxLength={24}
                  labelId="app.usermanagement.basicInfo.label.identity-no"
                />
              </Col>
              <Col span={8}>
                <FormItemPhone
                  form={form}
                  required
                  formName="phoneNo"
                  maxLength={24}
                  labelId="app.usermanagement.basicInfo.label.phone-no"
                />
              </Col>
              <Col span={8}>
                <FormItemInput
                  required
                  form={form}
                  formName="emergencyContactPerson"
                  name="emergencyContactPerson"
                  labelId="app.usermanagement.basicInfo.label.emergency-contact-person"
                />
              </Col>
              <Col span={8}>
                <FormItemSelect
                  form={form}
                  required
                  formName="relationship"
                  labelId="app.usermanagement.basicInfo.label.relationship"
                  dicts={lodash.get(
                    dictionaryController,
                    'findDictionaryByTypeCode_Relationship',
                    []
                  )}
                />
              </Col>
              <Col span={8}>
                <FormItemPhone
                  form={form}
                  required
                  formName="emergencyContactNo"
                  maxLength={24}
                  labelId="app.usermanagement.basicInfo.label.emergency-contact-no"
                />
              </Col>
            </Row>

            <Row gutter={32}>
              <Col span={8}>
                <FormItemPhone
                  form={form}
                  formName="faxNumber"
                  name="faxNumber"
                  labelId="app.usermanagement.basicInfo.label.fax-no"
                  maxLength={24}
                />
              </Col>
              <Col span={8}>
                <FormItemPhone
                  form={form}
                  formName="landLinePhone"
                  name="landLinePhone"
                  labelId="app.usermanagement.basicInfo.label.landline"
                  maxLength={24}
                />
              </Col>
              <Col span={8}>
                <FormItemInput
                  form={form}
                  formName="mailAddress"
                  name="mailAddress"
                  labelId="app.usermanagement.basicInfo.label.email-address"
                  maxLength={60}
                  rules={[
                    {
                      message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000302' }),
                      pattern:
                        '^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItemInput
                  form={form}
                  formName="homeAddress"
                  name="homeAddress"
                  labelId="app.usermanagement.basicInfo.label.home-address"
                  maxLength={240}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </RightForm>
    </div>
  );
};

export default connect(({ userManagement, dictionaryController }: any) => ({
  dictionaryController,
  userPersonInfo: userManagement.getUserManagement?.userPersonInfo,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;

      dispatch({
        type: 'userManagement/saveUserPersonalInfo',
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { userPersonInfo } = props;
      return formUtils.mapObjectToFields(userPersonInfo);
    },
  })(Personal)
);
