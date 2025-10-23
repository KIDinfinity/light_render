import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ displayConfig }: any) => {
  return useMemo(() => {
    const objects = lodash.get(displayConfig, 'pendingMemo.children', {});

    return lodash
      .chain(objects)
      .keys()
      .reduce((obj, el) => {
        return {
          ...obj,
          [el]: objects[el]?.visible,
        };
      }, {})

      .value();
  }, [displayConfig]);
};
