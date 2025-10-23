import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { OTHERPROCEDUREITEM } from '@/utils/claimConstant';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import { INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import { EProcedureType } from 'process/Enum';
import { tenant } from '@/components/Tenant';

export function changeProcedureType({
  dispatch,
  procedureType,
  incidentId,
  treatmentId,
  claimNo,
  procedureList,
}: any) {
  switch (procedureType) {
    case EProcedureType.Surgical: {
      const addProcedureItem = {
        ...PROCEDUREITEM,
        claimNo,
        id: uuidv4(),
        treatmentId,
        procedureNo: lodash.isArray(procedureList) ? procedureList.length + 1 : 1,
        procedureType,
      };

      dispatch({
        type: 'opusClaimDataCapture/procedureAdd',
        payload: {
          treatmentId,
          addProcedureItem,
        },
      });
      break;
    }
    case EProcedureType.DG1:
    case EProcedureType.DG2: {
      const addOtherProcedureItem = {
        ...OTHERPROCEDUREITEM,
        claimNo,
        id: uuidv4(),
        treatmentId,
        procedureType,
        therapeuticMonthList: [
          {
            therapeuticMonth: '',
            therapeuticDateList: '[]',
            therapeuticDrugList: '[]',
          },
        ],
      };

      dispatch({
        type: 'opusClaimDataCapture/otherProcedureAdd',
        payload: {
          treatmentId,
          addOtherProcedureItem,
        },
      });
      break;
    }
    case EProcedureType.HS: {
      const addOtherProcedureItem = {
        ...OTHERPROCEDUREITEM,
        claimNo,
        id: uuidv4(),
        treatmentId,
        procedureType,
        therapeuticMonthList: [
          {
            firstTreatmentDate: '',
          },
        ],
        intravenousTreatment: '',
      };

      dispatch({
        type: 'opusClaimDataCapture/otherProcedureAdd',
        payload: {
          treatmentId,
          addOtherProcedureItem,
        },
      });
      break;
    }
    case EProcedureType.PC: {
      const addOtherProcedureItem = {
        ...OTHERPROCEDUREITEM,
        claimNo,
        id: uuidv4(),
        treatmentId,
        procedureType,
        therapeuticMonthList: [
          {
            therapeuticMonth: '',
            therapeuticDateList: undefined,
            therapeuticDrugList: '[]',
          },
        ],
      };

      dispatch({
        type: 'opusClaimDataCapture/otherProcedureAdd',
        payload: {
          treatmentId,
          addOtherProcedureItem,
        },
      });

      break;
    }
    case EProcedureType.JPAC:
    case EProcedureType.JPADMED: {
      const invoiceId = uuidv4();
      const serviceItemId = uuidv4();

      const invoiceAdd = {
        ...INVOICEITEM,
        claimNo,
        id: invoiceId,
        serviceItemList: [serviceItemId],
        treatmentId,
        invoiceCurrency: tenant.currency(),
      };
      const addServiceItem = {
        ...SERVICEITEM,
        claimNo,
        id: serviceItemId,
        invoiceId,
        serviceItem: procedureType,
      };
      dispatch({
        type: 'opusClaimDataCapture/invoiceAdd',
        payload: {
          treatmentId,
          invoiceAdd,
          addServiceItem,
        },
      });

      break;
    }
    case EProcedureType.Radiotherapy: {
      const addOtherProcedureItem = {
        ...OTHERPROCEDUREITEM,
        claimNo,
        id: uuidv4(),
        treatmentId,
        procedureType,
      };

      dispatch({
        type: 'opusClaimDataCapture/otherProcedureAdd',
        payload: {
          treatmentId,
          addOtherProcedureItem,
        },
      });
      break;
    }
    case EProcedureType.OP:
      dispatch({
        type: 'opusClaimDataCapture/opTreatmentListAdd',
        payload: {
          treatmentId,
          incidentId,
          dateList: [''],
          procedureType: EProcedureType.OP,
        },
      });
      break;
    default:
      const invoiceId = uuidv4();
      const serviceItemId = uuidv4();

      const invoiceAdd = {
        ...INVOICEITEM,
        claimNo,
        id: invoiceId,
        serviceItemList: [serviceItemId],
        treatmentId,
        invoiceCurrency: tenant.currency(),
      };
      const addServiceItem = {
        ...SERVICEITEM,
        claimNo,
        id: serviceItemId,
        invoiceId,
      };
      dispatch({
        type: 'opusClaimDataCapture/invoiceAdd',
        payload: {
          treatmentId,
          invoiceAdd,
          addServiceItem,
        },
      });
      break;
  }
}

export default changeProcedureType;
