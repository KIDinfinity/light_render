// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'dva';
import { View, Geom, Axis, Coord, Guide, Shape, Legend } from 'bizcharts';
import DataSet from '@antv/data-set/lib';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import flowError from 'navigator/assets/flow-mode-error.svg';
import { LS, LSKey } from '@/utils/cache';

Shape.registerShape('interval', 'burstPie', {
  getPoints(cfg) {
    const width = cfg.size;
    const { x } = cfg;
    const min = cfg.y[0];
    const max = cfg.y[1];
    const res = [];

    let startb = 0;
    let endb = 0;

    for (let i = 0; i < max; i += 0.1) {
      if (min <= i) {
        if (min < i && min > i - 0.1) {
          res.push(
            {
              x: x - width / 2,
              y: min,
            },
            {
              x: x - width / 2,
              y: i - 0.01,
            },
            {
              x: x + width / 2,
              y: i - 0.01,
            },
            {
              x: x + width / 2,
              y: min,
            }
          );
        }
        startb = i;
        endb = parseFloat(i + 0.1 > max ? max : i + 0.09);
        res.push(
          {
            x: x - width / 2,
            y: startb,
          },
          {
            x: x - width / 2,
            y: endb,
          },
          {
            x: x + width / 2,
            y: endb,
          },
          {
            x: x + width / 2,
            y: startb,
          }
        );
      }
    }

    return res;
  },

  draw(cfg, container) {
    // 将归一化后的数据转换为画布上的坐标
    const { points } = cfg.origin;
    let path = [];

    for (let i = 0; i < cfg.origin.points.length; i += 4) {
      path.push(['M', points[i].x, points[i].y]);
      path.push(['L', points[i + 1].x, points[i + 1].y]);
      path.push(['L', points[i + 2].x, points[i + 2].y]);
      path.push(['L', points[i + 3].x, points[i + 3].y]);
      path.push(['L', points[i].x, points[i].y]);
      path.push(['Z']);
    }

    path = this.parsePath(path, true);
    const shape = container.addShape('path', {
      attrs: {
        fill: cfg.color || '#5c5251',
        path,
      },
    });
    return shape;
  },
});

Shape.registerShape('interval', 'burstAllPie', {
  draw(cfg, container) {
    const { points } = cfg;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this.parsePath(path);
    const shape = container.addShape('path', {
      attrs: {
        fill: '#606060',
        path,
      },
    });
    return shape;
  },
});

const { Html, Arc, Image } = Guide;

@connect(({ homeTaskFlow }) => ({
  params: homeTaskFlow.params,
  currentCaseCategory: homeTaskFlow.currentCaseCategory,
}))
class TaskFlowPieViewListItem extends Component {
  htmlWidth: null;

  widthBox: null;

  componentDidMount() {
    window.enterAdvSearch = this.enterAdvSearch.bind(this);
    const widthBox = document.createElement('div');
    widthBox.className = `widthBox${this.props.index}`;
    widthBox.style = 'display: inline-block; position: absolute; opacity: 0;';
    document.body.querySelector('#HomeWatchingFlowActivityList').appendChild(widthBox);
    this.widthBox = widthBox;
  }

  componentDidUpdate() {
    const { index } = this.props;
    const html = this.renderTextHtml(this.props);
    if (!this.htmlWidth) {
      this.htmlWidth = document.body
        .querySelector('#HomeWatchingFlowActivityList')
        .querySelectorAll('.g-guide')[index].offsetWidth;
    }
    this.widthBox.innerHTML = html.substring(1, html.length - 1);
    const getWidth = (this.htmlWidth - this.widthBox.offsetWidth) / 2;
    const renderHtml = html
      .substring(1, html.length - 1)
      .replace('color', `margin-left: ${getWidth}px; color`);
    document.querySelector('#HomeWatchingFlowActivityList').querySelectorAll('.g-guide')[
      index
    ].innerHTML = renderHtml;
  }

