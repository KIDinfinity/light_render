import { useCallback, useContext } from 'react';
import mapping from 'summary/config/summarySectionDataMapping';
import useGetSummarySectionConfig from 'summary/hooks/useGetSummarySectionConfig';
import summaryPageService from '@/services/summaryPageService';
import lodash from 'lodash';
import Context from 'summary/Context';
import ExpandEvent from 'enum/ExpandEvent';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';

interface ICallbackParams {
  sectionIds?: [string];
  sectionId?: string;
  type: ExpandEvent;
}

export default () => {
  const summarySectionConfig = useGetSummarySectionConfig();

  const { dispatch, state }: any = useContext(Context);
  const caseDetail = useGetCaseDetail();
  return useCallback(
    async ({ sectionIds, type, sectionId }: ICallbackParams) => {
      const sections = (() => {
        if (type === ExpandEvent.EXPAND_ALL) {
          return lodash
            .chain(summarySectionConfig)
            .map((section) => section.sectionId)
            .value();
        }
        if (type === ExpandEvent.EXPAND_SINGLE_SECTION) {
          return [sectionId];
        }
        return sectionIds;
      })();
      const list = lodash.filter(sections, (section: any) => {
        const dataPath = lodash.chain(mapping).get(`${section}.dataPath`).value();
        return !lodash.chain(state).has(dataPath).value();
      });
      if (lodash.isEmpty(list)) {
        return false;
      }
      const response = await summaryPageService.getSectionData({
        caseCategory: caseDetail?.caseCategory,
        sectionIds: list,
        businessNo: caseDetail?.businessNo,
        caseNo: caseDetail?.caseNo,
      });
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      const businessData = lodash.get(resultData, 'businessData', {});
      if (success) {
        const dataMap = new Map();
        lodash
          .chain(summarySectionConfig)
          .filter((item: any) => lodash.includes(list, item.sectionId))
          .forEach((item: any) => {
            const { dataId, sectionId: id } = lodash.pick(item, ['dataId', 'sectionId']);
            const { dataPath } = lodash
              .chain(mapping)
              .get(id)
              .pick(['dataKey', 'dataPath'])
              .value();
            const data = lodash.get(businessData, dataId);
            dataMap.set(dataId, {
              dataPath,
              data,
            });
          })
          .value();
        for (const [, value] of dataMap.entries()) {
          const { dataPath, data } = lodash.pick(value, ['data', 'dataPath']);
          dispatch({
            type: 'setSectionData',
            payload: {
              dataPath,
              data,
            },
          });
        }
      }
    },
    [summarySectionConfig, dispatch, caseDetail, state]
  );
};
