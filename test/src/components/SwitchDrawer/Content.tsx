import React, { useMemo } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import Envoy from 'bpm/pages/Envoy';
import InformationManagementDrawer from 'bpm/pages/Information';
import User360Drawer from 'claim/pages/360';
import AIDrawer from 'navigator/pages/SmartCircle';
import MessagerDrawer from 'navigator/pages/Messager';
import InformationExpander from 'bpm/pages/Information/complex/Expander';
import EnvoyExpander from 'bpm/pages/Envoy/EnvoyExpander/EnvoyExpander';
import C360Expander from 'claim/pages/360/pages/C360Expander';
import { TabsKey } from 'claim/pages/360/enum';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import HotHighLight from '@/components/Hotkey/home/view/HotHighLight';
import Tools from 'navigator/pages/Home/Monitor/Tools';
import IntegrationChecklist from 'integration/Checklist';
import IntegrationDetail from 'integration/IntegrationDetail';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
import ExpanderContainer from './ExpanderContainer';
import styles from './Content.less';
import { useSelector } from 'umi';
import { formUtils } from 'basic/components/Form';

const Content = ({ isShow }: any) => {
  const { isExpanderSwitchOn, is360 } = useExpanderController();
  const { SidebarPage } = HotkeyHomeIds;
  const noPermissionCases = useSelector((state) => state.authController.noPermissionCases);
  const envoyCaseNo = useSelector((state) => state.envoyController.caseNo);
  const informationCaseNo = useSelector(
    (state) => state.navigatorInformationController.informationData?.caseNo
  );
  const c360Tab = useSelector((state) => state.workspaceSwitchOn.c360Tab);
  const isHidden =
    noPermissionCases[
      isShow.isShowRemark
        ? formUtils.queryValue(informationCaseNo)
        : formUtils.queryValue(envoyCaseNo)
    ];
  const isHidden360Expander = (() => {
    return isShow.isShow360 && !lodash.includes([TabsKey.coverage], c360Tab);
  })();

  const DOM = useMemo(() => {
    return (
      <HotHighLight
        parent={{
          className: classNames(styles.wrap),
        }}
        parentClass={styles.parentActiveFocus}
        childrenClass={styles.activeFocus}
        condition={SidebarPage}
      >
        <div
          className={classNames(styles.contentLeft, {
            [styles.contentLeft360Expander]:
              (isExpanderSwitchOn && isHidden360Expander) ||
              (isExpanderSwitchOn && isHidden) ||
              (isShow.isShowTools && isExpanderSwitchOn),
            [styles.contentLeft360]: is360,
          })}
        >
          {isShow.isShowAI && <AIDrawer key={SwitchDrawerTab.SmartCircle} />}
          {isShow.isShowChat && <MessagerDrawer key={SwitchDrawerTab.Chat} />}
          <div className={isShow.isShowRemark ? '' : styles.hidden}>
            <InformationManagementDrawer key={SwitchDrawerTab.Remark} />
          </div>
          <div className={isShow.isShowPending ? '' : styles.hidden}>
            <Envoy key={SwitchDrawerTab.Pending} />
          </div>

          {isShow.isShow360 && <User360Drawer key={SwitchDrawerTab.CustomerView} />}
          {isShow.isShowTools && <Tools key={SwitchDrawerTab.Tools} />}
          {isShow.isShowIntegration && <IntegrationChecklist key={SwitchDrawerTab.Integration} />}
        </div>
        <div
          className={classNames(styles.contentRight, {
            [styles.none]:
              (isExpanderSwitchOn && isHidden360Expander) ||
              (isExpanderSwitchOn && isHidden) ||
              (isShow.isShowTools && isExpanderSwitchOn),
          })}
        >
          <ExpanderContainer scrollable={isShow.isShowPending}>
            {isShow.isShowRemark && <InformationExpander />}
            {isShow.isShowPending && <EnvoyExpander />}
            {isShow.isShow360 && <C360Expander />}
            {isShow.isShowIntegration && <IntegrationDetail />}
          </ExpanderContainer>
        </div>
      </HotHighLight>
    );
  }, [isExpanderSwitchOn, isShow, is360, isHidden, isHidden360Expander]);
  return DOM;
};

export default connect(({ workspaceSwitchOn }: any) => ({
  isShow: workspaceSwitchOn.isShow,
}))(Content);
