import lodash from 'lodash';
import moment from 'moment';
import G6 from '@ctc/antv-g6';
import { mat3 } from '@antv/matrix-util';
import Completed from 'bpm/assets/process-completed.svg';
import Canceled from 'bpm/assets/process-cancelled.svg';
import Error from 'bpm/assets/process-error.svg';
import Skip from 'bpm/assets/process-skip.svg';
import Pending from 'bpm/assets/process-pending.svg';
import Rejected from 'bpm/assets/process-rejected.svg';
import Withdraw from 'bpm/assets/process-withdraw.svg';
import Split from 'bpm/assets/progressbar-cross.svg';
import Sent from 'bpm/assets/sent.svg';
import subcase from 'bpm/assets/relationship/subcase.svg';
import splitCase from 'bpm/assets/relationship/splitCase.svg';
import sameClaim from 'bpm/assets/relationship/sameClaim.svg';
import triggerCase from 'bpm/assets/relationship/triggerCase.svg';
import { processRelationship } from 'bpm/enum/processRelationship';
import ProcessStatus from 'navigator/enum/ProcessStatus';
import { history } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Location = {
  Top: [0, 0.5],
  Right: [0.5, 0],
  Bottom: [1, 0.5],
  Left: [0.5, 1],
};

enum EdgeAnchor {
  Top = 1,
  Right = 2,
  Bottom = 3,
  Left = 4,
}
type FlowInitParams = {
  container: string;
  width: number;
  height: number;
};

class Flow {
  anchorPoints = [Location.Top, Location.Right, Location.Bottom, Location.Left];

  edgeAnchor = EdgeAnchor;

  colors = {
    mainProcessLine: '#4abba4',
    subProcessLine: '#474747',
    todoOutlineColor: '#fcd870',
    defaultOutlineColor: '#474747',
    activityEndPoint: '#e15c35',
    defaultEndPoint: '#474847',
    containerBackground: '#222',
    disabled: '#828282',
    textColor: '#fff',
  };

  constructor(theme?: string) {
    if (theme === 'dark') {
      this.colors.textColor = '#fff';
    } else {
      this.colors.textColor = '#000';
    }
    this.registerMaterial({
      width: 34,
      height: 34,
    });
    this.registerEdges();
  }

  init = ({ container, width, height }: FlowInitParams) => {
    this.Grapth = new G6.Graph({
      container,
      width,
      height,
      defaultNode: {
        type: 'unkown',
      },
    });
    this.Grapth.on('click', (ev) => {
      const { id, currentShape } = lodash.pick(ev?.item?._cfg, ['currentShape', 'id']);
      if (currentShape === 'CaseCategoryModel' && id) {
        history.push(`/navigator/case/detail/${id}`);
      }
    });
    return this.Grapth;
  };

  mainProcessId = '';

  linkNodes = {};

  setLinkNode = ({ key, value }) => {
    if (!key || !value) {
      return false;
    }
    this.linkNodes[key] = value;
  };

  getLinkNode = ({ key }) => {
    return this.linkNodes[key];
  };

  setMainProcessId = (id) => {
    this.mainProcessId = id;
  };

  getScale = ({ currentId }) => {
    return currentId === this.mainProcessId ? 1 : 0.85;
  };

  icons = [
    {
      icon: Completed,
      name: 'completed',
    },
    {
      icon: Canceled,
      name: 'canceled',
    },
    {
      icon: Error,
      name: 'error',
    },
    {
      icon: Skip,
      name: 'skip',
    },
    {
      icon: Pending,
      name: 'pending',
    },
    {
      icon: Withdraw,
      name: 'withdraw',
    },
    {
      icon: Split,
      name: 'split',
    },
    {
      icon: Sent,
      name: 'sent',
    },
    {
      icon: Rejected,
      name: 'rejected',
    },
  ];

  calculateTextWidth = ({ text, fontSize = 12 }) => {
    const defaultFontSize = 12;
    const defaultStringWidth = 3.34;
    // 粗糙一点将字符分为小写字母 大写字母和其他来计算字符宽度
    const widthMap = [
      {
        reg: /^[a-z]/gi,
        width: 6.78,
      },
      {
        reg: /^[A-Z]/gi,
        width: 8.33,
      },
    ];
    const totalWidth = lodash
      .chain(text)
      .split('')
      .map(
        (item) =>
          lodash
            .chain(widthMap)
            .find((mapItem) => mapItem.reg.test(item))
            .get('width')
            .value() || defaultStringWidth
      )
      .reduce((a, b) => a + b)
      .value();
    const width = (totalWidth * defaultFontSize) / fontSize;
    return width;
  };

