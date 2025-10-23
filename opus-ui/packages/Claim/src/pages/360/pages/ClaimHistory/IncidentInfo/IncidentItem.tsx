import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import { formatDate, formatCurrency } from '../../../_functions';
import { ReferenceModel } from 'claim/pages/360/enum';
import styles from './style.less';
import useGetReferenceModel from 'claim/components/ReferenceModelProvider/hooks/useGetReferenceModel';

interface IProps {
  incidentItem: any;
}

const { DataItem } = DataLayout;
const IncidentInfo: FunctionComponent<IProps> = ({ incidentItem }) => {
  const diseaseNameList = useSelector(({ insured360 }: any) => insured360?.diseaseNameList);
  const diseaseName =
    incidentItem?.diagnosisName ||
    lodash.find(diseaseNameList, { dictCode: incidentItem?.claimDisease })?.dictName ||
    '';
  const claimDiseaseVal = `${incidentItem?.claimDisease} - ${diseaseName}`;
  const relationshipCodeVal = incidentItem?.relationshipCode || '';
  const claimDisease = relationshipCodeVal
    ? `${claimDiseaseVal},${relationshipCodeVal}`
    : claimDiseaseVal;
  const referenceModel = useGetReferenceModel();
  const isSummaryPageModel = referenceModel === ReferenceModel.SummaryPage;

  return (
    <DataLayout span={isSummaryPageModel ? 3 : 12} className={styles.incidentItem}>
      <DataItem
        span={isSummaryPageModel ? 4 : 24}
        title={formatMessageApi({ Label_BIZ_Claim: 'ClaimedDisease' })}
      >
        {claimDisease}
      </DataItem>
      <DataItem title={formatMessageApi({ Label_BIZ_Claim: 'IncidentDate' })}>
        {formatDate(incidentItem?.incidentDate)}
      </DataItem>
      <DataItem title={formatMessageApi({ Label_BIZ_Claim: 'CauseOfIncident' })}>
        {formatMessageApi({ Dropdown_CLM_CauseOfIncident: incidentItem?.causeOfIncident })}
      </DataItem>
      <DataItem title={formatMessageApi({ Label_BIZ_Claim: 'ClaimType' })}>
        {lodash
          .chain(incidentItem?.claimType)
          .split(',')
          .compact()
          .map((item) => formatMessageApi({ Dropdown_COM_BusinessType: item }))
          .join(',')
          .value()}
      </DataItem>
      <DataItem title={formatMessageApi({ Label_BIZ_Claim: 'PaymentAmount' })}>
        {lodash.isNumber(incidentItem?.paymentAmount) &&
          formatCurrency({
            currency: incidentItem?.payoutCurrency,
            value: incidentItem?.paymentAmount,
          })}
      </DataItem>
    </DataLayout>
  );
};

export default connect()(IncidentInfo);
