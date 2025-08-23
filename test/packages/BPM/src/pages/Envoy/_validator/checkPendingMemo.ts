import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import lodash, { get, some, forEach } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import { EModuleName } from 'bpm/pages/Envoy/enum';

const rulerList = [
  {
    codeName: 'memoCode',
    ruler: 1,
    regionList: [],
  },
  {
    codeName: 'memoDesc',
    ruler: 1,
    regionList: [Region.ID, Region.PH],
  },
  {
    codeName: 'requestedClientRole',
    ruler: 1,
    regionList: [],
  },
  {
    codeName: 'memoClientRole',
    ruler: 1,
    regionList: [],
  },
  {
    codeName: 'requestedClientId',
    ruler: 1,
    regionList: [],
  },
  {
    codeName: 'memoClientId',
    ruler: 1,
    regionList: [],
  },
  {
    codeName: 'medicalProviderCode',
    ruler: 1,
    regionList: [],
  },
  {
    codeName: 'memoReason',
    ruler: 1,
    regionList: [Region.VNM], // 临时添加，让他不必填
  },
  {
    codeName: 'memoRemark',
    ruler: 1,
    regionList: [Region.VNM], // 临时添加，让他不必填
  },
];

const isRequired = (fieldKey: any) => {
  const target = lodash.find(rulerList, (ruler) => ruler.codeName === fieldKey);
  if (lodash.size(target?.regionList) > 0) {
    return target?.regionList.includes(tenant.region());
  }
  return true;
};

export { isRequired };

const checkPendingMemo = (errObj: any, reason: any, isSendReason: any) => {
  const sortModuleArr = getSortModuleArr(reason?.displayConfig);
  const objects = get(reason?.displayConfig, 'pendingMemo.children', {});
  const pendingMemoList = get(reason, 'pendingMemoList', []);

  const allRequired = lodash.find(
    sortModuleArr,
    (module: any) => module.moduleName === EModuleName.PendingMemo
  )?.required;

  let displayConfig = lodash
    .chain(objects)
    .keys()
    .reduce((obj, el) => {
      return {
        ...obj,
        [el]: lodash.has(objects[el], 'required')
          ? objects[el]?.visible && objects[el]?.required
          : objects[el]?.visible && (allRequired || isRequired(el)),
      };
    }, {})
    .value();

  // 接口回来数据控制filed的显示
  displayConfig = {
    memoCode: true,
    memoDesc: true,
    memoReason:
      some(pendingMemoList, (memo) => !lodash.isEmpty(memo.pendingMemoSubInfoList)) && allRequired,
    ...displayConfig,
    requestedClientRole: displayConfig?.memoClientRole,
    requestedClientId: displayConfig?.memoClientId,
    medicalProviderCode: displayConfig?.medicalProvider,
    memoClientRole: false,
    memoClientId: false,
    medicalProvider: false,
  };

  const hasMemo = some(
    sortModuleArr,
    (module: any) => module.moduleName === EModuleName.PendingMemo
  );

  if (isSendReason && hasMemo) {
    const message = [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
    // empty region list means all regions have this rule
    const isInRegions = (regionList?: Region[]) => {
      if (regionList && regionList?.length > 0) {
        return regionList.includes(tenant.region());
      } else {
        return true;
      }
    };

    // TODO：需要用配置的方式去做
    forEach(pendingMemoList, (item: any, idx: number) => {
      rulerList.forEach((ruler) => {
        const isFieldEmpty = ['memoReason', 'memoRemark'].includes(ruler.codeName)
          ? lodash.some(item?.pendingMemoSubInfoList, (subItem) =>
              ruler.codeName === 'memoReason' ? !subItem?.subTypeCode : !subItem?.subRemark
            )
          : !item[ruler.codeName];
        const isError =
          isFieldEmpty &&
          (lodash.has(displayConfig, ruler.codeName)
            ? displayConfig[ruler.codeName]
            : allRequired || isInRegions(ruler.regionList));
        const codeName = ruler?.codeName;
        if (['memoReason', 'memoRemark'].includes(codeName)) {
          if (isError) {
            const index = lodash.findIndex(item?.pendingMemoSubInfoList, (subItem) =>
              ruler.codeName === 'memoReason' ? !subItem?.subTypeCode : !subItem?.subRemark
            );
            errObj[`pendingMemoList{${idx}}_pendingMemoSubInfoList{${index}}_${codeName}`] = isError
              ? message
              : [];
          }
        } else if (codeName) {
          errObj[`pendingMemoList{${idx}}_${ruler.codeName}`] = isError ? message : [];
        }
      });
    });
  }

  return errObj;
};
export default checkPendingMemo;
