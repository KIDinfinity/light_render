import React from 'react';
import { useSelector } from 'dva';
import { Collapse } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';
import Header from './Header';
import Expand from './Expand';
import ProcedureList from '../Procedure/List';
import OutpatientList from '../OutpatientDate/List';
import style from './Item.less';

const { Panel } = Collapse;

const TreatmentBasic = ({ incidentId, treatmentId }: any) => {
  const treatmentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities?.treatmentListMap?.[treatmentId]
  );
  const incidentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.incidentListMap[incidentId]
  );
  const isTreatmentTypeOP =
    formUtils.queryValue(treatmentItem?.treatmentType) === IncidentCode.OutPatient;
  const claimTypeArray = formUtils.queryValue(incidentItem?.claimTypeArray);
  const isIncludePA = lodash.includes(claimTypeArray, IncidentCode.PA);
  const showExpand = isIncludePA && isTreatmentTypeOP;
  return (
    <div className={style.treatmentCard}>
      <>
        {showExpand && (
          <Collapse bordered={false}>
            <Panel
              header={
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Header treatmentId={treatmentId} incidentId={incidentId} />
                </div>
              }
              key={treatmentId}
            >
              <Expand treatmentId={treatmentId} incidentId={incidentId} />
              {isTreatmentTypeOP && (
                <OutpatientList incidentId={incidentId} treatmentId={treatmentId} />
              )}
              <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
            </Panel>
          </Collapse>
        )}
        {!showExpand && (
          <>
            <Header treatmentId={treatmentId} incidentId={incidentId} />
            <Expand treatmentId={treatmentId} incidentId={incidentId} />
            {isTreatmentTypeOP && (
              <OutpatientList incidentId={incidentId} treatmentId={treatmentId} />
            )}
            <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
          </>
        )}
      </>
    </div>
  );
};

export default TreatmentBasic;
