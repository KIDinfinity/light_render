import React from 'react';

import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import TaskStatus from 'basic/enum/TaskStatus';
import IntranceButton from 'claim/components/IntranceButton';
import Incident, { SectionTitle } from 'process/Components/BussinessControls/Incident';
import styles from './LYDC.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: boolean;
}

const LYDCBar = (props: IProps) => {
  const dispatch = useDispatch();

  const { incidentId, NAMESPACE, editable }: IProps = props;

  const taskStatus = useSelector(({ processTask }: any) => processTask?.getTask?.taskStatus);
  const treatmentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.treatmentListMap
  );

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const treatmentRelationshipSelectionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData?.claimRelation?.treatmentRelationshipSelectionList
  );

  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.incidentListMap?.[incidentId]
  );

  const intrances = [
    {
      handler: () => {
        dispatch({
          type: 'claimCaseController/saveFurtherClaimVisable',
          payload: { furtherClaimVisable: true },
        });
      },
      labelId: 'SerialClaimSelection',
      visible:
        taskStatus === TaskStatus.completed || !lodash.isEmpty(treatmentRelationshipSelectionList),
    },
    {
      handler: () => {
        dispatch({
          type: `${NAMESPACE}/removeIncidentItem`,
          payload: {
            incidentId,
          },
        });
      },
      labelId: 'Delete',
      visible: editable && (!isRegisterMcs || incidentItem?.isManualAdd),
    },
    {
      handler: () => {
        const invoiceIdList = lodash.map(
          incidentItem.treatmentList,
          (treatmentId) => treatmentListMap?.[treatmentId]?.invoiceList
        );
        dispatch({
          type: `${NAMESPACE}/savePopUpInvoiceList`,
          payload: {
            popUpInvoiceIdList: lodash.chain(invoiceIdList).flatten().compact().value(),
          },
        });
        dispatch({
          type: `${NAMESPACE}/setPopUpStatus`,
          payload: {
            popUpstatus: true,
          },
        });
      },
      labelId: 'Expand Invoice',
      visible: editable,
    },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <SectionTitle suffix={` No. ${incidentItem.incidentNo}`} />
      </div>
      <div className={styles.section}>
        <Incident.SectionHeader {...props} />
      </div>
      <IntranceButton intrances={intrances} />
    </div>
  );
};

export default LYDCBar;
