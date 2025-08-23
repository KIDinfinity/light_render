import React from 'react';
import { NAMESPACE } from '../activity.config';
import classNames from 'classnames';
import { connect, useSelector, useDispatch } from 'dva';
import { Form, Row, Col } from 'antd';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';
import {
  removeProcedureItem,
  TherapiesHandler,
} from 'process/HKCLM/ManualAssessment/_models/functions';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import PayableList from './PayableList';
import styles from './index.less';

interface IProps extends FormComponentProps {
  incidentId?: string;
  procedureId?: string;
  treatmentId?: string;
  procedureExpand?: boolean;
}

const ExpandItem = ({ form, incidentId, treatmentId, procedureId }: IProps) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/saveEntry`,
      target: 'removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
    removeProcedureItem(dispatch, treatmentId, procedureId);
  };

  return (
    <div className={styles.item}>
      <Row type="flex" gutter={0} className={styles.container}>
        <Col span={10} className={classNames(styles.left, styles.expresLeft)}>
          <FormBorderCard
            button={{ visiable: editable, callback: handleDelete }}
            // className={isAdjustMent && styles.isAdjustment}
          >
            <Section form={form} editable={editable} section="Procedure">
              <Fields.TherapiesType treatmentId={treatmentId} />
              <Fields.ProcedureCode procedureId={procedureId} />
              <Fields.OperationDate treatmentId={treatmentId} incidentId={incidentId} />
              <Fields.ProcedureDescription />
              <Fields.SurgeryCategory />
            </Section>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right}>
          <PayableList procedureId={procedureId} />
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { procedureId }: any) => ({
    item: modelnamepsace.claimEntities.procedureListMap[procedureId],
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, procedureId, treatmentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveProcedureItem',
          payload: {
            changedFields,
            treatmentId,
            procedureId,
          },
        });
        if(lodash.size(changedFields) === 1)
          TherapiesHandler({
            previousType: TherapiesTypeEnum.Surgery,
            treatmentId,
            id: procedureId,
            dispatch,
            changedFields,
          });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      const therapiesType = lodash.has(item, 'therapiesType') ? item.therapiesType : 'Surgery';

      return formUtils.mapObjectToFields({ ...item, therapiesType });
    },
  })(ExpandItem)
);
