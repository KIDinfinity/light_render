import React, { useContext, useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useDispatch, useSelector } from 'dva';
import { Button, Form } from 'antd';
import lodash from 'lodash';
import context from 'bpm/pages/OWBEntrance/Context/context';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Title from './Title';
import Section, { HeaderFields as Fields } from './Section';
import { useGetOcrShow } from '../../_hooks';
import styles from './Header.less';

const Header = ({ incidentId, incidentItem, form }: any) => {
  const dispatch = useDispatch();

  const { dispatch: reducerDispatch } = useContext(context);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.treatmentListMap
  );

  const enableInvestigation =
    useSelector(({ processTask }: any) => processTask?.getTask?.enableInvestigation) || false;

  const incidentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.incidentListMap
  );

  const showOcr = useGetOcrShow({ incidentId, incidentItem, incidentListMap, treatmentListMap });

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getIndicator`,
    });
  }, []);

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

      <div className={styles.buttonWrap}>
        {!!editable && enableInvestigation && (
          <Button
            className={styles.investigationWrap}
            size="small"
            onClick={async () => {
              const isSucess = await dispatch({
                type: `${NAMESPACE}/addCaseLabel`,
              });

              if (!!isSucess && reducerDispatch) {
                reducerDispatch({
                  type: 'setIsRefresh',
                  payload: { isRefresh: true },
                });
              }
            }}
          >
            {formatMessageApi({
              Label_BIZ_Claim: 'Investigation',
            })}
          </Button>
        )}

        {!!showOcr && (
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
        )}
      </div>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
  incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId],
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