  findSartLinkId = ({ parentProcess, mainProcess }) => {
    const mainStartProcessLinkId = lodash
      .chain(parentProcess)
      .get('activities')
      .find((item) => {
        return item.taskDefKey === mainProcess?.startLinkActivity;
      })
      .get('taskId')
      .value();
    return mainStartProcessLinkId;
  };

  findEndLinkId = ({ parentProcess, mainProcess }) => {
    const mainEndProcessLinkId = lodash
      .chain(parentProcess)
      .get('activities')
      .find((item) => {
        return item.taskDefKey === mainProcess?.endLinkActivity;
      })
      .get('taskId')
      .value();
    return mainEndProcessLinkId;
  };

  data = (data) => {
    const result = {
      ...data,
      nodes:
        lodash.map(data?.nodes, (item) => ({
          ...item,
          anchorPoints: this.anchorPoints,
        })) || [],
    };
    this.Grapth.data(result);
  };

  lineOffset = {
    y: 60,
  };

  formatProcess = ({ process, startLocation, spacing }) => {
    const { getScale, getLinkNode, setLinkNode } = this;
    const { mainProcess, subProcess, currentProcess } = lodash.pick(process, [
      'mainProcess',
      'subProcess',
      'currentProcess',
    ]);
    this.setMainProcessId(currentProcess?.processInstanceId);
    const hasEndLinkIdProcess = lodash
      .chain(subProcess)
      .filter((item) => !!item.endLinkTaskId)
      .value();

    const subProcessIds = lodash.map(subProcess, (item) => {
      return {
        start: item.processInstanceId,
        end: `${item.processInstanceId}_end`,
        level: item.level,
      };
    });

    const subProcessEndPointIds = lodash.map(subProcessIds, (item) => item.end);
    const main = {
      ...mainProcess,
      activities: lodash.map(mainProcess?.activities, (item) => {
        const linkSubProcess = lodash
          .chain(subProcess)
          .find((sub) => sub.startLinkTaskId === item.taskId || sub.endLinkTaskId === item.taskId)
          .value();
        return {
          ...item,
          hasSubCase: !!linkSubProcess,
        };
      }),
    };
    const mainProcessScale = getScale({
      currentId: mainProcess.processInstanceId,
    });
    const { nodesSet: mainNodes, edgesSet: mainEdges } = this.generateFlow({
      processData: main,
      spacing: spacing.mainProcess,
      startLocation,
      lineColor: this.colors.mainProcessLine,
      scale: getScale({
        currentId: mainProcess.processInstanceId,
      }),
    });

    let allNodes = [...mainNodes];
    let allEdges = [...mainEdges];
    const filterSubProcess = lodash
      .chain(subProcess)
      .map((item) => {
        const startLinkOrder = lodash
          .chain(mainProcess)
          .get('activities')
          .find((activity) => {
            return activity.taskId === item.startLinkTaskId;
          })
          .get('activityOrder')
          .value();
        const activitiesLength = item?.activities?.length;
        const hasEndLink = item?.endLinkActivity ? 1 : 0;
        const orderModifiedTime = lodash.head(
          lodash.orderBy(item?.activities, 'activityOrder')
        )?.modifiedTime;
        return {
          ...item,
          startLinkOrder,
          activitiesLength,
          hasEndLink,
          orderModifiedTime,
          activities: lodash.map(item?.activities, (grand) => {
            const linkSubProcess = lodash
              .chain(subProcess)
              .find(
                (sub) => sub.startLinkTaskId === grand.taskId || sub.endLinkTaskId === grand.taskId
              )
              .value();
            return {
              ...grand,
              hasSubCase: !!linkSubProcess,
            };
          }),
        };
      })
      .orderBy(
        ['level', 'startLinkOrder', 'activitiesLength', 'hasEndLink', 'orderModifiedTime'],
        ['asc', 'desc', 'asc', 'asc', 'desc']
      )
      .value();
    let currentProcessNodes = [];
    let differentRelationship = false;

    lodash
      .chain(filterSubProcess)
      .forEach((current, index) => {
        const processScale = getScale({ currentId: current.processInstanceId });
        let processParent = mainProcess;
        let processParentNodes = [...mainNodes];
        if (current.level === 2) {
          processParent = mainProcess;
          processParentNodes = [...mainNodes];
        }
        if (current.level === 3) {
          processParent = currentProcess;
          processParentNodes = currentProcessNodes;
        }
        const endId = `${processParent?.processInstanceId}_end`;
        const mainProcessEndNode = lodash.find(
          [...processParentNodes],
          (item) => item.id === endId
        );
        let linkStartNode = lodash.find(
          [...processParentNodes],
          (item) => item.id === current.startLinkTaskId
        );
        let offsetLeft =
          current.level === 2 ? 17 * mainProcessScale : 17 - 17 * (mainProcessScale - processScale);
        let hasStartLinkActivity = true;
        if (!linkStartNode) {
          linkStartNode = mainProcessEndNode;
          offsetLeft = 0;
          hasStartLinkActivity = false;
        }
        const linkSameActivitySubProcess = lodash
          .chain(filterSubProcess)
          .filter((item) => item.startLinkTaskId === current.startLinkTaskId)
          .value();
        let targetNode = linkStartNode;
        const cachePreLinkNode = getLinkNode({ key: current.startLinkTaskId });
        if (!cachePreLinkNode) {
          differentRelationship = true;
        } else {
          differentRelationship = false;
        }
        const preLinkNode = cachePreLinkNode || targetNode;
        // caseCategoryModel 长度150 缩放 0.85 main process 宽度 34 算出居中位置
        const left =
          current.level === 3
            ? (150 * processScale - (34 * processScale) / mainProcessScale) / 2
            : (150 * processScale - 34 * mainProcessScale) / 2;
        if (
          index === 0 ||
          current.startLinkTaskId !== lodash.get(subProcess, [`[${index - 1}].startLinkTaskId`])
        ) {
          if (index !== 0) {
            const currentLinkSameActivityIndex = lodash.findIndex(
              linkSameActivitySubProcess,
              (item) => item.processInstanceId === current.processInstanceId
            );
            const preLinkProcess = linkSameActivitySubProcess[currentLinkSameActivityIndex - 1];
            if (preLinkProcess && preLinkProcess.relationship !== current.relationship) {
              differentRelationship = true;
              targetNode = lodash.find([...allNodes], (item) => {
                return item.id === preLinkProcess.processInstanceId;
              });
            }
          }
        }
        if (differentRelationship) {
          allNodes.push({
            id: `${current.processInstanceId}_relationship`,
            type: current.relationship,
            x: linkStartNode.x + offsetLeft,
            y: preLinkNode.y + 150,
            scale: 1,
          });

          allEdges = [
            ...allEdges,
            {
              source: preLinkNode.id,
              target: `${current.processInstanceId}_relationship`,
              type: 'linkToSubProcess',
              offset:
                targetNode.id === linkStartNode.id && linkStartNode.id !== endId
                  ? this.lineOffset
                  : {
                      y: 0,
                    },
              sourceAnchor: this.edgeAnchor.Bottom,
              targetAnchor: this.edgeAnchor.Top,
            },
            {
              source: `${current.processInstanceId}_relationship`,
              target: current.processInstanceId,
              type: 'linkToSubProcess',
              sourceAnchor: this.edgeAnchor.Bottom,
              targetAnchor: this.edgeAnchor.Top,
            },
          ];
        } else {
          allEdges = [
            ...allEdges,
            {
              source: preLinkNode.id,
              target: `${current.processInstanceId}`,
              type: 'linkToSubProcess',
            },
          ];
        }
        const subProcessOffsetY = index === 0 ? 250 : 250 + 200 * index;
        const { nodesSet: subNodes, edgesSet: subEdges } = this.generateFlow({
          processData: current,
          spacing: spacing.subProcess,
          startLocation: {
            x:
              (linkStartNode.x || startLocation.x) -
              left -
              (hasStartLinkActivity ? 0 : (17 * mainProcessScale) / processScale),
            y: startLocation.y + subProcessOffsetY,
          },
          scale: processScale,
          lineColor: this.colors.subProcessLine,
        });
        if (current.level === 2) {
          currentProcessNodes = [...subNodes];
        }
        allNodes = [...allNodes, ...subNodes];
        allEdges = [...allEdges, ...subEdges];
        const caseCategoryNode = lodash
          .chain([...allNodes])
          .find((node) => node.id === current.processInstanceId)
          .value();

        setLinkNode({ key: current.startLinkTaskId, value: caseCategoryNode });
      })
      .value();

    lodash
      .chain([...allNodes])
      .filter((item) => subProcessEndPointIds.includes(item.id))
      .sortBy(['x'], ['asc'])
      .forEach((item) => {
        const currProcess = lodash
          .chain(hasEndLinkIdProcess)
          .find((processItem) => `${processItem.processInstanceId}_end` === item.id)
          .value();
        const linkId = lodash.get(currProcess, 'endLinkTaskId');
        const currentLevel = lodash.get(currProcess, 'level');
        const sameLevelEndPointId = lodash
          .chain(subProcessIds)
          .filter((currentEndPoint) => currentEndPoint.level === currentLevel)
          .map((currentEndPoint) => currentEndPoint.end)
          .value();
        const farthestEndPointNode = lodash
          .chain([...allNodes])
          .filter((node) => sameLevelEndPointId.includes(node.id))
          // 只过滤位于当前流程上方的点取最大值
          .filter((node) => node.y <= item.y)
          .filter((node) => {
            const startId = lodash
              .chain(subProcessIds)
              .find((sub) => sub.end === node.id)
              .get('start')
              .value();
            const startNode = lodash.find([...allNodes], (nodeItem) => nodeItem.id === startId);

            if (item?.x < startNode?.x) {
              return false;
            }
            return true;
          })
          .map((node) => node.x)
          .max()
          .value();
        const targetNode = lodash
          .chain([...allNodes])
          .find((node) => node.id === linkId)
          .value();
        const max = lodash.max([farthestEndPointNode, targetNode?.x]);

        const firstPointOffsetY = farthestEndPointNode < targetNode?.x ? 0 : 17;

        const currentEndPointNodeX =
          lodash
            .chain([...allNodes])
            .find((item) => item.id === linkId)
            .get('x')
            .value() || 0;

        const isFarthestEndPointSmallerThenTargetNode = currentEndPointNodeX < farthestEndPointNode;

        allEdges = [
          ...allEdges,
          {
            source: item.id,
            target: linkId,
            type: 'endPointLink',
            pointFirst: {
              y: item.y + firstPointOffsetY,
              x: max,
            },
            pointSecond: {
              x: max,
              y: (targetNode?.y || 0) + 120,
            },
            pointThird: {
              x: targetNode?.x + 17,
              y: (targetNode?.y || 0) + 120,
            },
            offset: this.lineOffset,
            // sourceAnchor: item.x > targetNode?.x ? this.edgeAnchor.Top : this.edgeAnchor.Right,
            sourceAnchor: isFarthestEndPointSmallerThenTargetNode
              ? this.edgeAnchor.Right
              : this.edgeAnchor.Top,
            targetAnchor: this.edgeAnchor.Bottom,
          },
        ];
      })
      .value();
    const width =
      lodash
        .chain([...allNodes])
        .map((item) => item.x)
        .max()
        .value() + 100;
    const height =
      lodash
        .chain([...allNodes])
        .map((item) => item.y)
        .max()
        .value() + 100;
    return {
      nodes: allNodes,
      edges: allEdges,
      width,
      height,
    };
  };

