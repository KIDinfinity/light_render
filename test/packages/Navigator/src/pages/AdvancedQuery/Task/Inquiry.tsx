import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import lodash from 'lodash';
import { Select, AutoComplete } from 'antd';
import { InputNumberRange } from '@/components/CustomForm';
import { connect } from 'dva';
import { Search } from '@/components/TableSearch/FilterInquire';
import HeightAutoSelect from '@/components/HeightAutoSelect';
import { filterConfig } from '@/utils/configUtil';
import { tenant, Region } from '@/components/Tenant';
import { nonHalfCharacterReplace } from '@/utils/inqueryUtils';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import styles from './Inquiry.less';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
import { getDrowDownList } from '@/utils/dictFormatMessage';
const { task: Task } = AdvancedInquiryMap;

class InquireForm extends Component<any> {
  inite = true;

  componentDidMount() {
    const { stateOfSearch, dispatch } = this.props;
    const { params } = stateOfSearch;
    if (params?.caseCategory) {
      this.fnSelectCaseCategory(params.caseCategory);
    }
    dispatch({
      type: 'advancedQueryController/getSubmissionChannelList',
    });
    dispatch({
      type: 'advancedQueryController/getApplicableLabelCodes',
    });
  }

  fnSelectCaseCategory = async (caseCategory: any) => {
    const { dispatch, form } = this.props;
    const params = {
      categoryCode: caseCategory,
      language: tenant.getLocaleLang(),
      regionCode: tenant.region(),
      typeCode: 'Dropdown_COM_BusinessType',
      isCase: false,
    };
    if (!this.inite) {
      form.setFieldsValue({
        activityKey: '',
        businessType: '',
      });
    }
    this.inite = false;
    // TODO: 有配置显示的才call他的数据，不要多余请求
    if (caseCategory) {
      // 功能已经不不被使用： by Grey,故事 JIRA VENUSJP-3286
      // dispatch({
      //   type: 'advancedQueryController/getActivePendingItems',
      //   payload: objectToFormData({ typeCode: caseCategory }),
      // });
      const businessTypeList = await dispatch({
        type: 'advancedQueryController/getBusinessTypeList',
        payload: params,
      });

      dispatch({
        type: 'advancedQueryBatchAssign/saveBusinessTypeList',
        payload: {
          businessTypeList: businessTypeList,
        },
      });

      const activitiesByCaseCategory = await dispatch({
        type: 'advancedQueryController/findActivitiesByCaseCategory',
        payload: {
          caseCategory,
          isCase: false,
        },
      });

      dispatch({
        type: 'advancedQueryBatchAssign/saveCurrentActivityList',
        payload: {
          currentStatusList: activitiesByCaseCategory,
        },
      });

      dispatch({
        type: 'advancedQueryBatchAssign/saveFilterParams',
        payload: {
          changeValue: { caseCategory },
        },
      });

      return;
    }
    dispatch({
      type: 'advancedQueryController/saveActivePendingItems',
      payload: {
        activePendingItems: [],
      },
    });
    dispatch({
      type: 'advancedQueryController/saveBusinessTypeList',
      payload: {
        businessTypeList: [],
        isCase: false,
      },
    });
    dispatch({
      type: 'advancedQueryController/saveCurrentActivityList',
      payload: {
        currentActivityList: [],
        isCase: false,
      },
    });
  };

