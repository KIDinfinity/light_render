import lodash from 'lodash';
import { searchBankCode, searchBranchCode } from '@/services/miscStandardBankControllerService';
import { searchMedicalProvider } from '@/services/claimMedicalProviderInformationControllerService';
import { getSearchDoctorInfo } from '@/services/miscCfgInquiryControllerService';
import { tenant } from '@/components/Tenant';
import { transRemarkCodeToOrderMsg } from 'claim/pages/utils/taskUtils';
import { Status, MedicalProviderTypeCode } from 'claim/enum/medicalProvider';
import CaseCategory from 'enum/CaseCategory';
import { BenefitCategory } from './claim';

interface IOptions {
  transData?: Function | null;
  transCode?: string;
  transName?: string;
}

const initOptions = {
  transData: null,
};

interface IProperties {
  property: string;
  transCode: string;
  transName: string;
}

export class SeachCustom {
  constructor(options?: IOptions) {
    this.options = lodash.merge(initOptions, options);
  }

  options: IOptions;

  /**
   * 通用处理方法
   * @param postData
   * @param property
   * @param fnInterface
   */
  handleGeneral = async (postData: any, fnInterface: Function, properties: IProperties) => {
    const response = await fnInterface(this.transPostData(postData));

    if (response?.success && response?.resultData) {
      const { rows } = response.resultData;
      const { property, transCode, transName } = properties || {};
      const dataTransed = this.transDataNative(rows, transCode, transName);
      this[property] = dataTransed;

      lodash.set(response.resultData, 'rows', dataTransed);
    }

    return response;
  };

  /**
   * 数据转化，支持用户自定义转化函数（通过option的transData传入）
   * @param args
   */
  transDataNative = (...args: any) => {
    const { transData, transCode, transName } = this.options;
    // 用户有传入自定义的transData方法则终止native方法，执行自定义方法
    if (lodash.isFunction(transData)) return transData.call(this, ...args, transCode, transName);
    const [rows, transCodeNative, transNameNative] = args;
    const dictCode = transCodeNative || transCode;
    const dictName = transNameNative || transName;

    return this.dataMaping(rows, dictCode, dictName);
  };

  dataMaping = (datas: any[], dictCode: string, dictName: string, extraNameFn?: Function) => {
    return lodash.map(datas, (data: any) => ({
      dictCode: data[dictCode || 'dictCode'],
      dictName: lodash.isFunction(extraNameFn) ? extraNameFn(data) : data[dictName || 'dictName'],
      ...data,
    }));
  };

  /**
   * 转化成接口所需的入参
   * @param postData
   * @param bankCode
   */
  transPostData = (postData: any = {}, bankCode?: string) => {
    const params = lodash.get(postData, 'params', {});
    const { pageSize, searchContent } = lodash.pick(params, ['pageSize', 'searchContent']);

    return {
      ...postData,
      pageSize,
      params: {
        bank: searchContent,
        regionCode: tenant.region(),
        bankCode,
      },
    };
  };

  /**
   * 根据dict code搜索dict name
   * @param dicts
   * @param dictCode
   */
  getDictNameByCode = (dicts: any[], dictCode: string) => {
    const dict = lodash.find(dicts, { dictCode });
    return !lodash.isEmpty(dict) ? dict?.dictName : '';
  };

  /**
   * 根据dict name搜索dict code
   * @param dicts
   * @param dictCode
   */
  getDictCodeByName = (dicts: any[], dictName: string) => {
    const dict = lodash.find(dicts, { dictName });
    return !lodash.isEmpty(dict) ? dict?.dictCode : '';
  };

  /**
   * 总行分页查询，以及数据转化为misc的dictionary风格的数据
   * @param postData
   */
  handleBank = async (postData: any, property?: string) => {
    const response = await searchBankCode(this.transPostData(postData), {});
    const code = lodash.isString(property) ? property : 'banks';
    if (response?.success && response?.resultData) {
      const { rows } = response.resultData;
      const dataTransed = this.transDataNative(rows, 'bankCode', 'bankName');
      this[code] = dataTransed;

      lodash.set(response.resultData, 'rows', dataTransed);
    }

    return response;
  };

