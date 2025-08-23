import { useMemo, useState } from 'react';
import lodash from 'lodash';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import { debounce } from 'lodash';
import moment from 'moment';
import { tenant } from '@/components/Tenant';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import RegionType from 'process/NB/Enum/RegionType';
import BankSource from 'process/NB/Enum/BankSource';

export default () => {
  const [filterQuery, setFilterQuery] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [timeQuery, setTimeQuery] = useState<Record<string, string | null> | Record<string, never>>(
    {}
  );
  const equalKH = lodash.isEqual(tenant.region(), RegionType.KH);
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  const bankInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.businessData?.policyList?.[0]?.bankInfoList,
    shallowEqual
  );
  const factoringHousesList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.factoringHousesList,
    shallowEqual
  );

  const setQuery = (key: string, value: unknown) => {
    switch (key) {
      case 'bankAcctName': // 储存人名进行模糊搜索
        if (formUtils.queryValue(value) === '' || formUtils.queryValue(value) === undefined) {
          setSearchQuery(null);
        } else {
          setSearchQuery(formUtils.queryValue(value));
        }
        break;
      case 'bankAcctFromDate': // 生效日
        if (lodash.isNull(formUtils.queryValue(value))) {
          setTimeQuery({});
        } else {
          setTimeQuery((prev) => ({
            ...prev,
            [key]: formUtils.queryValue(value),
          }));
        }
        break;
      case 'bankAcctToDate': // 失效日
        if (lodash.isNull(formUtils.queryValue(value))) {
          setTimeQuery({});
        } else {
          setTimeQuery((prev) => ({
            ...prev,
            [key]: formUtils.queryValue(value),
          }));
        }
        break;
      default:
        if (formUtils.queryValue(value) === '' || formUtils.queryValue(value) === undefined) {
          setFilterQuery((prev: any) => {
            return delete prev[key];
          });
        } else {
          setFilterQuery((prev: any) => ({
            ...prev,
            [key]: formUtils.queryValue(value),
          }));
        }
    }
  };

  // 接受搜索参数
  const handleSearchQuery = debounce((changeField: any) => {
    if (equalKH) {
      setFilterQuery(changeField);
      setTrigger(true);
    } else {
      const entry = Object.entries(changeField)[0];
      setTimeout(() => {
        setQuery(entry[0], entry[1]);
      }, 100);
    }
  }, 200);

  // 清空搜索
  const emptySearchQuery = () => {
    setTimeout(() => {
      setFilterQuery({});
      setSearchQuery(null);
      setTimeQuery({});
    }, 1000);
  };

  // 触发搜索
  const triggerSearch = debounce(() => {
    setTimeout(() => {
      setTrigger(true);
    }, 2000);
  }, 500);

  // 触发新增
  const handleAddBankInfo = debounce(() => {
    dispatch({
      type: `${NAMESPACE}/saveNewBankSection`,
      payload: {
        bankInfoQuery: {
          ...filterQuery,
          ...timeQuery,
          bankAcctName: searchQuery ?? '',
        },
      },
    });
    setFilterQuery({});
    setSearchQuery(null);
    setTimeQuery({});
  }, 200);

  const bankList = useMemo(() => {
    const newList = lodash
      .chain(bankInfoList)
      .map((bankInfo, index) => {
        // 合并bankInfoList和factoringHousesList
        const bankAcctFactoryHouse = lodash
          .chain(factoringHousesList)
          .find(
            (item: any) => item?.bankCode === formUtils.queryValue(lodash.get(bankInfo, 'bankCode'))
          )
          .get('factoringHouse')
          .value();
        const today = moment();
        const unlock: boolean = (() => {
          if (bankInfo.source === BankSource.LA) {
            return moment(formUtils.queryValue(bankInfo.bankAcctToDate)).diff(today, 'day') > 0;
          }
          return true;
        })();
        return { bankAcctFactoryHouse, ...bankInfo, index, lock: !unlock };
      })
      // .filter(trigger ? { ...filterQuery } : {}) // 过滤关键词
      .filter((item) => {
        // 过滤时间
        if (trigger) {
          if (lodash.has(timeQuery, 'bankAcctToDate')) {
            return moment(formUtils.queryValue(item.bankAcctToDate)).isSame(
              timeQuery.bankAcctToDate,
              'day'
            );
          } else if (lodash.has(timeQuery, 'bankAcctFromDate')) {
            return moment(formUtils.queryValue(item.bankAcctFromDate)).isSame(
              timeQuery.bankAcctFromDate,
              'day'
            );
          }
        }
        if (equalKH) {
          if (filterQuery.bankCode && filterQuery.bankAcctNo) {
            return (
              item.bankCode === filterQuery.bankCode && item.bankAcctNo === filterQuery.bankAcctNo
            );
          } else {
            if (filterQuery.bankCode) {
              return item.bankCode === filterQuery.bankCode;
            }
            if (filterQuery.bankAcctNo) {
              return item.bankAcctNo === filterQuery.bankAcctNo;
            }
          }
        }
        return true;
      })
      .orderBy('bankAcctFromDate', 'desc') // 降序排序 生效日
      .orderBy((item) => {
        // 模糊搜素人名排序
        if (trigger && !lodash.isNull(searchQuery)) {
          const acctName = lodash.lowerCase(formUtils.queryValue(item.bankAcctFromDate));
          return acctName.match(RegExp(lodash.lowerCase(searchQuery))) ? -1 : 1;
        }
        return 0;
      })
      .orderBy((item) => {
        if (equalKH) {
          return item.type === BankInfoType.Withdrawal ? 0 : '';
        } else {
          return item.index === 0 ? -1 : 0;
        }
      })
      .value();
    return newList;
  }, [bankInfoList, factoringHousesList, filterQuery, searchQuery, timeQuery, trigger]);

  return {
    bankList,
    handleSearchQuery,
    triggerSearch,
    emptySearchQuery,
    handleAddBankInfo,
    filterQuery,
    searchQuery,
    timeQuery,
  };
};
