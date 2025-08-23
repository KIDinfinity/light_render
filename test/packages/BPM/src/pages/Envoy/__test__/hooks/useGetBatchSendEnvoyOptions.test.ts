import { renderHook } from '@testing-library/react-hooks';
import useGetBatchSendEnvoyOptions from 'bpm/pages/Envoy/hooks/useGetBatchSendEnvoyOptions';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return [];
      })
      // envoyBatchSendConfigs is empty mock currentReasonGroups
      .mockImplementationOnce(() => {
        return [];
      })
      // envoyBatchSendConfigs is empty mock envoyBatchSendConfigs
      .mockImplementationOnce(() => {
        return [
          {
            ressonGroupCode: '3',
          },
        ];
      })
      // currentReasonGroups is empty mock currentReasonGroups
      .mockImplementationOnce(() => {
        return [
          {
            ressonGroupCode: '3',
          },
        ];
      })
      // currentReasonGroups is empty mock envoyBatchSendConfigs
      .mockImplementationOnce(() => {
        return [];
      })
      // get options currentReasonGroups
      .mockImplementationOnce(() => {
        return [
          {
            id: '96e689ac-ef91-4e9f-974d-b2597d306f9b',
            name: 'Counter Offer',
            groupCode: 'P_PH_PND_020',
            caseNo: '6930225',
            taskId: '6930422',
            caseCategory: 'BP_NB_CTG001',
            activityKey: 'BP_NB_ACT004',
            status: 'Draft',
            startTime: null,
            endTime: null,
            enableAutoPend: true,
            sendControl: true,
            currentActivityKey: 'BP_NB_ACT004',
            businessNo: 'JC0202110160001',
            inquiryBusinessNo: null,
            allowActions: ['Save', 'Waive', 'Resolve'],
            reasonDetails: [
              {
                id: '169de6e5-10ad-4fec-8f37-aefebcb95bdd',
                reasonGroupId: '96e689ac-ef91-4e9f-974d-b2597d306f9b',
                reasonCode: 'PH_PND_020',
                reasonName: 'Counter Offer',
              },
            ],
            businessData: null,
            stopSla: null,
            stopTat: null,
            readStatus: true,
            activateUser: null,
            applicant: null,
            assignee: null,
            ntuDate: null,
            envoyAuth: {
              envoyView: true,
              envoyEdit: true,
              envoySend: true,
            },
          },
        ];
      })
      // get options envoyBatchSendConfigs
      .mockImplementationOnce(() => {
        return [
          {
            id: '7b1edece-3c83-11ec-b983-0242ac110011',
            creator: 'ray',
            gmtCreate: '2021-11-02T16:00:00.000+0000',
            modifier: 'ray',
            gmtModified: '2021-11-02T16:00:00.000+0000',
            deleted: 0,
            transId: '4f764f24-3c83-11ec-b983-0242ac110011',
            reasonGroupCode: 'P_PH_PND_019',
            regionCode: 'PH',
            caseCategory: 'BP_NB_CTG001',
            enableBatchSend: true,
          },
          {
            id: '7b1edece-3c83-11ec-b983-0242ac110012',
            creator: 'ray',
            gmtCreate: '2021-11-02T16:00:00.000+0000',
            modifier: 'ray',
            gmtModified: '2021-11-02T16:00:00.000+0000',
            deleted: 0,
            transId: '4f764f24-3c83-11ec-b983-0242ac110011',
            reasonGroupCode: 'P_PH_PND_020',
            regionCode: 'PH',
            caseCategory: 'BP_NB_CTG001',
            enableBatchSend: true,
          },
        ];
      })
      // filer active currentReasonGroups
      .mockImplementationOnce(() => {
        return [
          {
            id: '96e689ac-ef91-4e9f-974d-333',
            name: 'Counter Offer',
            groupCode: 'P_PH_PND_020',
            caseNo: '6930225',
            taskId: '6930422',
            caseCategory: 'BP_NB_CTG001',
            activityKey: 'BP_NB_ACT004',
            status: 'Active',
            startTime: null,
            endTime: null,
            enableAutoPend: true,
            sendControl: true,
            currentActivityKey: 'BP_NB_ACT004',
            businessNo: 'JC0202110160001',
            inquiryBusinessNo: null,
            allowActions: ['Save', 'Waive', 'Resolve'],
            reasonDetails: [
              {
                id: '169de6e5-10ad-4fec-8f37-aefebcb95bdd',
                reasonGroupId: '96e689ac-ef91-4e9f-974d-b2597d306f9b',
                reasonCode: 'PH_PND_020',
                reasonName: 'Counter Offer',
              },
            ],
            businessData: null,
            stopSla: null,
            stopTat: null,
            readStatus: true,
            activateUser: null,
            applicant: null,
            assignee: null,
            ntuDate: null,
            envoyAuth: {
              envoyView: true,
              envoyEdit: true,
              envoySend: true,
            },
          },
          {
            id: '96e689ac-ef91-4e9f-974d-44',
            name: 'Counter Offer',
            groupCode: 'P_PH_PND_020',
            caseNo: '6930225',
            taskId: '6930422',
            caseCategory: 'BP_NB_CTG001',
            activityKey: 'BP_NB_ACT004',
            status: 'Draft',
            startTime: null,
            endTime: null,
            enableAutoPend: true,
            sendControl: true,
            currentActivityKey: 'BP_NB_ACT004',
            businessNo: 'JC0202110160001',
            inquiryBusinessNo: null,
            allowActions: ['Save', 'Waive', 'Resolve'],
            reasonDetails: [
              {
                id: '169de6e5-10ad-4fec-8f37-aefebcb95bdd',
                reasonGroupId: '96e689ac-ef91-4e9f-974d-b2597d306f9b',
                reasonCode: 'PH_PND_020',
                reasonName: 'Counter Offer',
              },
            ],
            businessData: null,
            stopSla: null,
            stopTat: null,
            readStatus: true,
            activateUser: null,
            applicant: null,
            assignee: null,
            ntuDate: null,
            envoyAuth: {
              envoyView: true,
              envoyEdit: true,
              envoySend: true,
            },
          },
        ];
      })
      // filer active envoyBatchSendConfigs
      .mockImplementationOnce(() => {
        return [
          {
            id: '7b1edece-3c83-11ec-b983-0242ac110011',
            creator: 'ray',
            gmtCreate: '2021-11-02T16:00:00.000+0000',
            modifier: 'ray',
            gmtModified: '2021-11-02T16:00:00.000+0000',
            deleted: 0,
            transId: '4f764f24-3c83-11ec-b983-0242ac110011',
            reasonGroupCode: 'P_PH_PND_019',
            regionCode: 'PH',
            caseCategory: 'BP_NB_CTG001',
            enableBatchSend: true,
          },
          {
            id: '7b1edece-3c83-11ec-b983-0242ac110012',
            creator: 'ray',
            gmtCreate: '2021-11-02T16:00:00.000+0000',
            modifier: 'ray',
            gmtModified: '2021-11-02T16:00:00.000+0000',
            deleted: 0,
            transId: '4f764f24-3c83-11ec-b983-0242ac110011',
            reasonGroupCode: 'P_PH_PND_020',
            regionCode: 'PH',
            caseCategory: 'BP_NB_CTG001',
            enableBatchSend: true,
          },
        ];
      }),
  };
});

