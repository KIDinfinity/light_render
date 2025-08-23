import lodash, { isEmpty, compact } from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

const UNIT = 'day';

const validateIPDTreatment = (prestate: any) => {
  const state = lodash.cloneDeep(prestate);
  const { incidentListMap, treatmentListMap } = state.claimEntities;
  // 所有的治疗
  const allTreatment = lodash
    .chain(treatmentListMap)
    .map((item) => {
      const incidentNo = lodash.get(incidentListMap, `${item.incidentId}.incidentNo`);
      return {
        dateOfAdmission: item.dateOfAdmission,
        dateOfDischarge: item.dateOfDischarge,
        incidentNo,
        treatmentNo: item.treatmentNo,
        incidentId: item.incidentId,
        treatmentId: item.id,
      };
    })
    .value();
  // 排序
  const treatmentList = lodash.orderBy(allTreatment, ['incidentNo', 'treatmentNo'], ['asc', 'asc']);
  lodash.map(treatmentList, (treatmentItem) => {
    const admissionMessage: any[] | null = treatmentItem?.dateOfAdmission?.errors
      ? [...treatmentItem?.dateOfAdmission?.errors]
      : [];
    const dischargeMessage: any[] | null = treatmentItem?.dateOfDischarge?.errors
      ? [...treatmentItem?.dateOfDischarge?.errors]
      : [];
    const linkageTreatmentList = lodash.filter(
      allTreatment,
      (item: any) => item.treatmentId !== treatmentItem.treatmentId
    );
    const dateOfAdmission: string = formUtils.queryValue(treatmentItem.dateOfAdmission);
    const dateOfDischarge: string = formUtils.queryValue(treatmentItem.dateOfDischarge);
    const { incidentId } = treatmentItem;
    lodash.map(linkageTreatmentList, (item) => {
      const { incidentNo, treatmentNo } = item;
      const admissionDate = formUtils.queryValue(item.dateOfAdmission);
      const dischargeDate = formUtils.queryValue(item.dateOfDischarge);

      // 入院日等于入院日 1,3,6 || 入院日等于退院日 7
      if (
        moment(dateOfAdmission).isSame(formUtils.queryValue(admissionDate), UNIT) ||
        moment(dateOfAdmission).isSame(formUtils.queryValue(dischargeDate), UNIT)
      ) {
        if (incidentId === item.incidentId) {
          admissionMessage.push({
            message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000188' }, treatmentNo),
            field: 'dateOfAdmission',
          });
        } else {
          admissionMessage.push({
            message: formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000189' },
              treatmentNo,
              incidentNo
            ),
            field: 'dateOfAdmission',
          });
        }
      }

      // 入院日在期间 8，9，11
      if (moment(dateOfAdmission).isBetween(admissionDate, dischargeDate, UNIT)) {
        if (incidentId === item.incidentId) {
          admissionMessage.push({
            message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000200' }, treatmentNo),
            field: 'dateOfAdmission',
          });
        } else {
          admissionMessage.push({
            message: formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000201' },
              treatmentNo,
              incidentNo
            ),
            field: 'dateOfAdmission',
          });
        }
      }

      // 退院日等于退院日 2，3，5 || 退院日等于入院日 4
      if (
        moment(dateOfDischarge).isSame(formUtils.queryValue(dischargeDate), UNIT) ||
        moment(dateOfDischarge).isSame(formUtils.queryValue(admissionDate), UNIT)
      ) {
        if (incidentId === item.incidentId) {
          dischargeMessage.push({
            message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000188' }, treatmentNo),
            field: 'dateOfDischarge',
          });
        } else {
          dischargeMessage.push({
            message: formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000189' },
              treatmentNo,
              incidentNo
            ),
            field: 'dateOfDischarge',
          });
        }
      }

      // 退院日在期间 9
      if (moment(dateOfDischarge).isBetween(admissionDate, dischargeDate, UNIT)) {
        if (incidentId === item.incidentId) {
          dischargeMessage.push({
            message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000200' }, treatmentNo),
            field: 'dateOfDischarge',
          });
        } else {
          dischargeMessage.push({
            message: formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000201' },
              treatmentNo,
              incidentNo
            ),
            field: 'dateOfDischarge',
          });
        }
      }

      // 入院日退院日反向联动
      if (
        moment(admissionDate).isBetween(dateOfAdmission, dateOfDischarge, UNIT) &&
        moment(dischargeDate).isBetween(dateOfAdmission, dateOfDischarge, UNIT)
      ) {
        if (incidentId === item.incidentId) {
          admissionMessage.push({
            message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000200' }, treatmentNo),
            field: 'dateOfAdmission',
          });
          dischargeMessage.push({
            message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000200' }, treatmentNo),
            field: 'dateOfDischarge',
          });
        } else {
          admissionMessage.push({
            message: formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000201' },
              treatmentNo,
              incidentNo
            ),
            field: 'dateOfAdmission',
          });
          dischargeMessage.push({
            message: formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000201' },
              treatmentNo,
              incidentNo
            ),
            field: 'dateOfDischarge',
          });
        }
      }
    });
    if (!isEmpty(dateOfAdmission)) {
      const finalAdmissionDate = {
        value: dateOfAdmission,
        name: 'dateOfAdmission',
        touched: true,
        dirty: false,
        errors: admissionMessage,
        validating: false,
      };

      if (isEmpty(compact(admissionMessage))) {
        finalAdmissionDate.errors = null;
      }

      state.claimEntities.treatmentListMap[
        treatmentItem.treatmentId
      ].dateOfAdmission = finalAdmissionDate;
    }
    if (!isEmpty(dateOfDischarge)) {
      const finalDischargeDate = {
        value: dateOfDischarge,
        name: 'dateOfDischarge',
        touched: true,
        dirty: false,
        errors: dischargeMessage,
        validating: false,
      };

      if (isEmpty(compact(dischargeMessage))) {
        finalDischargeDate.errors = null;
      }

      state.claimEntities.treatmentListMap[
        treatmentItem.treatmentId
      ].dateOfDischarge = finalDischargeDate;
    }
  });

  return state;
};

export default validateIPDTreatment;
