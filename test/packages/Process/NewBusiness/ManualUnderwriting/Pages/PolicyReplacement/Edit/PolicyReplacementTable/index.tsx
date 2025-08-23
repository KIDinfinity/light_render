import React from 'react';
import { useDispatch } from 'dva';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/PolicyReplacementTableField';
import PolicyReplacementTableItem from './PolicyReplacementTableItem';
import EditableTablePanel from 'process/NewBusiness/ManualUnderwriting/_components/EditableTablePanel';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import lodash from 'lodash';
interface IProps {
  data?: any[];
}
const PolicyReplacementTable = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const config = useGetSectionAtomConfig({ localConfig, section: 'PolicyReplacement-Table' });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const configByDisableCondition = config
    .filter((item: any) => !!item.field)
    .map((item: any) => {
      const configItem = getApplicableByDisableCondidtions({
        fieldConfig: item,
        disableFieldsConditions,
        condition: 'proposal',
      });
      return configItem;
    })
    .filter((c) => {
      return lodash.get(c, 'field') !== 'insuredSeqNo';
    });

  const deleteCurrentRow = (record: any) => {
    dispatch({
      type: `${NAMESPACE}/deletePolicyReplInfoItem`,
      payload: {
        id: record.id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [record.id] },
    });
  };

  return (
    <EditableTablePanel
      itemList={data || []}
      sectionConfig={configByDisableCondition}
      disableDeleteItem={(_itemData, index) => index == 0}
      itemRender={(itemData: any, index) => (
        <PolicyReplacementTableItem data={itemData} index={index} />
      )}
      onDeleteItem={deleteCurrentRow}
    />
  );
};
export default PolicyReplacementTable;
