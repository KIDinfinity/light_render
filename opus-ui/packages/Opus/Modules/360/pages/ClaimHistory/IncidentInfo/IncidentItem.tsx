import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section from '../../../_component/Section';
import moment from 'moment';

interface IProps {
  incidentItem: any;
  offsetNonInvasiveCancerFlag?: string;
}

const transConfig = {
  incidentDate: { type: 'date' },
  paymentAmount: { type: 'currency', currencyField: 'payoutCurrency' },
  offsetNonInvasiveCancerFlag: {
    visibleRule: ({ offsetNonInvasiveCancerFlag }: any) => offsetNonInvasiveCancerFlag === 'Y',
  },
};

const getDate = (date) => (date ? moment(date).format('YYYY/MM/DD') : '');

const IncidentInfo: FunctionComponent<IProps> = ({ incidentItem, offsetNonInvasiveCancerFlag }) => {
  const diseaseNameList = useSelector(({ insured360 }: any) => insured360?.diseaseNameList);
  const diseaseName =
    incidentItem?.diagnosisName ||
    lodash.find(diseaseNameList, { dictCode: incidentItem?.claimDisease })?.dictName ||
    '';
  const claimDisease = `${incidentItem?.claimDisease || ''} ${diseaseName}`;
  const treatmentItem = incidentItem?.treatmentList?.[0];
  const hospitalisationPeriod =
    treatmentItem && (treatmentItem.dateOfAdmission || treatmentItem.dateOfDischarge)
      ? `${getDate(treatmentItem.dateOfAdmission)} - ${getDate(treatmentItem.dateOfDischarge)}`
      : null;
  return (
    <Section
      sectionId={'Incident'}
      transConfig={transConfig}
      data={{
        ...incidentItem,
        claimDisease,
        hospitalisationPeriod,
        offsetNonInvasiveCancerFlag,
        claimType: lodash
          .chain(incidentItem?.claimType)
          .split(',')
          .compact()
          .map((item) => formatMessageApi({ Dropdown_COM_BusinessType: item }))
          .join(',')
          .value(),
      }}
    />
  );
};

export default connect()(IncidentInfo);
