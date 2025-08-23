/* eslint-disable no-shadow */
import React, { useMemo } from 'react';
import FormSection, {
  FormItemSelect,
  FormItemInput,
  FormLayout,
  FormItemTextArea,
} from 'basic/components/Form/FormSection';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { getDrowDownList, formatMessageApi } from '@/utils/dictFormatMessage';
import styles from '../index.less';

enum replyCode {
  MSG_000395 = 'MSG_000395',
  MSG_000396 = 'MSG_000396',
  MSG_000462 = 'MSG_000462',
}

enum replyMessage {
  MSG_000395 = 'Case No. of exceptional handling',
  MSG_000396 = 'Integration Error Message',
  MSG_000462 = 'Integration Error Message',
}

const getDictMessage = () => ({
  ...lodash.get(window, 'dictionary.Dropdown_ING_MessageCode', {}),
});

const dictMessage = getDictMessage();

const ErrorInfo = ({
  form,

  taskNotEditable,

  errorMapMessage,
  errorInfo,
  integrationIndex,
}: any) => {
  const exceptionCategory = getDrowDownList('Dropdown_CFG_ExceptionCategory');
  const Dropdown_ING_ErrorCode = getDrowDownList('Dropdown_ING_ErrorCode');

  const fieldExceptionCategory = formUtils.queryValue(errorInfo?.exceptionCategory);

  const errorCodeList = useMemo(() => {
    return lodash.uniqBy(
      (errorMapMessage?.[fieldExceptionCategory] || Dropdown_ING_ErrorCode || []).map(
        (item: any) => {
          const dc = item.errorCode || item.dictCode;
          return {
            dictName: `${formatMessageApi({ Dropdown_ING_ErrorCode: dc })}`,
            dictCode: dc,
          };
        }
      ),
      'dictCode'
    );
  }, [errorMapMessage, Dropdown_ING_ErrorCode, fieldExceptionCategory]);

  const sortExceptionCategory = useMemo(
    () => lodash.sortBy(exceptionCategory, (item: any) => item.dictCode),
    [exceptionCategory]
  );

  return (
    <FormSection
      form={form}
      formId={`ErrorInformation${integrationIndex}`}
      title="ErrorInformation"
      layConf={24}
      formatType="Label_COM_Exception"
    >
      <FormLayout
        layConf={{
          default: 6,
        }}
      >
        <FormItemInput
          form={form}
          disabled
          formName="integrationSessionId"
          labelId="IntegrationSessionID"
          labelTypeCode="Label_COM_Exception"
          className={styles.info}
        />
        <FormItemInput
          form={form}
          disabled
          formName="integrationApiHandler"
          labelId="IntegrationAPIHandler"
          labelTypeCode="Label_COM_Exception"
          className={styles.info}
        />
        <FormItemInput
          form={form}
          disabled
          formName="systemCode"
          labelId="SystemCode"
          labelTypeCode="Label_COM_General"
          className={styles.info}
        />
        <FormItemInput
          form={form}
          disabled
          formName="regionCode"
          labelId="RegionCode"
          labelTypeCode="Label_COM_General"
          className={styles.info}
        />
      </FormLayout>
      <FormLayout
        layConf={{
          default: 4,
          Keyword: 24,
          ErrorMessage: 24,
          MessageCode: 16,
        }}
      >
        <FormItemTextArea
          form={form}
          name="ErrorMessage"
          disabled
          formName="errorMsg"
          labelId="ErrorMessage"
          labelTypeCode="Label_COM_Exception"
          className={styles.info}
        />
        <FormItemSelect
          form={form}
          formName="exceptionCategory"
          labelId="ExceptionCategory"
          labelTypeCode="Label_COM_Exception"
          disabled={taskNotEditable}
          required
          dicts={sortExceptionCategory}
        />
        <FormItemSelect
          form={form}
          required
          formName="returnCode"
          labelId="ErrorCode"
          labelTypeCode="Label_COM_Exception"
          disabled={taskNotEditable}
          dicts={errorCodeList}
          optionShowType="both"
        />
        <FormItemInput
          form={form}
          name="MessageCode"
          formName="messageCode"
          labelId="MessageCode"
          labelTypeCode="Label_COM_Exception"
          disabled
          className={styles.info}
        />
        <FormItemInput
          form={form}
          name="Keyword"
          formName="keyword"
          labelId="Keyword"
          labelTypeCode="Label_COM_Exception"
          disabled={taskNotEditable}
        />
      </FormLayout>
    </FormSection>
  );
};

export default connect(
  ({ exceptionalHandlingController, formCommonController, claimEditable }: any) => ({
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,

    integrationExceptionHandlingDataList:
      exceptionalHandlingController?.claimProcessData?.integrationExceptionHandlingDataList,
    errorMapMessage: exceptionalHandlingController?.errorCodeMapMessageCode,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        validating,
        index,
        integrationIndex,
        integrationExceptionHandlingDataList,
      } = props;
      const newChangedFields = lodash.omit(changedFields, 'messageCodeDescription');
      if (lodash.has(newChangedFields, 'messageCode')) {
        const filter = formUtils.queryValue(newChangedFields.messageCode)?.split(' - ')[0];
        newChangedFields.messageCode = filter;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'exceptionalHandlingController/saveEntry',
              target: 'updateErrorInfo',
              payload: {
                changedFields: newChangedFields,
                index,
                integrationIndex,
                oldErrorInfo: integrationExceptionHandlingDataList?.[integrationIndex]?.errorInfo,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'exceptionalHandlingController/saveFormData',
            target: 'updateErrorInfo',
            payload: {
              changedFields: newChangedFields,
              index,
              integrationIndex,
              oldErrorInfo: integrationExceptionHandlingDataList?.[integrationIndex]?.errorInfo,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { errorInfo, integrationIndex, integrationExceptionHandlingDataList }: any = props;
      const language = tenant.getLocaleLang();
      let messageCodeDescription =
        dictMessage?.[formUtils.queryValue(errorInfo?.messageCode)]?.[language];
      if (replyCode[formUtils.queryValue(errorInfo?.messageCode)]) {
        messageCodeDescription = messageCodeDescription?.replace(
          '{0}',
          replyMessage[formUtils.queryValue(errorInfo?.messageCode)]
        );
      }
      const messageCode = !messageCodeDescription
        ? formUtils.queryValue(errorInfo?.messageCode)
        : `${formUtils.queryValue(errorInfo?.messageCode)} - ${messageCodeDescription}`;

      return formUtils.mapObjectToFields({
        ...integrationExceptionHandlingDataList?.[integrationIndex],
        ...errorInfo,
        messageCode,
      });
    },
  })(ErrorInfo)
);
