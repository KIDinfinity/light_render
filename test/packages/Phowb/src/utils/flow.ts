import lodash from 'lodash';
import G6 from '@ctc/antv-g6';
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

class Flow {
  constructor() {
    this.registerMaterial({
      width: 34,
      height: 34,
    });
  }

  anchorPoints = [Location.Top, Location.Right, Location.Bottom, Location.Left];

  edgeAnchor = EdgeAnchor;

  colors = {
    containerBackground: '#222',
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

  init({ container, width, height }) {
    this.Grapth = new G6.Graph({
      container,
      width,
      height,
      renderer: 'svg',
    });
  }

  calculateTextWidth = ({ text, fontSize = 12 }) => {
    const defaultFontSize = 12;
    const width = (text.length * 5.94 * defaultFontSize) / fontSize;
    return width;
  };

  formatProcess = ({ process, container, startLocation, spacing }) => {
    const flowData = this.generateFlow({
      processData: process,
      startLocation,
      spacing,
    });
    return {
      drawData: flowData,
    };
  };

  generateFlow = ({ processData, startLocation, spacing }) => {
    const nodeSet = new Set([]);
    const edgeSet = new Set([]);
    const { activities, id } = lodash.pick(processData, ['activities', 'id']);
    const startPointNode = {
      id: `${id}_start`,
      x: startLocation.x,
      y: startLocation.y,
      type: 'end',
      scale: 1,
    };
    nodeSet.add(startPointNode);

    lodash
      .chain(activities)
      .forEach((item, index) => {
        let source = null;
        if (index === 0) {
          source = `${id}_start`;
        } else {
          source = lodash
            .chain(activities)
            .find((activity, i) => i === index - 1)
            .get('id')
            .value();
        }

        edgeSet.add({
          source,
          target: item.id,
          type: 'dottedLine',
          sourceAnchor: this.edgeAnchor.Right,
          targetAnchor: this.edgeAnchor.Left,
        });
        const currentLocation = {
          x: startLocation.x + (index + 1) * spacing.x,
          y: startLocation.y + (index + 1) * spacing.y,
        };
        nodeSet.add({
          type: 'inprogress',
          id: item.id,
          ...currentLocation,
          activityOrder: index + 1,
          activityName: formatMessageApi({
            activity: item.processActivityKey,
          }),
          color: 'green',
        });
        if (index + 1 === activities.length) {
          nodeSet.add({
            id: `${id}_end`,
            x: startLocation.x + (index + 2) * spacing.x,
            y: startLocation.y,
            type: 'end',
            scale: 1,
          });
          edgeSet.add({
            source: item.id,
            target: `${id}_end`,
            type: 'dottedLine',
            sourceAnchor: this.edgeAnchor.Right,
            targetAnchor: this.edgeAnchor.Left,
          });
        }
      })
      .value();

    const allNodes = [...nodeSet];
    const allEdges = [...edgeSet];
    return {
      nodes: allNodes,
      edges: allEdges,
    };
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

  registerMaterial = ({ width, height }) => {
    this.registerIcons({
      width,
      height,
    });
    this.registerEdges();
    this.registerEndPoint();
  };

  registerEdges = () => {
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
  };

  registerIcons = ({ width, height }) => {
    const scaleFunc = this.scale;
    const { calculateTextWidth } = this;
    const { containerBackground } = this.colors;
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
        const offsetHeight = 22 + (34 - 22) / 2;
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
              fill: 'var(--text-color-accent)',
              fontSize: 12,
              y: 56,
              // 16px下字体占 12.5px icon 宽度34px 通过计算可调整字体到居中效果
              x: -(calculateTextWidth({ text: cfg?.activityName, fontSize: 12 }) - 34) / 2,
            },
            scale,
          }),
        });

        return circle;
      },
    });
  };

  data(data) {
    const result = {
      ...data,
      nodes:
        lodash.map(data?.nodes, (item) => ({
          ...item,
          anchorPoints: this.anchorPoints,
        })) || [],
    };

    this.Grapth.data(result);
  }

  render() {
    this.Grapth.render();
  }
}

export default Flow;
