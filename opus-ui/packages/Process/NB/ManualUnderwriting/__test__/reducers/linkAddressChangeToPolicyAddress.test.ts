import linkAddressChangeToPolicyAddress from 'process/NB/ManualUnderwriting/_models/reducers/linkAddressChangeToPolicyAddress';

describe('linkAddressChangeToPolicyAddress', () => {
  test('change communicationLane', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: '1',
                    communicationLane: 'Y',
                  },
                  {
                    addrType: 'B',
                    address1: '2',
                    communicationLane: 'N',
                    country: 'AA',
                    zipCode: 'zz',
                  },
                ],
              },
            ],
            policyAddressList: [
              {
                id: '666',
                addrType: 'C',
                addressLine1: '1',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields: {
          communicationLane: 'B',
        },
        id: 'clientId',
      },
    };

    const result = linkAddressChangeToPolicyAddress(state, action);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: '1',
                    communicationLane: 'N',
                  },
                  {
                    addrType: 'B',
                    address1: '2',
                    communicationLane: 'Y',
                    country: 'AA',
                    zipCode: 'zz',
                  },
                ],
              },
            ],
            policyAddressList: [
              {
                addrType: 'B',
                addressLine1: '2',
                countryCode: 'AA',
                zipCode: 'zz',
                id: '666',
              },
            ],
          },
        ],
      },
    });
  });
  test('change communicationLane & target addrType not exit', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: '1',
                    communicationLane: 'Y',
                  },
                  {
                    addrType: 'B',
                    address1: '2',
                    communicationLane: 'N',
                  },
                ],
              },
            ],
            policyAddressList: [
              {
                addrType: 'C',
                addressLine1: '1',
                id: '666',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields: {
          communicationLane: 'R',
        },
        id: 'clientId',
      },
    };

    const result = linkAddressChangeToPolicyAddress(state, action);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'policy-id',
            clientInfoList: [
              {
                id: 'clientId',
                addressList: [
                  {
                    addrType: 'C',
                    address1: '1',
                    communicationLane: 'N',
                  },
                  {
                    addrType: 'B',
                    address1: '2',
                    communicationLane: 'N',
                  },
                  {
                    addrType: 'R',
                    communicationLane: 'Y',
                  },
                ],
              },
            ],
            policyAddressList: [
              {
                addrType: 'R',
                id: '666',
              },
            ],
          },
        ],
      },
    });
  });
});
