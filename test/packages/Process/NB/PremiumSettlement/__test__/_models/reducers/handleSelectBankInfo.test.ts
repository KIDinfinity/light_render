import handleSelectBankInfo from 'process/NB/PremiumSettlement/_models/reducers/handleSelectBankInfo';

describe('SaveBankSection', () => {
  test('changeFields, origin source = Smart', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'ppp',
            bankInfoList: [
              {
                type: 'E',
                bankCode: 'CC',
                id: '233',
                source: 'LA',
              },
              {
                type: 'W',
                bankCode: 'DD',
                source: 'Smart',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        id: '233',
      },
    };
    const result = handleSelectBankInfo(state, action);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'ppp',
            bankInfoList: [
              {
                type: 'W',
                bankCode: 'CC',
                id: '233',
                source: 'LA',
                selection: 'Y',
              },
              {
                type: null,
                bankCode: 'DD',
                source: 'Smart',
                selection: 'N',
              },
            ],
          },
        ],
      },
    });
  });

  test('changeFields, origin source = LA', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'ppp',
            bankInfoList: [
              {
                type: 'E',
                bankCode: 'CC',
                id: '233',
                source: 'LA',
              },
              {
                type: 'W',
                bankCode: 'DD',
                source: 'LA',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        id: '233',
      },
    };
    const result = handleSelectBankInfo(state, action);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'ppp',
            bankInfoList: [
              {
                type: 'W',
                bankCode: 'CC',
                id: '233',
                source: 'LA',
                selection: 'Y',
              },
              {
                type: 'E',
                bankCode: 'DD',
                source: 'LA',
                selection: 'N',
              },
            ],
          },
        ],
      },
    });
  });
});
