// @ts-nocheck
import React from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
import lodash, { toUpper, filter, includes } from 'lodash';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { filterConfig } from '@/utils/configUtil';
import { Search } from '@/components/TableSearch/FilterInquire';
import HeightAutoSelect from '@/components/HeightAutoSelect';
import { InputNumberRange } from '@/components/CustomForm';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
const { claimhistory: ClaimHistory } = AdvancedInquiryMap;
@connect(({ advancedQueryController, advancedQueryAllForm }: any) => ({
  stateOfSearch: advancedQueryController.stateOfSearch,
  searchObj: advancedQueryController.searchObj,
  claimTypeOptions: advancedQueryController.claimTypeOptions,
  assessmentDecOptions: advancedQueryController.assessmentDecOptions,
  dropdownCASFinalStatus: advancedQueryController.dropdownCASFinalStatus,
  searchForm: advancedQueryAllForm.searchForm,
}))
class AdvancedQueryOfCaseInquiry extends React.Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'advancedQueryController/findDictionaryClaimByTypeCode',
      payload: {},
    });

    await dispatch({
      type: 'advancedQueryController/findDictionaryAssessmentByTypeCode',
      payload: {},
    });

    await dispatch({
      type: 'advancedQueryController/findDictionaryFinalStatus',
      payload: {},
    });
  };

  render() {
    const {
      form,
      stateOfSearch,
      config,
      claimTypeOptions,
      assessmentDecOptions,
      dropdownCASFinalStatus,
      searchForm,
    } = this.props;
    const Label_BPM_CaseCategory = getDrowDownList('Special_Label_BPM_CaseCategory');
    const Label_BPM_Entity = getDrowDownList('Label_BPM_Entity');
    const Dropdown_PRD_ContractType = getDrowDownList('Dropdown_PRD_ContractType');

    const { params } = searchForm['4'] || stateOfSearch;

    const dropdownCASFinalStatusList = filter(
      dropdownCASFinalStatus,
      (item) =>
        !includes(
          [
            'cancelled',
            'HandledInLocalSystem',
            'HandledInHKLocalSystem',
            'HandledInJPLocalSystem',
            'HandledInTHLocalSystem',
            'HandledInPHLocalSystem',
          ],
          item?.dictCode
        )
    );

    const configParams = [
      {
        fieldName: 'Claim No',
        labelId: 'BusinessNo',
        labelTypeCode: 'Label_COM_General',
        form: () => (
          <FormItemInput
            initialValue={params.inquiryBusinessNo}
            form={form}
            formName={ClaimHistory['Claim No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Case No',
        labelId: 'app.navigator.task-detail-of-data-capture.label.case-no',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () => (
          <FormItemInput
            initialValue={params.caseNo}
            form={form}
            formName={ClaimHistory['Case No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Contract Type',
        labelId: 'ContractType',
        labelTypeCode: 'Label_COM_Inquiry',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Contract Type'], {
            initialValue: params.contractType,
          })(
            <HeightAutoSelect
              mode="multiple"
              allowClear
              dropdownMatchSelectWidth={false}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {lodash.map(Dropdown_PRD_ContractType, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode}>
                  {`${dictCode} - ${dictName}`}
                </Select.Option>
              ))}
            </HeightAutoSelect>
          ),
      },
      {
        fieldName: 'Entity',
        labelId: 'Entity',
        labelTypeCode: 'Label_COM_Inquiry',
        form: () =>
          form.getFieldDecorator(ClaimHistory.Entity, {
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
        fieldName: 'Case Category',
        labelId: 'app.navigator.task-detail-of-data-capture.label.case-category',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Case Category'], {
            initialValue: params.caseCategory,
          })(
            <Select
              allowClear
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {lodash.map(Label_BPM_CaseCategory, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Insured Name',
        labelId: 'app.navigator.taskDetail.inquireForm.label.insured-name',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () => (
          <FormItemInput
            initialValue={params.insuredName}
            form={form}
            formName={ClaimHistory['Insured Name']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Insured ID No.',
        labelId: 'InsuredIDNo',
        labelTypeCode: 'Label_COM_Inquiry',
        form: () => (
          <FormItemInput
            initialValue={params.insuredName}
            form={form}
            formName={ClaimHistory['Insured ID No.']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        // todo next story 选项接口获取
        fieldName: 'Claim Type',
        labelId: 'app.navigator.taskDetail.inquireForm.label.claim-type',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Claim Type'], {
            initialValue: params.claimType,
          })(
            <Select allowClear onChange={this.fnSelectCaseCategory}>
              {lodash.map(claimTypeOptions, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        // 新增
        fieldName: 'Assessment Decision',
        labelId: 'app.navigator.taskDetail.inquireForm.label.assessment-decision',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Assessment Decision'], {
            initialValue: params.assessmentDecision,
          })(
            <Select allowClear onChange={this.fnSelectCaseCategory}>
              {lodash.map(assessmentDecOptions, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Payment Amount',
        labelId: 'app.navigator.taskDetail.inquireForm.label.payment-amount',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Payment Amount'], {
            initialValue: params.paymentAmount,
            rules: [
              {
                pattern: new RegExp(/^[1-9]d*$/, 'g'), // 只能输入数字
                message: 'Please input number!',
              },
            ],
          })(
            <InputNumberRange
              form={form}
              params={{
                options1: {
                  key: 'paymentAmountFrom',
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        if (value > form.getFieldValue('paymentAmountTo')) {
                          callback('invalid');
                        } else {
                          callback();
                          form.validateFields(['paymentAmountTo']);
                        }
                      },
                    },
                  ],
                },
                options2: {
                  key: 'paymentAmountTo',
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        if (value < form.getFieldValue('paymentAmountFrom')) {
                          callback('invalid');
                        } else {
                          callback();
                          form.validateFields(['paymentAmountFrom']);
                        }
                      },
                    },
                  ],
                },
              }}
            />
          ),
      },
      {
        fieldName: 'Submission Date',
        labelId: 'app.navigator.task-detail-of-data-capture.label.submission-date',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Submission Date'], {
            initialValue: params.submissionDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Close Date',
        labelId: 'app.navigator.taskDetail.inquireForm.label.close-date',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Close Date'], {
            initialValue: params.closeDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'External Settled Date',
        labelId: 'SettlementDate',
        labelTypeCode: 'Label_COM_Inquiry',
        form: () =>
          form.getFieldDecorator(ClaimHistory['External Settled Date'], {
            initialValue: params.externalSettledDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Policy No',
        labelId: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () => (
          <FormItemInput
            initialValue={params.policyNo}
            form={form}
            formName={ClaimHistory['Policy No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'labelId/Passport No',
        labelId: 'IdentityNumber',
        labelTypeCode: 'Label_BIZ_Individual',
        form: () => (
          <FormItemInput
            initialValue={params.identityNo}
            form={form}
            formName={ClaimHistory['labelId/Passport No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Client labelId',
        labelId: 'ClientID',
        labelTypeCode: 'Label_BIZ_Claim',
        form: () => (
          <FormItemInput
            initialValue={params.clientId}
            form={form}
            formName={ClaimHistory['Client labelId']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Final Status',
        labelId: 'FinalStatus',
        labelTypeCode: 'Label_COM_Inquiry',
        form: () =>
          form.getFieldDecorator(ClaimHistory['Final Status'], {
            initialValue: params.finalStatus,
          })(
            <Select allowClear onChange={this.fnSelectCaseCategory}>
              {lodash.map(dropdownCASFinalStatusList, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
    ];

    // 排序&过滤
    const configList = filterConfig(config, configParams);

    const searchProps = {
      ...this.props,
      isShowExport: true,
    };

    return (
      <Search {...searchProps}>
        {lodash.map(configList, (el: any) => {
          const tempParams = configParams.find(
            (ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName)
          );
          return (
            <Search.Item
              key={el.fieldName}
              label={formatMessageApi({
                [tempParams?.labelTypeCode]: tempParams.labelId,
              })}
              simple={!el.hidden}
            >
              {tempParams.form}
            </Search.Item>
          );
        })}
      </Search>
    );
  }
}

export default AdvancedQueryOfCaseInquiry;
