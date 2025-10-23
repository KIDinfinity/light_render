import React, { Component } from 'react';
import lodash from 'lodash';
import { Table } from 'antd';
import { connect } from 'dva';
import getColumns from './Columns';
import geTypeKey from '../Utils/getTypeKey';
import { AddType } from '../Enum';

interface IProps {
  dispatch: any;
  searchData: any;
  selectedRowKeys: any;
  isShow: any;
  activeCode: any;
  data: any;
  editData: any;
  currentGroupId: any;
  submitRuleSet: object;
}
class Search extends Component<IProps> {
  FormData: any;

  onSelectChange = (selectedRowKeys: any, choiceArr: any) => {
    const { dispatch, activeCode } = this.props;
    const newSelectArr = lodash.map(choiceArr, (item: any) => item[geTypeKey(activeCode)]);
    dispatch({
      type: 'ruleEngineController/saveSearchModelSelected',
      payload: {
        selectedRowKeys: newSelectArr,
      },
    });
  };

  onRowChange = (record: any, selectedRowKeys: any) => {
    const { dispatch, activeCode } = this.props;

    if (activeCode === AddType.RuleSet) {
      dispatch({
        type: 'ruleEngineController/saveSearchModelSelected',
        payload: {
          selectedRowKeys: [`${record.ruleSetId}`],
        },
      });
    } else {
      const key = geTypeKey(activeCode);
      const newSelectedRowKeys = lodash.includes(selectedRowKeys, record[key])
        ? lodash.difference(selectedRowKeys, [record[key]])
        : lodash.uniq(lodash.concat(selectedRowKeys, record[key]));

      dispatch({
        type: 'ruleEngineController/saveSearchModelSelected',
        payload: {
          selectedRowKeys: newSelectedRowKeys,
        },
      });
    }
  };

  getDisableColumn = (record: any) => {
    const { activeCode, submitRuleSet, currentGroupId, editData } = this.props;

    let disabled = false;
    let newList = [];

    if (activeCode && activeCode !== AddType.RuleSet) {
      if (activeCode === AddType.Rules) {
        newList = lodash
          .chain(submitRuleSet)
          .get('groups')
          .find((item: any) => item?.groupId === currentGroupId)
          .get('rules')
          .filter((item: any) => item.binded)
          .map((item: any) => {
            return item.id;
          })
          .value();
      } else {
        newList = lodash
          .chain(editData[activeCode])
          .filter((item: any) => item.binded)
          .map((item: any) => {
            return item.id;
          })
          .value();
      }
      disabled = !!newList.includes(record[geTypeKey(activeCode)]);
    }

    return {
      disabled,
    };
  };

  render() {
    const { dispatch, activeCode, data } = this.props;

    const onSearchChange = ({ code, value }: any) => {
      dispatch({
        type: 'ruleEngineController/updateSearchParams',
        payload: {
          [code]: value,
        },
      });
      dispatch({
        type: 'ruleEngineController/getSearchQuery',
        payload: {
          activeCode,
        },
      });
    };

    const handleTableClick = async (pagination: any) => {
      await dispatch({
        type: 'ruleEngineController/saveSearchPagination',
        payload: {
          current: pagination.current,
          activeCode,
        },
      });
      await dispatch({
        type: 'ruleEngineController/getSearchQuery',
        payload: {
          activeCode,
        },
      });
    };
    return (
      <Table
        rowKey={geTypeKey(activeCode)}
        dataSource={data[activeCode]?.list}
        pagination={data[activeCode]?.pagination}
        onChange={handleTableClick}
        rowSelection={{
          type: activeCode === AddType.RuleSet ? 'radio' : 'checkbox',
          selectedRowKeys: data[activeCode]?.selectedRowKeys,
          getCheckboxProps: this.getDisableColumn,
          onChange: this.onSelectChange,
        }}
        onRow={(record) => ({
          onClick: () => {
            this.onRowChange(record, data[activeCode]?.selectedRowKeys);
          },
        })}
        columns={getColumns({
          activeCode,
          params: data[activeCode]?.params,
          onSearchChange,
        })}
        scroll={{ x: 'max-content' }}
      />
    );
  }
}

export default connect(({ ruleEngineController }: any) => ({
  currentGroupId: ruleEngineController.currentGroupId,
  submitRuleSet: ruleEngineController.submitRuleSet,
  editData: ruleEngineController.editData,
  activeCode: ruleEngineController.searchData?.activeCode,
  data: ruleEngineController.searchData?.data,
}))(Search);
