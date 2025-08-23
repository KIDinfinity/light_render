import { saveSnashot } from 'basic/utils/SnapshotTool';

import { EOptionType } from 'basic/enum/EOptionType';

export default function* ({ payload }: any, { call }: any) {
  const { processInstanceId, taskId, claimProcessData } = payload;

  yield saveSnashot({
    taskDetail: { processInstanceId, taskId },
    dataForSubmit: claimProcessData,
    optionType: EOptionType.Save,
  });
}
