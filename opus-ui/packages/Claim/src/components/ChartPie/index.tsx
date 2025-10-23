import React from 'react';
import { Chart, Geom, Axis, Coord, Guide } from 'bizcharts';
import DataSet from '@antv/data-set/lib/index';

const { Html } = Guide;

class ChartPie extends React.Component {
  renderTextHtml = () => {
    const { percentValue } = this.props;

    const totalCaseHtml = `
    <div style="font-size: 20px; text-align: center; line-height: 1.2"><div style="color: var(--claim-task-chartpie-color)">${percentValue}%</div></div>
      `;

    return totalCaseHtml;
  };

  render() {
    const { height, width, percentValue } = this.props;
    const value = percentValue > 100 ? 100 : +percentValue;
    const data = [
      { name: 'totleItem1', value },
      { name: 'totleItem2', value: 100 - value },
    ];
    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });

    return (
      <div style={{ width: 120 }}>
        <Chart forceFit height={height} width={width} data={dv} padding={[0, 0, 0, 0]}>
          <Coord type="theta" radius={0.8} innerRadius={0.88} />
          <Axis name="percent" />
          <Geom
            type="intervalStack"
            position="percent"
            color={
              value === 100 ? ['name', ['#747b96', '#303030']] : ['name', ['#f18602', '#595959']]
            }
            select={false} // 是否打开 对于鼠标 click 事件的响应效果
          />
          <Guide>
            <Html
              position={['50%', '50%']}
              html={this.renderTextHtml()}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
        </Chart>
      </div>
    );
  }
}

export default ChartPie;
