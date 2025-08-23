import React from 'react';
import { useSelector } from 'dva';
import classNames from 'classnames';
import { Icon } from 'antd';
import Authorized from '@/utils/Authorized';
import MessageCenter from 'navigator/pages/MessageCenter/PerfomanceType/NotificationWrapper';
import { Hotkey } from '@/components/Hotkey/home';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
import { ESiderPermissions } from 'basic/enum';
import ExpandButton from './ExpandButton';
import useTabNotification from './useTabNotification';
import { ReactComponent as IconAI } from './assets/icon-ai.svg';
import { ReactComponent as IconChat } from './assets/icon-chat.svg';
import { ReactComponent as IconRemark } from './assets/icon-remark.svg';
import { ReactComponent as IconPending } from './assets/icon-pending.svg';
import { ReactComponent as Icon360 } from './assets/icon-360.svg';
import { ReactComponent as IconTools } from './assets/icon-tools.svg';
import { ReactComponent as IconIntegrationChecklist } from './assets/icon-integration-checklist.svg';
import useMCSubscribeChecklistNotification from 'integration/_hooks/useMCSubscribeChecklistNotification';
import TabList from './TabList';
import TabItem from './TabItem';
import styles from './Tab.less';
import useLoadInfoData from './_hooks/useLoadInfoData';
import useGetTaskAuthorized from './_hooks/useGetTaskAuthorized';

const Tab = ({ remoteTaskDetail, remoteProcessInstanceId }: any) => {
  useLoadInfoData({ processInstanceId: remoteProcessInstanceId });
  const taskAuthorized = useGetTaskAuthorized({
    taskDetail: remoteTaskDetail,
    processInstanceId: remoteProcessInstanceId,
    pathName: window.location.pathname,
  });
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const logoutLoading = useSelector((state: any) => state.loading.effects['login/logout']);
  const list = commonAuthorityList
    .filter((item: any) => item.result)
    .map((item: any) => item.authorityCode);

  const { chatNotify, infoNotify, envoyNotify } = useTabNotification({
    taskDetail: remoteTaskDetail,
  });

  useMCSubscribeChecklistNotification({
    caseNo: remoteTaskDetail?.processInstanceId,
  });
  return (
    <div
      className={classNames(styles.wrap, {
        [styles.notEdit]: logoutLoading,
      })}
    >
      <Hotkey id={HotkeyHomeIds.Sidebar}>
        <div className={classNames([styles.tabs, styles['black-scroll']])}>
          <MessageCenter />
          <TabList
            list={[
              {
                type: 'ai',
                typeCode: 'Label_BIZ_Claim',
                dictCode: 'app.navigator.drawer.aiCircle.title',
              },
              {
                type: 'chat',
                typeCode: 'Label_COM_WarningMessage',
                dictCode: 'app.navigator.drawer.messager.title',
                notification: chatNotify,
              },
              {
                type: 'remark',
                typeCode: 'Label_BIZ_Claim',
                dictCode: 'app.navigator.drawer.remark.title',
                notification: infoNotify,
              },
              {
                type: 'pending',
                typeCode: 'Label_BIZ_Claim',
                dictCode: 'app.navigator.drawer.pending.title',
                notification: envoyNotify,
              },
              {
                type: '360',
                typeCode: 'Label_BIZ_Individual',
                dictCode: '360Label',
              },
              {
                type: 'tools',
                typeCode: 'Label_COM_General',
                dictCode: 'Tools',
              },
              {
                type: 'integration',
                typeCode: 'Label_Sider_IntegrationChecklist',
                dictCode: 'IntegrationChecklist',
              },
            ]}
          >
            <Authorized authority={[]} currentAuthority={list}>
              <TabItem
                type="ai"
                flag={SwitchDrawerTab.SmartCircle}
                icon={<Icon component={IconAI} />}
              />
            </Authorized>

            <Authorized authority={[]} currentAuthority={list}>
              <TabItem
                type="chat"
                flag={SwitchDrawerTab.Chat}
                icon={<Icon component={IconChat} />}
              />
            </Authorized>
            <Authorized
              authority={[ESiderPermissions.InformationManagement]}
              currentAuthority={list}
            >
              {taskAuthorized.showInformation ? (
                <TabItem
                  type="remark"
                  flag={SwitchDrawerTab.Remark}
                  icon={<Icon component={IconRemark} />}
                />
              ) : null}
            </Authorized>
            <Authorized authority={[ESiderPermissions.EnvoyManagement]} currentAuthority={list}>
              {taskAuthorized.showPending ? (
                <TabItem
                  type="pending"
                  flag={SwitchDrawerTab.Pending}
                  icon={<Icon component={IconPending} />}
                />
              ) : null}
            </Authorized>
            <Authorized authority={[ESiderPermissions.User360Management]} currentAuthority={list}>
              {taskAuthorized.showInsured ? (
                <TabItem
                  type="360"
                  flag={SwitchDrawerTab.CustomerView}
                  icon={<Icon component={Icon360} />}
                />
              ) : null}
            </Authorized>
            <Authorized authority={[ESiderPermissions.Tools]} currentAuthority={list}>
              {taskAuthorized.showTools ? (
                <TabItem
                  type="tools"
                  flag={SwitchDrawerTab.Tools}
                  icon={<Icon component={IconTools} />}
                />
              ) : null}
            </Authorized>
            <Authorized
              authority={[ESiderPermissions.IntegrationChecklist]}
              currentAuthority={list}
            >
              {taskAuthorized.showIntegration ? (
                <TabItem
                  type="integration"
                  flag={SwitchDrawerTab.Integration}
                  icon={<Icon component={IconIntegrationChecklist} />}
                  taskId={remoteTaskDetail?.taskId}
                />
              ) : null}
            </Authorized>
          </TabList>
        </div>
        <ExpandButton />
      </Hotkey>
    </div>
  );
};

export default Tab;
