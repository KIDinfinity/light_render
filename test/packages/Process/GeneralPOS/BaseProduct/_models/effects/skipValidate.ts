import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';

export default function* skipValidate(action: any, { select, put }: any) {
  const rcsApplicable: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.rcsApplicable
  );
  const preDecision: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.preDecision
  );
  const decision: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );

  const transactionTypesId = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.transactionTypes?.[0]
  );
  const transactionTypeCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionTypesId]?.transactionTypeCode
  );
  const suitability = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionTypesId]?.suitability
  );
  const isReAss = action?.payload?.isReAss;
  let forms: Object[] = yield select(
    ({ formCommonController }: any) => formCommonController.forms
  );
  if (!isReAss) {
    forms = Object.fromEntries(
      Object.entries(forms).filter(([key, value]) => /(RequestInfo)|(Suitability)/i.test(key))
    );
    if (!suitability?.editFlag) {
      forms = Object.fromEntries(
        Object.entries(forms).filter(([key, value]) => /(RequestInfo)/i.test(key))
      );
    }
    const errors: Object[] = yield formUtils.validateFormsAndGetErrors({
      forms: lodash.values(forms),
      force: true,
    });

    if (!lodash.isEmpty(errors)) {
      return {
        result: false,
        hasError: true,
        errors,
      };
    }

    if (
      rcsApplicable === '02' &&
      ![TransactionTypeEnum.SRV003, TransactionTypeEnum.SRV006].includes(
        formUtils.queryValue(transactionTypeCode)
      )
    ) {
      return {
        result: true,
      };
    }
    if (lodash.toUpper(preDecision) === 'AP') {
      return {
        result: true,
      };
    }
  }

  return {
    result: false,
  };
}
