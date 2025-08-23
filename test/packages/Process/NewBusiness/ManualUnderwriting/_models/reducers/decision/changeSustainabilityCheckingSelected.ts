import { produce } from 'immer';
import lodash from 'lodash';

const handleUpdateCoverageItem = ({ fragment }: any) =>
  lodash.reduce(
    fragment?.items,
    (fragmentResult: any, fragmentItem: any) => {
      fragmentResult[fragmentItem?.coverageId] = lodash.transform(
        fragmentItem,
        (acc, value, key: string) => {
          if (!key.match(/(AF|BE)$/)) {
            return acc;
          }
          const newKey = key.replace(/(AF|BE)$/, '');
          const removeAFKey = key.replace(/AF$/, '');
          if (
            lodash.isNull(fragmentItem[`${newKey}AF`]) &&
            lodash.isNull(fragmentItem[`${newKey}BE`])
          ) {
            return acc;
          }
          return (acc[removeAFKey] = value);
        },
        {}
      );
      return fragmentResult;
    },
    {}
  );

const handleCoverageFragment = ({ optionItem }: any) => {
  const selectedOptions = lodash.get(optionItem, 'selectedOptions', []);
  const filterOptions = lodash.filter(selectedOptions, (item: any, index: number) => {
    const firstIndex = lodash.findIndex(selectedOptions, (op: any) => op.name == item.name);
    const lastIndex = lodash.findLastIndex(selectedOptions, (op: any) => op.name == item.name);
    if (firstIndex !== lastIndex && index !== lastIndex) {
      return false;
    }
    return true;
  });
  return lodash.reduce(
    filterOptions,
    (result: any, fragment: any) => {
      const updateCoverage = handleUpdateCoverageItem({ fragment });
      const rtCoverage = lodash.get(fragment, 'rtCoverage');
      const atCoverage = lodash.get(fragment, 'atCoverage');

      result.updateCoverage = lodash.merge(result.updateCoverage, updateCoverage);
      if (rtCoverage) {
        rtCoverage.rtCoverageFlag = true;
        result.concatCoverage.push(rtCoverage);
      }
      if (atCoverage) {
        atCoverage.rtCoverageFlag = true;
        result.concatCoverage.push(atCoverage);
      }
      return result;
    },
    {
      updateCoverage: {},
      concatCoverage: [],
    }
  );
};

const handleUpdateCoverageList = ({ draftState, optionItem }: any) => {
  const coverageList = lodash.get(draftState, 'sustainabilityModal.coverageList', []);
  if (draftState?.processData?.policyId === optionItem?.policyId) {
    const coverageFragment = handleCoverageFragment({ optionItem });
    const concatCoverageList = lodash.filter(
      coverageFragment?.concatCoverage,
      (concatCoverageItem: any) =>
        lodash.every(coverageList, (coverage: any) => coverage?.id !== concatCoverageItem?.id)
    );
    return lodash
      .map(coverageList, (coverage: any) => {
        const covarageId = coverage?.id;
        const update = coverageFragment?.updateCoverage?.[covarageId] || {};
        return { ...coverage, ...update };
      })
      .concat(concatCoverageList || []);
  }
  return coverageList;
};

export { handleUpdateCoverageList };

export default (state: any, { payload }: any) => {
  const optionItem = lodash.cloneDeep(lodash.get(payload, 'optionItem', {}));
  const sustainabilityCheckingSelected = lodash.get(optionItem, 'optionName', '');

  const nextState = produce(state, (draftState: any) => {
    const sustainabilityOptions = lodash
      .chain(draftState)
      .get('sustainabilityModal.sustainabilityOptions', [])
      // @ts-ignore
      .map((item: any) => {
        return {
          ...item,
          applied: sustainabilityCheckingSelected === item.optionName ? 'Y' : 'N',
        };
      })
      .value();
    lodash.set(draftState, 'sustainabilityModal.sustainabilityOptions', sustainabilityOptions);

    const updateCoverageList = handleUpdateCoverageList({ draftState, optionItem });
    lodash.set(draftState, 'sustainabilityModal.converageListApplied', updateCoverageList);
  });
  return {
    ...nextState,
  };
};
