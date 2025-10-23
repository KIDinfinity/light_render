import { savePendingSnashot } from 'basic/utils/SnapshotTool';

import { EOptionType } from 'basic/enum';

export default async ({ dataForSubmit, taskDetail }: any) => {
  savePendingSnashot({
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.triggerSnapshotHook,
  });
};
