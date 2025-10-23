import deleteBenefitLevelExclusionItem from 'process/NB/ManualUnderwriting/_models/reducers/deleteBenefitLevelExclusionItem';

describe('deleteBenefitLevelExclusionItem', () => {
  test('delete benefitLevel exclusion item', () => {
    const state = {
      businessData: {
        policyList: [{
          coverageList: [{
            id: 'coverageId',
            coverageExclusionList: [{
              id: 'exclusionId'
            }, {
              id: '233'
            }]
          }]
        }]
      }
    };
    const action = {
      payload: {
        id: 'exclusionId',
        coverageItemId: 'coverageId'
      }
    }
    const result = deleteBenefitLevelExclusionItem(state, action)
    expect(result).toEqual({
      businessData: {
        policyList: [{
          coverageList: [{
            id: 'coverageId',
            coverageExclusionList: [{
              id: '233'
            }]
          }]
        }]
      }
    })
  })
})
