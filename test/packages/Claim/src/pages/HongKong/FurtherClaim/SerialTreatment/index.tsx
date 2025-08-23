import React, { useEffect, useRef } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentInfo from './IncidentInfo';
import TreatmentSerial from './TreatmentSerial';
import { generateClaimData, generateSerialTreatment, filterRelationTreatment } from '../functions';

import styles from './styles.less';

const SerialClaim = ({
  namespace,
  isVld000568,
  dispatch,
  claimProcessData,
  claimEntities,
  serialTreatments,
  taskDetail,
  saveFurtherClaimRelationshipId,
}: any) => {
  const claimData = {
    claimProcessData,
    claimEntities,
    serialTreatments,
    saveFurtherClaimRelationshipId,
  };
  const incidentList = generateClaimData(claimData);
  const dataSource = generateSerialTreatment(claimData, serialTreatments, taskDetail);

  const dataSourceRef = useRef();
  useEffect(() => {
    const relationTreatmentsN = filterRelationTreatment(dataSource);
    //@ts-ignore
    const relationTreatmentsO = filterRelationTreatment(dataSourceRef.current.dataSource);
    const dictCodes = lodash
      .chain(relationTreatmentsN)
      .map((item: any) => item.primaryDiagnosisCode)
      .compact()
      .uniq()
      .value();

    const treatmentsN = lodash
      .chain(relationTreatmentsN)
      .compact()
      .map((item: any) => ({
        primaryDiagnosisCode: item.primaryDiagnosisCode,
        treatmentId: item.treatmentId,
        relaTreatmentId: item.relaTreatmentId,
      }))
      .value();

    const treatmentsO = lodash
      .chain(relationTreatmentsO)
      .compact()
      .map((item: any) => ({
        primaryDiagnosisCode: item.primaryDiagnosisCode,
        treatmentId: item.treatmentId,
        relaTreatmentId: item.relaTreatmentId,
      }))
      .value();

    if (!lodash.isEmpty(dictCodes) && !lodash.isEqual(treatmentsO, treatmentsN)) {
      dispatch({
        type: `${namespace}/getDiagnosisMisDict`,
        payload: { dictCodes: dictCodes },
      });

      //@ts-ignore
      dataSourceRef.current.dataSource = dataSource;
    }
  }, [dataSource]);

  return (
    //@ts-ignore
    <div className={styles.serialClaimList} ref={dataSourceRef}>
      {!lodash.isEmpty(incidentList) &&
        lodash.map(incidentList, (incident: any) => (
          <div className={styles.serialClaimItem} key={incident.id}>
            <IncidentInfo namespace={namespace} incident={incident} />
            <TreatmentSerial
              namespace={namespace}
              treatmentList={incident.treatmentList}
              isVld000568={isVld000568}
              dataSource={dataSource}
            />
          </div>
        ))}
    </div>
  );
};

export default connect((state: any, { namespace }: any) => ({
  claimProcessData: lodash.get(state, `${namespace}.claimProcessData`),
  claimEntities: lodash.get(state, `${namespace}.claimEntities`),
  serialTreatments: lodash.get(state, `${namespace}.serialTreatments`),
  taskDetail: state?.processTask?.getTask,
  dictsOfDiagnosis: lodash.get(state, `${namespace}.dictsOfDiagnosis`),
  saveFurtherClaimRelationshipId: lodash.get(state, `${namespace}.saveFurtherClaimRelationshipId`),
}))(SerialClaim);
