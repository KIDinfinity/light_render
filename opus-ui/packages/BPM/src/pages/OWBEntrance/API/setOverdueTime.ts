import { useContext, useEffect } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

const getChildrenPropsParams = (domObject: any) => {
  const childrenProps = lodash
    .chain(domObject)
    .get('props.children')
    .map((item) => {
      const result = {};
      lodash
        .chain(item)
        .get('props')
        .entries()
        .forEach((i) => {
          const [key, value] = i;
          if (lodash.isObject(value)) {
            result[key] = JSON.stringify(value);
          }
          if (lodash.isFunction(value)) {
            result[key] = value.toString();
          }
          if (lodash.isString(value)) {
            result[key] = value;
          }
        })
        .value();
      return result;
    })
    .value();
  return childrenProps;
};
export default (overdueTimeRender: any) => {
  const { dispatch, state } = useContext(context);
  const { overdueTimeRender: preOverdueTimeRender } = state;
  useEffect(() => {
    if (
      overdueTimeRender?.props?.overdueTime &&
      !lodash.isEqual(
        overdueTimeRender?.props?.overdueTime,
        preOverdueTimeRender?.props?.overdueTime
      )
    ) {
      dispatch({
        type: 'setOverdueTime',
        payload: {
          overdueTimeRender,
        },
      });
    }
  }, [overdueTimeRender]);
};
