import React from 'react';
import { useSelector } from 'dva';
import { Tabs as AntTabs } from 'antd';
import lodash from 'lodash';
import { Header, Tabs } from './Layout';
import TableList from './TableList';
import DataVersion from './DataVersion';
import styles from './Styles/index.less';
import type { CurrentMenuProps } from './Utils/Typings';
import {
  AddEditModal,
  AppRejectModal,
  ExcelModal,
  LiquibaseModal,
  DownLoadLiquibaseFileModal,
  UploadSQLModal,
  CopyModal,
  DataPatchModal,
} from './Modal';

const { TabPane } = AntTabs;

function ConfigurationMain() {
  const tabs: string[] = useSelector((state: any) => state.configurationTabs.tabs);
  const currentTab: string = useSelector((state: any) => state.configurationTabs.currentTab);
  const currentMenu = useSelector((state: any) => state.configurationMenu.currentMenu);
  const dataImageMenu: null | CurrentMenuProps = useSelector(
    (state: any) => state.configurationDataImage.dataImageMenu
  );
  const functionLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationCenter/findFunction']
  );
  const { dataImageActive, functionName } = currentMenu;

  const tabsComponet = {
    bussiness: <TableList />,
    dataVersion: <DataVersion />,
  };
  const isVersion = dataImageActive && dataImageMenu;
  return (
    <>
      <Header title={functionName}>{!functionLoading && isVersion && <Tabs />}</Header>
      <div className={styles.children}>
        <AntTabs activeKey={currentTab} renderTabBar={() => <></>}>
          {lodash.map(tabs, (item) => (
            <TabPane key={item}>{currentTab === item && tabsComponet[item]}</TabPane>
          ))}
        </AntTabs>
      </div>
      <DownLoadLiquibaseFileModal />
      <AddEditModal />
      <ExcelModal />
      <LiquibaseModal />
      <AppRejectModal />
      <UploadSQLModal />
      <CopyModal />
      <DataPatchModal />
    </>
  );
}
export default ConfigurationMain;
