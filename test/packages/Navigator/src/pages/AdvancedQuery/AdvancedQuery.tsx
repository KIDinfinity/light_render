// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Icon } from 'antd';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import { tenant } from '@/components/Tenant';
import NoPermissionException from '@/auth/Exceptions/NoPermission';
import { getCommonAuthorityList } from '@/auth/Utils';
import { AdvancedEnum, TypeEnum } from '@/enum/GolbalAuthority';
import Logo from '@/components/Logo/logo';
import AdvancedQueryHeader from './Header';
import styles from './AdvancedQuery.less';
import tabs from './Menu';
import { Link } from 'umi';
import classnames from 'classnames';

interface IProps {
  permissionLoading: boolean;
  permissionMenus: string[];
  dispatch: Dispatch;
  configuration: any;
  searchObj: any;
  history: any;
  tabIndex: string;
  stateOfSearch: any;
}
// @ts-ignore
@connect(({ advancedQueryController, configController, authController, loading }) => ({
  searchObj: advancedQueryController.searchObj,
  tabIndex: advancedQueryController.tabIndex,
  stateOfSearch: advancedQueryController.stateOfSearch,
  configuration: configController.configuration,
  permissionLoading: loading.effects['authController/getCommonAuthorityList'],
  commonAuthorityList: authController.commonAuthorityList,
}))
class AdvancedQuery extends Component<IProps> {
  constructor(props) {
    super(props);
    this.AdvancedMenus = this.getAdvancedMenus();
    this.displayLink = '';
  }

