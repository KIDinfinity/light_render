import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { sectionErrors } from 'process/GeneralPOS/BaseProduct/validators';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import delay from '@/utils/delay';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

export default function* validateFields(action: any, { select, put }: any) {
  const isReAss = action?.payload?.type === 'reass';

  const skipValidate = yield put.resolve({
    type: 'skipValidate',
    payload: {
      isReAss,
    },
  });
  if (skipValidate.result) {
    return [];
  }
  yield put({
    type: 'formCommonController/handleValidating',
  });
  yield delay(10);

  let forms: Object[] = yield select(
    ({ formCommonController }: any) => formCommonController.forms
  );
  const submited: boolean = yield select(
    ({ formCommonController }: any) => formCommonController.submited
  );
  const processData: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const claimEntities: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  if (isReAss) {
    forms = Object.fromEntries(
      Object.entries(forms).filter(
        ([key, value]) =>
          !/(RequestInfo)|(duplicatePolicy)|(ChangeCustomerInformation)|(PaymentMode)|(Suitability)/i.test(
            key
          )
      )
    );
  }
  if (!isReAss && formUtils.queryValue(processData?.decision) === DecisionEnum.D) {
    forms = Object.fromEntries(
      Object.entries(forms).filter(([key, value]) => ['RequestInfo', 'Suitability'].includes(key))
    );
  }

  let errors: Object[] = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(processData));
  const collectSectionErrors = sectionErrors(content, submited, claimEntities);
  if (lodash.isArray(collectSectionErrors) && collectSectionErrors.length > 0) {
    errors = [...errors, ...collectSectionErrors];
  }
  yield delay(10);

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
