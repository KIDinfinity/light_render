import { produce } from 'immer';
import lodash from 'lodash';

export default function saveEnclosureData(state: any, action: any) {
  const { previewEnclosure, letterIndex, id } = action?.payload;
  return produce(state, (draftState: any) => {
    lodash.set(draftState, `previewEnclosure.${id}[${letterIndex}]`, previewEnclosure);
  });
}
