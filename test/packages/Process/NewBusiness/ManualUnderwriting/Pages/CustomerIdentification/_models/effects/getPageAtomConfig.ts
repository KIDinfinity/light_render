import lodash from 'lodash';
import { queryPageAtomConfigUI } from '@/services/miscPageAtomConfigControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SS, SSKey } from '@/utils/cache';

export default function* getPageAtomConfig({ payload }: any, { call, put }: any) {
  const regionCode: any = SS.getItem(SSKey.CONFIGS)?.region;
  const { activityCode, caseCategory } = payload;
  const response = yield call(queryPageAtomConfigUI, {
    activityCode,
    caseCategory,
    regionCode,
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const list = lodash.filter(
      response.resultData,
      (item) => item.section === 'CurrentClientInfo-Table'
    );

    const clientOptionConfigList = lodash.filter(
      response.resultData,
      (item) => item.section === 'ClientOption-Fields'
    );

    const totalSpan = lodash.reduce(
      list,
      (sum, n) => {
        return sum + (lodash.toNumber(lodash.get(n, 'field-props.x-layout.lg.span')) || 0);
      },
      0
    );
    const columnList = lodash
      .chain(list)
      .orderBy(['field-props.x-layout.lg.order'])
      .map((item) => {
        const label = item['field-props'].label;
        return {
          field: item.field,
          fieldType: item.fieldType,
          dictTypeCode: item['field-props']?.['x-dict']
            ? item['field-props']?.['x-dict']?.dictTypeCode
            : null,
          name: formatMessageApi({
            [label.dictTypeCode]: label.dictCode,
          }),
          width: `${
            (lodash.toNumber(lodash.get(item, 'field-props.x-layout.lg.span')) || 0) / totalSpan
          }`,
          span: item['field-props']?.['x-layout']?.lg?.span,
          visible: item['field-props']?.visible ? item['field-props']?.visible : null,
          visibleCondition: item['field-props']?.['visible-condition']
            ? item['field-props']?.['visible-condition']
            : null,
        };
      })
      .value();
    yield put({
      type: 'saveColumnList',
      payload: { columnList },
    });
    yield put({
      type: 'saveClientOptionConfigList',
      payload: { clientOptionConfigList },
    });
  }
}
