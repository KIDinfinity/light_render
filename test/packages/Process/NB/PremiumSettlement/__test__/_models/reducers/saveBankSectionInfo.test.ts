import saveBankSectionInfo from 'process/NB/PremiumSettlement/_models/reducers/saveBankSectionInfo';

describe('SaveBankSection', () => {
  test('changeFields', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'ppp',
            bankInfoList: [
              {
                type: 'W',
                bankCode: 'CC',
              },
              {
                type: 'W',
                bankCode: 'DD',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        bankSectionIndex: 0,
      },
    };
    const result = saveBankSectionInfo(state, action);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'ppp',
            bankInfoList: [
              {
                type: 'W',
                bankCode: 'CC',
              },
              {
                type: 'E',
                bankCode: 'DD',
              },
            ],
          },
        ],
      },
    });
  });
});
