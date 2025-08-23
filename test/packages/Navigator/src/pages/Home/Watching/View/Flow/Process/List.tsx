/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Hotkey } from '@/components/Hotkey/home';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Warning from 'navigator/assets/warning.svg';
import LegendList from './LegendList';
import styles from './List.less';
import classnames from 'classnames';
import { px2rem } from '@/utils/responsiveUtils';

interface IComponentProps {
  dispatch?: any;
}

@connect(({ homeTaskFlow, user, homeTaskFlowFilter }: any) => ({
  flowData: homeTaskFlow.flowData,
  params: homeTaskFlow.params,
  currentCaseCategory: homeTaskFlow.currentCaseCategory,
  currentUser: user.currentUser,
  organizationMemberList: homeTaskFlowFilter.organizationMemberList,
  currentAssignee: homeTaskFlowFilter.currentAssignee,
  filters: homeTaskFlowFilter.filters,
}))
class List extends Component<IComponentProps> {
  abortController = new AbortController();

  /**
   * 键盘事件(TODO:应该把键盘事件和click事件合并起来，大部分代码都一样)
   * isNext(true:下一项;false:上一项)
   */
  hotKeyChange = (isNext) => {
    const { flowData, currentCaseCategory } = this.props;
    let selectedIndex = flowData.findIndex(
      (flow) => flow.caseCategoryName === currentCaseCategory?.caseCategoryName
    );
    if (selectedIndex === -1) return;
    if (isNext) {
      selectedIndex = selectedIndex + 1 >= flowData.length ? 0 : selectedIndex + 1;
    } else {
      selectedIndex = selectedIndex - 1 < 0 ? flowData.length : selectedIndex - 1;
    }

    setTimeout(() => {
      this.updateCurrentCaseCategory(flowData[selectedIndex].caseCategory);
      this.updateActivities(flowData[selectedIndex]);
    }, 0);
  };

