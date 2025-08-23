import React from 'react';
import { Chart, View, Geom } from 'bizcharts';
import styles from './MultiplePath.less';
import { getResponsivePx } from '@/utils/responsiveUtils';
import { LS, LSKey } from '@/utils/cache';

class MultiplePath extends React.Component {
  state = {
    width: getResponsivePx(705),
    height: getResponsivePx(588),
  };

  setHeight = () => {
    this.setState({
      height: getResponsivePx(588),
      width: getResponsivePx(705),
    });
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.setHeight);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setHeight);
  };

  buildupData = (angle) => {
    const data = [
      {
        yAxis: 2,
        xAxis: 2,
      },
      {
        yAxis: 2,
        xAxis: 1.5,
      },
      {
        yAxis: 2,
        xAxis: 1,
      },
    ];
    const tail = [
      {
        yAxis: 0,
        xAxis: 1,
      },
      {
        yAxis: 0,
        xAxis: 1.5,
      },
      {
        yAxis: 0,
        xAxis: 2,
      },
    ];
    const len = 180 / angle + 1;
    for (let i = 0; i < len; i += 1) {
      data.push({
        yAxis: Math.floor((1 + 1 * Math.sin((90 + i * angle) * (Math.PI / 180))) * 1000) / 1000,
        xAxis: Math.floor((1 + 1 * Math.cos((90 + i * angle) * (Math.PI / 180))) * 1000) / 1000,
      });
    }
    return data.concat(tail);
  };

  render() {
    const { width, height } = this.state;
    const data = this.buildupData(10);
    const isDarkTheme = LS.getItem(LSKey.THEME, false) === 'dark';

    return (
      <div className={styles.multiple_path}>
        <Chart width={width} height={height} padding={[-5, 'auto', 5, 20]}>
          {/* <View data={data} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Geom
              type="path"
              shape="smooth"
              position="xAxis*yAxis"
              style={{
                lineDash: [2, 5],
              }}
              color="#404445"
              size={1}
            />
          </View>
          <View data={data} start={{ x: 0.032, y: 0.025 }} end={{ x: 0.968, y: 0.975 }}>
            <Geom
              type="path"
              shape="smooth"
              position="xAxis*yAxis"
              style={{
                lineDash: [1.5, 1.5],
              }}
              color="#404445"
              size={10}
            />
          </View> */}
          <View data={data} start={{ x: 0.064, y: 0.045 }} end={{ x: 0.936, y: 0.955 }}>
            <Geom
              type="path"
              shape="smooth"
              position="xAxis*yAxis"
              color={isDarkTheme ? '#835323' : '#FFDA82'}
              size={4}
            />
          </View>
          <View data={data} start={{ x: 0.08, y: 0.055 }} end={{ x: 0.92, y: 0.945 }}>
            <Geom
              type="path"
              shape="smooth"
              position="xAxis*yAxis"
              color={isDarkTheme ? '#BD6D18' : '#FE7A15'}
              size={4}
            />
          </View>
          <View data={data} start={{ x: 0.1, y: 0.072 }} end={{ x: 0.9, y: 0.928 }}>
            <Geom
              type="path"
              shape="smooth"
              position="xAxis*yAxis"
              color={isDarkTheme ? '#D3D5D5' : '#ffffff'}
              size={6}
            />
          </View>
          {/* <View data={data} start={{ x: 0.132, y: 0.12 }} end={{ x: 0.868, y: 0.88 }}>
            <Geom
              type="path"
              shape="smooth"
              position="xAxis*yAxis"
              style={{
                lineDash: [2, 5],
              }}
              color="#404445"
              size={1}
            />
          </View> */}
        </Chart>
      </div>
    );
  }
}

export default MultiplePath;
