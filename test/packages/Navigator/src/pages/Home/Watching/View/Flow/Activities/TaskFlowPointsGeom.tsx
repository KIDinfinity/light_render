import React, { Component, Fragment } from 'react';
import { Geom, Label } from 'bizcharts';
import { LS, LSKey } from '@/utils/cache';

class TaskFlowPointsGeom extends Component {
  render() {
    const fontColor = LS.getItem(LSKey.THEME, false) === 'dark' ? '#ffffff' : '#000000';

    return (
      <Fragment>
        <Geom
          type="point"
          position="x*y"
          size={8}
          select={false}
          active={false}
          tooltip={false}
          color={[
            'y',
            (y) => {
              if (y === 40 || y === 80) {
                return '#fff';
              }
              return 'transparent';
            },
          ]}
          shape={[
            'x',
            (x) => {
              if (x === 0 || x === 1000) {
                return 'line'; // 不显示第一和最后一个圆点
              }
              return 'circle';
            },
          ]}
        >
          <Label content="name" textStyle={{ fill: fontColor }} />
        </Geom>
        <Geom
          type="point"
          position="x*y"
          size={12}
          select={false}
          active={false}
          tooltip={false}
          color={[
            'y',
            (y) => {
              if (y === 40 || y === 80) {
                return 'rgba(255,255,255,0.3)';
              }
              return 'transparent';
            },
          ]}
          shape={[
            'x',
            (x) => {
              if (x === 0 || x === 1000) {
                return 'line'; // 不显示第一和最后一个圆点
              }
              return 'circle';
            },
          ]}
        />
      </Fragment>
    );
  }
}

export default TaskFlowPointsGeom;
