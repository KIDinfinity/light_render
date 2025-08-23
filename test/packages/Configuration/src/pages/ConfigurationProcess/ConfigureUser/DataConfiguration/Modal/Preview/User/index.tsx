import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Section from 'configuration/components/Modal/Preview/Section';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import FormSection, { FormItemInput, FormItemSelect } from 'basic/components/Form/FormSection';
import { tenant } from '@/components/Tenant';
import styles from './index.less';

export default Form.create({
  mapPropsToFields(props: any) {
    const { formData } = props;
    return formUtils.mapObjectToFields(formData, {});
  },
})(({ form }: any) => {
  const allAccountStatus = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_CFG_UserStatus
  );
  const mentorDropdownList = useSelector((state: any) => state.configureUserController?.mentorDropdownList) || [];
  const companyDropdown = getDrowDownList('Dropdown_CFG_Usercompany');
  const businessDropDown = getDrowDownList('Dropdown_COM_BusinessRequestType');

  return (
    <Section
      className={styles.user}
      title={formatMessageApi({
        Label_COM_General: 'User',
      })}
    >
      <FormSection
        form={form}
        formId="configureUser"
        isHideBgColor={true}
        isMargin={false}
        isPadding={false}
        layConf={{
          default: 6,
          organization: 10,
        }}
      >
        <FormItemInput
          form={form}
          disabled={true}
          formName="user_id"
          labelId="UserID"
          labelTypeCode="Label_COM_General"
        />
        <FormItemInput
          form={form}
          disabled={true}
          formName="user_name"
          labelId="UserName"
          labelTypeCode="Label_COM_General"
        />
        <FormItemInput
          form={form}
          disabled={true}
          name="organization"
          formName="organization_name"
          labelId="Organization"
          labelTypeCode="Label_COM_General"
        />
        <FormItemSelect
          form={form}
          disabled={true}
          dictCode='mentor'
          dictName='user_name'
          name="Mentor"
          formName="mentor"
          labelId="Mentor"
          labelTypeCode="Label_COM_General"
          dicts={mentorDropdownList}
        />
        <FormItemSelect
          form={form}
          disabled={true}
          name="account_status"
          formName="account_status"
          labelId="AccountStatus"
          labelTypeCode="Label_COM_General"
          dicts={
            [
              ...allAccountStatus?.map((item) => ({
                ...item,
                dictCode: lodash.toNumber(item.dictCode),
              })),
              ...allAccountStatus,
            ] || []
          }
        />
        {
          tenant.isMY() && (
            <FormItemSelect
              form={form}
              disabled={true}
              mode='multiple'
              formName="companyCode"
              labelId="userCompany"
              labelTypeCode="Label_BIZ_Policy"
              dicts={companyDropdown}
            />
          )
        }
        <FormItemSelect
          form={form}
          disabled={true}
          mode='multiple'
          multipleString
          formName="business_code"
          labelId="Business"
          labelTypeCode="Label_BIZ_Policy"
          dicts={businessDropDown}
        />
      </FormSection>
    </Section>
  );
});
