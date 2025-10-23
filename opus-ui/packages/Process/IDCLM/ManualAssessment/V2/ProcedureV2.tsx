import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { Procedure } from 'process/Components/BussinessControls';
import getOrderByProcedureList from 'claim/utils/getOrderByProcedureList';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  incidentId: string;
  treatmentId: string;
  editable: boolean;
}
const ProcedureV2 = (props: IProps) => {
  const { treatmentId } = props;

  const treatmentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]
  );
  const mainBenefitList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.mainBenefitList
  );
  const procedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.procedureList
  );
  const procedureListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.procedureListMap
  );
  const nowProcedureList = getOrderByProcedureList(procedureListMap, procedureList);

  return (
    <Procedure.LTMAEntrance treatmentItem={treatmentItem}>
      {lodash.map(mainBenefitList, (item: any) => (
        <Procedure.LTMainBenefitItem {...props} mainBenefitId={item} key={item} />
      ))}
      <Procedure.LTICUItem {...props} treatmentItem={treatmentItem} />
      {lodash.map(nowProcedureList, (item: any) => (
        <Procedure.LTBasicItem {...props} procedureId={item} key={item} />
      ))}
      <Procedure.LTAdd {...props} />
    </Procedure.LTMAEntrance>
  );
};

export default ProcedureV2;
