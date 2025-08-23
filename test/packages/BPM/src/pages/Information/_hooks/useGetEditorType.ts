import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import AtomCode from 'enum/AtomCode';
import AtomGroupCode from 'enum/AtomGroupCode';
import { formUtils } from 'basic/components/Form';
import InformationEditorType from 'basic/enum/InformationEditorType';

export default ({ item }: any) => {
  const { atomGroups } = useSelector(
    (state: any) => ({
      atomGroups: state?.atomConfig?.groups,
    }),
    shallowEqual
  );
  const singleAtomConfig = useSelector(
    ({ atomConfig }: any) =>
      atomConfig.single?.[AtomGroupCode.InformationAdd]?.[AtomCode.InformationAddConfig]
  );
  const category = useMemo(() => {
    return formUtils.queryValue(item?.categoryCode);
  }, [item]);
  const informationConfigGroup = useMemo(() => {
    return lodash.get(atomGroups, `${AtomGroupCode.InformationAdd}`);
  }, [atomGroups]);
  const result = useMemo(() => {
    if (
      lodash
        .chain(informationConfigGroup)
        .some((configAtom) => {
          return configAtom.atomCode === `information_add_config_${category}`;
        })
        .value()
    ) {
      return lodash
        .chain(informationConfigGroup)
        .find((configAtom) => {
          return configAtom.atomCode === `information_add_config_${category}`;
        })
        .get('editor_type')
        .value();
    }
    if (
      lodash
        .chain(singleAtomConfig)
        .some((groupItem) => groupItem.category === category)
        .value()
    ) {
      return lodash
        .chain(singleAtomConfig)
        .find((groupItem) => groupItem.category === category)
        .get('editor_type')
        .value();
    }

    return InformationEditorType.RichEditor;
  }, [singleAtomConfig, category, informationConfigGroup]);
  return result;
};
