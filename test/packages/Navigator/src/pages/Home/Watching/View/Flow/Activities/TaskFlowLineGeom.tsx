import React, { PureComponent } from 'react';
import { Geom } from 'bizcharts';

class TaskFlowLineGeom extends PureComponent {
  render() {
    const { size = 10 } = this.props;

    return (
      <Geom
        type="line"
        position="x*y"
        size={size}
        shape="spline"
        select={false}
        color={['y', ['#989292']]}
        tooltip={false}
      />
    );
  }
}

export default TaskFlowLineGeom;
