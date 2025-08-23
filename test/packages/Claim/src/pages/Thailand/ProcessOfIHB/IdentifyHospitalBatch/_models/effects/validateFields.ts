import { formUtils } from 'basic/components/Form';

export default function* validateFields(_: any, { select }: any) {
  const forms = yield select(
    (state: any) => state.IdentifyHospitalBatchController.claimProcessData.forms
  );

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: [forms.BASICINFORMATIONFORM],
    force: true,
  });
  return errors;
}
