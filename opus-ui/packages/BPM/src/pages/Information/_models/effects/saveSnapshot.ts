import lodash from 'lodash';
import { saveData } from '@/services/dcSnapshotService';
import Snapshot from 'basic/utils/snapshot';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';

const snapshot = new Snapshot();

export default function* saveSnapshot({ payload }: any, { select, call }: any) {
  const { data, signal } = lodash.pick(payload, ['data', 'signal']);
  const { informationData } = yield select((state) => ({
    informationData: state?.navigatorInformationController?.informationData,
  }));
  const taskId = formUtils.queryValue(informationData?.caseNo);

  const dataFormat = lodash.map(data, (item) => {
    return {
      ...item,
      expiryDate: item.expiryDate && moment(item.expiryDate).format(),
      effectiveDate: item.effectiveDate && moment(item.effectiveDate).format(),
    };
  });
  if (snapshot.validateInformationSnapshot({ data: dataFormat })) {
    const submitData = {
      taskId,
      dataType: 'information',
      dataValue: JSON.stringify(dataFormat),
    };
    yield call(saveData, submitData, { signal });
  }
}