describe('useGetBatchSendEnvoyOptions', () => {
  test('envoyBatchSendConfigs is empty', () => {
    const renderer = renderHook(() => {
      return useGetBatchSendEnvoyOptions();
    });
    expect(renderer.result.current).toEqual([]);
  });
  test('currentReasonGroups is empty', () => {
    const renderer = renderHook(() => {
      return useGetBatchSendEnvoyOptions();
    });
    expect(renderer.result.current).toEqual([]);
  });
  test('get options', () => {
    const renderer = renderHook(() => useGetBatchSendEnvoyOptions());
    expect(renderer.result.current).toEqual([
      {
        id: '96e689ac-ef91-4e9f-974d-b2597d306f9b',
        name: 'Counter Offer',
        groupCode: 'P_PH_PND_020',
        caseNo: '6930225',
        taskId: '6930422',
        caseCategory: 'BP_NB_CTG001',
        activityKey: 'BP_NB_ACT004',
        status: 'Draft',
        startTime: null,
        endTime: null,
        enableAutoPend: true,
        sendControl: true,
        currentActivityKey: 'BP_NB_ACT004',
        businessNo: 'JC0202110160001',
        inquiryBusinessNo: null,
        allowActions: ['Save', 'Waive', 'Resolve'],
        reasonDetails: [
          {
            id: '169de6e5-10ad-4fec-8f37-aefebcb95bdd',
            reasonGroupId: '96e689ac-ef91-4e9f-974d-b2597d306f9b',
            reasonCode: 'PH_PND_020',
            reasonName: 'Counter Offer',
          },
        ],
        businessData: null,
        stopSla: null,
        stopTat: null,
        readStatus: true,
        activateUser: null,
        applicant: null,
        assignee: null,
        ntuDate: null,
        envoyAuth: {
          envoyView: true,
          envoyEdit: true,
          envoySend: true,
        },
      },
    ]);
  });
  test('filer activity envoy', () => {
    const renderer = renderHook(() => useGetBatchSendEnvoyOptions());
    expect(renderer.result.current).toEqual([
      {
        id: '96e689ac-ef91-4e9f-974d-44',
        name: 'Counter Offer',
        groupCode: 'P_PH_PND_020',
        caseNo: '6930225',
        taskId: '6930422',
        caseCategory: 'BP_NB_CTG001',
        activityKey: 'BP_NB_ACT004',
        status: 'Draft',
        startTime: null,
        endTime: null,
        enableAutoPend: true,
        sendControl: true,
        currentActivityKey: 'BP_NB_ACT004',
        businessNo: 'JC0202110160001',
        inquiryBusinessNo: null,
        allowActions: ['Save', 'Waive', 'Resolve'],
        reasonDetails: [
          {
            id: '169de6e5-10ad-4fec-8f37-aefebcb95bdd',
            reasonGroupId: '96e689ac-ef91-4e9f-974d-b2597d306f9b',
            reasonCode: 'PH_PND_020',
            reasonName: 'Counter Offer',
          },
        ],
        businessData: null,
        stopSla: null,
        stopTat: null,
        readStatus: true,
        activateUser: null,
        applicant: null,
        assignee: null,
        ntuDate: null,
        envoyAuth: {
          envoyView: true,
          envoyEdit: true,
          envoySend: true,
        },
      },
    ]);
  });
});
