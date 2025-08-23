import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import lodash, { toUpper } from 'lodash';
import { Select, Pagination, Divider } from 'antd';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Search } from '@/components/TableSearch/FilterInquire';
import { filterConfig } from '@/utils/configUtil';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
const { hospitalbilling: HospitalBilling } = AdvancedInquiryMap;
const { Option } = Select;

@connect(
  ({ advancedQueryController, advancedQueryOfHospitalBiling, advancedQueryAllForm }: any) => ({
    advancedQueryOfHospitalBiling,
    hospitalNameList: advancedQueryOfHospitalBiling.hospitalNameList,
    hosBillingStatus: advancedQueryController.hosBillingStatus,
    getHospitalListParams: advancedQueryOfHospitalBiling.getHospitalListParams,
    stateOfSearch: advancedQueryController.stateOfSearch,
    searchObj: advancedQueryController.searchObj,
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class AdvancedQueryOfHospitalBillingInquiry extends React.Component {
  inite = true;

  constructor(props: any) {
    super(props);
    this.state = {
      searchParams: {
        hospitalName: '',
        scanDate: [moment(new Date(), 'L'), moment(new Date(), 'L')],
        status: '',
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (values = {}) => {
    const { dispatch, stateOfSearch } = this.props;
    const { pagination } = stateOfSearch;

    dispatch({
      type: 'advancedQueryController/findDictionaryHospitalBilingByTypeCode',
      payload: objectToFormData({ typeCode: 'HospitalBillingBatchStatus' }),
    });
    dispatch({
      type: 'advancedQueryOfHospitalBiling/gethospitalList',
      payload: {
        ...pagination,
        ...values,
        params: {},
      },
    });
  };

  handlePagination = (page) => {
    this.fetchData({ currentPage: page });
  };

  render() {
    const { form, searchObj, config, hospitalNameList, hosBillingStatus, searchForm } = this.props;

    const params = searchForm['5']?.params || this.state.searchParams;

    const searchProps = {
      ...this.props,
      searchDefault: { ...searchObj },
      searchObj: { ...searchObj },
      ref: (inst) => {
        this.props.onSearchRef(inst);
      },
    };

    const configParams = [
      {
        fieldName: 'Hospital Name',
        id: 'app.navigator.hospitalDetail.search.hospital-name',
        form: () =>
          form?.getFieldDecorator(HospitalBilling['Hospital Name'], {
            initialValue: params?.hospitalName,
          })(
            <Select
              allowClear
              onChange={this.handleNameChange}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ cursor: 'pointer' }} onMouseDown={(e) => e.preventDefault()}>
                    {hospitalNameList.list && (
                      <Pagination
                        pageSize={hospitalNameList.pagination.pageSize}
                        total={hospitalNameList.pagination.total}
                        page={hospitalNameList.pagination.page}
                        onChange={this.handlePagination}
                      />
                    )}
                  </div>
                </div>
              )}
            >
              {lodash.map(hospitalNameList.list, ({ hospitalName }) => (
                <Option key={hospitalName} value={hospitalName} title={hospitalName}>
                  {hospitalName}
                </Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Status',
        id: 'app.navigator.hospitalDetail.search.status',
        form: () =>
          form?.getFieldDecorator(HospitalBilling.Status, {
            initialValue: params?.status,
          })(
            <Select allowClear>
              {lodash.map(hosBillingStatus, ({ dictName, dictCode }) => (
                <Option key={dictCode} value={dictCode} title={dictName}>
                  {dictName}
                </Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Scan Date',
        id: 'app.navigator.hospitalDetail.search.scan-date',
        form: () =>
          form?.getFieldDecorator(HospitalBilling['Scan Date'], {
            initialValue: params?.scanDate,
          })(<RangePicker />),
      },
    ];

    // 排序&过滤
    const configList = filterConfig(config, configParams);

    return (
      <Search {...searchProps}>
        {lodash.map(configList, (el) => {
          const tempParams = configParams.find(
            (ele) => toUpper(ele.fieldName) === toUpper(el.fieldName)
          );
          return (
            <Search.Item
              key={el.fieldName}
              label={formatMessageApi({
                Label_BIZ_Claim: tempParams.id,
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

export default AdvancedQueryOfHospitalBillingInquiry;
