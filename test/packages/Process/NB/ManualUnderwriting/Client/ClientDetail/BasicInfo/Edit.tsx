import React from 'react';
import { tenant, Region } from '@/components/Tenant';
import useMapAddressToContactInfoItem from 'process/NB/ManualUnderwriting/_hooks/useMapAddressToContactInfoItem';
import useSetTargetRelationOfInsuredDefault from 'process/NB/ManualUnderwriting/_hooks/useSetTargetRelationOfInsuredDefault';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import BackgroundInfo from './BackgroundInfo-Field/Edit';
import AuthorizedSignatory from './AuthorizedSignatory-Field/Edit';
import ContactInfo from './ContactInfo/Edit';
import FinancialInfo from './FinancialInfo/Edit';
import RiskIndicatorInfo from './RiskIndicatorInfo/Edit';
import NationalityInfo from './NationalityInfo-Field/Edit';
import OtherInfo from './OtherInfo-Field/Edit';
import PersonalInfo from './PersonalInfo-Field/Edit';
import SubCard from './SubCard';
import styles from './index.less';
import useJudgeAuthorisedSignatoryDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeAuthorisedSignatoryDisplay';

const Edit: React.FC<any> = ({ id, item, isSubCard }: any) => {
  const regionCode = tenant.region();
  const contactDataItem = useMapAddressToContactInfoItem({
    item,
    id,
  });
  const isShowASCard = useJudgeAuthorisedSignatoryDisplay({ item });
  useSetTargetRelationOfInsuredDefault({ id });
  return (
    <div className={styles.container}>
      <PersonalInfo id={id} item={item} isSubCard={isSubCard} />
      <NationalityInfo id={id} item={item} isSubCard={isSubCard} />
      <FinancialInfo id={id} item={item} isSubCard={isSubCard} />
      <RiskIndicatorInfo id={id} item={item} isSubCard={isSubCard} />
      <ContactInfo id={id} item={contactDataItem} isSubCard={isSubCard} />
      <BackgroundInfo id={id} item={item} isSubCard={isSubCard} />
      {regionCode === Region.PH && (
        <AuthorizedSignatory id={id} item={item} isSubCard={isSubCard} />
      )}
      <OtherInfo id={id} item={item} isSubCard={isSubCard} />

      {isShowASCard && !isSubCard && <SubCard mode={Mode.Edit} />}
    </div>
  );
};

export default Edit;
