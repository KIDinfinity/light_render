import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  deleteDraftVersion,
} from '@/services/ccBusinessDataControllerService';
import lodash from 'lodash';

export default function* ({ payload }: PayProps, { call, select }: SagaProps) {
  const { rows = [] } = payload;
  const dataImageIds = lodash
    .chain(rows)
    .map((item: any) => item.id)
    .value();
  const response = yield call(deleteDraftVersion, dataImageIds);
  return response;
}
