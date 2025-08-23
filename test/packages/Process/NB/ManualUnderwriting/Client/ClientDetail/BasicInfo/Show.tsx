import React from 'react';
import classnames from 'classnames';
import { tenant, Region } from '@/components/Tenant';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import AuthorizedSignatory from './AuthorizedSignatory-Field/ReadOnly';
import BackgroundInfo from './BackgroundInfo-Field/ReadOnly';
import ContactInfo from './ContactInfo/ReadOnly';
import FinancialInfo from './FinancialInfo/Show';
import NationalityInfo from './NationalityInfo-Field/ReadOnly';
import OtherInfo from './OtherInfo-Field/ReadOnly';
import PersonalInfo from './PersonalInfo-Field/ReadOnly';
import RiskIndicatorInfo from './RiskIndicatorInfo/ReadOnly';
import SubCard from './SubCard';
import styles from './index.less';
import useJudgeAuthorisedSignatoryDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeAuthorisedSignatoryDisplay';

export default ({ expand, id, item, isSubCard }: any) => {
  const regionCode = tenant.region();
  const isShowASCard = useJudgeAuthorisedSignatoryDisplay({ item });
  return (
    <div
      className={classnames(styles.container, {
        [styles.hiddenIcon]: !expand && isSubCard,
      })}
    >
      <PersonalInfo expand={expand} id={id} item={item} isSubCard={isSubCard} />
      <NationalityInfo expand={expand} id={id} isSubCard={isSubCard} />
      <FinancialInfo expand={expand} id={id} isSubCard={isSubCard} />
      <ContactInfo expand={expand} id={id} isSubCard={isSubCard} />
      <BackgroundInfo expand={expand} id={id} isSubCard={isSubCard} />
      {regionCode === Region.PH && (
        <AuthorizedSignatory expand={expand} id={id} isSubCard={isSubCard} />
      )}
      <OtherInfo expand={expand} id={id} isSubCard={isSubCard} />

      {isSubCard && !expand ? null : (
        <RiskIndicatorInfo expand={expand} id={id} isSubCard={isSubCard} />
      )}
      <RiskIndicatorInfo expand={expand} id={id} isSubCard={isSubCard} mode="field" />
      {isShowASCard && !isSubCard && <SubCard mode={Mode.Show} />}
    </div>
  );
};
