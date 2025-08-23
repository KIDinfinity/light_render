import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Form, Row, Col } from 'antd';
import classNames from 'classnames';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { TherapiesType } from 'claim/pages/Enum';
import lodash from 'lodash';
import { TherapiesHandler } from 'process/HKCLM/ManualAssessment/_models/functions';
import Section, { Fields } from './Section';
import PayableList from './PayableList';
import styles from './index.less';

const OtherProcedureListItem = ({ form, otherProcedureId, treatmentId, procedureExpand }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeOtherProcedureItem`,
      payload: {
        treatmentId,
        otherProcedureId,
      },
    });
  };
  return (
    <Row type="flex" gutter={0} className={styles.container}>
      <Col
        span={10}
        className={classNames({ [styles.left]: true, [styles.expresLeft]: procedureExpand })}
      >
        <FormBorderCard
          marginBottom
          className={styles.item}
          button={{ visiable: editable, callback: handleDelete }}
        >
          <Section form={form} editable={editable} section="OtherProcedure">
            <Fields.TherapiesType treatmentId={treatmentId} />
            <Fields.ProcedureCode procedureId={otherProcedureId} />
          </Section>
        </FormBorderCard>
      </Col>
      <Col span={14} className={styles.right}>
        {procedureExpand && <PayableList otherProcedureId={otherProcedureId} />}
      </Col>
    </Row>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { otherProcedureId }: any) => ({
    otherProcedureItem: modelnamepsace.claimEntities.otherProcedureListMap[otherProcedureId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, otherProcedureId, treatmentId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        const therapiesType = formUtils.queryValue(changedFields?.therapiesType?.value);
        if (!therapiesType || lodash.size(changedFields) > 1) {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveOtherProcedureItem',
            payload: {
              changedFields,
              treatmentId,
              otherProcedureId,
            },
          });
        } else {
          TherapiesHandler({
            previousType: TherapiesType.Crisis,
            treatmentId,
            id: otherProcedureId,
            dispatch,
            changedFields,
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { otherProcedureItem } = props;
      const therapiesType = lodash.has(otherProcedureItem, 'therapiesType')
        ? otherProcedureItem.therapiesType
        : TherapiesType.Crisis;
      return formUtils.mapObjectToFields({ ...otherProcedureItem, therapiesType });
    },
  })(OtherProcedureListItem)
);
