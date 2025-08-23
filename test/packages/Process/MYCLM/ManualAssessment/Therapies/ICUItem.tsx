import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Form, Row, Col } from 'antd';
import { connect, useDispatch } from 'dva';
import classNames from 'classnames';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import lodash from 'lodash';
import { TherapiesHandler } from 'process/MYCLM/ManualAssessment/_models/functions';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import Section, { BasicFields as Fields } from './Section';
import styles from './index.less';

const ICUItem = ({ form, editable, treatmentId }: any) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeICUItem`,
      payload: {
        treatmentId,
      },
    });
  };
  return (
    <div className={styles.item}>
      <Row type="flex" gutter={0} className={styles.container}>
        <Col span={10} className={classNames(styles.left, styles.icuItem)}>
          <FormBorderCard button={{ visiable: editable, callback: handleDelete }} marginBottom>
            <Section form={form} editable={editable} section="ICU">
              <Fields.TherapiesTypeICU treatmentId={treatmentId} />
              <Fields.IcuFromDate treatmentId={treatmentId} />
              <Fields.IcuToDate treatmentId={treatmentId} />
              <Fields.IcuDays treatmentId={treatmentId} />
            </Section>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right} />
      </Row>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
    treatmentItem: modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId] || {},
    validating: formCommonController.validating,
    claimNo: modelnamepsace.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { dispatch, incidentId, treatmentId, validating, claimNo } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'saveTreatmentItem',
              payload: {
                changedFields,
                incidentId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveTreatmentItem',
            payload: {
              changedFields,
              incidentId,
              treatmentId,
            },
          });
          if(lodash.size(changedFields) === 1)
            TherapiesHandler({
              previousType: TherapiesTypeEnum.ICU,
              treatmentId,
              dispatch,
              changedFields,
            });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      const therapiesTypeValue = treatmentItem.icu ? 'ICU' : '';
      const therapiesType = lodash.has(treatmentItem, 'therapiesType')
        ? treatmentItem.therapiesType
        : therapiesTypeValue;
      return formUtils.mapObjectToFields({ ...treatmentItem, therapiesType });
    },
  })(ICUItem)
);
