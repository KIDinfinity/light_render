import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import TaskFlowPieViewListItem from './TaskFlowPieViewListItem';

const totle = 1000; // x坐标轴总长度
const offsetY = 0.1; // 饼图偏离点的距离
const pieWidth = 0.3; // 饼图的高度

@connect(({ process, homeTaskFlow }) => ({
  activitieList: process.activities?.list || [],
  flowItemTooltip: homeTaskFlow?.flowItemTooltip || {},
}))
class TaskFlowPieViewList extends Component {
  render() {
    const { activitieList, folder, flowItemTooltip } = this.props;
    const unionActivities = [...activitieList];

    const totlePoint = activitieList.length + 2;
    const pointNumber = totlePoint - 1; // 线上点的数量-1
    const tickLength = 1000 / pointNumber; // x轴单个刻度的长度
    return lodash.map(unionActivities, (item, index) => {
      const start = {
        x: (tickLength / totle) * (index + 1) - 0.05,
        y: pieWidth + offsetY / 2 + (index % 2 === 0 ? 0 : -offsetY * 2),
      };
      const end = {
        x: (tickLength / totle) * (index + 1) + 0.05,
        y: pieWidth * 2 + offsetY / 2 + (index % 2 === 0 ? 0 : -offsetY * 2),
      };

      return (
        <TaskFlowPieViewListItem
          key={`${item.processActivityKey + index}`}
          start={start}
          end={end}
          index={index}
          count={item?.variables?.total || 0}
          item={item}
          folder={folder}
          tooltip={String(index) === flowItemTooltip?.index ? flowItemTooltip : {}}
        />
      );
    });
  }
}

export default TaskFlowPieViewList;
