import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form, Button } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import Section, { HeaderFields as Fields } from './Section';
import TaskStatus from 'basic/enum/TaskStatus';
import Title from './Title';
import IntranceButton from 'claim/components/IntranceButton';
import { useGetOcrShow } from '../../_hooks';
import styles from './Header.less';

const Header = ({ incidentId, form, incidentItem, index }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const taskStatus = useSelector(({ processTask }: any) => processTask?.getTask?.taskStatus);
  const caseCategory = useSelector(({ processTask }: any) => processTask?.getTask?.caseCategory);

  const treatmentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.treatmentListMap
  );
  const incidentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.incidentListMap
  );

  const markinId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimProcessData?.markinId
  );

  const policyId = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    formUtils.queryValue(modelnamepsace.claimProcessData?.insured?.policyId)
  );

  const showOcr = useGetOcrShow({ incidentId, incidentItem, incidentListMap, treatmentListMap });

  const showGenMarkin = (() => {
    // if no the target case catagory or not the first catagory, hide markin ID button
    if (caseCategory !== 'HK_CLM_CTG002' || index > 0) {
      return false;
    }

    return true;
  })();

  const disableGenMarkin = (() => {
    // if no policyId,  disabled button
    if (lodash.isNil(policyId) || policyId === '') {
      return true;
    }

    // if no incidents,  disabled button
    if (lodash.keys(incidentListMap || []).length < 1) {
      return true;
    }

    // if no claim type, disabled button
    if (
      lodash.every(Object.values(incidentListMap) || [], (incident: any) => {
        const claimTypeArray = formUtils.queryValue(incident?.claimTypeArray);

        return lodash.isNil(claimTypeArray) || lodash.isEmpty(claimTypeArray);
      })
    ) {
      return true;
    }

    // if markinId already exist,  disabled button
    if (!lodash.isNil(markinId)) {
      return true;
    }

    if (taskStatus === TaskStatus.completed) {
      return true;
    }

    return false;
  })();

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
          <Fields.ClaimTypeArray incidentId={incidentId} />
          <Fields.SubClaimType incidentId={incidentId} />
        </Section>
      </div>
      {!!showOcr && (
        <div className={styles.buttonWrap}>
          <Button
            disabled={!editable}
            onClick={() => {
              dispatch({
                type: 'commonClaimAssessmentController/callOcr',
                payload: {
                  nameSpace: NAMESPACE,
                  incidentId,
                },
              });
            }}
          >
            AI OCR
          </Button>
        </div>
      )}

      {showGenMarkin && (
        <Button
          className={styles.markinBtn}
          disabled={disableGenMarkin}
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/getMarkinId`,
              payload: {
                policyNo: policyId,
                incidentId,
              },
            });
          }}
        >
          Generate Markin Id
        </Button>
      )}
      <IntranceButton intrances={intrances} />
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
  incidentItem: modelnamepsace.claimEntities.incidentListMap?.[incidentId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveIncidentItem',
          payload: {
            changedFields,
            incidentId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { incidentItem } = props;

      return formUtils.mapObjectToFields({
        ...incidentItem,
        subClaimType: !incidentItem?.subClaimType ? undefined : incidentItem.subClaimType, // antd select组件value为undefined时才会显示placeholder
      });
    },
  })(Header)
);
