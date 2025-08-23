import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { TherapiesType } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';

const TherapiesAddMap = {
  [TherapiesType.ICU]: ({ dispatch, therapiesType, treatmentId }: any) => {
    dispatch({
      type: `${NAMESPACE}/saveTreatmentItem`,
      payload: {
        changedFields: {
          therapiesType: { value: therapiesType },
        },
        treatmentId,
      },
    });
  },
  [TherapiesType.Crisis]: ({ dispatch, therapiesType, treatmentId }: any) => {
    dispatch({
      type: `${NAMESPACE}/addOtherProcedure`,
      payload: {
        changedValues: { therapiesType },
        treatmentId,
      },
    });
  },
  [TherapiesType.Surgery]: ({ dispatch, therapiesType, treatmentId }: any) => {
    dispatch({
      type: `${NAMESPACE}/addProcedureItem`,
      payload: {
        changedValues: { therapiesType },
        treatmentId,
      },
    });
  },
};

const TherapiesDeleteMap = {
  [TherapiesType.Crisis]: ({ dispatch, id, treatmentId }: any) => {
    dispatch({
      type: `${NAMESPACE}/removeOtherProcedureItem`,
      payload: {
        treatmentId,
        otherProcedureId: id,
      },
    });
  },
  [TherapiesType.Surgery]: ({ dispatch, id, treatmentId }: any) => {
    dispatch({
      type: `${NAMESPACE}/removeProcedureItem`,
      payload: {
        treatmentId,
        procedureId: id,
      },
    });
  },
};

const TherapiesHandler = ({ dispatch, id, treatmentId, previousType, changedFields }: any) => {
  if (!lodash.has(changedFields, 'therapiesType')) {
    return;
  }
  const handleDelete = TherapiesDeleteMap?.[previousType];
  if (lodash.isFunction(handleDelete)) {
    handleDelete({ dispatch, id, treatmentId });
  }
  const therapiesType = formUtils.queryValue(changedFields?.therapiesType?.value);
  const handleAdd = TherapiesAddMap?.[therapiesType];
  if (lodash.isFunction(handleAdd)) {
    handleAdd({ dispatch, therapiesType, treatmentId });
  }
};

export default TherapiesHandler;
