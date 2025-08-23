import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Input, Select } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Search } from '@/components/TableSearch/FilterInquire';
import { filterConfig } from '@/utils/configUtil';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
const { document: UnknownDocument } = AdvancedInquiryMap;

interface ISProps {
  dispatch: any;
  stateOfSearch: any;
  form: any;
  searchObj: any;
  config: any;
  onSearchRef: any;
}
class AdvancedQueryOfHospitalBillingInquiry extends React.Component<ISProps> {
  inite = true;

  render() {
    const {
      form,
      searchObj,
      stateOfSearch,
      config,
      Label_DOC_Document,
      Dropdown_CFG_DocumentType,
      searchForm,
    } = this.props;
    const { params } = searchForm['6'] || stateOfSearch;

    const searchProps = {
      ...this.props,
      searchDefault: { ...searchObj },
      searchObj: { ...searchObj },
      ref: (inst: any) => {
        this.props.onSearchRef(inst);
      },
    };

    const configParams = [
      {
        fieldName: 'Document ID',
        id: 'app.navigator.taskDetail.inquireForm.unknowDoc.doc-id',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Document ID'], {
            initialValue: params.docId,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
      {
        fieldName: 'Document Type',
        id: 'app.navigator.taskDetail.inquireForm.unknowDoc.doc-type',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Document Type'], {
            initialValue: params.docTypeCode,
          })(
            <Select
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {lodash.map(Dropdown_CFG_DocumentType, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Document Classification',
        id: 'app.navigator.taskDetail.inquireForm.unknowDoc.doc-classification',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Document Classification'], {
            initialValue: params.classification,
          })(
            <Select
              allowClear
              // onChange={this.fnSelectCaseCategory}
            >
              {lodash.map(Label_DOC_Document, ({ dictCode, dictName }) => (
                <Select.Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      // {
      //   fieldName: 'Document Classification',
      //   id: 'app.navigator.taskDetail.inquireForm.unknowDoc.doc-classification',
      //   form: () =>
      //     form.getFieldDecorator(UnknownDocument['Document Classification'], {
      //       initialValue: params.classification,
      //     })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      // },
      {
        fieldName: 'Submission Batch No.',
        id: 'app.navigator.taskDetail.inquireForm.unknowDoc.submission-batch-no',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Submission Batch No.'], {
            initialValue: params.batchNo,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
      {
        fieldName: 'Case No.',
        id: 'app.navigator.task-detail-of-data-capture.label.case-no',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Case No.'], {
            initialValue: params.caseNo,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
      {
        fieldName: 'Claim No.',
        id: 'BusinessNo',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Claim No.'], {
            initialValue: params.parentBusinessNo,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
      {
        fieldName: 'Insured Name',
        id: 'venus_claim.label.insuredName',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Insured Name'], {
            initialValue: params.insuredName,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
      {
        fieldName: 'Policy No.',
        id: 'app.navigator.task-detail-of-claim-assessment.label.plicy-no',
        form: () =>
          form.getFieldDecorator(UnknownDocument['Policy No.'], {
            initialValue: params.policyId,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
    ];

    // 排序&过滤
    const configList = filterConfig(config, configParams);

    return (
      <Search {...searchProps}>
        {lodash.map(configList, (el: any) => {
          const temp: any = configParams.find((ele: any) => ele.fieldName === el.fieldName);
          return (
            <Search.Item
              key={el.fieldName}
              label={
                temp.id === 'BusinessNo'
                  ? formatMessageApi({
                      Label_COM_General: temp.id,
                    })
                  : formatMessageApi({
                      Label_BIZ_Claim: temp.id,
                    })
              }
              simple={!el.hidden}
            >
              {temp.form}
            </Search.Item>
          );
        })}
      </Search>
    );
  }
}

export default connect(
  ({ advancedQueryController, dictionaryController, advancedQueryAllForm }: any) => ({
    stateOfSearch: lodash.get(advancedQueryController, 'stateOfSearch', {}),
    searchObj: lodash.get(advancedQueryController, 'searchObj', {}),
    Dropdown_CFG_DocumentType: lodash.get(dictionaryController, 'Dropdown_CFG_DocumentType'),
    Label_DOC_Document: lodash.get(dictionaryController, 'Label_DOC_Document'),
    searchForm: advancedQueryAllForm.searchForm,
  })
)(AdvancedQueryOfHospitalBillingInquiry);
