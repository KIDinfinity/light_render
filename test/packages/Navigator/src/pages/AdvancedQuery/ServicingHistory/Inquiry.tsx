import { Search } from '@/components/TableSearch/FilterInquire';
import { tenant } from '@/components/Tenant';
import { LS, LSKey } from '@/utils/cache';
import { filterConfig } from '@/utils/configUtil';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { Select } from 'antd';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
// eslint-disable-next-line
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import { connect } from 'dva';
import lodash, { filter, includes, toUpper } from 'lodash';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
import React from 'react';

const { servicinghistory: POSHistory } = AdvancedInquiryMap;

@connect(({ advancedQueryController, advancedQueryAllForm }: any) => ({
  stateOfSearch: advancedQueryController.stateOfSearch,
  searchObj: advancedQueryController.searchObj,
  dropdownCASFinalStatus: advancedQueryController.dropdownCASFinalStatus,
  transactionTypeList: advancedQueryController.transactionTypeList,
  searchForm: advancedQueryAllForm.searchForm,
}))
class AdvancedQueryOfPOSHistoryInquiry extends React.Component<any> {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    const userInfo = LS.getItem(LSKey.CURRENTUSER);
    dispatch({
      type: 'advancedQueryController/getTransactionTypeList',
      payload: {
        categoryCode: lodash.includes(userInfo?.companyCode || [], '2')
          ? 'BP_POS_CTG006'
          : 'BP_POS_CTG001',
        typeCode: 'Dropdown_COM_BusinessType',
        language: tenant.getLocaleLang(),
        regionCode: tenant.region(),
      },
    });

    await dispatch({
      type: 'advancedQueryController/findDictionaryFinalStatus',
      payload: {},
    });
  };

  render() {
    const { form, stateOfSearch, config, dropdownCASFinalStatus, searchForm, transactionTypeList } =
      this.props;

    const Dropdown_SRV_ServicingInquiry = getDrowDownList('Dropdown_SRV_ServicingInquiry');
    const Dropdown_COM_POSTransactionType_Major = tenant.isPH()
      ? getDrowDownList('Dropdown_COM_POSTransactionType_Major')
      : [];
    const Dropdown_COM_POSTransactionType_Minor = tenant.isPH()
      ? getDrowDownList('Dropdown_COM_POSTransactionType_Minor')
      : [];
    const { params } = searchForm['8'] || stateOfSearch;

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
        fieldName: 'BusinessNo',
        labelId: 'BusinessNo',
        labelTypeCode: 'Label_COM_General',
        form: () => (
          <FormItemInput
            initialValue={params.inquiryBusinessNo}
            form={form}
            formName={POSHistory.BusinessNo}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'policyNo',
        labelId: 'PolicyNo',
        labelTypeCode: 'Label_BIZ_Policy',
        form: () => (
          <FormItemInput
            initialValue={params.policyNo}
            form={form}
            formName={POSHistory.policyNo}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'policyOwner',
        labelId: 'PolicyOwner',
        labelTypeCode: 'Label_BIZ_Individual',
        form: () => (
          <FormItemInput
            initialValue={params.policyOwner}
            form={form}
            formName={POSHistory.policyOwner}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'insuredName',
        labelId: 'InsuredName',
        labelTypeCode: 'Label_BIZ_Individual',
        form: () => (
          <FormItemInput
            initialValue={params.insuredName}
            form={form}
            formName={POSHistory.insuredName}
            placeholder=""
            autoComplete="disable-chrome-autofill-mark"
          />
        ),
      },
      {
        fieldName: 'transactionType',
        labelId: 'TransactionType',
        labelTypeCode: 'Label_BIZ_SRV',
        form: () =>
          form.getFieldDecorator(POSHistory.transactionType, {
            initialValue: params.transactionType,
          })(
            <Select
              allowClear
              // onChange={this.fnSelectCaseCategory}
              filterOption={(input, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
            >
              {lodash.map(
                lodash.uniqBy(
                  lodash.sortBy(
                    [
                      ...(transactionTypeList || []),
                      ...(Dropdown_COM_POSTransactionType_Major || []),
                      ...(Dropdown_COM_POSTransactionType_Minor || []),
                    ],
                    'dictName'
                  ),
                  'dictCode'
                ),
                ({ dictCode, dictName }: any) => (
                  <Select.Option key={dictCode} value={dictCode} title={dictName}>
                    {dictName}
                  </Select.Option>
                )
              )}
            </Select>
          ),
      },
      {
        fieldName: 'submissionDate',
        labelId: 'SubmissionDate',
        labelTypeCode: 'Label_COM_Registration',
        form: () =>
          form.getFieldDecorator(POSHistory.submissionDate, {
            initialValue: params.submissionDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'submissionChannel',
        labelId: 'SubmissionChannel',
        labelTypeCode: 'Label_COM_Registration',
        form: () =>
          form.getFieldDecorator(POSHistory.submissionChannel, {
            initialValue: params.submissionChannel,
          })(
            <Select allowClear>
              {lodash.map(Dropdown_SRV_ServicingInquiry, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'finalStatus',
        labelId: 'FinalStatus',
        labelTypeCode: 'Label_COM_Inquiry',
        form: () =>
          form.getFieldDecorator(POSHistory.finalStatus, {
            initialValue: params.finalStatus,
          })(
            <Select allowClear>
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

    return (
      <Search {...this.props}>
        {lodash.map(configList, (el: any) => {
          const tempParams: any = configParams.find(
            (ele: any) => toUpper(ele.fieldName) === toUpper(el.fieldName)
          );
          return (
            <Search.Item
              key={el.fieldName}
              // @ts-ignore
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

export default AdvancedQueryOfPOSHistoryInquiry;
