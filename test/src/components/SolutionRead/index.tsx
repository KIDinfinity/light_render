import lodash from 'lodash';
import React from 'react';
import Circle from './Circle';
import Item from './Item';

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
  mustRead?: boolean;
}

export default (props: IProps) => {
  const configs = {
    circle: () => <Circle {...props} />,
    item: () => <Item {...props} />,
  };

  return <>{lodash.isFunction(configs[props.type]) && configs[props.type]()}</>;
};
