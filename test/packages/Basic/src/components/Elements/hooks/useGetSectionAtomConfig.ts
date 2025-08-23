import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import Context from 'basic/components/Elements/Context';

export default ({ localConfig, section, extraConfig }: any) => {
  const { state } = useContext(Context);

  return useMemo(() => {
    let pageAtomConfig;
    if (!lodash.isEmpty(localConfig?.configs) && localConfig?.remote !== true) {
      pageAtomConfig = localConfig?.configs;
    } else {
      pageAtomConfig = lodash.get(state, 'pageAtomConfig', []);
    }
    return lodash
      .chain(pageAtomConfig)
      .filter((item: any) => {
        return lodash.isEqual(section, item.section);
      })
      .map((item) => {
        const newItem = lodash.merge(
          lodash
            .chain(localConfig?.configs)
            .find((localItem: any) => localItem?.field === item.field)
            .cloneDeep()
            .value(),
          item
        );
        const extraConfigItem = lodash.get(extraConfig, item?.field, {});
        return { ...newItem, ...extraConfigItem };
      })
      .value();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, section]);
};
