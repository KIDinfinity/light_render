import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import Context from 'basic/components/Elements/Context';

export default ({ localConfig, section }: any) => {
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
      .value();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, section]);
};
