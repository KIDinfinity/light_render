import lodash from 'lodash';
import React from 'react';
import Circle from './Circle';
import Item from './Item';
import Doc from './Doc';

interface IProps {
  type?: string;
  show: boolean;
  count?: number;
  module?: string;
  id?: string;
  subjectType?: string;
  forbiClick?: boolean;
  children: any;
  callBack?: any;
}

export default (props: IProps) => {
  const configs = {
    circle: () => <Circle {...props} />,
    item: () => <Item {...props} />,
    doc: () => <Doc {...props} />,
  };

  return <>{lodash.isFunction(configs[props.type]) && configs[props.type]()}</>;
};
