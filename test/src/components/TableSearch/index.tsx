import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Form } from 'antd';
import mapprops from '@/utils/mapprops';
import { defaultReqVal, reqC2B, reqB2C, resB2C } from './transfer';
import Search from './Search';
import Batch from './Batch';
import Table from '../StandardTable';

@Form.create()
class TableSearch extends Component {
  state = {
    selectedRows: [],
    sortOrders: [],
    stateOfSearch: { params: {} },
  };

  componentDidMount() {
    const { searchDefault } = this.props;
    this.handleSearch(null, searchDefault, true);
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  setSelectedRows = (selectedRows) => {
    this.setState({
      selectedRows,
    });
  };

  setSortOrders = (sortOrders) => {
    const { form } = this.props;
    form.sortOrders = sortOrders;

    this.setState({
      sortOrders,
    });
  };

  setStateOfSearch = (stateOfSearch) => {
    this.setState({
      stateOfSearch,
    });
  };

  handleSearch = (e, params = {}, isAutoSearch = false) => {
    // searchDefault、stateOfSearch、params的结构
    // {
    //   params: {},
    //   pagination: {
    //     page: 1,
    //     pageSize: 10,
    //   }
    // }
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const {
      // 默认参数
      searchDefault = defaultReqVal,
      onSearch, // search回调
      form,
      stateOfSearch,
    } = this.props;
    // const {
    //   stateOfSearch, // 参数state
    // } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return; // 表单验证失败

      const pagination = lodash.assign(
        {},
        defaultReqVal.pagination,
        searchDefault?.pagination,
        stateOfSearch?.pagination,
        params?.pagination
      );

      const orders = params?.orders || stateOfSearch?.orders;
      const values = {
        params: {
          ...searchDefault?.params, // 1.默认值
          ...stateOfSearch?.params, // 2.上次状态值
          ...fieldsValue, // 3.当前表单值
          ...params?.params, // 4.自定参数
        },
        pagination,
        orders,
        sortName: params?.sortName || stateOfSearch?.sortName,
        sortOrder: params?.sortOrder || stateOfSearch?.sortOrder,
        sortOrders: params?.sortOrders || searchDefault?.sortOrders || stateOfSearch?.sortOrders,
      };

      // 改变了页码page和每页数量pageSize以外的参数，要重置页码和多选
      const diff = !lodash.isEqual(values.params, stateOfSearch?.params);
      if (diff) {
        values.page = 1;
        this.setSelectedRows?.([]);
      }
      this.setStateOfSearch(values); // 更新状态
      onSearch(reqC2B(values), isAutoSearch); // search回调 -> 业务请求接口等
    });
  };

  render() {
    const { children, form, searchDefault } = this.props;
    const { stateOfSearch, selectedRows, sortOrders } = this.state;

    const passProps = {
      form,
      stateOfSearch,
      setStateOfSearch: this.setStateOfSearch,
      selectedRows,
      setSelectedRows: this.setSelectedRows,
      searchDefault,
      handleSearch: this.handleSearch,
      sortOrders,
      setSortOrders: this.setSortOrders,
    };

    return (
      <Fragment>
        {mapprops(children[0], { ...passProps })}
        {mapprops(children[1], { ...passProps })}
        {mapprops(children[2], { ...passProps })}
      </Fragment>
    );
  }
}

TableSearch.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

TableSearch.defaultProps = {
  children: [],
};

export default TableSearch;
export { Search, Batch, Table, defaultReqVal, reqC2B, reqB2C, resB2C };
