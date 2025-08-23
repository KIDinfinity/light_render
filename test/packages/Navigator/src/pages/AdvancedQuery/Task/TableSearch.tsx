// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import TableSearch from '@/components/TableSearch/FilterInquire';
import TaskInquireForm from './Inquiry';
import TaskTable from './TableWrapper';
import BatchAssignTable from './BatchAssignTable';
import styles from './TableSearch.less';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import { handleMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

@connect(
  ({
    task,
    workspaceUser,
    processTask,
    workspaceSwitchOn,
    userGeneralInfoController,
    loading,
    user,
    advancedQueryController,
    advancedQueryAllForm,
    advancedQueryBatchAssign,
  }: any) => ({
    task,
    workspaceUser,
    processTask,
    workspaceSwitchOn,
    userGeneralInfoController,
    loading: loading.effects['task/filterList'],
    loadingExportExcel: loading.effects['task/exportExcel'],
    userId: user.currentUser.userId,
    searchObj: advancedQueryController.searchObj,
    stateOfSearch: advancedQueryController.stateOfSearch,
    searchForm: advancedQueryAllForm.searchForm,
    useBatchAssign: advancedQueryBatchAssign.useBatchAssign,
  })
)
class AdvancedQueryOfTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableMode: 'flow',
      assigneeList: [],
    };
    this.Table = React.createRef();
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'process/queryProcessDefTypeList',
    });

    const response = await dispatch({
      type: 'userGeneralInfoController/findAllForAssigneeUser',
      payload: {},
    });

    const assigneeList = [];
    lodash.forEach(response?.resultData, (value) => {
      assigneeList.push({
        userId: value.userId,
        userName: value.userName,
      });
    });

    this.setState({
      assigneeList,
    });
  };

  // 智能环点击More时更新页面信息
  componentDidUpdate = () => {
    const { dispatch } = this.props;
    // 将TableSearch页面存储到contactsAssigneeList中，高级查询assign task成功后更新task列表
    if (this.TableSearch?.handleSearch) {
      dispatch({
        type: 'contactsAssigneeList/saveTableSearch',
        payload: {
          TableSearch: this.TableSearch,
        },
      });
    }
  };

  fetchData = async (values = {}, e) => {
    const { dispatch, stateOfSearch, currentMenu } = this.props;

    // TODO:暂时改动,这里应该查明为什么点击了historyTab会去触发这个tab
    if (currentMenu?.id !== 'advancedQueryOfTask') {
      return;
    }

    // 每次点击智能环的more，dataCapture页面的task和case都跳转
    const { params } = stateOfSearch;
    const { taskStatus } = values?.params || {};
    const resultData = await dispatch({
      type: 'task/filterList',
      payload: {
        ...values,
        params: {
          ...params,
          ...values.params,
          taskStatus: lodash.isString(taskStatus) ? [taskStatus] : taskStatus,
        },
      },
    });
    if (resultData?.rows?.length > 0) {
      const selectIndex = lodash.get(stateOfSearch, 'selectable.current.index', 0) || 0;
      const record = lodash.get(resultData, `rows[${selectIndex}]`, {}) || {};
      await this.Table.current.fnOnRowClick(record, selectIndex);
      tarckInquiryPoint(dispatch, {
        ...(values.params || {}),
        eventName: eEventName.taskInquiry,
        eventOperation: eEventOperation.search,
      });
    } else {
      dispatch({
        type: 'navigatorInformationController/clear',
      });
      dispatch({
        type: 'advancedQueryController/resetSelectable',
      });
      this.Table.current.clearProcessState();
    }
  };

  exportExcel = async (values = {}) => {
    const { dispatch, stateOfSearch } = this.props;

    const { params } = stateOfSearch;
    const { taskStatus } = values?.params || {};
    if (
      !lodash.some(
        lodash.values({
          ...params,
          ...values.params,
          taskStatus: lodash.isString(taskStatus) ? [taskStatus] : taskStatus,
        }),
        (item) => !lodash.isEmpty(item)
      )
    ) {
      handleMessageModal([{ content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000393' }) }]);
      return;
    }
    await dispatch({
      type: 'task/exportExcel',
      payload: {
        ...values,
        params: {
          ...params,
          ...values.params,
          taskStatus: lodash.isString(taskStatus) ? [taskStatus] : taskStatus,
        },
      },
    });
  };

  handleToDetail = async (record) => {
    const { dispatch, stateOfSearch } = this.props;
    const formSearch = this.TableSearch.getStateOfSearch();

    const newStateOfSearch = stateOfSearch;
    newStateOfSearch.params = formSearch.params;

    await dispatch({
      type: 'advancedQueryController/saveStateOfSearch',
      payload: {
        stateOfSearch: newStateOfSearch,
      },
    });

    await dispatch({
      type: 'global/visitTaskDetail',
      payload: record,
    });
  };

  render() {
    const {
      loading,
      loadingExportExcel,
      inquireMode,
      changeSideMode,
      searchObj,
      stateOfSearch,
      getSelectedClassName,
      handleBtnReset,
      handleSearchReset,
      handleHeaderCell,
      handleSearchBefore,
      getStoredTable,
      searchForm,
      useBatchAssign,
      currentMenu,
    } = this.props;
    const { tableMode, assigneeList } = this.state;

    return (
      <div>
        <TableSearch
          advanceQueryType="task"
          tableMode={tableMode}
          onSearch={this.fetchData}
          onExportExcel={this.exportExcel}
          inquireMode={inquireMode}
          searchDefault={searchForm['2'] || stateOfSearch}
          changeSideMode={changeSideMode}
          wrappedComponentRef={(c) => {
            this.TableSearch = c;
          }}
        >
          <TaskInquireForm
            searchObj={searchObj}
            assigneeList={assigneeList}
            handleBtnReset={handleBtnReset}
            handleSearchReset={handleSearchReset}
            handleSearchBefore={handleSearchBefore}
            loading={loading}
            loadingExportExcel={loadingExportExcel}
          />
          <TaskTable
            TableSearch={this.TableSearch}
            onChange={handleSearchReset}
            handleHeaderCell={handleHeaderCell}
            handleToDetail={this.handleToDetail}
            getSelectedClassName={getSelectedClassName}
            getStoredTable={getStoredTable}
            onRef={this.Table}
            currentMenu={currentMenu}
          />
        </TableSearch>
        <div className={useBatchAssign ? styles.shade : {}}>
          <BatchAssignTable assigneeList={assigneeList} />
        </div>
      </div>
    );
  }
}

export default AdvancedQueryOfTask;
