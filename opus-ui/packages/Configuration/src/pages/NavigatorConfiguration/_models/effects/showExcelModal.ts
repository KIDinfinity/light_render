import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { excelData } = payload;
  yield put({
    type: 'saveModal',
    payload: {
      showExcelModal: true,
      excelData,
    },
  });
}
