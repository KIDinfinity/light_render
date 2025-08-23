import { useContext, useEffect } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

const getChildrenPropsParams = (domObject: any) => {
  const childrenProps = lodash
    .chain(domObject)
    .get('props.children')
    .map((item) => {
      return lodash
        .chain(item)
        .get('children')
        .map((element: any) => {
          const result = {};
          lodash
            .chain(element)
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
    })
    .value();
  return childrenProps;
};
export default (headerInfoRender: any) => {
  const { dispatch, state } = useContext(context);
  const { headerInfoRender: preHeaderRender } = state;
  useEffect(() => {
    if (
      !lodash.isEqual(
        getChildrenPropsParams(headerInfoRender),
        getChildrenPropsParams(preHeaderRender)
      )
    ) {
      dispatch({
        type: 'setHeaderInfoRender',
        payload: {
          headerInfoRender,
        },
      });
    }
  }, [headerInfoRender]);
};
