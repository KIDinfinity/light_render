// @ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import mapprops from '@/utils/mapprops';
import { defaultReqVal, reqC2B, reqB2C, resB2C } from './transfer';
import Search from './Search/veticalInquire';
import Batch from './Batch';
import Table from '../StandardTable';
import styles from './filterInquire.less';

@Form.create()
class TableSearch extends Component {
  state = {
    selectedRows: [],
    /* eslint-disable max-len */
    /** 格式样例
     * {"params":{"assignee":"Issac","status":"todo","taskStatus":"todo","caseCategory":"Rule Setup","batchNo":"238","activityKey":"dataCapture"},"pagination":{"page":1,"pageSize":10},"sortName":"proc_inst_id","sortOrder":"asc","page":1}
     */
    /* eslint-enable max-len */
    stateOfSearch: { params: {}, selectable: {} },
  };

  componentDidMount() {
    const { searchDefault, searchStatus } = this.props;
    const isEmptyOrZero = (value) => {
      return value !== 0 && lodash.isEmpty(value);
    };
    const allPropertiesEmpty = Object.values(searchDefault?.params || {}).every((prop) =>
      isEmptyOrZero(prop)
    );
    if (!allPropertiesEmpty && searchStatus) {
      this.handleSearch(null, { ...searchDefault });
    }
  }

  componentDidUpdate(nextProps) {
    const { searchDefault, form, searchStatus } = this.props;
    if (
      Object.keys(searchDefault?.params || {}).length &&
      !lodash.isEqual(searchDefault?.params, nextProps.searchDefault?.params)
    ) {
      form.resetFields();
      // this.handleSearch(null, { ...searchDefault });
      if (searchStatus) {
        this.handleSearch(null, { ...searchDefault });
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'advancedQueryAllForm/saveSearchStatus',
      payload: {
        searchStatus: true,
      },
    });
  }

  setSelectedRows = (selectedRowsFromPage, selectedRowKeys) => {
    const { selectedRows } = this.state;
    const { selectKey } = this.props;
    // 1合并：concat两个rows数值 2uniqBy 'processInstanceId' 3过滤（v.processInstanceId必须在selectedRowKeys里存在）
    // PS：selectedRowKeys会把所有的选择了的key都记录下来，就算通过服务端跳转分页了。
    const nextSelectedRows = lodash
      .uniqBy(selectedRows.concat(selectedRowsFromPage), selectKey)
      .filter((v) => selectedRowKeys?.includes(v[selectKey]));
    this.setState({
      selectedRows: nextSelectedRows,
    });
  };

  setStateOfSearch = (stateOfSearch, callback) => {
    this.setState(
      {
        stateOfSearch,
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      }
    );
  };

  getStateOfSearch = () => {
    const { stateOfSearch } = this.state;

    return stateOfSearch;
  };

  getSearchData = ({ params, fieldsValue }) => {
    const { searchForm, currentTab } = this.props;
    const { stateOfSearch } = this.state;

    const pagination = lodash.assign(
      {},
      stateOfSearch?.pagination,
      searchForm[currentTab]?.pagination,
      params?.pagination
    );
    const orders = params?.orders || stateOfSearch?.orders;

    const values = {
      params: {
        ...stateOfSearch?.params, // 2.上次状态值
        ...fieldsValue, // 3.当前表单值
        ...params?.params, // 4.自定参数
      },
      pagination,
      orders,
      sortName: lodash.has(params, 'sortName')
        ? params?.sortName
        : searchForm[currentTab]?.sortName,
      sortOrder: lodash.has(params, 'sortOrder')
        ? params?.sortOrder
        : searchForm[currentTab]?.sortOrder,
      sortOrders: params?.sortOrders || stateOfSearch?.sortOrders,
      selectable: {},
    };

    if (values.params.caseCategory === 'all') {
      values.params.caseCategory = '';
    }

    return values;
  };

  handleSearch = async (e, params = {}) => {
    const {
      onSearch, // search回调
      form,
      dispatch,
    } = this.props;
    const { stateOfSearch } = this.state;

    await new Promise((resolve) => {
      form.validateFields(async (err, fieldsValue) => {
        // 改变了页码page和每页数量pageSize以外的参数，要重置页码和多选
        const values = this.getSearchData({ params, fieldsValue });
        const diff = !lodash.isEqual(values.params, stateOfSearch?.params);
        if (diff) {
          values.page = 1;
          this.setSelectedRows?.([]);
        }
        await dispatch({
          type: 'advancedQueryAllForm/saveCurrentSearch',
          payload: {
            searchForm: values,
          },
        });
        this.setStateOfSearch(values); // 更新状态

        await onSearch(reqC2B(values), e); // search回调 -> 业务请求接口等
        return resolve();
      });
    });
    await dispatch({
      type: 'advancedQueryAllForm/saveSearchStatus',
      payload: {
        searchStatus: true,
      },
    });
  };

  handleExportExcel = async (e, params = {}, searchByScroll) => {
    const {
      onExportExcel, // exportExcel回调
      form,
    } = this.props;
    await new Promise((resolve) => {
      form.validateFields(async (err, fieldsValue) => {
        const values = this.getSearchData({ params, fieldsValue });

        await onExportExcel(reqC2B(values), searchByScroll); // exportExcel回调 -> 业务请求接口等

        return resolve();
      });
    });
  };

  render() {
    const { children, form, searchDefault, inquireMode, changeSideMode } = this.props;
    const { stateOfSearch, selectedRows } = this.state;
    /**
     * form 在此传入--高级查询表单
     */

    const passProps = {
      form,
      stateOfSearch,
      inquireMode,
      changeSideMode,
      setStateOfSearch: this.setStateOfSearch,
      selectedRows,
      setSelectedRows: this.setSelectedRows,
      searchDefault,
      handleSearch: this.handleSearch,
      handleExportExcel: this.handleExportExcel,
    };

    return (
      <div className={styles.filter_inquire}>
        <div className="filter_inquire_form">
          <div className="filter_inquire_scroll">{mapprops(children[0], { ...passProps })}</div>
        </div>
        <div
          className="filter_inquire_content"
          // style={{
          //   overflowY: tableMode === 'card' ? 'hidden' : 'auto',
          // }}
        >
          {mapprops(children[1], { ...passProps })}
          {mapprops(children[2], { ...passProps })}
        </div>
      </div>
    );
  }
}

TableSearch.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

TableSearch.defaultProps = {
  children: [],
};
export default connect(({ advancedQueryAllForm }: any) => ({
  searchForm: advancedQueryAllForm.searchForm,
  currentTab: advancedQueryAllForm.currentTab,
  searchStatus: advancedQueryAllForm.searchStatus,
}))(TableSearch);
export { Search, Batch, Table, defaultReqVal, reqC2B, reqB2C, resB2C };
