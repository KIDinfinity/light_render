import React from 'react';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import EditableTable from 'process/NB/ManualUnderwriting/_components/EditableTable';
import Item from './Item';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './Section';
import styles from './index.less';
import useHandleDeleteAddingPolicyItem from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteAddingPolicyItem';

const Takeovertable = () => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const onDeletePolicyItem = useHandleDeleteAddingPolicyItem();
  const takeOverList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData?.takeOverList
    ) || [];
  const config = useGetSectionAtomConfig({
    section: 'TakeOver-Table',
    localConfig,
  });

  return (
    <div className={styles.container}>
      <EditableTable
        titleClassName={styles.titleClass}
        config={config}
        handleDelete={onDeletePolicyItem}
      >
        {lodash.map(takeOverList, (item: any) => {
          return (
            <div key={item?.id} className={styles.takeOverList} id={item?.id}>
              <Item item={item} editable={editable} id={item?.id} />
            </div>
          );
        })}
      </EditableTable>
    </div>
  );
};
export default Takeovertable;
