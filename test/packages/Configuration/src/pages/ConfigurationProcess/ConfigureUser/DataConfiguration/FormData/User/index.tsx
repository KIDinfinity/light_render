import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormSection, {
  FormItemInput,
  FormItemCascader,
  FormItemSelect,
} from 'basic/components/Form/FormSection';
import { connect } from 'dva';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { VLD_000267 } from 'configuration/pages/ConfigurationProcess/DataMainTenanceForBusiness/DataConfiguration/Validator';
import { tenant } from '@/components/Tenant';
import styles from './index.less';


export default connect(
  (
    { configureUserController, dictionaryController }: any,
    { formData, taskNotEditable, hideAdd }: any
  ) => ({
    allOrganization: configureUserController?.allOrganization,
    isUpdateMultiple: configureUserController?.isUpdateMultiple,
    isUpdate: configureUserController?.isUpdate,
    functionData: configureUserController?.functionData,
    rows: configureUserController?.listPage?.rows,
    mentorDropdownList: configureUserController?.mentorDropdownList || [],
    formData: formData || configureUserController?.formData,
    taskNotEditable: taskNotEditable || configureUserController?.taskNotEditable,
    isAdd: hideAdd || configureUserController?.isAdd,
    allAccountStatus: dictionaryController.Dropdown_CFG_UserStatus,
  })
)(
  Form.create({
    onValuesChange(props, changeValues) {
      const { formData, dispatch }: any = props;
      dispatch({
        type: 'configureUserController/updateFormData',
        payload: {
          formData: {
            ...formData,
            data: {
              ...formData?.data,
              ...changeValues,
            },
          },
          changeValues
        },
      });
    },
    mapPropsToFields(props: any) {
      const { formData: { data = {} } = {} } = props;
      return formUtils.mapObjectToFields(data);
    },
  })((props) => {
    const {
      form,
      allOrganization,
      rows,
      functionData,
      formData,
      isAdd,
      taskNotEditable,
      isUpdateMultiple,
      isUpdate,
      isDuplicateShow = false,
      allAccountStatus,
      mentorDropdownList = []
    }: any = props;
    const isNotEditable = isUpdateMultiple || isUpdate;
    const mentorDropdownListFilterSeft = useMemo(() => {
      return lodash.filter(mentorDropdownList, item => item?.mentor !== formData?.data?.user_id)
    }, [mentorDropdownList, formData?.data?.user_id])
    const companyDropdown = getDrowDownList('Dropdown_CFG_Usercompany');
    const businessDropDown = getDrowDownList('Dropdown_COM_BusinessRequestType');

    return (
      <div className={styles.user}>
        <FormSection
          form={form}
          formId="configureUser"
          isHideBgColor
          isMargin={false}
          isPadding={false}
          layConf={{
            default: 6,
            organization: 10,
          }}
        >
          <FormItemInput
            form={form}
            disabled={taskNotEditable || isNotEditable}
            formName="user_id"
            labelId="UserID"
            required
            labelTypeCode="Label_COM_General"
            className={styles.userInput}
            rules={
              isAdd
                ? [
                  {
                    validator: VLD_000267({
                      formData,
                      rows,
                      functionData,
                      key: 'user_id',
                      transfer: false,
                    }),
                  },
                ]
                : []
            }
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="user_name"
            labelId="UserName"
            required
            labelTypeCode="Label_COM_General"
            className={styles.userInput}
          />

          {!isDuplicateShow && (
            <FormItemCascader
              form={form}
              disabled={taskNotEditable}
              name="organization"
              formName="organization_code"
              labelId="Organization"
              labelTypeCode="Label_COM_General"
              dicts={allOrganization}
              fieldNames={{
                label: 'organizationName',
                value: 'organizationCode',
                children: 'children',
              }}
            />
          )}
          <FormItemSelect
            dictCode='mentor'
            dictName='user_name'
            form={form}
            disabled={taskNotEditable}
            name="Mentor"
            formName="mentor"
            labelId="Mentor"
            labelTypeCode="Label_COM_General"
            dicts={mentorDropdownListFilterSeft}
          />
          {!isAdd && !isDuplicateShow && (
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              name="account_status"
              formName="account_status"
              labelId="AccountStatus"
              labelTypeCode="Label_COM_General"
              existCodes={[1]}
              dicts={
                allAccountStatus?.map((item) => ({
                  ...item,
                  dictCode: lodash.toNumber(item.dictCode),
                })) || []
              }
            />
          )}
        {
          tenant.isMY() && (
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
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
          disabled={taskNotEditable}
          required={tenant.isTH() || tenant.isJP()}
          mode='multiple'
          multipleString
          formName="business_code"
          labelId="Business"
          labelTypeCode="Label_BIZ_Policy"
          dicts={businessDropDown}
        />
        </FormSection>
      </div>
    );
  })
);
