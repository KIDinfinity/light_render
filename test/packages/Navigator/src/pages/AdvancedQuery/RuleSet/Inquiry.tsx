import React from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
import { filterConfig } from '@/utils/configUtil';
import { Search } from '@/components/TableSearch/FilterInquire';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash, { toUpper } from 'lodash';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
const { rule: RuleSet } = AdvancedInquiryMap;

// TODO:这个时候到时需要数据字典
const ruleSetTypes = [
  {
    id: '8288f04f-7870-460e-9048-64b665e8e43b',
    creator: 'jack_ui_editor',
    gmtCreate: '2020-07-07T16:00:00.000+0000',
    modifier: 'jack_ui_editor',
    gmtModified: '2020-07-07T16:00:00.000+0000',
    deleted: 0,
    transId: 'a5e1b9c4-d568-46cb-aafd-af1a6d1acdd6',
    dictCode: '01',
    dictName: 'Rule Set',
    typeCode: 'Dropdown_POS_PaymentStatus',
    dictComment: null,
    language: 'en-US',
    orderNumber: null,
  },
  {
    id: 'cf79c81e-6d7c-4c72-9b36-97e604180d49',
    creator: 'jack_ui_editor',
    gmtCreate: '2020-07-07T16:00:00.000+0000',
    modifier: 'jack_ui_editor',
    gmtModified: '2020-07-07T16:00:00.000+0000',
    deleted: 0,
    transId: 'a5e1b9c4-d568-46cb-aafd-af1a6d1acdd6',
    dictCode: '02',
    dictName: 'Rule Flow',
    typeCode: 'Dropdown_POS_PaymentStatus',
    dictComment: null,
    language: 'en-US',
    orderNumber: null,
  },
];

class RuleSearch extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { config, form, stateOfSearch, ruleModules, searchForm }: any = this.props;
    const { params } = searchForm['7'] || stateOfSearch;
    const configParams = [
      {
        fieldName: 'Rule Set Name',
        id: 'venus_claim.ruleEngine.ruleSetName',
        form: () => (
          <FormItemInput
            initialValue={params.ruleSetName}
            form={form}
            formName={RuleSet['Rule Set Name']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Rule Set Id',
        id: 'venus_claim.ruleEngine.ruleSetId',
        form: () => (
          <FormItemInput
            initialValue={params.ruleSetId}
            form={form}
            formName={RuleSet['Rule Set Id']}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'Module',
        id: 'venus_claim.ruleEngine.module',
        form: () =>
          form.getFieldDecorator(RuleSet.Module, {
            initialValue: params.moduleCode,
          })(
            <Select
              allowClear
              filterOption={(input, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {lodash.map(ruleModules, ({ moduleCode }: any) => (
                <Select.Option key={moduleCode} value={moduleCode} title={moduleCode}>
                  {moduleCode}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Rule Set Type',
        id: 'venus_claim.ruleEngine.ruleSetType',
        title: formatMessageApi({
          Label_RUL_RuleEngine: 'RuleSetType',
        }),
        form: () =>
          form.getFieldDecorator(RuleSet['Rule Set Type'], {
            initialValue: params.ruleSetType,
          })(
            <Select
              allowClear
              filterOption={(input, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {lodash.map(ruleSetTypes, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Effective Date',
        id: 'venus_claim.ruleEngine.effectiveDate',
        form: () =>
          form.getFieldDecorator(RuleSet['Effective Date'], {
            initialValue: params.effectiveDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Expired Date',
        id: 'venus_claim.ruleEngine.expiredDate',
        form: () =>
          form.getFieldDecorator(RuleSet['Expired Date'], {
            initialValue: params.expiredDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Expected Publish Date',
        id: 'venus_claim.ruleEngine.expectedPublishDate',
        form: () =>
          form.getFieldDecorator(RuleSet['Expected Publish Date'], {
            initialValue: params.expectedPublishDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Actual Publish Time',
        id: 'venus_claim.ruleEngine.actualPublishTime',
        form: () =>
          form.getFieldDecorator(RuleSet['Actual Publish Time'], {
            initialValue: params.actualPublishTime,
          })(<RangePicker />),
      },
    ];

    const searchItems = filterConfig(config, configParams);
    return (
      <Search {...this.props}>
        {lodash.map(searchItems, (el: any) => {
          const tempParams: any = configParams.find(
            (ele) => toUpper(ele.fieldName) === toUpper(el.fieldName)
          );

          return (
            <Search.Item
              key={el.fieldName}
              // @ts-ignore
              label={
                tempParams.title ||
                formatMessageApi({
                  Label_BIZ_Claim: tempParams.id,
                })
              }
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

export default connect(({ advancedQueryAllForm }: any) => ({
  searchForm: advancedQueryAllForm.searchForm,
}))(RuleSearch);
