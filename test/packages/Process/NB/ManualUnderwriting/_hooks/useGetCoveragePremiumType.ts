import lodash from 'lodash';

export default ({ detail = {} }: any) => {
  return (
    lodash
      .chain(detail.coverageList || [])
      .reduce((data: any, el: any) => {
        if (el.isMain === 'Y') {
          const coverageBenefitsItem = lodash.find(
            el.coverageBenefitsList || [],
            (benefitsItem: any) => benefitsItem.coverageId === el.id
          );
          if (coverageBenefitsItem) {
            return coverageBenefitsItem.premiumType;
          }
        }
        return data;
      }, '')
      .value() || ''
  );
};
