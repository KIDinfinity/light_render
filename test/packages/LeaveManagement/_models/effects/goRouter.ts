import { history } from 'umi';
import { Mode } from '../../Enum';

export default function* (_: any, { select }: any) {
  const mode = yield select((state: any) => state.leaveManagement.mode);
  const isAbbreviatedMode = mode === Mode.Abbreviated;

  if (isAbbreviatedMode) {
    history.back();
  }
}
