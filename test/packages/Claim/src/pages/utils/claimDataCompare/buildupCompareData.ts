import lodash from 'lodash';
import isIsoDateFormat from 'claim/pages/utils/isIsoDateFormat';
import { ECompareModule, CFileds } from 'claim/pages/utils/claimDataCompare';

const pickMonitorFields = (dataItem: any, monitorFields: string[]) => {
  if (lodash.isPlainObject(dataItem)) {
    const dataPicked = lodash.pick(dataItem, monitorFields);
    return lodash.reduce(
      dataPicked,
      (collect: any, val: any, key: string) => {
        const isIsoDateLike = isIsoDateFormat(val);
        if (isIsoDateLike && val) {
          lodash.set(collect, key, new Date(val).getTime());
        } else {
          lodash.set(collect, key, val);
          if (lodash.isNil(val) || (lodash.isString(val) && !val)) {
            // eslint-disable-next-line no-param-reassign
            delete collect[key];
          }
        }

        return collect;
      },
      {}
    );
  }

  return null;
};

/**
 * 构建list数据
 * @param list
 * @param monitorFields
 */
const buildupList = (list: any[], monitorFields: string[]) =>
  lodash
    .chain(list)
    .map((data: any) => {
      if (!lodash.isPlainObject(data)) return null;
      return pickMonitorFields(data, monitorFields);
    })
    .compact()
    .value();

/**
 * 构建诊断信息
 * @param claimData
 */
const buildupDiagnosis = (incident: any) => {
  const diagnosises = incident[ECompareModule.Diagnosis];
  const monitorFields = CFileds.reloadData()?.[ECompareModule.Diagnosis];
  return buildupList(diagnosises, monitorFields);
};

/**
 * 构建主要受益数据
 * @param treatment
 */
const buildupOtherProcedure = (treatment: any) => {
  const otherProcedure = treatment[ECompareModule.OtherProcedure];
  const monitorFields = CFileds.reloadData()?.[ECompareModule.OtherProcedure];
  return buildupList(otherProcedure, monitorFields);
};

/**
 * 构建手术数据
 * @param treatment
 */
const buildupProcedures = (treatment: any) => {
  const procedures = treatment[ECompareModule.Procedure];
  const monitorFields = CFileds.reloadData()?.[ECompareModule.Procedure];
  return buildupList(procedures, monitorFields);
};

/**
 * 构建费用项数据
 * @param treatment
 */
const buildupServices = (treatment: any) => {
  const services = treatment[ECompareModule.Service];
  const monitorFields = CFileds.reloadData()?.[ECompareModule.Service];
  return buildupList(services, monitorFields);
};

/**
 * 构建发票数据
 * @param treatment
 */
const buildupInvoices = (treatment: any) => {
  const invoices = treatment[ECompareModule.Invoice];
  const monitorFields = CFileds.reloadData()?.[ECompareModule.Invoice];
  return lodash
    .chain(invoices)
    .map((data: any) => {
      if (!lodash.isPlainObject(data)) return null;
      return {
        ...pickMonitorFields(data, monitorFields),
        [ECompareModule.Service]: buildupServices(data),
      };
    })
    .compact()
    .value();
};

/**
 * 构建治疗的数据
 * @param incident
 */
const buildupTreatment = (incident: any) => {
  const treatments = incident[ECompareModule.Treatment];
  const monitorFields = CFileds.reloadData()?.[ECompareModule.Treatment];
  return lodash
    .chain(treatments)
    .map((data: any) => {
      if (!lodash.isPlainObject(data)) return null;
      return {
        ...pickMonitorFields(data, monitorFields),
        [ECompareModule.Procedure]: buildupProcedures(data),
        [ECompareModule.OtherProcedure]: buildupOtherProcedure(data),
        [ECompareModule.Invoice]: buildupInvoices(data),
      };
    })
    .compact()
    .value();
};

/**
 * 构建incident的数据
 * @param claimData
 */
const buildupIncident = (claimData: any) => {
  const incidents = lodash.cloneDeep(claimData[ECompareModule.Incident]);
  const monitorFields = CFileds.reloadData()?.[ECompareModule.Incident];
  return lodash
    .chain(incidents)
    .map((data: any) => {
      if (!lodash.isPlainObject(data)) return null;
      return {
        ...pickMonitorFields(data, monitorFields),
        [ECompareModule.Treatment]: buildupTreatment(data),
        [ECompareModule.Diagnosis]: buildupDiagnosis(data),
      };
    })
    .compact()
    .value();
};

const buildupCompareData = (claimData: any) => {
  if (!lodash.isPlainObject(claimData)) return claimData;

  return {
    [ECompareModule.Incident]: buildupIncident(claimData),
  };
};

export default buildupCompareData;
