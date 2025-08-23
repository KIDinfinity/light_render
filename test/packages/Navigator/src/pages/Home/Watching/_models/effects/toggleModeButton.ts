import { SS, SSKey } from '@/utils/cache';
import modeButtonService from '../machines/modeButtonService';
import { Mode } from '../../View/ModePanel/Mode';

export default function* toggleModeButton({ payload }: any, { select, put }: any) {
  const { mode } = payload || {};

  let autoMode = '';
  // 这里是为了处理hotkey的模式切换操作
  if (!mode) {
    const stateMode = yield select((state: any) => state.navigatorHomeWatching.mode);
    if (stateMode === Mode.Flow) {
      autoMode = Mode.Card;
    } else if (stateMode === Mode.Card) {
      autoMode = Mode.Table;
    } else if (stateMode === Mode.Table) {
      autoMode = Mode.Flow;
    }
  }

  const { value }: any = modeButtonService.send((mode || autoMode).toUpperCase());

  SS.setItem(SSKey.TaskMode, value.mode);

  yield put({
    type: 'saveModeButton',
    payload: {
      mode: value.mode,
    },
  });
  yield put({
    type: 'saveModeEnter',
    payload: {
      enterActive: 'inactive',
    },
  });
}
