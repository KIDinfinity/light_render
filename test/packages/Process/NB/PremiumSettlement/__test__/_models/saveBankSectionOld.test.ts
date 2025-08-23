import saveBankSectionOld from 'process/NB/PremiumSettlement/_models/reducers/saveBankSectionOld';

describe('saveBankSectionOld', () => {
  test('handle changes', () => {
    const changedFields = {
      bankName: 'City Bank',
    };
    const bankInfoIndex = 0;
    const state = {
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields,
        bankInfoIndex,
      },
    };
    const result = saveBankSectionOld(state, action);

    expect(result).toEqual({
      businessData: {
        applicationNo: 'applicationNo',
        policyId: 'policyId',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: '',
                bankAcctNo: '',
                bankCode: '',
                bankAcctName: '',
                bankName: 'City Bank',
                policyId: 'policyId',
                type: 'W',
              },
            ],
          },
        ],
      },
    });
  });
  test('handle change bankCode', () => {
    const changedFields = {
      bankCode: 'CB',
    };
    const bankInfoIndex = 0;
    const state = {
      brankList: [
        {
          bankCode: 'CB',
          bankName: 'City Bank',
          factoringHouseCode: 'House',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: '',
                bankAcctNo: '',
                bankCode: '',
                bankAcctName: '',
                bankName: 'City Bank',
                policyId: 'policyId',
                type: 'W',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields,
        bankInfoIndex,
      },
    };
    const result = saveBankSectionOld(state, action);

    expect(result).toEqual({
      brankList: [
        {
          bankCode: 'CB',
          bankName: 'City Bank',
          factoringHouseCode: 'House',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: 'House',
                bankAcctNo: '',
                bankCode: 'CB',
                bankAcctName: '',
                bankName: 'City Bank',
                policyId: 'policyId',
                type: 'W',
              },
            ],
          },
        ],
      },
    });
  });

  test('handle change bankAcctFactoryHouse', () => {
    const changedFields = {
      bankAcctFactoryHouse: '555',
    };
    const bankInfoIndex = 0;
    const state = {
      brankList: [
        {
          bankCode: 'CB',
          bankName: 'City Bank',
          factoringHouseCode: 'House',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: 'House',
                bankName: 'City Bank',
                bankCode: 'CB',
                bankAcctNo: '',
                bankAcctName: '',
                policyId: 'policyId',
                type: 'W',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields,
        bankInfoIndex,
      },
    };
    const result = saveBankSectionOld(state, action);

    expect(result).toEqual({
      brankList: [
        {
          bankCode: 'CB',
          bankName: 'City Bank',
          factoringHouseCode: 'House',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: '555',
                bankName: null,
                bankCode: null,
                bankAcctNo: '',
                bankAcctName: '',
                policyId: 'policyId',
                type: 'W',
              },
            ],
          },
        ],
      },
    });
  });
});