  componentWillUnmount() {
    document.querySelector('#HomeWatchingFlowActivityList').removeChild(this.widthBox);
  }

  enterAdvSearch = async (payload) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'advancedQueryController/enter',
      payload,
    });
    await dispatch({
      type: 'advancedQueryAllForm/saveCurrentTab',
      payload: {
        currentTab: '2',
      },
    });
  };

  renderTextHtml = (props) => {
    const { count, tooltip, params, currentCaseCategory, item } = props;
    const fontColor = LS.getItem(LSKey.THEME, false) === 'dark' ? '#ffffff' : '#000000';

    const search = JSON.stringify({
      tabIndex: '2',
      stateOfSearch: {
        params: {
          ...params,
          assignee: params.assignees,
          activityKey: item?.processActivityKey,
          caseCategory: currentCaseCategory?.caseCategory,
          taskStatus: ['todo', 'pending'],
        },
      },
    });
    const totalCaseHtml = `
      <div
        style="color: ${fontColor}; font-size: 16px; text-align: center; line-height: .3; cursor: pointer; font-weight:200;"
        onClick='window.enterAdvSearch(${search})' >
        <p style="font-size: 12px;">${
          tooltip.key ||
          formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.index.mode.flow.totalTask',
          })
        }</p>

        <p style="margin-top: 20px;">${tooltip.value || count}</p>
      </div>
      `;

    return totalCaseHtml;
  };

  render() {
    const { count, start, end, item } = this.props;
    const data = [];
    if (item?.variables?.todo) {
      data.push({
        value:
          item?.variables?.todo / count > 0.02 ? item?.variables?.todo : Math.round(count * 0.1),
        key: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.to-do',
        }),
      });
    }
    if (item?.variables?.pending) {
      data.push({
        value:
          item?.variables?.pending / count > 0.02
            ? item?.variables?.pending
            : Math.round(count * 0.1),
        key: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.pending',
        }),
      });
    }
    if (item?.variables?.unassign) {
      data.push({
        value:
          item?.variables?.unassign / count > 0.02
            ? item?.variables?.unassign
            : Math.round(count * 0.1),
        key: formatMessageApi({ Label_BIZ_Claim: 'app.navigator.index.mode.flow.unassign' }),
      });
    }
    if (data.length === 0) data.push({ value: 1, key: 'foo' });

    const dvPie = new DataSet.View().source(data);

    dvPie.transform({
      type: 'percent',
      field: 'value',
      dimension: 'key',
      as: 'percent',
    });

    return (
      <View key={`TaskFlowPieViewListItem${this.props.index}`} data={dvPie} start={start} end={end}>
        <Axis name="percent" />
        <Guide>
          <Html
            position={['50%', '50%']}
            html={this.renderTextHtml(this.props)}
            alignX="middle"
            alignY="middle"
          />
          {item?.warning ? (
            <Arc
              start={['40%', '100%']}
              end={['60%', '100%']}
              style={{
                // 底灰色
                stroke: '#bfbfbf',
                lineWidth: 1,
                opacity: 0.5,
              }}
            />
          ) : (
            ''
          )}
          {item?.warning ? (
            <Image
              src={flowError}
              start={['50%', '96%']}
              width={16}
              height={16}
              offsetX={-8}
              top="true"
            />
          ) : (
            ''
          )}
        </Guide>
        <Coord type="theta" radius={1} innerRadius={0.82} scale={[1.1, 1.1]} />
        <Legend />
        <Geom
          type="intervalStack"
          shape={count !== 0 ? 'burstPie' : 'burstAllPie'}
          position="value"
          color={[
            'key',
            (k) => {
              if (k === 'To Do' || k === 'やります') {
                return 'l (0) 0:#0fa5e6 1:#2eebe2';
              }
              if (k === 'Pending' || k === '保留中') {
                return 'l (0) 0:#eba251 1:#eba453';
              }
              return '#5c5251';
            },
          ]}
          select={false}
        />
      </View>
    );
  }
}

export default TaskFlowPieViewListItem;
