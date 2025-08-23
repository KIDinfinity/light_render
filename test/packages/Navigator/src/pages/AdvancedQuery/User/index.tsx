import React, { Component } from 'react';
import { connect } from 'dva';
import lodash, { get } from 'lodash';
import { Button, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TableSearch, { Table } from '@/components/TableSearch/FilterInquire';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import { getScrollParams } from '@/utils/inqueryUtils';
import IconCard from '../../Home/Watching/View/Card/IconCard';
import UserInquire from './InquireForm';
import userColumns from './columns';
import UserCardList from '../UserCardList/UserCardList';
import styles from './User.less';
import SearchEmpty from '../SearchEmpty';

const BtnWrap = ({ children }) => <div className={styles.btn}>{children}</div>;
@connect(
  ({
    advancedQueryController,
    workspaceUser,
    loading,
    configController,
    userManagement,
    advancedQueryAllForm,
  }: any) => ({
    list: workspaceUser.list,
    richList: workspaceUser.richList,
    loading: loading.effects['workspaceUser/advancedQuery'],
    searchObj: advancedQueryController.searchObj,
    stateOfSearch: advancedQueryController.stateOfSearch,
    userGeneralInfo: userManagement.userGeneralInfo,
    userConfig: configController.configuration?.user || {},
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class AdvancedQueryOfUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      tableMode: get(props, 'searchObj.mode') || 'table',
      hasMore: true,
      scrollLoading: false,
    };
  }

  // 智能环点击More时更新页面信息
  componentDidUpdate = (next) => {
    const { searchObj } = this.props;

    if (searchObj.userId !== lodash.get(next, 'searchObj.userId')) {
      this.handleSearch();
    }
  };

  handleSearch = async (values = {}, isScrollSearch) => {
    const { dispatch, searchObj, richList, userGeneralInfo } = this.props;
    const { tableMode } = this.state;
    // let { organizationCode } = userGeneralInfo;
    let params = {};

    searchObj.mode = tableMode;
    if (isScrollSearch) {
      // eslint-disable-next-line no-param-reassign
      values.currentPage = (richList?.pagination?.page || 0) + 1;
    }
    if (searchObj.mode === 'card') {
      // eslint-disable-next-line no-param-reassign
      values.pageSize = 20;
      this.setState({
        scrollLoading: true,
      });
    }
    if (searchObj.tabIndex === '3') {
      params = { ...searchObj };
    }

    // todo: organization field support multi

    // const inputOrganizationCode = params.organizationCode || values.params.organizationCode;
    // let organizationCodeList: any[] = [];
    // if (!inputOrganizationCode) {
    //   const result = await dispatch({
    //     type: 'userManagement/getOrganizationCode',
    //   });
    //   // organizationCode 多个
    //   // organizationCode = get(result, 'organizationCode');
    //   organizationCodeList = lodash.map(result, (o: any) => o.organizationCode) || [];
    // } else {
    //   organizationCodeList = [inputOrganizationCode];
    // }

    const result = await dispatch({
      type: 'userManagement/getOrganizationCode',
    });
    const organizationCodeList = lodash.map(result, (o: any) => o.organizationCode) || [];

    await dispatch({
      type: 'workspaceUser/advancedQuery',
      payload: {
        ...values,
        params: {
          ...params,
          ...values.params,
          organizationCodeList,
        },
        isScrollSearch,
      },
    });
    if (searchObj.mode === 'card') {
      this.setState({
        scrollLoading: false,
      });
    }
  };

  getSelectedRowClassName = (record, i) => {
    const { stateOfSearch, list, getSelectedClassName } = this.props;

    return getSelectedClassName(list?.list, stateOfSearch, 'userId', record, i);
  };

  fnOnRowClick = (record, rowkey) => {
    if (this.TableSearch) {
      let { list } = this.props;
      const { saveStateOfSearch, richList } = this.props;
      if (this.state.tableMode === 'card') {
        list = richList;
      }
      const stateOfSearch = this.TableSearch.getStateOfSearch();
      const { selectable } = stateOfSearch;

      lodash.set(selectable, 'prev.id', list?.list?.[rowkey - 1]?.userId);
      lodash.set(selectable, 'prev.index', rowkey - 1);
      lodash.set(selectable, 'current.id', record.userId);
      lodash.set(selectable, 'current.index', rowkey);
      lodash.set(selectable, 'next.id', list?.list?.[rowkey + 1]?.userId);
      lodash.set(selectable, 'next.index', rowkey + 1);

      saveStateOfSearch({ selectable });
    }
  };

  handleInfiniteOnLoad = async () => {
    this.setState({
      scrollLoading: true,
    });

    // eslint-disable-next-line no-useless-catch
    try {
      await this.TableSearch.handleSearch(null, null, true);
    } catch (error) {
      throw error;
    }
    const { pagination } = lodash.get(this.props, 'richList');
    const { page, pageSize, total } = pagination;
    if (page * pageSize > total) {
      notification.warning({
        message: formatMessageApi({
          Label_BIZ_Claim: 'component.noticeIcon.end',
        }),
      });
      this.setState({
        hasMore: false,
        scrollLoading: false,
      });
      return;
    }

    this.setState({
      scrollLoading: false,
    });
  };

  handleMode = async () => {
    const { tableMode, pagination } = this.state;
    const { dispatch } = this.props;

    const mode = tableMode === 'card' ? 'table' : 'card';
    const nextPagination = { ...pagination, page: 1 };
    const state = {
      tableMode: mode,
      pagination: nextPagination,
    };
    await this.setState(state);
    // history.push({
    //   pathname: '',
    //   state: {
    //     tabIndex: get(searchObj, 'tabIndex'),
    //     mode,
    //   },
    // });
    dispatch({
      type: 'advancedQueryController/saveSearchObj',
      payload: {
        searchObj: { mode },
      },
    });
    this.TableSearch.handleSearch(null, { pagination: nextPagination });
  };

  render() {
    const {
      list,
      richList,
      loading,
      stateOfSearch,
      userConfig,
      handleBtnReset,
      handleSearchReset,
      handleHeaderCell,
      handleSearchBefore,
      getStoredTable,
      isCapsule,
      searchForm,
    } = this.props;
    const { tableMode, hasMore, scrollLoading } = this.state;
    return (
      <TableSearch
        onSearch={this.handleSearch}
        searchDefault={searchForm['3'] || stateOfSearch}
        advanceQueryType="user"
        wrappedComponentRef={(c) => {
          this.TableSearch = c;
        }}
      >
        <UserInquire
          config={userConfig?.inquiryField}
          handleSearchReset={handleSearchReset}
          handleSearchBefore={handleSearchBefore}
          handleBtnReset={handleBtnReset}
          loading={loading}
        />
        <BtnWrap>
          <Button onClick={this.handleMode} className={styles.btnMode}>
            {tableMode === 'table' || tableMode === 'flow' ? (
              <IconCard type="card" size={[30, 19]} />
            ) : (
              <IconCard type="list" size={[26, 16]} />
            )}
          </Button>
        </BtnWrap>
        {tableMode === 'table' || tableMode === 'flow' ? (
          <Table
            rowKey="key"
            loading={loading}
            locale={{
              emptyText: <SearchEmpty />,
            }}
            columns={userColumns(stateOfSearch.orders, userConfig?.resultField, handleHeaderCell, {
              sortName: searchForm['3']?.sortName,
              sortOrder: searchForm['3']?.sortOrder,
            })}
            data={list}
            onRow={(record, rowKey) => ({
              index: rowKey,
              record,
              onClick: () => {
                this.fnOnRowClick(record, rowKey);
              },
            })}
            getSelectedRowClassName={this.getSelectedRowClassName}
            onChange={handleSearchReset}
            handleSearchBefore={handleSearchBefore}
            getStoredTable={getStoredTable}
            scroll={getScrollParams(get(userConfig, 'resultField'), isCapsule)}
          />
        ) : (
          <UserCardList
            data={richList}
            loadMore={this.handleInfiniteOnLoad}
            fnOnRowClick={this.fnOnRowClick}
            hasMore={hasMore}
            scrollLoading={scrollLoading}
          />
        )}
      </TableSearch>
    );
  }
}

export default SwitchDrawerModeHoc(AdvancedQueryOfUser);