  generateFlow = ({ processData, startLocation, spacing, scale = 1, lineColor }) => {
    // 当以下状态时 后面的节点连接线为虚线
    const linkToNextDottedStatus = [
      ProcessStatus.pending,
      ProcessStatus.inprogress,
      ProcessStatus.cancelled,
      ProcessStatus.error,
      ProcessStatus.withdraw,
      ProcessStatus.rejected,
    ];
    const nodesSet = new Set([]);
    const edgesSet = new Set([]);
    const { activities, processInstanceId, caseCategory, endLinkTaskId } = lodash.pick(
      processData,
      ['activities', 'processInstanceId', 'caseCategory', 'endLinkTaskId']
    );
    const startPoint = {
      id: processInstanceId,
      type: 'CaseCategoryModel',
      x: startLocation.x,
      y: startLocation.y - 3,
      caseCategory: formatMessageApi({
        Label_BPM_CaseCategory: caseCategory,
      }),
      processInstanceId,
      scale,
    };
    nodesSet.add(startPoint);
    let lastLocation = startLocation;
    lodash
      .chain(activities)
      .orderBy(['activityOrder'], ['asc'])
      .forEach((item, index) => {
        const { taskDefKey, modifiedTime, assignee, hasSubCase, activityOrder } = lodash.pick(
          item,
          ['taskDefKey', 'modifiedTime', 'assignee', 'hasSubCase', 'activityOrder']
        );
        let edgeType = 'default';
        if (index === 0) {
          edgesSet.add({
            source: startPoint.id,
            target: item.taskId,
            type: 'default',
            lineColor,
            sourceAnchor: this.edgeAnchor.Right,
            targetAnchor: this.edgeAnchor.Left,
          });
        } else {
          const holdActivityOrder = lodash
            .chain(activities)
            .find((activity) => linkToNextDottedStatus.includes(activity.status))
            .get('activityOrder')
            .value();
          const preActivity = lodash
            .chain(activities)
            .find((activity) => activity.activityOrder === activityOrder - 1)
            .value();
          if (lodash.get(preActivity, `activityOrder`) >= holdActivityOrder) {
            edgeType = 'dottedLine';
          }
          edgesSet.add({
            source: lodash.get(preActivity, 'taskId'),
            target: item.taskId,
            type: edgeType,
            lineColor,
            sourceAnchor: this.edgeAnchor.Right,
            targetAnchor: this.edgeAnchor.Left,
          });
        }
        const currLocation = {
          y: startLocation.y + spacing?.y * (index + 1),
          x: startLocation.x + spacing?.x * (index + 1) + 100,
        };
        lastLocation = currLocation;
        nodesSet.add({
          id: item.taskId,
          type: item.status || 'unkown',
          ...currLocation,
          activityName: formatMessageApi({
            activity: taskDefKey,
          }),
          scale,
          modifiedTime: modifiedTime ? moment(modifiedTime).format('L LT') : '',
          assignee: assignee || '',
          hasSubCase,
          activityOrder: activityOrder.toString(),
          outlineColor: this.colors.todoOutlineColor,
        });
        // 末尾添加endPoint
        if (index === activities.length - 1) {
          const endId = `${processInstanceId}_end`;
          nodesSet.add({
            id: endId,
            type: 'end',
            y: lastLocation.y + spacing?.y,
            x: lastLocation.x + spacing?.x,
            scale,
            color: endLinkTaskId ? this.colors.activityEndPoint : this.colors.defaultEndPoint,
          });
          edgesSet.add({
            source: item.taskId,
            target: endId,
            type: edgeType,
            lineColor,
            sourceAnchor: this.edgeAnchor.Right,
            targetAnchor: this.edgeAnchor.Left,
          });
        }
      })
      .value();
    return {
      nodesSet,
      edgesSet,
    };
  };

