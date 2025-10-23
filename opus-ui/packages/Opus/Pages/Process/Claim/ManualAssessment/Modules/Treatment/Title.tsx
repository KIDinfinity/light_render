import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import { SectionTitle } from './Section';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import styles from './Title.less';

const Title = ({ treatmentId }: any) => {
  const treatmentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap?.[treatmentId]
  );
  const taskDetail =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDetail) || {};

  const handleTitleClick = (originClaimNo: string) => {
    if (!originClaimNo) return;

    const { caseCategory, partyId, customerType, businessNo } = taskDetail;

    window.open(
      `/opus/case/history?businessNo=${businessNo}&caseCategory=${caseCategory}&claimNo=${originClaimNo}&customerType=${customerType}&partyId=${partyId}`,
      '_blank'
    );
  };

  const isAdjustment = isAdjustmentFun(treatmentItem?.isAdjustment);

  const suffix = isAdjustment ? (
    <>
      {` ${t('no')}.${t('adjustment')}(${t('businessNo')}.:`}
      <span
        className={styles.no}
        onClick={() => {
          handleTitleClick(treatmentItem?.originClaimNo);
        }}
      >
        {treatmentItem?.originClaimNo || ''}
      </span>
      {')'}
    </>
  ) : (
    ` ${t('no')}. ${treatmentItem?.treatmentNo}`
  );

  return <SectionTitle suffix={suffix} />;
};

export default Title;