  /**
   * 支行分页查询，以及数据转化为misc的dictionary风格的数据
   * @param postData
   */
  handleBankBranch = async (postData: any, bankCode?: string, property?: string) => {
    const {
      params: { extraData },
    } = postData;
    if (!extraData && !bankCode) return [];
    const response = await searchBranchCode(this.transPostData(postData, extraData), {});
    const code = lodash.isString(property) ? property : 'bankBranches';

    if (response?.success && response?.resultData) {
      const { rows } = response.resultData;
      const dataTransed = this.transDataNative(rows, 'branchCode', 'branchName');
      this[code] = dataTransed;

      lodash.set(response.resultData, 'rows', dataTransed);
    }

    return response;
  };

  getMedicalProvider = (caseCategory: string) => async (target: any) => {
    const params = lodash.get(target, 'params');
    const paramsTemp: any = {
      currentPage: target?.currentPage,
      params: {
        pageSize: params?.pageSize,
        regionCode: tenant.region(),
        caseCategory,
        searchContent: params?.searchContent,
        status: Status.A,
      },
    };

    const shouldAdd: string[] = [
      CaseCategory.TH_GC_CTG02, // PRE_ARRANGEMENT
      CaseCategory.TH_GC_CTG03, // OPD_HOSPITAL_BILLING
      CaseCategory.TH_GC_CTG04, // PARTIAL_BILL
      CaseCategory.TH_GC_CTG06, // OPD_CASHLESS
      CaseCategory.TH_GC_CTG07, // OPD_HOSPITAL_PORTAL
      CaseCategory.IDAC, // DA
      CaseCategory.IAPC, // AP
      CaseCategory.TH_IHB_CTG01, // IDENTIFY_HOSPITAL_BILLING_BATCH
    ];

    if (shouldAdd.includes(caseCategory)) {
      paramsTemp.medicalProviderTypeCode = MedicalProviderTypeCode.N;
    }

    const response = await searchMedicalProvider(paramsTemp, {});
    if (response && response.success && response.resultData) {
      const list = lodash.get(response, 'resultData.rows', []);
      const rows = this.dataMaping(
        list,
        'medicalProviderCode',
        'medicalProviderName',
        (data: any) =>
          `${data?.medicalProviderName}${
            data?.provinceDescription ? `, ${data?.provinceDescription}` : ''
          }`
      );
      lodash.set(response, 'resultData.rows', rows);
      return response;
    }
    return [];
  };

  handleDocket = async (target: any) => {
    const params = lodash.get(target, 'params');
    const paramsTemp: any = {
      currentPage: target?.currentPage,
      params: {
        pageSize: params?.pageSize,
        regionCode: tenant.region(),
        searchContent: params?.searchContent,
      },
    };

    const response = await getSearchDoctorInfo(paramsTemp, {});

    if (
      lodash.isPlainObject(response) &&
      response.success &&
      lodash.isPlainObject(response.resultData) &&
      lodash.isArray(response.resultData?.rows)
    ) {
      const rows = lodash
        .chain(response?.resultData?.rows || [])
        .map(({ doctorDesc }: any) => {
          return {
            dictCode: doctorDesc,
            dictName: doctorDesc,
          };
        })
        .value();
      lodash.set(response, 'resultData.rows', rows);
      return response;
    }
    return [];
  };
}

const { dataMaping, getDictNameByCode, getDictCodeByName, getMedicalProvider, handleDocket } =
  new SeachCustom();

export { dataMaping, getDictNameByCode, getDictCodeByName, getMedicalProvider, handleDocket };

export function collectRemark(payableMap: any, claimPayable: any) {
  if (lodash.isEmpty(payableMap)) return claimPayable?.systemRemark;
  const {
    systemRemark,
    policyNo,
    productCode,
    benefitTypeCode,
    id,
    benefitCategory,
    isStandaloneBooster,
  } = claimPayable;

  const remarkSubPayable = lodash
    .chain(payableMap)
    .values()
    .filter(
      (item: any) =>
        item.policyNo === policyNo &&
        item.productCode === productCode &&
        item.benefitTypeCode === benefitTypeCode &&
        item?.payableId === id
    )
    .map((item) => {
      if (benefitCategory === BenefitCategory.reimbursement && isStandaloneBooster !== 'Y') {
        const boosterItem = lodash.find(payableMap, {
          ...lodash.pick(item, [
            'policyNo',
            'productCode',
            'productPlan',
            'policyCurrency',
            'serviceItemId',
          ]),
          booster: 'Y',
        });
        return lodash.filter([item, boosterItem], (filterItem) => !lodash.isEmpty(filterItem));
      }
      return item;
    })
    .flatten()
    .map((payableItem: any) => payableItem?.remark)
    .value();

  return lodash
    .chain([systemRemark])
    .compact()
    .split(';')
    .concat(remarkSubPayable)
    .compact()
    .uniq()
    .join(';')
    .value();
}

