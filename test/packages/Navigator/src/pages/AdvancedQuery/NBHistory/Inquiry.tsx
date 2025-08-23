// @ts-nocheck
import React from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
import lodash, { toUpper } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterConfig } from '@/utils/configUtil';
import { Search } from '@/components/TableSearch/FilterInquire';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
import { getDrowDownList } from '@/utils/dictFormatMessage';
const { nbhistoryinquiry: NBHistory } = AdvancedInquiryMap;

@connect(({ advancedQueryController, advancedQueryAllForm }: any) => ({
  stateOfSearch: advancedQueryController.stateOfSearch,
  searchObj: advancedQueryController.searchObj,
  searchForm: advancedQueryAllForm.searchForm,
}))
class AdvancedQueryOfNBHistoryInquiry extends React.Component {
  render() {
    const { form, stateOfSearch, config, searchForm } = this.props;

    const { Dropdown_CAS_FinalStatus, Dropdown_NB_NBInquiry, Dropdown_COM_BusinessDecision } =
      getDrowDownList([
        'Dropdown_CAS_FinalStatus',
        'Dropdown_NB_NBInquiry',
        'Dropdown_COM_BusinessDecision',
      ]);

    const { params } = searchForm['9'] || stateOfSearch;
    const finalSubmissionChannelList = Dropdown_NB_NBInquiry;
    const configParams = [
      {
        fieldName: 'Policy No.',
        id: 'PolicyNo',
        form: () => (
          <FormItemInput
            initialValue={params.policyNo}
            form={form}
            formName={NBHistory['Policy No.']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Business No.',
        id: 'BusinessNo',
        form: () => (
          <FormItemInput
            initialValue={params.businessNo}
            form={form}
            formName={NBHistory['Business No.']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Policy Owner',
        id: 'PolicyOwner',
        form: () => (
          <FormItemInput
            initialValue={params.policyOwner}
            form={form}
            formName={NBHistory['Policy Owner']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Policy Owner ID',
        id: 'PolicyOwnerID',
        form: () => (
          <FormItemInput
            initialValue={params.policyOwnerId}
            form={form}
            formName={NBHistory['Policy Owner ID']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Insured Name',
        id: 'InsuredName',
        form: () => (
          <FormItemInput
            initialValue={params.insuredName}
            form={form}
            formName={NBHistory['Insured Name']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Submission Channel',
        id: 'SubmissionChannel',
        form: () =>
          form.getFieldDecorator(NBHistory['Submission Channel'], {
            initialValue: params.submissionChannel,
          })(
            <Select allowClear>
              {lodash.map(finalSubmissionChannelList, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Submission Date',
        id: 'SubmissionDate',
        form: () =>
          form.getFieldDecorator(NBHistory['Submission Date'], {
            initialValue: params.submissionDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'UW Decision',
        id: 'PolicyLevelDecision',
        form: () =>
          form.getFieldDecorator(NBHistory['UW Decision'], {
            initialValue: params.UWDecision,
          })(
            <Select allowClear>
              {lodash.map(Dropdown_COM_BusinessDecision, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Final Status',
        id: 'FinalStatus',
        form: () =>
          form.getFieldDecorator(NBHistory['Final Status'], {
            initialValue: params.finalStatus,
          })(
            <Select allowClear onChange={this.fnSelectCaseCategory}>
              {lodash.map(Dropdown_CAS_FinalStatus, ({ dictCode, dictName }) => (
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

    const getFormatMessage = (id: any) => {
      if (['PolicyOwner', 'InsuredName', 'PolicyOwnerID'].includes(id)) {
        return formatMessageApi({
          Label_BIZ_Individual: id,
        });
      }
      if (['SubmissionDate', 'SubmissionChannel'].includes(id)) {
        return formatMessageApi({
          Label_COM_Registration: id,
        });
      }
      if (id === 'PolicyNo') {
        return formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
        });
      }
      if (id === 'BusinessNo') {
        return formatMessageApi({
          Label_COM_General: id,
        });
      }
      if (id === 'PolicyLevelDecision') {
        return formatMessageApi({
          Label_BIZ_Underwriting: id,
        });
      }
      if (id === 'FinalStatus') {
        return formatMessageApi({
          Label_COM_Inquiry: id,
        });
      }
    };

    return (
      <Search {...this.props}>
        {lodash.map(configList, (el: any) => {
          const tempParams = configParams.find(
            (ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName)
          );
          return (
            <Search.Item
              key={el.fieldName}
              label={getFormatMessage(tempParams?.id)}
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

export default AdvancedQueryOfNBHistoryInquiry;
