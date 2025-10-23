import React, { useEffect } from 'react';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { useSelector, useDispatch } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import Basic from './Basic';
import Treatment from '../Treatment';
import Surgical from '../Surgical';
import Title from '../Title';

import styles from './index.less';

const Main = ({ data = {}, editable }: any) => {
  const dispatch = useDispatch();

  const diagnosisItem =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.businessData?.incidentList?.[0]?.diagnosisList?.[0] || {}
    ) || {};

  useEffect(() => {
    if (!data?.diagnosisName && !!diagnosisItem?.diagnosisName) {
      dispatch({
        type: `${NAMESPACE}/claimEstimateIncidentUpdate`,
        payload: {
          changedFields: {
            ...lodash.pick(diagnosisItem, [
              'diagnosisName',
              'diagnosisCode',
              'diagnosisNo',
              'relationshipCode',
              'diagnosisKey',
              'specificWomenDisease',
              'specificInfectiousDisease',
              'specificThreeMajorDisease',
              'wop2Flag',
              'adultDiseases',
            ]),
          },
        },
      });
    }
  }, [diagnosisItem, data?.diagnosisName]);

  return (
    <div className={styles.incidentWrap}>
      <Title
        title={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.incidentInformation' })}
      />
      <Basic data={data} editable={editable} />
      <Treatment list={data?.nonSupportTreatmentList || []} editable={editable} />
      <Surgical list={data?.nonSupportProcedureList || []} editable={editable} />
    </div>
  );
};

export default Main;