  render() {
    const {
      form,
      assigneeList,
      loading,
      stateOfSearch,
      taskInquriyConfig,
      businessTypeList,
      currentActivityList,
      activePendingItems,
      caseLabels,
      searchForm,
      submissionChannelList,
    } = this.props;
    const { params } = searchForm['2'] || stateOfSearch;

    const { Special_Label_BPM_CaseCategory: caseCategoryList, Label_BPM_Entity }: any =
      getDrowDownList(['Special_Label_BPM_CaseCategory', 'Label_BPM_Entity']);

    const finalSubmissionChannelList = submissionChannelList;

    const currentList = lodash.filter(currentActivityList, { autoActivity: 0 });
    let configParams = [
      {
        fieldName: 'Submission Date',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.task-detail-of-jpcr.label.submission-date',
        form: () =>
          form.getFieldDecorator(Task['Submission Date'], {
            initialValue: params.submissionDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Case No',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.task-detail-of-data-capture.label.case-no',
        form: () => (
          <FormItemInput
            initialValue={params.processInstanceId}
            form={form}
            formName={Task['Case No']}
            rules={[
              {
                pattern: new RegExp(/^[0-9]*$/, 'g'), // 只能输入数字
                message: 'Please input number!',
              },
            ]}
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
          form.getFieldDecorator(Task.Entity, {
            initialValue: params.companyCode,
          })(
            <HeightAutoSelect allowClear>
              {lodash.map(Label_BPM_Entity, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode}>
                  {dictName}
                </Select.Option>
              ))}
            </HeightAutoSelect>
          ),
      },
      {
        fieldName: 'Claim No',
        labelTypeCode: 'Label_COM_General',
        id: 'BusinessNo',
        form: () => (
          <FormItemInput
            initialValue={params.inquiryBusinessNo}
            form={form}
            formName={Task['Claim No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Case Category',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.task-detail-of-data-capture.label.case-category',
        form: () =>
          form?.getFieldDecorator('caseCategory', {
            initialValue: params?.caseCategory,
          })(
            <Select allowClear onChange={this.fnSelectCaseCategory}>
              {lodash.map(caseCategoryList, ({ dictCode, dictName }: any) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Activity',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.taskDetail.inquireForm.label.activity-name',
        form: () =>
          form.getFieldDecorator(Task.Activity, {
            initialValue: params.activityKey,
          })(
            <Select allowClear>
              {Array.isArray(currentList) && currentList?.length > 0 ? (
                lodash.map(currentList, ({ dictCode, dictName }) => (
                  <Select.Option key={dictCode} value={dictCode} title={dictName}>
                    {dictName}
                  </Select.Option>
                ))
              ) : (
                // @ts-ignore
                <Select.Option
                  key={1}
                  value={null}
                  className="hint_works"
                  title={formatMessageApi({
                    Label_COM_WarningMessage:
                      'app.navigator.taskDetail.inquireForm.label.activity-name-hint-words',
                  })}
                >
                  {formatMessageApi({
                    Label_COM_WarningMessage:
                      'app.navigator.taskDetail.inquireForm.label.activity-name-hint-words',
                  })}
                </Select.Option>
              )}
            </Select>
          ),
      },
      {
        fieldName: 'Business Type',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'BusinessType',
        form: () =>
          form.getFieldDecorator(Task['Business Type'], {
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
        fieldName: 'Status',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.usermanagement.basicInfo.avatar.status',
        form: () =>
          form.getFieldDecorator(Task.Status, {
            initialValue: params.taskStatus,
          })(
            <HeightAutoSelect mode="multiple" allowClear>
              <Select.Option key="0" value="todo">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.to-do',
                })}
              </Select.Option>
              <Select.Option key="2" value="pending">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.pending',
                })}
              </Select.Option>
              <Select.Option key="3" value="completed">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.completed',
                })}
              </Select.Option>
              <Select.Option key="4" value="cancelled">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.cancelled',
                })}
              </Select.Option>
            </HeightAutoSelect>
          ),
      },
      {
        fieldName: 'Assignee',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.taskDetail.inquireForm.label.assignee',
        form: () =>
          form.getFieldDecorator(Task.Assignee, {
            initialValue: params.assignee,
          })(
            <HeightAutoSelect
              mode="multiple"
              loading={loading}
              allowClear
              filterOption={(inputValue: string, option: any) => {
                return option.props.children
                  .toString()
                  .toLocaleLowerCase()
                  .includes(inputValue.toLocaleLowerCase());
              }}
            >
              {lodash.map(
                [{ userId: 'unassigned', userName: 'unassigned' }, ...(assigneeList || [])],
                (item: any) => (
                  <Select.Option key={item.userId} title={item.userName}>
                    {item.userName}
                  </Select.Option>
                )
              )}
            </HeightAutoSelect>
          ),
      },
      {
        fieldName: 'Batch No',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.taskDetail.inquireForm.label.batch-no',
        form: () => (
          <FormItemInput
            initialValue={params.batchNo}
            form={form}
            formName={Task['Batch No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Due Date',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.taskDetail.inquireForm.label.completed-time',
        form: () =>
          form.getFieldDecorator(Task['Due Date'], {
            initialValue: params.dueDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Remaining Time',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.taskDetail.inquireForm.label.remaining-time',
        form: () =>
          form.getFieldDecorator(Task['Remaining Time'], {
            initialValue: params.remainingTime,
          })(
            // @ts-ignore
            <InputNumberRange
              form={form}
              params={{
                options1: {
                  key: 'remainingTimeFrom',
                  rules: [
                    {
                      validator: (_: any, value: any, callback: any) => {
                        if (value > form.getFieldValue('remainingTimeTo')) {
                          callback('invalid');
                        } else {
                          callback();
                          form.validateFields(['remainingTimeTo']);
                        }
                      },
                    },
                  ],
                },
                options2: {
                  key: 'remainingTimeTo',
                  rules: [
                    {
                      validator: (_: any, value: any, callback: any) => {
                        if (value < form.getFieldValue('remainingTimeFrom')) {
                          callback('invalid');
                        } else {
                          callback();
                          form.validateFields(['remainingTimeFrom']);
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
        fieldName: 'Client Name',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'ClientName',
        form: () => (
          <FormItemInput
            initialValue={params.clientName}
            form={form}
            formName={Task['Client Name']}
            placeholder=""
            onBlur={(e: any) => nonHalfCharacterReplace(e, form, 'clientName')}
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
            initialValue={params.policyNo}
            form={form}
            formName={Task['Policy No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Date Of Eligibility Check',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'venus.navigator.label.date-of-eligibility-check',
        form: () =>
          form.getFieldDecorator(Task['Date Of Eligibility Check'], {
            initialValue: params.eligibilityCheckDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Arrival Date',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'venus.navigator.label.arrival-date',
        form: () =>
          form.getFieldDecorator(Task['Arrival Date'], {
            initialValue: params.firstFormReceiveDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Creation Date',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'venus.navigator.label.creation-time',
        form: () =>
          form.getFieldDecorator(Task['Creation Date'], {
            initialValue: params.startTime,
          })(<RangePicker />),
      },
      {
        fieldName: 'Completed Date',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'venus.navigator.label.completed-time',
        form: () =>
          form.getFieldDecorator(Task['Completed Date'], {
            initialValue: params.endTime,
          })(<RangePicker />),
      },
      {
        fieldName: 'Active Pending Item',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.label.Active-Pending-Item',
        form: () =>
          form.getFieldDecorator(Task['Active Pending Item'], {
            initialValue: params.activePendingItems,
          })(
            <Select allowClear mode="multiple">
              {lodash.map(activePendingItems, ({ code, reason }: any) => (
                <Select.Option key={code} value={reason}>
                  {reason}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Reminder Send Date',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'app.navigator.label.Reminder-Send-Date',
        form: () =>
          form.getFieldDecorator(Task['Reminder Send Date'], {
            initialValue: params.dueDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'ID/Passport No',
        labelTypeCode: 'Label_BIZ_Individual',
        id: 'IDNo',
        form: () => (
          <FormItemInput
            initialValue={params.identityNo}
            form={form}
            formName={Task['ID/Passport No']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Submission Channel',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'SubmissionChannel',
        form: () =>
          form?.getFieldDecorator('submissionChannel', {
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
        fieldName: 'Case Label',
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'CaseLabel',
        form: () =>
          form?.getFieldDecorator(Task['Case Label'], { initialValue: params?.labelCodeList })(
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
    const configList = filterConfig(taskInquriyConfig, configParams);

    const searchProps = {
      ...this.props,
      isShowExport: true,
    };

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
  }
}

export default connect(
  ({ advancedQueryController, configController, advancedQueryAllForm }: any) => ({
    stateOfSearch: advancedQueryController.stateOfSearch,
    submissionChannelList: advancedQueryController.submissionChannelList,
    businessTypeList: advancedQueryController.taskBusinessTypeList,
    currentActivityList: advancedQueryController.taskCurrentActivityList,
    activePendingItems: advancedQueryController.activePendingItems,
    caseLabels: advancedQueryController.caseLabels,
    taskInquriyConfig: configController.configuration?.task?.inquiryField || [],
    searchForm: advancedQueryAllForm.searchForm,
  })
)(InquireForm);
