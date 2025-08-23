import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@ctc/antv-g6';
import './Flow.less';

const data = {
  // 点集
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
      type: 'rect',
      size: [96, 36],
      style: {
        lineWidth: 0,
        fill: 'rgb(47,47,47)',
      },
      label: 'Start',
      labelCfg: {
        style: {
          fill: '#fff',
        },
      },
      linkPoints: {
        right: true,
        fill: 'rgb(47,47,47)',
        stroke: 'rgb(47,47,47)',
      },
      stateStyles: {
        hover: {
          fill: 'lightsteelblue',
        },
        click: {
          stroke: 'red',
          lineWidth: 3,
        },
      },
    },
    {
      id: 'node2',
      x: 200,
      y: 200,
      type: 'circle',
      size: 24,
    },
    {
      id: 'node3',
      x: 200,
      y: 300,
      type: 'rect',
      size: [96, 36],
      style: {
        lineWidth: 0,
        fill: 'rgb(47,47,47)',
      },
      label: 'Start',
      labelCfg: {
        style: {
          fill: '#fff',
        },
      },
      linkPoints: {
        right: true,
        fill: 'rgb(47,47,47)',
        stroke: 'rgb(47,47,47)',
      },
      stateStyles: {
        hover: {
          fill: 'lightsteelblue',
        },
        click: {
          stroke: 'red',
          lineWidth: 3,
        },
      },
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1',
      target: 'node2',
      type: 'line',
      style: {
        stroke: 'rgba(255, 96, 0, 1)',
      },
    },
  ],
};

export default () => {
  const ref = React.useRef(null);

  useEffect(() => {
    const minimap = new G6.Minimap({
      size: [100, 100],
      className: 'minimap',
      type: 'delegate',
    });
    const grid = new G6.Grid();

    const graph = new G6.Graph({
      // eslint-disable-next-line react/no-find-dom-node
      container: ReactDOM.findDOMNode(ref.current),
      width: 1200,
      height: 800,
      plugins: [minimap, grid],
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'drag-node',
          {
            type: 'click-select',
            trigger: 'ctrl',
          },
          {
            type: 'tooltip', // 提示框
            formatText(model) {
              // 提示框文本内容
              const text = 'label: ' + model.label + '<br/> class: ' + model.class;
              return text;
            },
          },
          {
            type: 'edge-tooltip', // 边提示框
            formatText(model) {
              // 边提示框文本内容
              const text =
                'source: ' +
                model.source +
                '<br/> target: ' +
                model.target +
                '<br/> weight: ' +
                model.weight;
              return text;
            },
          },
        ],
        // edit: ['zoom-canvas', 'drag-node'],
      },
      minZoom: 0.5,
      maxZoom: 3,
    });
    graph.data(data);
    graph.render();

    graph.on('node:mouseenter', (evt) => {
      const node = evt.item;
      graph.setItemState(node, 'hover', true);
    });
    graph.on('node:click', (ev) => {
      console.log(ev);
    });
  }, []);

  return <div ref={ref} />;
};
