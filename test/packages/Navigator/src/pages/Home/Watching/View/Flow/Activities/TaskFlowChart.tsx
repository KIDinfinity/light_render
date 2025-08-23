/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Chart } from 'bizcharts';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TaskFlowLineGeom from './TaskFlowLineGeom';
import TaskFlowPointsGeom from './TaskFlowPointsGeom';
import TaskFlowPieViewList from './TaskFlowPieViewList';
import { getResponsivePx } from '@/utils/responsiveUtils';

const total = 1000; // x坐标轴总长度

@connect(({ workspaceUser, process, task, homeTaskFlow, loading, homeTaskFlowFilter }: any) => ({
  params: homeTaskFlow.params,
  workspaceUser,
  activitieList: process.activities?.list || [],
  task,
  loading,
  assigneeList: homeTaskFlowFilter.assigneeList,
  currentAssignee: homeTaskFlowFilter.currentAssignee,
  pieViewList: process?.pieViewList || [],
}))
class TaskFlowChart extends Component<any> {
  timeTicker = false;

  state = {
    height: getResponsivePx(400),
  };

  setHeight = () => {
    this.setState({
      height: getResponsivePx(400),
    });
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.setHeight);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setHeight);
  };

  prepareLineData = (activities: any) => {
    const totalPoint = activities?.length + 2;
    const pointNumber = totalPoint - 1; // 线上点的数量-1
    const tickLength = total / pointNumber; // x轴单个刻度的长度
    let pointY = 80;
    let pointFY = 73;
    const fArray = [1, 2, 3];
    const lineData = [];
    let pointTemp = {};

    for (let i = 0; i <= pointNumber; i += 1) {
      if (i === 0) {
        lineData.push({
          x: 0,
          y: 40,
        });
        if (pointNumber > 3) {
          lineData.push({
            x: 45,
            y: 47,
          });
        }
      }
      if (i === pointNumber) {
        if (i % 2 === 0) {
          if (pointNumber > 3) {
            lineData.push({
              x: 955,
              y: 47,
            });
          }
          lineData.push({
            x: 1000,
            y: 40,
          });
        }
        if (i % 2 === 1) {
          if (pointNumber > 3) {
            lineData.push({
              x: 955,
              y: 73,
            });
          }
          lineData.push({
            x: 1000,
            y: 80,
          });
        }
      }
      if (i > 0 && i < pointNumber) {
        if (i % 2 === 0) {
          pointY = 40;
          pointFY = 47;
        } else {
          pointY = 80;
          pointFY = 73;
        }
        if (pointNumber > 3) {
          for (let j = 0; j < fArray.length; j += 1) {
            pointTemp = {
              name:
                j === 1
                  ? formatMessageApi({ activity: activities[i - 1]?.processActivityKey }) ||
                    activities[i - 1]?.processActivityName
                  : '',
              x: tickLength * i + (j - 1) * (35 + (10 - pointNumber) * 5),
              y: j === 1 ? pointY : pointFY,
            };
            lineData.push(pointTemp);
          }
        } else {
          pointTemp = {
            name:
              formatMessageApi({ activity: activities[i - 1]?.processActivityKey }) ||
              activities[i - 1]?.processActivityName,
            x: tickLength * i,
            y: pointY,
          };
          lineData.push(pointTemp);
        }
      }
    }
    return lineData;
  };

  goToFlowDetail = (e: any) => {
    const { dispatch, activitieList, params }: any = this.props;
    const index = e?.view?._attrs?._id; // get 'viewX'
    const id = parseInt(index.slice(4), 10); // remove 'view' to get 'X'
    const requestParamsData = activitieList[id];
    const assignees = lodash.get(params, 'assignees');
    const flowModeTaskParam = {
      assignees,
      caseCategory: requestParamsData?.caseCategory,
      processDefId: requestParamsData?.processDefId,
      processActivityKey: requestParamsData?.processActivityKey,
    };
    setTimeout(() => {
      // Prevents asynchronous state changes from causing errors
      dispatch({
        type: 'homeTaskFlow/showFlowDetail',
      });
      dispatch({
        type: 'flowDetailError/getErrorTasks',
        payload: flowModeTaskParam,
      });
      dispatch({
        type: 'overdueList/getOverdueList',
        payload: {
          ...flowModeTaskParam,
          taskNum: window.innerHeight > 700 ? 3 : 2,
        },
      });
    }, 0);
  };

  changeTooltipEnter = (e: any) => {
    const { dispatch, pieViewList }: any = this.props;
    const id = e?.target?._id;
    const index = id.substring(4, id.indexOf('-'));
    const de = e?.data?.color;
    const key = e?.data?._origin?.key;
    if (key === 'foo') return;
    const value = (pieViewList[index] && pieViewList[index][de]) || 0;
    this.timeTicker = true;

    dispatch({
      type: 'homeTaskFlow/changeFlowItemTooltip',
      payload: {
        index,
        value,
        key,
      },
    });
  };

  changeTooltipLeave = (e: { target: { name: string } }) => {
    if (this.timeTicker && e?.target?.name !== 'interval') {
      const { dispatch } = this.props;
      dispatch({
        type: 'homeTaskFlow/changeFlowItemTooltip',
        payload: {},
      });
      this.timeTicker = false;
    }
  };

  render() {
    const { height } = this.state;
    const { activitieList } = this.props;
    const data = this.prepareLineData(activitieList);

    return (
      <div id="HomeWatchingFlowActivityList" style={{ height: 'inherit' }}>
        <Chart
          onIntervalMouseenter={(e: any) => {
            this.changeTooltipEnter(e);
          }}
          onGuideImageClick={(e: any) => {
            this.goToFlowDetail(e);
          }}
          onPlotMove={(e: any) => {
            this.changeTooltipLeave(e);
          }}
          height={height}
          padding={0}
          data={data}
          scale={{
            x: {
              type: 'linear',
            },
            y: {
              type: 'linear',
              ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            },
          }}
          forceFit
        >
          {activitieList.length > 0 && <TaskFlowLineGeom />}
          {activitieList.length > 0 && <TaskFlowPointsGeom />}
          <TaskFlowPieViewList />
        </Chart>
      </div>
    );
  }
}

export default TaskFlowChart;
