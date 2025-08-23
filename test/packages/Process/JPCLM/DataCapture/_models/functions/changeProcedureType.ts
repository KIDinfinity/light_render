import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { OTHERPROCEDUREITEM } from '@/utils/claimConstant';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import { INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import { EProcedureType } from 'process/Enum';
import { tenant } from '@/components/Tenant';

export function changeProcedureType({
  dispatch,
  procedureType,
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
        type: 'JPCLMOfDataCapture/procedureAdd',
        payload: {
          treatmentId,
          addProcedureItem,
        },
      });
      break;
    }
    case EProcedureType.DG1: {
      const addOtherProcedureItem = {
        ...OTHERPROCEDUREITEM,
        claimNo,
        id: uuidv4(),
        treatmentId,
        procedureType,
        therapeuticMonthList: [],
        therapeuticDate: '2022-08-09T00:00:00+08:00',
        therapeuticDrug: 'aaaaaa',
        therapeuticMonth: '2022/08',
      };

      dispatch({
        type: 'JPCLMOfDataCapture/otherProcedureAdd',
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
        type: 'JPCLMOfDataCapture/invoiceAdd',
        payload: {
          treatmentId,
          invoiceAdd,
          addServiceItem,
        },
      });

      break;
    }
    case EProcedureType.Radiotherapy:
    case EProcedureType.DG2: {
      const addOtherProcedureItem = {
        ...OTHERPROCEDUREITEM,
        claimNo,
        id: uuidv4(),
        treatmentId,
        procedureType,
      };

      dispatch({
        type: 'JPCLMOfDataCapture/otherProcedureAdd',
        payload: {
          treatmentId,
          addOtherProcedureItem,
        },
      });
      break;
    }
  }
}

export default changeProcedureType;
