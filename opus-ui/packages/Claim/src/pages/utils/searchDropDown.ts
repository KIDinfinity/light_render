import lodash from 'lodash';
import {
  getApprovalProcedureKjCodeForPage,
  getStandardDiagnosisNameIcdForPage,
  getStandardDrugListForPage,
  getPlanJPStdAdvancedMedicalList,
} from '@/services/claimJpPlanStandardControllerService';
import { tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EProcedureType } from 'process/Enum';

interface IOptions {
  transData?: Function | null;
  transCode?: string;
  transName?: string;
}

const initOptions = {
  transData: null,
};

export class SearchDropDown {
  constructor(options?: IOptions) {
    this.options = lodash.merge(initOptions, options);
  }

  options: IOptions;

  /**
   * 数据转化，支持用户自定义转化函数（通过option的transData传入）
   * @param args
   */
  transDataNative = (...args: any) => {
    const [rows, transCodeNative] = args;
    const dictCode = transCodeNative;
    const dictName = transCodeNative;

    return this.dataMaping(rows, dictCode, dictName);
  };

  dataMaping = (datas: any[], dictCode: string, dictName: string) => {
    return lodash
      .chain(datas)
      .compact()
      .map((data: any) => ({
        dictCode: data[dictCode || 'dictCode'],
        dictName: data[dictName || 'dictName'],
        ...data,
      }))
      .value();
  };

  /**
   * 转化成接口所需的入参
   * @param postData
   * @param bankCode
   */
  transPostData = (postData: any = {}) => {
    const params = lodash.get(postData, 'params', {});
    const { pageSize } = lodash.pick(params, ['pageSize']);

    return {
      ...postData,
      pageSize,
      params: {
        ...params,
        regionCode: tenant.region(),
      },
    };
  };

  /**
   * diagnosis分页查询，以及数据转化为misc的dictionary风格的数据
   * @param postData
   */
  handleDiagnosisName = async (postData: any, property?: string) => {
    const response = await getStandardDiagnosisNameIcdForPage(this.transPostData(postData), {});

    if (response?.success && response?.resultData) {
      const { rows } = response.resultData;
      const dataTransed = this.transDataNative(rows, 'standardDiagnosisName');
      // this[property || 'banks'] = dataTransed;

      lodash.set(response.resultData, 'rows', dataTransed);
    }

    return response;
  };

  getStandardDrugData = async (postData: any) => {
    const response = await getStandardDrugListForPage(this.transPostData(postData), {});
    if (
      response?.success &&
      lodash.isPlainObject(response?.resultData) &&
      lodash.isArray(response?.resultData?.rows)
    ) {
      return response;
    }
    return {};
  };

  /**
   * therapeuticDrug分页查询，以及数据转化为misc的dictionary风格的数据
   * @param postData
   */
  handleTherapeuticDrug = async (postData: any, property?: string, procedureType?: string) => {
    const response: any = await this.getStandardDrugData(postData);

    const searchContent = postData?.params?.searchContent || '';

    let outCodesList = [];

    const outCodes = lodash
      .chain(property || [])
      .reduce((arr: any, drugId: any) => {
        return !lodash.find(response?.resultData?.rows || [], { drugId }) ? [...arr, drugId] : [];
      }, [])
      .value();

    if (!lodash.isEmpty(outCodes) && lodash.isEmpty(searchContent)) {
      const outCodesReponse = await this.getStandardDrugData({
        ...postData,
        params: {
          ...postData.params,
          searchContent: outCodes.join(),
        },
      });
      outCodesList = outCodesReponse?.resultData?.rows || [];
    }

    return {
      ...response,
      resultData: {
        ...response.resultData,
        rows:
          lodash
            .chain([...(response.resultData?.rows || []), ...outCodesList])
            .uniqBy('drugId')
            .map((data: any) => {
              let extraName = formatMessageApi({
                Label_CLM_Opus: 'nonAnticacerOrHormonalDrug',
              });

              if (/^L01|L03|L04|V10/.test(data.actCode)) {
                extraName = formatMessageApi({
                  Label_CLM_Opus: 'anticacerDrug',
                });
              } else if (/^L02/.test(data.actCode)) {
                extraName = formatMessageApi({
                  Label_CLM_Opus: 'hormonalDrug',
                });
              }

              return {
                ...data,
                dictCode: data.drugId,
                dictName: `${data.version}-${data.drugName}(${extraName})`,
                disabled:
                  (procedureType === EProcedureType.DG1 && /^L02/.test(data.actCode)) ||
                  (procedureType === EProcedureType.DG2 && /^L01|L03|L04|V10/.test(data.actCode)),
              };
            })
            .value() || [],
      },
    };
  };
  /**
   * procedure分页查询，以及数据转化为misc的dictionary风格的数据
   * @param postData
   */
  handleProcedureName = async (postData: any, property: any) => {
    let data = postData;
    if (property?.groupBy && property?.groupBy === 'approvalProcedureName') {
      const params = lodash.get(postData, 'params', {});
      data = {
        ...data,
        params: {
          ...params,
          groupBy: property.groupBy,
        },
      };
    }
    const response = await getApprovalProcedureKjCodeForPage(this.transPostData(data), {});

    if (response?.success && response?.resultData) {
      const { rows } = response.resultData;

      let dataTransed = lodash
        .chain(rows)
        .compact()
        .map((data: any) => ({
          dictCode: `${data?.kjCode || ''}${data?.branchNo || ''}${
            data?.itemNo || ''
          }-${data.approvalProcedureName}`,
          dictName: data.approvalProcedureName,
          ...data,
        }))
        .value();
      if (!!property?.filterName) {
        dataTransed = lodash.uniqBy(dataTransed, property.filterName);
      }
      lodash.set(response.resultData, 'rows', dataTransed);
    }

    return response;
  };
  /**
   * diagnosis分页查询，以及数据转化为misc的dictionary风格的数据
   * @param postData
   */
  handleMedia = async (postData: any) => {
    const response = await getPlanJPStdAdvancedMedicalList(this.transPostData(postData), {});

    if (response?.success && response?.resultData) {
      lodash.set(
        response.resultData,
        'rows',
        lodash
          .chain(response.resultData?.rows || [])
          .map((el: any) => [
            {
              ...el,
              dictCode: el.treatmentCode + '-' + el.treatmentName,
              dictName: el.treatmentCode + '-' + el.treatmentName,
              treatmentProviders: lodash.map(
                el.treatmentProviders,
                (treatmentProvidersItem: any) => ({
                  ...treatmentProvidersItem,
                  dictCode: treatmentProvidersItem.treatmentProvider,
                  dictName: treatmentProvidersItem.treatmentProvider,
                })
              ),
            },
            {
              dictCode: el.treatmentCode,
              dictName: el.treatmentCode + '-' + el.treatmentName,
              hidden: true,
            },
          ])
          .flatten()
          .value() || []
      );
    }

    return response;
  };
}
