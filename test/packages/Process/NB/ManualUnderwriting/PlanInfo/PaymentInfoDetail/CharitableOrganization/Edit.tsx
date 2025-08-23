import React from 'react';
import lodash from 'lodash';
import useGetCharityOrganizationData from 'process/NB/ManualUnderwriting/_hooks/useGetCharityOrganizationData';
import EditableTable from 'process/NB/ManualUnderwriting/_components/EditableTable';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import EditItem from './EditItem';
import { FormAntCard } from 'basic/components/Form';
import { localConfig } from './Section';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './edit.less';
import useCharityOrganizationDataAutoAddFirstRecord from 'process/NB/ManualUnderwriting/_hooks/useCharityOrganizationDataAutoAddFirstRecord';
import useHandleAddCharityOrganizationCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleAddCharityOrganizationCallback';
import useHandleDeleteCharityOrganizationCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteCharityOrganizationCallback';

const CharityOrganizationTable = () => {
  const editable = false;
  const data = useGetCharityOrganizationData();
  const config = useGetSectionAtomConfig({
    section: 'CharityOrganization-Table',
    localConfig,
  });
  const handleAdd = useHandleAddCharityOrganizationCallback();
  const handleDelete = useHandleDeleteCharityOrganizationCallback();
  useCharityOrganizationDataAutoAddFirstRecord();
  return (
    <div className={styles.container}>
      <FormAntCard className={styles.wrap}>
        <div className={styles.title}>
          {formatMessageApi({
            Label_BIZ_Policy: 'CharityOrganization',
          })}
        </div>
        <EditableTable
          config={config}
          editable={editable}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          name="CharityOrganization"
        >
          {lodash.map(data, (item: any, index: number) => {
            return <EditItem id={item?.id} item={item} key={index} />;
          })}
        </EditableTable>
      </FormAntCard>
    </div>
  );
};

export default CharityOrganizationTable;
