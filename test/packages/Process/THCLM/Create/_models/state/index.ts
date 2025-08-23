import {v4 as uuidv4 } from 'uuid';

const incidentItemId = uuidv4();
const treatmentItemId = uuidv4();
const invoiceItemId = uuidv4();
const payeeId = uuidv4();

export default {
  claimProcessData: {
    id: uuidv4(),
    creator: 'Alex',
    gmtCreate: '2019-10-23T03:22:46.000+0000',
    modifier: '0',
    gmtModified: '2019-10-23T03:22:46.000+0000',
    deleted: 0,
    transId: 'd4dde81e-def4-4dbc-adaa-c4063f3d8867',
    submissionChannel: '',
    submissionDate: '',
    closeDate: null,
    caseCategory: '',
    status: 'inProgress',
    caseSource: '',
    receivedDate: null,
    processInstanceId: '1202501',
    taskId: '1202527',
    isManualField:'',
    isManual: 'N',
    activityKey: null,
    policyIdList: null,
    variables: {},
    payee: null,
    payeeList: [payeeId],
    claimDecision: {
      assessmentRemark: 'Decline',
      assessmentDecision: 'A',
    },
    incidentList: [incidentItemId],
    insured: {
      id: uuidv4(),
      creator: 'Alex',
      gmtCreate: '2019-10-23T03:22:46.000+0000',
      modifier: null,
      gmtModified: '2019-10-23T03:22:46.000+0000',
      deleted: 0,
      transId: 'd4dde81e-def4-4dbc-adaa-c4063f3d8867',
      firstName: '',
      surname: '',
      identityType: '',
      identityNo: '',
      gender: '',
      nationality: '',
      dateOfBirth: '',
      dateTimeOfDeath: null,
      occupation: '',
      phoneNo: '',
      email: '',
      address: '',
      middleName: null,
      postCode: null,
    },
  },
  claimEntities: {
    incidentListMap: {
      [incidentItemId]: {
        id: incidentItemId,
        creator: 'Alex',
        gmtCreate: '2019-10-22T16:00:00.000+0000',
        modifier: '0',
        gmtModified: '2019-10-22T16:00:00.000+0000',
        deleted: 0,
        transId: 'd72d16cf-3e9a-4b6d-9dd0-10f26fd2b614',
        claimType: '',
        incidentNo: '1',
        causeOfIncident: '',
        incidentDate: '',
        incidentTime: '',
        partOfBodyInjured: '',
        identificationDate: null,
        orderNum: 1,
        incidentPlace: '',
        incidentInDetail: '',
        primaryDiagnosisCode: 'A00.0',
        partOfBodyInjuredArray: null,
        jpIncident: null,
        diagnosisList: [],
        treatmentList: [],
      },
    },
    diagnosisListMap: {},
    treatmentListMap: {
    },
    mainBenefitListMap: {},
    procedureListMap: {},
    invoiceListMap: {
    },
    serviceItemListMap: {},
    payeeListMap: {
      [payeeId]:{
        payeeType: '',
        firstName: '',
        surname: '',
        identityType: '',
        identityNo: '',
        phoneNo: '',
        relationshipWithInsured: '',
        organization: 0,
        paymentMethod: '',
        id: '',
      }
    },
  },
  incidentItemExpandStatus: {
    [`id_${incidentItemId}`]: true
  }
};
