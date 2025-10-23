import { formatMessageApi } from '@/utils/dictFormatMessage';
import judgeIsTaskDetail from '@/utils/judgeIsTaskDetail';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { ReactComponent as CalendarIcon } from 'opus/Assets/icon-calendar.svg';
import { ReactComponent as FileSearchIcon } from 'opus/Assets/icon-fileSearchOutlined.svg';
import { ReactComponent as IconHome } from 'opus/Assets/icon-home.svg';
import { ReactComponent as IconLogout } from 'opus/Assets/icon-logout.svg';
import { ReactComponent as IconReport } from 'opus/Assets/icon-report.svg';
import { ReactComponent as IconPostProcessing } from 'opus/Assets/icon-postProcessing.svg';
import { Avatar } from 'opus/Components';
import { Icon, Layout, Menu, Spin } from 'opus/Components/Antd';
import Authorized from '@/utils/Authorized';
import { SmartCircleEnum } from '@/enum/GolbalAuthority';
import { ModalTabs } from 'packages/Opus/Enums';
import ErrorBoundary from 'opus/Components/ErrorBoundary';

// import Filter from 'opus/Components/Filter';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';
import React, { useEffect, useState } from 'react';
import { tenant } from '@/components/Tenant';
import { ContainerQuery } from 'react-container-query';
import { history, Outlet } from 'umi';
import { useLocation } from 'react-router-dom';
import styles from './OpusLayout.less';
import SearchInput from './SearchInput';
import CreateCase from './CreateCase';

const mediaQuery = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const LoadingSpin = () => {
  const loadingStatus = useSelector(({ login }: any) => login?.loadingStatus);
  return loadingStatus ? (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  ) : null;
};

const OpusMenus = ({ setTabKey }: any) => {
  const dispatch = useDispatch();
  const headerTabList = useSelector(({ opusHome }: any) => opusHome?.headerTabList, shallowEqual);
  const pathname = window.location.pathname;
  const menus = [
    {
      key: 'home',
      icon: IconHome,
      label: formatMessageApi({ Label_COM_Opus: 'Home' }),
      default: pathname.includes('opus/home'),
    },
    {
      key: 'quality-control',
      icon: FileSearchIcon,
      label: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.quality-control',
      }),
    },
    {
      key: 'post-processing',
      icon: IconPostProcessing,
      label: formatMessageApi({
        Label_CLM_Opus: 'postProcessing',
      }),
      region: ['JP'],
    },
    {
      key: 'leave-management',
      icon: CalendarIcon,
      label: formatMessageApi({ Label_COM_UserCenter: 'LeaveManagement' }),
    },
    // MDLJP-285 暂时隐藏未实现功能的button
    // {
    //   key: 'performance-metrics',
    //   icon: IconGraph,
    //   label: formatMessageApi({ Label_COM_Opus: 'PerformanceMetrics' }),
    // },
    {
      key: 'reports',
      icon: IconReport,
      label: formatMessageApi({ Label_COM_Opus: 'Reports' }),
      afterRender: () => <div className={styles.boundary} />,
    },
    // {
    //   key: 'settings',
    //   icon: IconSetting,
    //   label: formatMessageApi({ Label_COM_Opus: 'Settings' }),
    // },
    {
      key: 'logout',
      icon: IconLogout,
      label: formatMessageApi({ Label_COM_Opus: 'Logout' }),
    },
  ];
  const [menuKey, setMenuKey] = useState(lodash.find(menus, { default: true })?.key || '');

  useEffect(() => {
    switch (pathname) {
      case '/opus/home':
        setMenuKey('home');
        break;
      case '/opus/leaveManagement':
        setMenuKey('leave-management');
        break;
      case '/opus/reportCenter':
        setMenuKey('reports');
        break;
      case '/opus/qualityControl':
        setMenuKey('quality-control');
        break;
      case '/opus/postProcessing':
        setMenuKey('post-processing');
        break;
      default:
        setMenuKey('');
    }
  }, [pathname]);

  const onMenusClick = ({ key }: any) => {
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
        payload: { isOpus: true, manu: true },
      });
      return;
    }

    switch (key) {
      case 'home':
        history.push('/opus/home');
        if (setTabKey) {
          setTabKey(headerTabList?.[0]?.tabIndex);
        }
        break;
      case 'leave-management':
        history.push('/opus/leaveManagement');
        break;
      case 'reports':
        history.push('/opus/reportCenter');
        break;
      case 'quality-control':
        history.push('/opus/qualityControl');
        break;
      case 'post-processing':
        history.push('/opus/postProcessing');
        break;
      default:
        break;
    }

    setMenuKey(key);
  };
  return (
    <aside className={styles.opusAside}>
      <div className={styles.opusAsideContent}>
        <div className={styles.opusIcon} />
        <Menu className={styles.opusAsideMenu} selectedKeys={[menuKey]} onClick={onMenusClick}>
          {menus
            .filter((item) => {
              const region = tenant.region();
              return !item.region || item.region.includes(region);
            })
            .map(({ key, icon, label, afterRender }) => (
              <Menu.Item key={key}>
                <div className={styles.opusAsideMenuItem}>
                  <div className={styles.opusAsideItemContrainer}>
                    <Icon component={icon} className={styles.opusAsideMenuIcon} />
                    <div className={styles.opusAsideMenuLabel}>{label}</div>
                  </div>
                </div>
                {afterRender && afterRender()}
              </Menu.Item>
            ))}
        </Menu>
      </div>
    </aside>
  );
};