export function handlePayableRemark(normalizeData: any, claimPayableGroupList) {
  const claimDataTemp = { ...normalizeData };
  const { claimEntities } = claimDataTemp;
  if (lodash.isEmpty(claimEntities?.claimPayableListMap)) return claimDataTemp;
  const {
    claimPayableListMap,
    treatmentPayableListMap,
    serviceItemPayableListMap,
    procedurePayableListMap,
    otherProcedureListMap,
    accidentBenefitPayableListMap,
  } = claimEntities;

  claimEntities.claimPayableListMap = lodash
    .chain(claimPayableListMap)
    .reduce((output, claimPayable: any, claimPayableId: string) => {
      const { benefitCategory, hasFormat } = claimPayable;

      if (!!claimPayableGroupList?.[claimPayableId]) {
        lodash.set(
          claimPayable,
          'settlementDecision',
          `${claimPayableGroupList?.[claimPayableId]?.settlementDecision}`
        );
      }
      if (!hasFormat) {
        // 缓存claim payable自身的remark数据
        lodash.set(claimPayable, 'systemRemark', claimPayable.remark);
        switch (benefitCategory) {
          case BenefitCategory.life:
            if (!!claimPayable.lifePayable && !lodash.isEmpty(claimPayable.lifePayable)) {
              lodash.set(
                claimPayable,
                'lifePayable.remark',
                `${transRemarkCodeToOrderMsg(claimPayable?.remark, true)}`
              );
            }

            break;
          case BenefitCategory.cashless:
            lodash.set(
              claimPayable,
              'remark',
              collectRemark(treatmentPayableListMap, claimPayable)
            );
            break;
          case BenefitCategory.reimbursement:
            lodash.set(
              claimPayable,
              'remark',
              collectRemark(serviceItemPayableListMap, claimPayable)
            );
            break;
          case BenefitCategory.S:
            lodash.set(
              claimPayable,
              'remark',
              collectRemark(procedurePayableListMap, claimPayable)
            );
            break;
          case BenefitCategory.T:
            lodash.set(claimPayable, 'remark', collectRemark(otherProcedureListMap, claimPayable));
            break;
          case BenefitCategory.aipa:
            lodash.set(
              claimPayable,
              'remark',
              collectRemark(accidentBenefitPayableListMap, claimPayable)
            );
            break;
          default:
            break;
        }
        lodash.set(output, `${claimPayableId}`, {
          ...claimPayable,
          hasFormat: true,
          remark: `${transRemarkCodeToOrderMsg(claimPayable?.remark, true)}`,
        });
      } else {
        lodash.set(output, `${claimPayableId}`, claimPayable);
      }
      return output;
    }, {})
    .value();

  const formatRemarkArr: string[] = [
    'treatmentPayableListMap',
    'serviceItemPayableListMap',
    'procedurePayableListMap',
    'otherProcedureListMap',
    'otherProcedurePayableListMap',
    'claimIncidentPayableListMap',
    'accidentBenefitPayableListMap',
  ];
  lodash.forEach(formatRemarkArr, (mapKey: string) => {
    claimEntities[mapKey] = lodash
      .chain(claimEntities[mapKey])
      .reduce((output, claimPayable: any, claimPayableId: string) => {
        const { hasFormat } = claimPayable;
        if (!hasFormat) {
          lodash.set(output, `${claimPayableId}`, {
            ...claimPayable,
            hasFormat: true,
            remark: `${transRemarkCodeToOrderMsg(claimPayable?.remark, true)}`,
          });
        } else {
          lodash.set(output, `${claimPayableId}`, claimPayable);
        }
        return output;
      }, {})
      .value();
  });

  claimDataTemp.claimEntities = claimEntities;

  return claimDataTemp;
}
