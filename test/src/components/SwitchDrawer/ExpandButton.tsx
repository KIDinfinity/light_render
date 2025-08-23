import React from 'react';
import { useDispatch, connect } from 'dva';
import { Icon } from 'antd';
import classnames from 'classnames';
import navigator from 'navigator/api';
import useExpanderController from 'navigator/hooks/useExpanderController';
import styles from './ExpandButton.less';

const ExpandButton = ({ isDisabledAddButton }: any) => {
  const { isShowExpanderButton, isSiderToggleOn, isExpanderSwitchOn } = useExpanderController();
  const windowResize = () => {
    setTimeout(() => {
      // hotfix:首页Flow模式canvas尺寸
      window.dispatchEvent(new Event('resize'));
    }, 420);
  };
  const dispatch = useDispatch();

  const handleExpanderOpen = () => {
    dispatch({
      type: 'navigatorInformationController/changeShowAddInformation',
      payload: {
        isShowAddInformation: false,
      },
    });
    if (isDisabledAddButton) {
      dispatch({
        type: 'navigatorInformationController/saveHistoryContent',
        payload: {
          isShowHistoryExpander: false,
        },
      });
    }
  };

  return (
    <>
      <div
        className={classnames(styles.icon, {
          [styles.hidden]: !isShowExpanderButton || !isExpanderSwitchOn,
        })}
        onClick={() => {
          navigator.SiderWorkSpaceController.send('turnOffExpander');
          windowResize();
        }}
      >
        <Icon type="right" />
      </div>
      <div
        className={classnames(styles.icon, {
          [styles.hidden]: !isShowExpanderButton || isExpanderSwitchOn,
          forIntegrationGuideOnlyTwo: true,
        })}
        onClick={() => {
          navigator.SiderWorkSpaceController.send('turnOnExpander');
          windowResize();
          handleExpanderOpen();
        }}
      >
        <Icon type="left" />
      </div>
      <div
        className={classnames(styles.icon, {
          [styles.hidden]: isSiderToggleOn,
        })}
        onClick={() => {
          navigator.SiderWorkSpaceController.send('turnOnSider');
          windowResize();
        }}
      >
        <Icon type="double-left" />
      </div>
      <div
        className={classnames(styles.icon, {
          [styles.hidden]: !isSiderToggleOn,
        })}
        onClick={() => {
          navigator.SiderWorkSpaceController.send('turnOffSider');
          windowResize();
          dispatch({
            type: 'contactsAssigneeList/closeAssigneeListReducers',
          });
        }}
      >
        <Icon type="double-right" />
      </div>
    </>
  );
};

export default connect(({ navigatorInformationController }: any) => ({
  isDisabledAddButton: navigatorInformationController.isDisabledAddButton,
}))(ExpandButton);