  componentDidMount() {
    const { dispatch, tabIndex } = this.props;
    const regionCode = tenant.region();
    this.displayLink = (() => {
      const params = new URL(document.location).searchParams;
      const afterHook = params.get('afterHook');
      if (afterHook === 'closeWin') {
        return false;
      }
      return true;
    })();
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });

    // 初始化
    dispatch({
      type: 'advancedQueryAllForm/saveCurrentTab',
      payload: {
        currentTab: this.AdvancedMenus?.find?.((item) => item?.key === tabIndex)
          ? tabIndex
          : this.AdvancedMenus?.[0]?.key,
      },
    });
  }

  componentDidUpdate() {
    const { dispatch, tabIndex } = this.props;

    if (!this.AdvancedMenus?.find?.((item) => item?.key === tabIndex)) {
      dispatch({
        type: 'advancedQueryAllForm/saveCurrentTab',
        payload: {
          currentTab: this.AdvancedMenus?.[0]?.key,
        },
      });
    }
  }

  getAdvancedMenus = () => {
    const { commonAuthorityList }: any = this.props;
    const authList = getCommonAuthorityList(commonAuthorityList, {
      data: [
        AdvancedEnum.AdvancedQueryOfCase,
        AdvancedEnum.AdvancedQueryOfTask,
        AdvancedEnum.AdvancedQueryOfHospitalBilling,
        AdvancedEnum.AdvancedQueryOfUser,
        AdvancedEnum.AdvancedQueryOfClaimHistory,
        AdvancedEnum.AdvancedQueryOfUnknownDocument,
        AdvancedEnum.AdvancedQueryOfRuleSet,
        AdvancedEnum.AdvancedQueryOfServicingHistory,
        AdvancedEnum.AdvancedQueryOfNBHistory,
      ],
      type: TypeEnum.Menu,
    });
    // 过滤没权限菜单
    return tabs(authList);
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: true,
      },
    });
  };

  saveStateOfSearch = (stateOfSearch: any) => {
    const { dispatch } = this.props;

    if (stateOfSearch) {
      dispatch({
        type: 'advancedQueryController/saveStateOfSearch',
        payload: {
          stateOfSearch,
        },
      });
    }
  };

  /**
   * 获取高级查询四个模块选中时候的className
   */
  getSelectedClassName = (list: any, stateOfSearch: any, id: any, record: any, i: any) => {
    const { selectable, pagination } = stateOfSearch;
    if (selectable.current.index === 0 && !selectable.current.id) {
      return i === 0 ? 'selected' : '';
    }
    if (!pagination || !selectable) {
      return '';
    }
    const { prev, current, next } = selectable;
    const { total, pageSize, currentPage } = pagination;

    let selectedRowIndex: any = 0;
    if (current?.id) {
      const currentExist = list?.some?.((item: any) => item[id] === current?.id);
      const nextExist = list?.some?.((item: any) => item[id] === next?.id);
      // 访问过详情页
      selectedRowIndex = null;
      if (currentExist) {
        // 访问详情页时的那项数据存在
        if (record[id] === current?.id) {
          // 访问详情页时的那项数据存在，表示数据没有减少，直接标识
          selectedRowIndex = i;
        }
      } else if (nextExist) {
        // 访问详情页时的那项数据丢失，且后一条数据存在，标识后一条数据
        if (record[id] === next?.id) {
          selectedRowIndex = i;
        }
      } else if (!nextExist && total > pageSize * currentPage) {
        // 访问详情页时的那项数据丢失，且后一条数据存在于下一页，标识下一页的第一条数据（即本页的最后一条）
        selectedRowIndex = pageSize - 1;
      } else if (record[id] === prev?.id) {
        // 访问详情页时的那项数据丢失，且后一条数据也不存在，则标识前一条数据
        selectedRowIndex = i;
      }
    }

    return selectedRowIndex === i ? 'selected' : '';
  };

  handleTabClick = async (tabIndex: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex,
      },
    });
    dispatch({
      type: 'advancedQueryAllForm/saveCurrentTab',
      payload: {
        currentTab: tabIndex,
      },
    });
  };

  renderTabImg = (idx: any) => {
    const currentTab: any = lodash.find(this.AdvancedMenus, { key: idx });
    return (
      <div className={`${idx === this.props.tabIndex ? styles.active : ''} ${styles.switch}`}>
        <Icon component={currentTab.icon} />
      </div>
    );
  };

  fnBackToHome = async () => {
    const { dispatch, history } = this.props;
    await Promise.all([
      dispatch({
        type: 'workspaceSwitchOn/clearShow',
      }),
      dispatch({
        type: 'advancedQueryController/initStateOfSearch',
      }),
      dispatch({
        type: 'advancedQueryController/initSearchObj',
      }),
    ]);
  };

  handleBtnReset = () => {
    const { dispatch } = this.props;
    /**
     * 初始化用户操作状态
     */
    dispatch({
      type: 'advancedQueryController/initStateOfSearch',
    });
    dispatch({
      type: 'advancedQueryController/initSearchObj',
    });
    // 删除点击的tab搜索条件
    dispatch({
      type: 'advancedQueryAllForm/resetInitData',
    });
  };

  handleSearchReset = () => {
    const { dispatch, stateOfSearch } = this.props;
    const selectable = {
      prev: {
        id: '',
        index: -1,
      },
      current: {
        id: '',
        index: 0,
      },
      next: {
        id: '',
        index: 1,
      },
    };
    dispatch({
      type: 'advancedQueryController/saveStateOfSearch',
      payload: {
        stateOfSearch: { ...stateOfSearch, selectable },
      },
    });
  };

  handleSearchBefore = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'advancedQueryController/saveSortFromTable',
      payload: {
        sortFromTable: false,
      },
    });
  };

  handleHeaderCell = (column: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'advancedQueryController/saveSortFromTable',
      payload: {
        sortFromTable: column.sorter,
      },
    });
  };

  render() {
    const { permissionLoading, tabIndex } = this.props;
    const currentMenu = this.AdvancedMenus?.find((item) => item.key === tabIndex);
    return (
      <div className={classnames('guidance-advanced-query-container', styles.container)}>
        {!permissionLoading && (
          <>
            <AdvancedQueryHeader
              title={currentMenu ? currentMenu.title : this.AdvancedMenus?.[0]?.title}
            />
            {this.AdvancedMenus?.length > 0 ? (
              <Tabs
                defaultActiveKey={
                  this.AdvancedMenus?.find?.((item) => item?.key === tabIndex)
                    ? tabIndex
                    : this.AdvancedMenus?.[0]?.key
                }
                activeKey={
                  this.AdvancedMenus?.find?.((item) => item?.key === tabIndex)
                    ? tabIndex
                    : this.AdvancedMenus?.[0]?.key
                }
                tabPosition="left"
                onTabClick={this.handleTabClick}
                tabBarExtraContent={
                  <div onClick={this.fnBackToHome} className={styles.logoContainer}>
                    <Link to={'/navigator'} key="logo">
                      {this.displayLink ? <Logo sideOpen type="3" /> : <Logo type="3" />}
                    </Link>
                  </div>
                }
              >
                {lodash.map(this.AdvancedMenus, ({ key, component: AdvancedComponent }) => {
                  const props = {
                    saveStateOfSearch: this.saveStateOfSearch,
                    getSelectedClassName: this.getSelectedClassName,
                    handleSearchReset: this.handleSearchReset,
                    handleBtnReset: this.handleBtnReset,
                    handleHeaderCell: this.handleHeaderCell,
                    handleSearchBefore: this.handleSearchBefore,
                    currentMenu,
                  };

                  return (
                    <Tabs.TabPane tab={this.renderTabImg(`${key}`)} key={key}>
                      <AdvancedComponent key={key} {...props} />
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            ) : (
              <div className={styles.emptyMenus}>
                <NoPermissionException />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default AdvancedQuery;
