import lodash from 'lodash';
import useGetEditableByConfig from 'basic/hooks/useGetEditableByConfig';
import useGetClientManualEdit from 'process/NB/ManualUnderwriting/_hooks/useGetClientManualEdit';
import { Editable } from 'basic/components/Form';
import { cacluateComboRule } from 'basic/components/Form/Rule';
import useGetContextClientId from 'process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextClientId';

export default ({ editableConditions, config, localConfig }: any) => {
  const editableConfig = lodash.get(config, 'field-props.editable');
  const editableByConfig = useGetEditableByConfig({
    editableConditions,
    config,
    localConfig,
  });
  const clientId = useGetContextClientId();
  const isManuallyAdded = useGetClientManualEdit({
    clientId,
  });
  const conditions = lodash.get(config, 'field-props.editable-condition');

  const editable = (() => {
    if (editableConfig === Editable.Conditions && !lodash.isEmpty(conditions)) {
      const manuallyAddedEditableConditions = lodash
        .chain(conditions)
        .get('conditions', [])
        .filter((condition: any) => {
          return lodash.isEqual(condition?.left, { domain: 'field', field: 'isManuallyAdded' });
        })
        .map((condition: any) => {
          return {
            ...condition,
            left: isManuallyAdded,
          };
        })
        .value();

      if (!manuallyAddedEditableConditions.length) {
        return editableByConfig;
      }

      const combine = lodash.chain(conditions).get('combine', '').value();

      const calcResult = cacluateComboRule({
        combine,
        conditions: manuallyAddedEditableConditions,
      });

      return calcResult || editableByConfig;
    }
    return editableByConfig;
  })();

  return !editable;
};
