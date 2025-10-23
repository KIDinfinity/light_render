import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (_, { select }) {
  const { UnknownDocumentController, taskDetail } = yield select((state) => ({
    UnknownDocumentController: state.UnknownDocumentController,
  }));
  return assembleDefaultDataForSave({
    taskDetail,
    optionType: EOptionType.Submit,
    dataForSubmit: UnknownDocumentController,
  });
}
