import React from 'react';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import { connect, useDispatch, useSelector } from 'dva';
import { Button, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Title from './Title';
import Section, { HeaderFields as Fields } from './Section';
import { useGetOcrShow } from '../../_hooks';
import styles from './Header.less';

const Header = ({ incidentId, incidentItem, form }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.treatmentListMap
  );
  const incidentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.incidentListMap
  );
  const showOcr = useGetOcrShow({ incidentId, incidentItem, incidentListMap, treatmentListMap });

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title incidentId={incidentId} />
      </div>
      <div className={styles.section}>
        <Section form={form} editable={editable} section="Incident.Header">
          <Fields.ClaimTypeArray incidentId={incidentId} />
          {/* <Fields.SubClaimType incidentId={incidentId} /> */}
        </Section>
      </div>
      {!!showOcr && (
        <div className={styles.buttonWrap}>
          <Button
            disabled={!editable}
            size="small"
            onClick={() => {
              dispatch({
                type: 'commonClaimAssessmentController/callOcr',
                payload: {
                  nameSpace: NAMESPACE,
                },
              });
            }}
          >
            AI OCR
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
    validating: formCommonController.validating,
    incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId],
  })
)(
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
            validating: lodash.size(changedFields) > 1,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { incidentItem } = props;

      return formUtils.mapObjectToFields({
        ...incidentItem,
        subClaimType: !incidentItem.subClaimType ? undefined : incidentItem.subClaimType, // antd select组件value为undefined时才会显示placeholder
      });
    },
  })(Header)
);