const OpusHeader = ({ tabKey, setTabKey, tabList }: any) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userName = useSelector(({ user }: any) => user?.currentUser?.userName) || '';
  const authorityCodeList = useSelector(
    ({ authController }: any) => authController.authorityCodeList
  );
  const hideTabs =
    tenant.isJP() &&
    lodash.includes(['/opus/leaveManagement', '/opus/reportCenter'], location?.pathname);
  return (
    <div className={styles.opusHeader}>
      <div className={styles.opusHeaderLeft}>
        {!hideTabs && (
          <ul className={styles.contrainer}>
            {tabList.map(({ tabIndex, dictCode, typeCode, icon }: any) => (
              <li
                key={tabIndex}
                className={classNames({
                  [styles.item]: true,
                  [styles.active]: tabKey === tabIndex,
                })}
                onClick={() => {
                  setTabKey(tabIndex);
                  dispatch({
                    type: `${NAMESPACE}/saveModalTab`,
                    payload: {
                      modalTab: tabIndex,
                    },
                  });
                  if (
                    !tenant.isJP() ||
                    !lodash.includes(
                      ['/opus/qualityControl', '/opus/postProcessing'],
                      location?.pathname
                    )
                  ) {
                    history.push('/opus/home');
                  }
                }}
              >
                <Icon component={icon} className={styles.icon} />
                <span className={styles.label}>{formatMessageApi({ [typeCode]: dictCode })}</span>
              </li>
            ))}

            <Authorized
              authority={[SmartCircleEnum.RS_CreateCase_Opus_enter]}
              currentAuthority={authorityCodeList}
            >
              <CreateCase />
            </Authorized>
          </ul>
        )}
      </div>
      <div className={styles.opusHeaderRight}>
        {!lodash.includes(location?.pathname, 'opus/advancedQuery') && (
          <SearchInput setTabKey={setTabKey} />
        )}

        {/* <Badge count={1} className={styles.badge}>
          <Icon type="bell" />
        </Badge> */}
        <Avatar className={styles.avatar} name={userName} />
      </div>
    </div>
  );
};

const OpusDataPrepare = ({ setIsReady }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const t = async () => {
      await dispatch({
        type: 'user/fetchCurrent',
      });
      await dispatch({
        type: `${NAMESPACE}/getOrganizationByOwner`,
      });
      await dispatch({
        type: `${NAMESPACE}/getSlaPercentage`,
      });
      await dispatch({
        type: `${NAMESPACE}/getResources`,
      });
      setIsReady(true);
    };
    t();
  }, []);
  return null;
};

const LayoutRender = () => {
  const pathName = window.location.pathname;

  const layoutConfig = {
    default: {
      Aside: OpusMenus,
      Header: OpusHeader,
      Content: ({ children }: any) => {
        const isTaskDetail = judgeIsTaskDetail();
        return React.isValidElement(children) ? (
          <div
            id="opusLayout"
            className={classNames({
              [styles.hasMenu]: true,
              [styles.hasHeader]: true,
              [styles.opusContent]: true,
              [styles.taskDetail]: isTaskDetail,
            })}
          >
            {children}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '50px',
              fontWeight: '700',
              fontSize: '20px',
              color: 'black',
            }}
          >
            Coming Soon
          </div>
        );
      },
      DataPrepare: OpusDataPrepare,
    },
  };

  return lodash.has(layoutConfig, pathName) ? layoutConfig[pathName] : layoutConfig.default;
};

const { Aside, Header, Content, DataPrepare } = LayoutRender();

const OpusMain = ({ setTabKey, tabKey }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'configController/getConfiguration',
    });
  }, []);
  const isHome = ['/opus', '/opus/', '/opus/home'].includes(window.location.pathname);
  const headerTabList = useSelector(({ opusHome }: any) => opusHome?.headerTabList, shallowEqual);

  useEffect(() => {
    const tabIndex = headerTabList?.[0]?.tabIndex;

    if (isHome && (!tabKey || lodash.findIndex(headerTabList, { tabIndex: tabKey }) === -1)) {
      setTabKey(tabIndex);
      dispatch({
        type: `${NAMESPACE}/saveModalTab`,
        payload: {
          modalTab: tabIndex,
        },
      });
    }
  }, [isHome, headerTabList, tabKey, setTabKey]);

  return (
    <Layout className={styles.opusMain}>
      <Header tabKey={tabKey} setTabKey={setTabKey} tabList={headerTabList} />
      <Content>
        <Outlet context={{ tabKey }} />
      </Content>
    </Layout>
  );
};

export default () => {
  const [isReady, setIsReady] = useState(false);
  const [tabKey, setTabKey] = useState(ModalTabs.default as string);

  const setTabKeyFun = (value: string) => {
    if (lodash.isEmpty(value)) {
      setTabKey(ModalTabs.default);
    } else {
      setTabKey(value);
    }
  };

  return (
    <ErrorBoundary panelName="OpusLayout">
      <ContainerQuery query={mediaQuery}>
        {(mediaClass) => (
          <div className={classNames(mediaClass)} id={styles.opus}>
            <DataPrepare setIsReady={setIsReady} />
            <Layout className={styles.opusLayout}>
              <Aside setTabKey={setTabKeyFun} />
              {!!isReady && (
                <OpusMain tabKey={tabKey} setTabKey={setTabKeyFun}>
                  <Outlet />
                </OpusMain>
              )}
              {/* <Filter /> */}
            </Layout>
            <LoadingSpin />
          </div>
        )}
      </ContainerQuery>
    </ErrorBoundary>
  );
};
