import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';

import lodash from 'lodash';
import {
  removeMainBenefitItem,
  addTherapiesItem,
} from 'process/THCLM/DataCapture/_models/functions';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import Section, { Fields } from './Section';
import styles from './ProcedureList.less';

const MainBenefitListItem = ({ form, mainBenefitId, treatmentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const handleDelete = () => {
    removeMainBenefitItem(dispatch, treatmentId, mainBenefitId);
  };
  return (
    <FormBorderCard
      marginBottom
      className={styles.itemCard}
      button={{ visiable: editable, callback: handleDelete }}
    >
      <Section form={form} editable={editable} section="Procedure">
        <Fields.TherapiesType treatmentId={treatmentId} />
        <Fields.MainBenefit treatmentId={treatmentId} />
        {/* <Fields.Doctor /> */}
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { mainBenefitId }: any) => ({
    mainBenefitItem: modelnamepsace.claimEntities.mainBenefitListMap[mainBenefitId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { dispatch, mainBenefitId, treatmentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveMainBenefitItem',
              payload: {
                changedFields,
                treatmentId,
                mainBenefitId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveMainBenefitItem',
            payload: {
              changedFields,
              treatmentId,
              mainBenefitId,
            },
          });
        }
        if (
          !!formUtils.queryValue(therapiesType) &&
          formUtils.queryValue(therapiesType) !== TherapiesTypeEnum.MainBenefit
        ) {
          removeMainBenefitItem(dispatch, treatmentId, mainBenefitId);
          addTherapiesItem(dispatch, changedFields, treatmentId);
        }
      }
    },
    mapPropsToFields(props: any) {
      const { mainBenefitItem } = props;
      const therapiesType = lodash.has(mainBenefitItem, 'therapiesType')
        ? mainBenefitItem.therapiesType
        : 'MainBenefit';
      return formUtils.mapObjectToFields({ ...mainBenefitItem, therapiesType });
    },
  })(MainBenefitListItem)
);
