import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

export default ({ localConfig, section }: any) => {
  const { state } = useContext(context);
  return useMemo(() => {
    const pageAtomConfig = (() => {
      if (!lodash.isEmpty(localConfig?.configs) && localConfig?.remote !== true) {
        return localConfig?.configs;
      }
      return lodash.get(state, 'pageAtomConfig', []);
    })();
    return lodash
      .chain(pageAtomConfig)
      .filter((item: any) => {
        return lodash.isEqual(section, item.section);
      })
      .map((item) => {
        return lodash.merge(
          lodash
            .chain(localConfig?.configs)
            .find((localItem: any) => localItem.field === item.field)
            .cloneDeep()
            .value(),
          item
        );
      })
      .value();
  }, [state, localConfig]);
};