  showDetailWarning = () => {
    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch({
        type: 'homeTaskFlow/showFlowDetail',
      });
    }, 0);
  };

  hideDetailWarning = () => {
    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch({
        type: 'homeTaskFlow/closeFlowDetail',
      });
    }, 0);
  };

  getWarningData = (data: any) => {
    const { dispatch, params } = this.props;
    const assignees = lodash.get(params, 'assignees');
    setTimeout(() => {
      const param = {
        assignees,
        caseCategory: data.caseCategory,
        processDefId: data.processDefId,
      };
      dispatch({
        type: 'flowDetailError/getErrorTasks',
        payload: {
          ...param,
        },
      });
      dispatch({
        type: 'overdueList/getOverdueList',
        payload: {
          ...param,
          taskNum: window.innerHeight > 700 ? 3 : 2,
        },
      });
    }, 0);
  };

  updateActivities = (data: any) => {
    // 点击切换的时候只是触发事件，并不会卸载组件，需手动abort，然后重新赋值
    this.abortController.abort();
    this.abortController = new AbortController();
    const { dispatch, currentUser, currentAssignee, organizationMemberList, filters } = this.props;
    const { caseCategory, processDefId } = data;
    dispatch({
      type: 'process/activities',
      payload: {
        assignee: currentAssignee || currentUser.userId,
        caseCategory,
        organizationMemberList: filters.assignee === 'all' ? organizationMemberList : [],
        processDefId,
      },
      signal: this.abortController.signal,
    });
  };

  updateCurrentCaseCategory = (caseCategory: any) => {
    const { flowData, dispatch } = this.props;
    dispatch({
      type: 'homeTaskFlow/saveCurrentCaseCategory',
      payload: {
        currentCaseCategory:
          flowData.filter((item: any) => item.caseCategory === caseCategory)[0] || {},
      },
    });
  };

  updateColor = (flowDataList) => {
    return flowDataList.map((flowData) => {
      const gradientColor = [['rgba(0,0,0,0)', '0%']];
      let gradientPos = 0;
      flowData.activityColorList.map(({ color }) => {
        const percent = Math.round(100 / flowData.activityColorList.length);
        let gap = 10;
        if (percent < 30) {
          Math.floor((gap = percent / 3));
        }
        let palette;
        switch (color.toLowerCase()) {
          case 'green':
            palette = ['#73C08A', '#9DD99B', '#B3DFA2'];
            break;
          case 'amber':
            palette = ['#FEAF50', '#FFC04F', '#FEDD50'];
            break;
          case 'red':
            palette = ['#E46A7F', '#E26479', '#D05864'];
            break;
          default:
            palette = ['#585D62', '#888D92', '#585D62'];
        }
        gradientColor.push([palette[0], gradientPos + 1 + '%']);
        gradientColor.push([palette[1], gradientPos + percent - gap + '%']);
        gradientColor.push([palette[2], Math.min(gradientPos + percent - 1, 99) + '%']);
        gradientColor.push([palette[1], gradientPos + gap + '%']);
        gradientColor.push(['rgba(0,0,0,0)', Math.min(gradientPos + percent, 100) + '%']);
        gradientPos += percent;
      });
      return { ...flowData, gradientColor };
    });
  };

  onCircleClicked = (circle, showWarning: boolean) => {
    this.updateCurrentCaseCategory(circle.caseCategory);
    this.updateActivities(circle);
    if (showWarning) {
      this.getWarningData(circle);
      this.showDetailWarning();
    } else {
      this.hideDetailWarning();
    }
  };

  render() {
    const { currentCaseCategory, flowData } = this.props;

    const list = [
      {
        color: '#7bcc92',
        name: formatMessageApi({ Label_BIZ_Claim: 'app.navigator.index.mode.flow.on-track' }),
      },
      {
        color: '#ffd44f',
        name: formatMessageApi({ Label_BIZ_Claim: 'app.navigator.index.mode.flow.off-speed' }),
      },
      {
        color: '#dc6374',
        name: formatMessageApi({ Label_BIZ_Claim: 'app.navigator.index.mode.flow.due-soon' }),
      },
    ];

    const finalFlowData = this.updateColor(flowData);
    const selectedIndex = flowData.findIndex(
      (flow) => flow.caseCategoryName === currentCaseCategory?.caseCategoryName
    );

    return (
      <div className={styles.flow_loop}>
        <LegendList title={currentCaseCategory.caseCategoryName} list={list} />
        <Hotkey
          id={HotkeyHomeIds.HomeWatchingFlowProcessList}
          next={() => {
            this.hotKeyChange(true);
          }}
          prev={() => {
            this.hotKeyChange(false);
          }}
        />

        {/* <div style={{ position: 'absolute', top: 245, left: 275, backgroundColor: 'red', width: 10, height: 10, borderRadius: 10, transform: 'translate(-50%, -50%)' }}/> */}
        {finalFlowData.map((circle, index) => {
          let rotate = -90 - (index - selectedIndex) * 32;
          const isSelected = selectedIndex === index;
          const width = isSelected ? px2rem(110) : px2rem(100);
          const height = width;
          let delta = Math.abs(index - selectedIndex);
          if (finalFlowData.length > 9) {
            const inPositiveOrder = index > selectedIndex;
            let alterDelta = finalFlowData.length - delta;
            if (alterDelta < delta) {
              delta = alterDelta;
              if (inPositiveOrder) {
                alterDelta = -alterDelta;
              }
              rotate = -90 - alterDelta * 32;
            }
          }
          let opacity = 0,
            visibility = 'visible';

          if (delta < 3) opacity = 1;
          else if (delta === 3) opacity = 0.5;
          else visibility = 'hidden';

          return (
            <div
              className={styles.selfRotateBall}
              style={{ rotate: rotate + 'deg', height, width, opacity, visibility }}
              key={circle.caseCategoryName}
              onClick={() => {
                if (delta > 3) return;
                this.onCircleClicked(circle, false);
              }}
            >
              <div
                className={classnames(styles.ballInnerContainer, styles.center)}
                style={{ rotate: -rotate + 'deg' }}
              >
                <div
                  className={classnames(styles.flowIndicateCircle, styles.center)}
                  style={{
                    background: `conic-gradient(${circle.gradientColor
                      .map(([color, percent]) => color + ' ' + percent)
                      .join(', ')})`,
                  }}
                >
                  <div className={styles.centerCircle} />
                </div>
                <div className={styles.textBox} style={{ width: isSelected ? 0 : '60%' }}>
                  {circle.caseCategoryName}
                </div>
                {circle.warning && (
                  <img
                    src={Warning}
                    alt="urgent"
                    className={styles.warning}
                    style={
                      selectedIndex === index ? { bottom: 'calc(50% - 8px)' } : { bottom: '23%' }
                    }
                    onClick={(e) => {
                      if (delta > 3) return;
                      e.stopPropagation();
                      this.onCircleClicked(circle, true);
                    }}
                  />
                )}
              </div>
              <div
                className={styles.shade}
                style={selectedIndex === index ? { backgroundColor: 'rgba(0,0,0,0)' } : void 0}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default List;