  registerMaterial = ({ width, height }) => {
    // register completed icon
    this.registerIcons({
      width,
      height,
    });
    this.registerModel();
    this.registerEndPoint();
    this.registerRelationshipIcons();
    this.registerText();
  };

  registerIcons = ({ width, height }) => {
    const { containerBackground, disabled: disabledColor, textColor } = this.colors;
    const { calculateTextWidth } = this;
    const scaleFunc = this.scale;
    this.icons.forEach((item) => {
      G6.registerNode(
        item?.name,
        {
          draw(cfg, group) {
            const scale = cfg?.scale || 1;

            const image = group.addShape('image', {
              attrs: scaleFunc({
                params: {
                  img: item.icon,
                  x: 0,
                  y: 0,
                  width,
                  height,
                },
                scale,
              }),
            });
            group.addShape('text', {
              attrs: scaleFunc({
                params: {
                  text: cfg.activityName || '',
                  fill: textColor,
                  fontSize: 12,
                  y: 64,
                  // 12px下字体占 12.5px icon 宽度34px 通过计算可调整字体到居中效果
                  x: -(calculateTextWidth({ text: cfg?.activityName, fontSize: 12 }) - 34) / 2,
                },
                scale,
              }),
            });
            const assigneeAndDate = `${cfg.assignee} ${cfg.modifiedTime}`;
            const textWidth = 5.25 * (assigneeAndDate.length || 0);
            const startLocationX = -(textWidth - 34) / 2;
            group.addShape('text', {
              attrs: scaleFunc({
                params: {
                  text: assigneeAndDate,
                  fill: textColor,
                  fontSize: 10,
                  y: 64 + 10 + 3,
                  x: startLocationX,
                },
                scale,
              }),
            });
            if (cfg.hasSubCase) {
              group.addShape('rect', {
                attrs: scaleFunc({
                  params: {
                    width: textWidth,
                    height: 3,
                    fill: '#f08300',
                    x: startLocationX,
                    y: 64 + 10 + 3 + 6,
                  },
                  scale,
                }),
              });
            }
            return image;
          },
        },
        'rect'
      );
    });
    G6.registerNode('inprogress', {
      draw(cfg, group) {
        const scale = cfg?.scale || 1;
        const circle = group.addShape('circle', {
          attrs: scaleFunc({
            params: {
              r: 17,
              stroke: cfg.outlineColor || '#474747',
              x: 17,
              y: 17,
              fill: containerBackground,
            },
            scale,
          }),
        });

        const offsetLeft = (34 - 11.16) / 2;
        const offsetHeight = 25 + (34 - 25) / 2;
        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: cfg.activityOrder,
              fontSize: 19,
              fill: '#fff',
              stroke: '#fff',
              x: offsetLeft,
              y: offsetHeight,
            },
            scale,
          }),
        });

        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: cfg.activityName || '',
              fill: textColor,
              fontSize: 12,
              y: 64,
              // 16px下字体占 12.5px icon 宽度34px 通过计算可调整字体到居中效果
              x: -(calculateTextWidth({ text: cfg?.activityName, fontSize: 12 }) - 34) / 2,
            },
            scale,
          }),
        });
        const assigneeAndDate = `${cfg.assignee} ${cfg.modifiedTime}`;
        const textWidth = 5.25 * (assigneeAndDate.length || 0);
        const startLocationX = -(textWidth - 34) / 2;
        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: assigneeAndDate,
              fill: textColor,
              fontSize: 10,
              y: 64 + 10 + 3,
              x: startLocationX,
            },
            scale,
          }),
        });
        if (cfg.hasSubCase) {
          group.addShape('rect', {
            attrs: scaleFunc({
              params: {
                width: textWidth,
                height: 3,
                fill: '#f08300',
                x: startLocationX,
                y: 64 + 10 + 3 + 6,
              },
              scale,
            }),
          });
        }
        return circle;
      },
    });
    G6.registerNode('disabled', {
      draw(cfg, group) {
        const scale = cfg?.scale || 1;
        const r = 17;
        const circle = group.addShape('circle', {
          attrs: scaleFunc({
            params: {
              r,
              stroke: disabledColor,
              x: 17,
              y: 17,
              fill: containerBackground,
            },
            scale,
          }),
        });

        const offsetLeft = (34 - 11.16) / 2;
        const offsetHeight = 25 + (34 - 25) / 2;
        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: cfg.activityOrder,
              fontSize: 19,
              fill: '#fff',
              stroke: '#fff',
              x: offsetLeft,
              y: offsetHeight,
            },
            scale,
          }),
        });

        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: cfg.activityName || '',
              fill: textColor,
              fontSize: 12,
              y: 64,
              // 16px下字体占 12.5px icon 宽度34px 通过计算可调整字体到居中效果
              x: -(calculateTextWidth({ text: cfg?.activityName, fontSize: 12 }) - 34) / 2,
            },
            scale,
          }),
        });
        const assigneeAndDate = `${cfg.assignee} ${cfg.modifiedTime}`;
        const textWidth = 5.25 * (assigneeAndDate.length || 0);
        const startLocationX = -(textWidth - 34) / 2;
        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: assigneeAndDate,
              fill: textColor,
              fontSize: 10,
              y: 64 + 10 + 3,
              x: startLocationX,
            },
            scale,
          }),
        });
        const line = group.addShape('path', {
          attrs: {
            path: [
              ['M', r * scale, 0],
              ['L', r * scale, 2 * r * scale],
            ],
            stroke: disabledColor,
          },
        });
        let matrix = line.getMatrix();

        // 图形或分组的初始矩阵时 null，为了避免变换一个 null 矩阵，需要通过 mat3.create() 将其初始化为单位矩阵
        if (!matrix) matrix = mat3.create();

        line.setMatrix(matrix);
        if (cfg.hasSubCase) {
          group.addShape('rect', {
            attrs: scaleFunc({
              params: {
                width: textWidth,
                height: 3,
                fill: '#f08300',
                x: startLocationX,
                y: 64 + 10 + 3 + 6,
              },
              scale,
            }),
          });
        }
        return circle;
      },
    });
    G6.registerNode('unkown', {
      draw(cfg, group) {
        const scale = cfg?.scale || 1;
        const circle = group.addShape('circle', {
          attrs: scaleFunc({
            params: {
              r: 17,
              stroke: '#bfbfbf',
              x: 17,
              y: 17,
              fill: containerBackground,
            },
            scale,
          }),
        });

        const offsetLeft = (34 - 11.16) / 2;
        const offsetHeight = 25 + (34 - 25) / 2;
        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: cfg.activityOrder,
              fontSize: 19,
              stroke: '#fff',
              fill: '#fff',
              x: offsetLeft,
              y: offsetHeight,
            },
            scale,
          }),
        });

        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: cfg.activityName || '',
              fill: textColor,
              fontSize: 12,
              y: 64,
              // 16px下字体占 12.5px icon 宽度34px 通过计算可调整字体到居中效果
              x: -(calculateTextWidth({ text: cfg?.activityName, fontSize: 12 }) - 34) / 2,
            },
            scale,
          }),
        });
        const assigneeAndDate = `${cfg.assignee} ${cfg.modifiedTime}`;
        const textWidth = 5.25 * (assigneeAndDate.length || 0);
        const startLocationX = -(textWidth - 34) / 2;
        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: assigneeAndDate,
              fill: textColor,
              fontSize: 10,
              y: 64 + 10 + 3,
              x: startLocationX,
            },
            scale,
          }),
        });
        if (cfg.hasSubCase) {
          group.addShape('rect', {
            attrs: scaleFunc({
              params: {
                width: textWidth,
                height: 3,
                fill: '#f08300',
                x: startLocationX,
                y: 64 + 10 + 3 + 6,
              },
              scale,
            }),
          });
        }
        return circle;
      },
    });
  };

  registerText = () => {
    const scaleFunc = this.scale;
    const { textColor } = this.colors;
    G6.registerNode('caseCategoryName', {
      draw(cfg, group) {
        const scale = cfg?.scale || 1;
        const caseCategory = group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: cfg.activityName || '',
              fill: textColor,
              fontSize: 12,
              y: 64,
              // 16px下字体占 12.5px icon 宽度34px 通过计算可调整字体到居中效果
              x: -(cfg?.activityName?.length || 0 * 12.5 - 34) / 2,
            },
            scale,
          }),
        });
        return caseCategory;
      },
    });
  };

  relationshipMapping = {
    [processRelationship.Subcase]: {
      img: subcase,
      color: '#fcd870',
    },
    [processRelationship.SplitCaseOriginalCase]: {
      img: splitCase,
      color: '#bfbfbf',
    },
    [processRelationship.SplitCaseNewCase]: {
      img: splitCase,
      color: '#bfbfbf',
    },
    [processRelationship.SameClaim]: {
      img: sameClaim,
      color: '#bfbfbf',
    },
    [processRelationship.TriggerCase]: {
      img: triggerCase,
      color: '#bfbfbf',
    },
  };

  registerRelationshipIcons = () => {
    const { containerBackground } = this.colors;
    const relationships = [
      processRelationship.Subcase,
      processRelationship.SplitCaseOriginalCase,
      processRelationship.SameClaim,
      processRelationship.TriggerCase,
      processRelationship.SplitCaseNewCase,
    ];
    const { relationshipMapping } = this;
    relationships.forEach((relationship) => {
      G6.registerNode(relationship, {
        draw(cfg, group) {
          const circle = group.addShape('circle', {
            attrs: {
              r: 14,
              x: 0,
              y: 0,
              stroke: relationshipMapping[relationship].color,
              fill: containerBackground,
            },
          });
          const offset = (14 * 2 - 15) / 2;
          group.addShape('image', {
            attrs: {
              img: relationshipMapping[relationship].img,
              width: 15,
              height: 15,
              x: -offset,
              y: -offset,
            },
          });

          return circle;
        },
      });
    });
  };

  registerEndPoint = () => {
    const { containerBackground } = this.colors;
    const scaleFunc = this.scale;
    G6.registerNode(
      'end',
      {
        draw(cfg, group) {
          const scale = cfg?.scale;
          const r = 17;
          const minR = r * 0.53;
          const color = cfg.color || '#474747';
          const circle = group.addShape('circle', {
            attrs: scaleFunc({
              params: {
                r,
                stroke: color,
                x: 0,
                y: 17,
                fill: containerBackground,
              },
              scale,
            }),
            draggable: true,
            name: 'end-point-out',
          });
          group.addShape('circle', {
            attrs: scaleFunc({
              params: {
                r: minR,
                fill: color,
                x: 0,
                y: 17,
              },
              scale,
            }),
            name: 'mini-end-circle',
          });
          return circle;
        },
      },
      'circle'
    );
  };

  scale = ({ params, scale }) => {
    const result = {};
    lodash.entries(params).forEach((item) => {
      const [key, value] = item;
      if (lodash.isNumber(value)) {
        result[key] = value * scale;
      } else {
        result[key] = value;
      }
    });
    return result;
  };

  registerModel = () => {
    const scaleFunc = this.scale;
    G6.registerNode('CaseCategoryModel', {
      draw(cfg, group) {
        const scale = cfg?.scale;
        const { caseCategory, processInstanceId } = lodash.pick(cfg, [
          'caseCategory',
          'processInstanceId',
        ]);
        const container = group.addShape('rect', {
          attrs: scaleFunc({
            params: {
              x: 0,
              y: 0,
              width: 150,
              height: 40,
              fill: '#505050',
              radius: 3,
              processInstanceId,
            },
            scale,
          }),
        });

        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: caseCategory,
              fill: '#fff',
              fontSize: 12,
              x: 16,
              y: 21,
            },
            scale,
          }),
          name: 'case-caseCategory',
        });
        group.addShape('text', {
          attrs: scaleFunc({
            params: {
              text: `Case No: ${processInstanceId}`,
              fill: '#fff',
              fontSize: 10,
              x: 16,
              y: 32,
              scale: 0.83,
            },
            scale,
          }),
          name: 'processInstanceId',
        });
        /* 左边的粗线 */
        group.addShape('rect', {
          attrs: scaleFunc({
            params: {
              x: 0,
              y: 0,
              width: 4,
              height: 40,
              fill: '#fa8c16',
              radius: 1.5,
            },
            scale,
          }),
          name: 'left-border-shape',
        });
        return container;
      },
    });
  };

  registerEdges = () => {
    G6.registerEdge('linkToSubProcess', {
      draw(cfg, group) {
        const { startPoint, endPoint } = lodash.pick(cfg, ['startPoint', 'endPoint']);
        const shape = group.addShape('path', {
          attrs: {
            stroke: '#828282',
            path: [
              ['M', startPoint.x, startPoint.y + (cfg?.offset?.y || 0)],
              ['L', endPoint.x, endPoint.y],
            ],
            lineDash: [6, 2],
          },
        });
        return shape;
      },
    });
    G6.registerEdge('dottedLine', {
      draw(cfg, group) {
        const { startPoint, endPoint, lineColor } = lodash.pick(cfg, [
          'startPoint',
          'endPoint',
          'lineColor',
        ]);
        const line = group.addShape('path', {
          attrs: {
            stroke: lineColor || '#828282',
            fill: 'green',
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', endPoint.x, endPoint.y],
            ],
            lineDash: [6, 2],
          },
        });
        return line;
      },
    });
    G6.registerEdge('default', {
      draw(cfg, group) {
        const { startPoint, endPoint, lineColor } = lodash.pick(cfg, [
          'startPoint',
          'endPoint',
          'lineColor',
        ]);
        const line = group.addShape('path', {
          attrs: {
            stroke: lineColor,
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', endPoint.x, endPoint.y],
            ],
          },
        });
        return line;
      },
    });
    G6.registerEdge('endPointLink', {
      draw(cfg, group) {
        const { startPoint, endPoint, pointFirst, pointSecond, pointThird } = lodash.pick(cfg, [
          'startPoint',
          'endPoint',
          'pointFirst',
          'pointSecond',
          'pointThird',
        ]);
        const line = group.addShape('path', {
          attrs: {
            stroke: '#474747',
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', pointFirst.x, pointFirst.y],
              ['L', pointSecond.x, pointSecond.y],
              ['L', pointThird.x, pointThird.y],
              ['L', endPoint.x, endPoint.y + (cfg?.offset?.y || 0)],
            ],
            lineDash: [6, 2],
            endArrow: true,
            fill: 'transparent',
          },
        });
        return line;
      },
    });
  };

  render() {
    this.Grapth.render();
  }
}

export default Flow;
