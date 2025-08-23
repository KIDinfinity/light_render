import React, { useEffect, useMemo, useState } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Select, AutoComplete } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Search } from '@/components/TableSearch/FilterInquire';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { serialize as objectToFormData } from 'object-to-formdata';
import { filterConfig, filterConfigByBusinessCode } from '@/utils/configUtil';
import { tenant, Region } from '@/components/Tenant';
import { nonHalfCharacterReplace, halfWidthCharacterInput } from '@/utils/inqueryUtils';
import { InputNumberRange } from '@/components/CustomForm';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import styles from './Inquiry.less';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
import { getDrowDownList } from '@/utils/dictFormatMessage';
const { case: Case } = AdvancedInquiryMap;

const AdvancedQueryOfCaseInquiry = (props: any) => {
  const {
    dispatch,
    form,
    searchObj,
    stateOfSearch,
    config,
    currentActivityList,
    businessTypeList,
    businessDecisionList,
    searchForm,
    submissionChannelList,
    caseLabels,
  } = props;

  let inite = true;

  const {
    Dropdown_COM_HKGeneralSubChannel: hkSubmissionChannelList,
    Dropdown_CAS_FinalStatus: currentStatusList,
    Special_Label_BPM_CaseCategory: caseCategoryList,
    Label_BPM_Entity,
  }: any = useMemo(
    () =>
      getDrowDownList([
        'Dropdown_COM_HKGeneralSubChannel',
        'Dropdown_CAS_FinalStatus',
        'Special_Label_BPM_CaseCategory',
        'Label_BPM_Entity',
      ]),
    []
  );

  const [currentList, setCurrentList] = useState([]);
  const finalSubmissionChannelList = submissionChannelList || [];
  useEffect(() => {
    dispatch({
      type: 'advancedQueryController/getSubmissionChannelList',
    });
    dispatch({
      type: 'advancedQueryController/getApplicableLabelCodes',
    });
  }, []);
  useEffect(() => {
    const removeUndefinedStatusList = currentStatusList || [];
    const removeUndefinedActivityList = currentActivityList || [];
    // @ts-ignore
    setCurrentList([...removeUndefinedActivityList, ...removeUndefinedStatusList]);
  }, [currentStatusList, currentActivityList]);

  const fnSelectCaseCategory = (caseCategory: any) => {
    const businessTypeParams = {
      categoryCode: caseCategory,
      language: tenant.getLocaleLang(),
      regionCode: tenant.region(),
      typeCode: 'Dropdown_COM_BusinessType',
      isCase: true,
    };
    const businessDecisionParams = {
      categoryCode: caseCategory,
      language: tenant.getLocaleLang(),
      regionCode: tenant.region(),
      typeCode: 'Dropdown_COM_BusinessDecision',
    };
    inite = false;

    if (!inite) {
      form.setFieldsValue({
        currentActivity: '',
        businessType: '',
        businessDecision: '',
      });
    }

    if (caseCategory) {
      dispatch({
        type: 'advancedQueryController/getBusinessTypeList',
        payload: businessTypeParams,
      });
      dispatch({
        type: 'advancedQueryController/getBusinessDecisionList',
        payload: objectToFormData(businessDecisionParams),
      });
      dispatch({
        type: 'advancedQueryController/findActivitiesByCaseCategory',
        payload: {
          caseCategory,
          isCase: true,
        },
      });
      return;
    }
    dispatch({
      type: 'advancedQueryController/saveBusinessTypeList',
      payload: {
        businessTypeList: [],
        isCase: true,
      },
    });
    dispatch({
      type: 'advancedQueryController/saveBusinessDecisionList',
      payload: {
        businessDecisionList: [],
      },
    });
    setCurrentList(currentStatusList);
  };

  const { params } = searchForm['1'] || stateOfSearch;
  const searchProps = {
    ...props,
    searchDefault: { ...searchObj },
    searchObj: { ...searchObj },
    ref: (inst: any) => {
      props.onSearchRef(inst);
    },
    isShowExport: true,
  };

  let configParams = [
    {
      fieldName: 'Case No',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-data-capture.label.case-no',
      form: () => (
        <FormItemInput
          formName={Case['Case No']}
          initialValue={params.processInstanceId}
          form={form}
          placeholder=""
          autoComplete="disable-chrome-autofill-mark"
        />
      ),
    },
    {
      fieldName: 'Entity',
      id: 'Entity',
      labelTypeCode: 'Label_COM_Inquiry',
      form: () =>
        form.getFieldDecorator(Case.Entity, {
          initialValue: params.companyCode,
        })(
          <Select
            allowClear
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {lodash.map(Label_BPM_Entity, ({ dictCode, dictName }) => (
              <Select.Option key={dictCode} value={dictCode}>
                {dictName}
              </Select.Option>
            ))}
          </Select>
        ),
    },
    {
      fieldName: 'Claim No',
      labelTypeCode: 'Label_COM_General',
      id: 'BusinessNo',
      form: () => (
        <FormItemInput
          form={form}
          initialValue={params.inquiryBusinessNo}
          placeholder=""
          formName={Case['Claim No']}
          autoComplete="disable-chrome-autofill-mark"
        />
      ),
    },
    {
      fieldName: 'Case Category',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-data-capture.label.case-category',
      form: () =>
        form.getFieldDecorator(Case['Case Category'], {
          initialValue: params.caseCategory,
        })(
          <Select
            allowClear
            filterOption={(input, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={fnSelectCaseCategory}
          >
            {lodash.map(caseCategoryList, ({ dictCode, dictName }: any) => (
              <Select.Option key={dictCode} value={dictCode} title={dictName}>
                {dictName}
              </Select.Option>
            ))}
          </Select>
        ),
    },
    {
      fieldName: 'Submission Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-jpcr.label.submission-date',
      form: () =>
        form.getFieldDecorator(Case['Submission Date'], {
          initialValue: params.submissionDate,
        })(<RangePicker />),
    },
    {
      fieldName: 'Business Decision',
      labelTypeCode: 'Label_COM_General',
      id: 'BusinessDecision',
      form: () =>
        form.getFieldDecorator(Case['Business Decision'], {
          initialValue: params.businessDecision,
        })(
          <AutoComplete
            allowClear
            filterOption={(inputValue, option: any) =>
              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            disabled={
              lodash.isNil(form.getFieldValue('caseCategory')) ||
              lodash.isEmpty(businessDecisionList)
            }
            className={styles.isDelete}
          >
            {lodash.map(businessDecisionList, ({ dictCode, dictName }: any) => (
              <Select.Option key={dictCode} value={dictCode}>
                {dictName}
              </Select.Option>
            ))}
          </AutoComplete>
        ),
    },
    {
      fieldName: 'Creation Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.creation-time',
      form: () =>
        form.getFieldDecorator(Case['Creation Date'], {
          initialValue: params.creationDate,
        })(<RangePicker />),
    },
    {
      fieldName: 'Due Date',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.completed-time',
      form: () =>
        form.getFieldDecorator(Case['Due Date'], {
          initialValue: params.dueDate,
        })(<RangePicker />),
    },
    {
      fieldName: 'Remaining Time',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.remaining-time',
      form: () =>
        form.getFieldDecorator(Case['Remaining Time'], {
          initialValue: params.remainingTime,
        })(
          // @ts-ignore
          <InputNumberRange
            form={form}
            params={{
              options1: {
                key: 'remainingTimeFrom',
                max: form.getFieldValue('remainingTimeTo'),
              },
              options2: {
                key: 'remainingTimeTo',
                min: form.getFieldValue('remainingTimeFrom'),
              },
            }}
          />
        ),
    },
    {
      fieldName: 'Client Name',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'ClientName',
      form: () => (
        <FormItemInput
          formName={Case['Client Name']}
          initialValue={params.clientName}
          getValueFromEvent={halfWidthCharacterInput}
          form={form}
          onBlur={(e: any) => nonHalfCharacterReplace(e, form, 'clientName')}
          autoComplete="disable-chrome-autofill-mark"
          placeholder=""
        />
      ),
    },
    {
      fieldName: 'Current Activity',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.current-activity',
      form: () =>
        form.getFieldDecorator(Case['Current Activity'], {
          initialValue: params.currentActivity,
        })(
          <Select allowClear>
            {lodash.map(currentList, ({ dictCode, dictName }: any) => (
              <Select.Option key={dictCode} value={dictCode} title={dictName}>
                {dictName}
              </Select.Option>
            ))}
          </Select>
        ),
    },
    {
      fieldName: 'Batch No',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.taskDetail.inquireForm.label.batch-no',
      form: () => (
        <FormItemInput
          formName={Case['Batch No']}
          initialValue={params.batchNo}
          form={form}
          placeholder=""
          autoComplete="disable-chrome-autofill-mark"
        />
      ),
    },
    {
      fieldName: 'Policy No',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
      form: () => (
        <FormItemInput
          formName={Case['Policy No']}
          initialValue={params.policyNo}
          form={form}
          placeholder=""
          autoComplete="disable-chrome-autofill-mark"
        />
      ),
    },
    {
      fieldName: 'Business Type',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'BusinessType',
      form: () =>
        form.getFieldDecorator(Case['Business Type'], {
          initialValue: params.businessType,
        })(
          <AutoComplete
            allowClear
            className={styles.isDelete}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {lodash.map(businessTypeList, ({ dictCode, dictName }: any) => (
              <Select.Option key={dictCode} value={dictCode}>
                {dictName}
              </Select.Option>
            ))}
          </AutoComplete>
        ),
    },
    {
      fieldName: 'Submission Channel',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'SubmissionChannel',
      form: () =>
        form.getFieldDecorator(Case['Submission Channel'], {
          initialValue: params?.submissionChannel,
        })(
          <Select allowClear>
            {lodash.map(finalSubmissionChannelList, ({ dictCode, dictName }: any) => (
              <Select.Option key={dictCode} value={dictCode} title={dictName}>
                {dictName}
              </Select.Option>
            ))}
          </Select>
        ),
    },
    {
      fieldName: 'ID/Passport No',
      labelTypeCode: 'Label_BIZ_Individual',
      id: 'IDNo',
      form: () => (
        <FormItemInput
          formName={Case['ID/Passport No']}
          initialValue={params.identityNo}
          form={form}
          placeholder=""
          autoComplete="disable-chrome-autofill-mark"
        />
      ),
    },
    {
      fieldName: 'Policy Owner Name',
      labelTypeCode: 'Label_BIZ_Policy',
      id: 'PolicyOwnerName',
      form: () => (
        <FormItemInput
          formName={Case['Policy Owner Name']}
          initialValue={params.policyOwnerName}
          form={form}
          placeholder=""
          autoComplete="disable-chrome-autofill-mark"
        />
      ),
    },
    {
      fieldName: 'Insured Name',
      labelTypeCode: 'Label_BIZ_Policy',
      id: 'InsuredName',
      form: () => (
        <FormItemInput
          formName={Case['Insured Name']}
          initialValue={params.insuredName}
          getValueFromEvent={halfWidthCharacterInput}
          form={form}
          onBlur={(e: any) => nonHalfCharacterReplace(e, form, 'insuredName')}
          autoComplete="disable-chrome-autofill-mark"
          placeholder=""
        />
      ),
    },
    {
      fieldName: 'Case Label',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'CaseLabel',
      form: () =>
        form?.getFieldDecorator(Case['Case Label'], { initialValue: params?.labelCodeList })(
          <Select allowClear mode="multiple">
            {lodash.map(caseLabels, ({ labelDictCode, labelTypeCode, labelCode }: any) => (
              <Select.Option key={labelCode} value={labelCode}>
                {formatMessageApi({ [labelTypeCode]: labelDictCode })}
              </Select.Option>
            ))}
          </Select>
        ),
    },
  ];
  if (tenant.region() !== Region.TH) {
    configParams = configParams.filter((item) => item.id !== 'IdentityNumber');
  }
  // 排序&过滤
  const configList = filterConfigByBusinessCode(filterConfig(config, configParams));

  return (
    <Search {...searchProps}>
      {lodash.map(configList, (el: any) => {
        const tempParams: any = configParams.find(
          (ele: any) => lodash.toUpper(ele.fieldName) === lodash.toUpper(el.fieldName)
        );
        return (
          <Search.Item
            key={el.fieldName}
            // @ts-ignore
            label={formatMessageApi({ [tempParams?.labelTypeCode]: tempParams?.id })}
            simple={!el.hidden}
          >
            {tempParams.form}
          </Search.Item>
        );
      })}
    </Search>
  );
};

export default connect(({ advancedQueryController, advancedQueryAllForm }: any) => ({
  stateOfSearch: advancedQueryController.stateOfSearch,
  searchObj: advancedQueryController.searchObj,
  currentActivityList: advancedQueryController.caseCurrentActivityList,
  businessTypeList: advancedQueryController.caseBusinessTypeList,
  businessDecisionList: advancedQueryController.businessDecisionList,
  submissionChannelList: advancedQueryController.submissionChannelList,
  caseLabels: advancedQueryController.caseLabels,
  searchForm: advancedQueryAllForm.searchForm,
}))(AdvancedQueryOfCaseInquiry);
