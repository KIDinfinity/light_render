import lodash, { chain } from 'lodash';
import moment from 'moment';

/**
 * 宽度
 * 跨年
 * 当前版本
 */

const getYear = (date: string) => (moment(date).isValid() ? moment(date).format('YYYY') : false);
const getDuration = ({ expectEffectiveDate, expectExpiryDate }: any) => {
  return moment(expectExpiryDate).valueOf() - moment(expectEffectiveDate).valueOf();
};

export default ({ versionList, isAudit }: any) => {
  const isOneMore = versionList?.length > 1;

  const groupVersion = chain(versionList)
    .filter((item: any) => item?.expectExpiryDate && item?.expectEffectiveDate)
    .reduce((versionMap: any, item: any) => {
      const expiryDate: any = getYear(item?.expectExpiryDate);
      const effectiveDate = getYear(item?.expectEffectiveDate);
      const isOverDate = expiryDate >= 2999;
      const isOverYear = effectiveDate < expiryDate;
      const startOfYear = moment(item.expectExpiryDate)
        .startOf('year')
        .format('YYYY-MM-DD HH:mm:ss');
      const endOfYear = moment(item.expectEffectiveDate)
        .endOf('year')
        .format('YYYY-MM-DD HH:mm:ss');
      let extraData = {};
      if (isOverYear) {
        const effectVersion = {
          ...item,
          expectExpiryDate: endOfYear,
          isOverDate,
          isOverYearEnd: true,
          overYearEndDate: item?.expectExpiryDate,
        };
        extraData =
          effectiveDate && (isOneMore || isAudit)
            ? {
                [effectiveDate]: versionMap[effectiveDate]
                  ? [...versionMap[effectiveDate], { ...effectVersion }]
                  : [{ ...effectVersion }],
              }
            : {};
      }

      const current = {
        ...item,
        expectEffectiveDate: isOverYear && isOneMore ? startOfYear : item.expectEffectiveDate,
        isOverYearStart: isOverYear,
        overYearStartDate: item?.expectEffectiveDate,
        isOverYearEnd: !isOneMore,
      };
      const dateKey = isOneMore ? expiryDate : effectiveDate;
      const dateMap =
        expiryDate && (!isOverDate || !isOneMore)
          ? {
              [dateKey]: versionMap[dateKey]
                ? [...versionMap[dateKey], { ...current }]
                : [{ ...current }],
            }
          : {};

      return {
        ...versionMap,
        ...dateMap,
        ...extraData,
      };
    }, {})
    .value();

  const versions = chain(groupVersion)
    .keys()
    .map((date: string) => {
      const dateList = groupVersion?.[date];
      const minEffectiveDate = (chain(dateList) as any)
        .minBy((item: any) => item.expectEffectiveDate)
        .get('expectEffectiveDate')
        .value();
      const maxExpiryDate = (chain(dateList) as any)
        .maxBy((item: any) => item.expectExpiryDate)
        .get('expectExpiryDate')
        .value();
      const total = getDuration({
        expectEffectiveDate: minEffectiveDate,
        expectExpiryDate: maxExpiryDate,
      });
      return {
        date,
        list: groupVersion?.[date]?.map((item: any) => {
          const { status } = item;
          // if (id) {
          //   status = item?.id === id ? Status.Active : ''
          // }
          return {
            ...item,
            // currentVersion: true,
            width: `${Math.floor((getDuration(item) / total) * 100)}%`,
            isLastDate: item.expectExpiryDate === maxExpiryDate,
            isOneMore,
            status,
          };
        }),
      };
    })
    .value();

  console.log('versions', {
    versions,
    versionList: lodash.map(versionList, (item: any) => ({
      expectEffectiveDate: item.expectEffectiveDate,
      expectExpiryDate: item.expectExpiryDate,
    })),
    groupVersion,
  });
  return versions;
};

/**
 *
 * expiry_date ||  effective_date
 */
