import React, { Component } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import TaskStatus from 'claim/enum/TaskStatus';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import type { Mode } from './Mode';
import ModeButtonList from './ModeButtonList';
import ModeEnterButton from './ModeEnterButton';
import modeButtonService, { Active } from '../../_models/machines/modeButtonService';
import { TaskFilterEnum } from '../../Enum';
import styles from './index.less';

interface IComponentProps {
  dispatch?: any;
  enterActive?: any;
  params?: any;
  mode?: any;
  filter?: any;
  currentCaseCategory?: any;
  permissionMenus: string[];
  isExpander?: boolean;
  userId: string;
}

interface IExtraParams {
  caseCategory?: any;
  assignee?: any;
  taskStatus?: any;
}

class ModePanel extends Component<IComponentProps> {
  timeout: any;

  state = {
    showMode: false,
  };

  toggleEnter = (flag: boolean) => {
    clearTimeout(this.timeout);
    if (flag && !this.state.showMode) {
      this.timeout = setTimeout(() => {
        this.changeMode(flag);
      }, 500);
    } else if (!flag && this.state.showMode) {
      this.changeMode(flag);
    }
  };

  changeMode = (flag: boolean) => {
    const { dispatch } = this.props;
    this.setState({
      showMode: flag,
    });
    dispatch({
      type: 'navigatorHomeWatching/saveModeEnter',
      payload: {
        enterActive: flag ? Active.Active : Active.InActive,
      },
    });
  };

  toggleMode = async (mode: Mode) => {
    const { dispatch } = this.props;

    await dispatch({
      type: 'workspaceSwitchOn/clearShow',
    });
    await dispatch({
      type: 'navigatorHomeWatching/toggleModeButton',
      payload: {
        mode,
      },
    });
  };

  open = () => {
    const { dispatch, params, filter, currentCaseCategory = {}, mode, userId } = this.props;

    // 初始化用户操作状态
    dispatch({
      type: 'advancedQueryController/initStateOfSearch',
    });
    dispatch({
      type: 'navigatorHomeWatching/saveModeEnter',
      payload: {
        enterActive: 'inactive',
      },
    });
    modeButtonService.send('TOGGLE');
    const extraParams: IExtraParams = {};
    if (mode === 'flow') {
      extraParams.caseCategory = currentCaseCategory.caseCategory;
    } else if (filter === TaskFilterEnum.Unassigned) {
      extraParams.assignee = [TaskFilterEnum.Unassigned];
      extraParams.taskStatus = [TaskStatus.Todo];
    } else {
      extraParams.assignee = [userId];
      if (filter === TaskFilterEnum.Favorite) {
        extraParams.taskStatus = [];
      } else {
        extraParams.taskStatus = filter;
      }
    }

    this.props.dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex: '2',
        stateOfSearch: {
          params: {
            ...params,
            assignee: params.assignees,
            ...extraParams,
          },
        },
      },
    });
  };

  render() {
    const { mode, enterActive, isExpander } = this.props;
    return (
      <div
        className={classNames(styles.wrapper, {
          [styles.wrapperExpand]: isExpander,
          [styles.showAnimation]: this.state.showMode,
        })}
        onMouseEnter={this.toggleEnter.bind(this, true)}
        onMouseLeave={this.toggleEnter.bind(this, false)}
      >
        <ModeButtonList
          enterActive={enterActive}
          toggleMode={this.toggleMode}
          openAdvancedQuery={this.open}
        />
        <ModeEnterButton mode={mode} toggleEnter={this.toggleEnter} />
      </div>
    );
  }
}

export default connect(
  ({ navigatorHomeWatching, homeTaskFlow, homeList, authController, user }: any) => ({
    enterActive: navigatorHomeWatching.enterActive,
    mode: navigatorHomeWatching.mode,
    params: homeTaskFlow.params,
    filter: homeList.filter,
    currentCaseCategory: homeTaskFlow.currentCaseCategory,
    permissionMenus: authController.permissionMenus || [],
    userId: user.currentUser?.userId,
  })
)(SwitchDrawerModeHoc(ModePanel));
