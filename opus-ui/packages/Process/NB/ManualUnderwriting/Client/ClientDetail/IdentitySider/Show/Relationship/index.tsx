import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import { localConfig } from 'process/NB/ManualUnderwriting/Client/ClientDetail/IdentitySider/Section';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';

const RelationOfInsured = ({ id, config }: any) => {
  const data = useGetDataBySection({
    section: 'CommonClientInfo-Field',
    id,
    config,
  });

  const relationOfInsured = lodash.find(data, (item: any) => item.key === 'relationOfInsured');
  const relationOfProposer = lodash.find(data, (item: any) => item.key === 'relationOfProposer');
  const relationOfBeneficiary = lodash.find(
    data,
    (item: any) => item.key === 'relationshipWithBeneficiary'
  );

  return (
    <>
      <div
        className={classnames(styles.relationship, {
          [styles.hidden]: !relationOfInsured,
        })}
      >
        <span className={styles.label}>{lodash.get(relationOfInsured, 'label')}</span>
        <span className={styles.value}>
          {formatMessageApi({
            Dropdown_IND_Relationship: formUtils.queryValue(lodash.get(relationOfInsured, 'value')),
          })}
        </span>
      </div>
      <div
        className={classnames(styles.relationship, {
          [styles.hidden]: !relationOfProposer,
        })}
      >
        <span className={styles.label}>{lodash.get(relationOfProposer, 'label')}</span>
        <span className={styles.value}>
          {formatMessageApi({
            Dropdown_IND_Relationship: formUtils.queryValue(
              lodash.get(relationOfProposer, 'value')
            ),
          })}
        </span>
      </div>
      <div
        className={classnames(styles.relationship, {
          [styles.hidden]: !relationOfBeneficiary,
        })}
      >
        <span className={styles.label}>{lodash.get(relationOfBeneficiary, 'label')}</span>
        <span className={styles.value}>
          {formatMessageApi({
            Dropdown_IND_Relationship: formUtils.queryValue(
              lodash.get(relationOfBeneficiary, 'value')
            ),
          })}
        </span>
      </div>
    </>
  );
};
const Relationship = ({ id }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'CommonClientInfo-Field',
    localConfig,
  });
  return <RelationOfInsured id={id} config={config} />;
};

Relationship.displayName = 'relationship';

export default Relationship;
