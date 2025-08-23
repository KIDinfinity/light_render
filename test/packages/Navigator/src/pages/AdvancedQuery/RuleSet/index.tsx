import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import TableSearch, { Table } from '@/components/TableSearch/FilterInquire';
import { getScrollParams } from '@/utils/inqueryUtils';
import { formUtils } from 'basic/components/Form';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import Search from './Inquiry';
import columns from './Columns';
import SearchEmpty from '../SearchEmpty';
@connect(
  ({
    configController,
    advancedQueryController,
    NewAdvancedQueryController,
    advancedQueryAllForm,
  }: any) => ({
    config: configController?.configuration?.rule || {},
    stateOfSearch: advancedQueryController.stateOfSearch,
    data: NewAdvancedQueryController.ruleSet,
    ruleModules: advancedQueryController.ruleModules,
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class RuleSet extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'advancedQueryController/getRuleModules',
      payload: {},
    });
  }

  onSearch = async (values = {}) => {
    const { dispatch } = this.props;
    const params = formUtils.rangeDateTransferParamsStandard(values.params);
    await dispatch({
      type: 'NewAdvancedQueryController/getRuleSetList',
      payload: {
        ...values,
        params,
      },
    });
  };

  render() {
    const {
      config,
      data,
      stateOfSearch,
      handleSearchReset,
      handleBtnReset,
      ruleModules,
      isCapsule,
      searchForm,
    } = this.props;

    return (
      <TableSearch onSearch={this.onSearch} stateOfSearch={searchForm['7'] || stateOfSearch}>
        <Search
          config={config.inquiryField}
          stateOfSearch={stateOfSearch}
          handleSearchReset={handleSearchReset}
          handleBtnReset={handleBtnReset}
          ruleModules={ruleModules}
        />
        <Table
          rowKey="key" // ruleSetId 有重名
          locale={{
            emptyText: <SearchEmpty />,
          }}
          columns={columns(stateOfSearch.orders, config.resultField, {
            sortName: searchForm['7']?.sortName,
            sortOrder: searchForm['7']?.sortOrder,
          })}
          data={data}
          onRow={(record) => ({
            onClick: () => {
              history.push(`/claim/ruleEngine/${record.ruleSetId}`);
            },
          })}
          scroll={getScrollParams(config.resultField, isCapsule)}
        />
      </TableSearch>
    );
  }
}

export default SwitchDrawerModeHoc(RuleSet);
