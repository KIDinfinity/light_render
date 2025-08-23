import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select }: any) {
  const { claimProcessData } = yield select((state: any) => ({
    ...state.exceptionalHandlingController,
  }));

  return formUtils.cleanValidateData(claimProcessData);
}
