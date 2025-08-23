import React from 'react';
import Hotkey from '@/components/Hotkey/home/view/Hotkey';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import classNames from 'classnames';
import MCSubscribeEnvoyList from 'bpm/pages/Envoy/MCSubscribe/MCSubscribeEnvoyList';
import useExpanderController from 'navigator/hooks/useExpanderController';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Tab from './Tab';
import Content from './Content';
import styles from './switchDrawer.less';
import Container from './Container';
import AutoTriggerSwitchDrawer from './AutoTriggerSwitchDrawer';

const SwitchDrawer = () => {
  const { isExpanderSwitchOn, isSiderToggleOn } = useExpanderController();
  return (
    <Container
      className={classNames(styles.drawer, {
        [styles.capsule]: isSiderToggleOn,
        [styles.expander]: isExpanderSwitchOn,
        [styles.mask]: isExpanderSwitchOn,
      })}
    >
      <AutoTriggerSwitchDrawer />
      <CaseTaskDetail.SwitchDrawer.Consumer>
        <MCSubscribeEnvoyList />
      </CaseTaskDetail.SwitchDrawer.Consumer>
      <CaseTaskDetail.SwitchDrawer.Consumer>
        <Tab />
      </CaseTaskDetail.SwitchDrawer.Consumer>
      <Hotkey className={styles.hotkey} id={HotkeyHomeIds.SidebarPage}>
        <Content />
      </Hotkey>
    </Container>
  );
};

export default () => (
  <CaseTaskDetail.SwitchDrawer.Provider>
    <SwitchDrawer />
  </CaseTaskDetail.SwitchDrawer.Provider>
);
