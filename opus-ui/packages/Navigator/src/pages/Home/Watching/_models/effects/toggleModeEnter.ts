import modeButtonService from '../machines/modeButtonService';

export default function* toggleModeEnter(_: any, { put }: any) {
  const machineState = modeButtonService.send('TOGGLE');
  const { enterActive }: any = machineState.value;

  yield put({
    type: 'saveModeEnter',
    payload: {
      enterActive,
    },
  });
}
