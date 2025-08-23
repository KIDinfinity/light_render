import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { G2, Chart, Geom, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import userPrepareFundData from 'process/NB/ManualUnderwriting/_hooks/userPrepareFundData';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
const { DataView } = DataSet;

const Pieslice = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const data = userPrepareFundData();
  const sliceNumber = useMemo(() => {
    if (data?.length == 1) {
      return 0;
    }
    return 0.01;
  }, [data]); // 自定义 other 的图形，增加两条线

  G2.Shape.registerShape('interval', 'sliceShape', {
    draw(cfg, container) {
      const points = cfg.points;
      let path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y - sliceNumber]);
      path.push(['L', points[2].x, points[2].y - sliceNumber]);
      path.push(['L', points[3].x, points[3].y]);
      path.push('Z');
      path = this.parsePath(path);
      return container.addShape('path', {
        attrs: {
          fill: cfg.color,
          path: path,
        },
      });
    },
  });
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'value',
    dimension: 'item',
    as: 'percent',
  });
  const cols = {
    percent: {
      formatter: (val: number) => {
        return (val * 100).toFixed(0) + '%';
      },
    },
  };
  useLayoutEffect(() => {
    const dom: any = ReactDOM.findDOMNode(ref?.current);
    const canvas = dom?.children[0].children[0]?.children[0];
    if (!lodash.isEmpty(data)) {
      const dataUrl = canvas?.toDataURL();
      dispatch({
        type: `${NAMESPACE}/setFundChartDataBase64`,
        payload: {
          fundChartDataUrl: dataUrl,
        },
      });
    }
  }, [data, ref]);

  return (
    <div>
      <div
        style={{
          width: 400,
          height: 400,
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          opacity: 0,
        }}
      >
        <Chart data={dv} scale={cols} width={400} height={400} ref={ref} padding={0}>
          <Coord type="theta" innerRadius={0.55} />
          <Geom
            type="intervalStack"
            position="value"
            shape="sliceShape"
            color={[
              'color',
              (color) => {
                return color;
              },
            ]}
          >
            <Label
              content="percent"
              offset={-45}
              textStyle={(value,...etra) => {
                const labelColor = etra?.[0]?._origin?.labelColor;
                return {
                textAlign: 'center',
                fill: labelColor || '#000',
                fontSize: 22,
                fontWeight: '600',
              }}}
              autoRotate={false}
            />
          </Geom>
        </Chart>
      </div>
    </div>
  );
};

export default Pieslice;
