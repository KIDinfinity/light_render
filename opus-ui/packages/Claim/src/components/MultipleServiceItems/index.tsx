import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Select, Button, Pagination } from 'antd';
import lodash from 'lodash';
import { search } from '@/services/navigatorDropdownControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';

const PAGESIZE = 10;

@connect((_, { form }) => ({
  value: form.getFieldValue('serviceItems'),
}))
class MultipleServiceItems extends Component {
  state = {
    open: false,
    searchContent: '',
    dicts: [],
    pagignationData: {
      currentPage: 1,
      total: 0,
      totalPage: 0,
    },
  };

  handleFocus = () => {
    this.setState(
      {
        searchContent: '',
        open: true,
      },
      () => this.handlePageChange(1)
    );
  };

  handleBlur = () => {
    this.setState({ open: false });
  };

  handlePageChange = async (page) => {
    const { searchContent } = this.state;

    const result = await search({
      currentPage: page,
      params: {
        regionCode: tenant.region(),
        pageSize: PAGESIZE,
        searchType: 3,
        dropdownCode: 'claim_dict001',
        searchContent,
      },
    });
    if (result && result.success) {
      this.setComponentState(result.resultData);
    }
  };

  setComponentState = (resultData) => {
    this.setState({
      dicts: resultData.rows,
      pagignationData: {
        currentPage: resultData.currentPage,
        totalPage: resultData.totalPage,
        total: resultData.total,
      },
    });
  };

  handleSearch = (value) => {
    this.setState(
      {
        searchContent: value,
      },
      () => this.handlePageChange(1)
    );
  };

  handleClickAdd = async () => {
    const { handleAdd } = this.props;
    this.setState({ open: false });
    await handleAdd();
  };

  render() {
    const { form, existServiceItems } = this.props;
    const { dicts, pagignationData, open } = this.state;

    const dictsOptions = lodash.map(lodash.compact(dicts), (item) => (
      <Select.Option
        key={item.dictCode}
        value={item.dictCode}
        title={`${item?.dictCode}-${item?.dictName}`}
        disabled={lodash.compact(existServiceItems).includes(item.dictCode)}
      >
        {item.dictCode}-{item.dictName}
      </Select.Option>
    ));

    const optionList = [
      ...dictsOptions,
      <Select.Option style={{ cursor: 'default' }} disabled key="pages">
        <Pagination
          size="small"
          total={pagignationData.total}
          current={pagignationData.currentPage}
          style={{ width: '100%', textAlign: 'center' }}
          onChange={this.handlePageChange}
        />
      </Select.Option>,
    ];

    return (
      <Form.Item>
        {form.getFieldDecorator(
          'serviceItems',
          {}
        )(
          <Select
            allowClear
            open={open}
            mode="multiple"
            filterOption={false}
            dropdownMatchSelectWidth={false}
            defaultActiveFirstOption={false}
            onSearch={this.handleSearch}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            dropdownRender={(menu) => (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  return false;
                }}
              >
                {menu}
                <div
                  style={{ padding: '0 8px', position: 'relative', bottom: 8, textAlign: 'right' }}
                >
                  <Button style={{ height: 28 }} onClick={() => this.handleClickAdd()}>
                    {formatMessageApi({
                      Label_BPM_Button:
                        'app.navigator.task-detail-of-claim-assessment.beneficiary.button.add-card',
                    })}
                  </Button>
                </div>
              </div>
            )}
            style={{ width: '100%' }}
            placeholder="Add Multiple Service Items"
          >
            {optionList}
          </Select>
        )}
      </Form.Item>
    );
  }
}

export default MultipleServiceItems;
