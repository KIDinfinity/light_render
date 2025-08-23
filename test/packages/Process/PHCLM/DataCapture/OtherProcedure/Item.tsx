import React from 'react';
import classNames from 'classnames';
import { NAMESPACE } from '../activity.config';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { TherapiesType } from 'claim/pages/Enum';
import lodash from 'lodash';
import { TherapiesHandler } from 'process/PHCLM/DataCapture/_models/functions';
import Section, { Fields } from './Section';
import styles from './index.less';

const OtherProcedureListItem = ({ form, otherProcedureId, treatmentId }: any) => {
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
    <FormBorderCard
      marginBottom
      className={classNames(styles.itemCard, 'card3BgColor')}
      button={{ visiable: editable, callback: handleDelete }}
    >
      <Section form={form} editable={editable} section="OtherProcedure">
        <Fields.TherapiesType treatmentId={treatmentId} />
        <Fields.ProcedureCode procedureId={otherProcedureId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { otherProcedureId }: any) => ({
    otherProcedureItem: modelnamepsace.claimEntities.otherProcedureListMap[otherProcedureId],
    validating: formCommonController.validating,
    claimNo: modelnamepsace.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, otherProcedureId, treatmentId, validating, claimNo } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveOtherProcedureItem',
              payload: {
                changedFields,
                treatmentId,
                otherProcedureId,
              },
            });
          }, 0);
        } else {
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
      }
    },
    mapPropsToFields(props: any) {
      const { otherProcedureItem } = props;
      const therapiesType = lodash.has(otherProcedureItem, 'therapiesType')
        ? otherProcedureItem.therapiesType
        : 'CI';
      return formUtils.mapObjectToFields({ ...otherProcedureItem, therapiesType });
    },
  })(OtherProcedureListItem)
);
