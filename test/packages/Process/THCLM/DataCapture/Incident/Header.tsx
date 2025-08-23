import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import Section, { HeaderFields as Fields } from './Section';
import TaskStatus from 'basic/enum/TaskStatus';
import Title from './Title';
import IntranceButton from 'claim/components/IntranceButton';
import styles from './Header.less';

const Header = ({ incidentId, form, incidentItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
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

  const dispatch = useDispatch();

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
          (treatmentId) => treatmentListMap[treatmentId]?.invoiceList
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
        <Title incidentId={incidentId} />
      </div>
      <div className={styles.section}>
        <Section form={form} editable={editable} section="Incident.Header">
          <Fields.ClaimTypeArray />
        </Section>
      </div>
      <IntranceButton intrances={intrances} />
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
    validating: formCommonController.validating,
    claimNo: modelnamepsace.claimProcessData?.claimNo,
    incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId],
    treatmentList: modelnamepsace.claimEntities.incidentListMap[incidentId].treatmentList || [],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, claimNo, treatmentList, incidentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveIncidentItem',
          payload: {
            changedFields,
            incidentId,
          },
        });
        if (lodash.size(changedFields) === 1) {
          // 新增一条treatment数据
          const claimTypeArray: any = changedFields?.claimTypeArray?.value;
          if (
            lodash.isEmpty(treatmentList) &&
            lodash.has(changedFields, 'claimTypeArray') &&
            lodash.isString(claimTypeArray) &&
            ['OP', 'IP'].includes(claimTypeArray)
          ) {
            dispatch({
              type: `${NAMESPACE}/addTreatmentItem`,
              payload: {
                incidentId,
                claimNo,
                treatmentType: claimTypeArray,
              },
            });
          }
        }
      }
    },
    mapPropsToFields(props: any) {
      const { incidentItem } = props;

      return formUtils.mapObjectToFields(incidentItem, {});
    },
  })(Header)
);
