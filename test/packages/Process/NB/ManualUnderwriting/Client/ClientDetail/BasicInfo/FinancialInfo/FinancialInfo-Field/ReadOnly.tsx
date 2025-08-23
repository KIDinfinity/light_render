import React from 'react';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetFinancialInfoFieldsData from 'process/NB/ManualUnderwriting/_hooks/useGetFinancialInfoFieldsData';
import { ReactComponent as WalletIcon } from 'process/assets/wallet.svg';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetRolesById from 'process/NB/ManualUnderwriting/_hooks/useGetRolesById';
import { localConfig } from './Section';

import styles from './index.less';
const section = 'FinancialInfo-Field';

export default ({ expand, id, isSubCard }: any) => {
  const config = useGetSectionAtomConfig({ section, localConfig });
  const roles = useGetRolesById({ id });
  const data = useGetFinancialInfoFieldsData({
    section,
    config,
    id,
    roles,
  });
  return (
    <ReadOnlySection
      data={data}
      icon={
        <div className={styles.iconStyle}>
          <WalletIcon />
        </div>
      }
      expand={expand}
      id={id}
      isSubCard={isSubCard}
    />
  );
};
