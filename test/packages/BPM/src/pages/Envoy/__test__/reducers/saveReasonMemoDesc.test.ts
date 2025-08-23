import saveReasonMemoDesc from 'bpm/pages/Envoy/_models/reducers/saveReasonMemoDesc';
// packages/BPM/src/pages/Envoy/_models/reducers/saveReasonMemoDesc.ts

jest.mock('bpm/pages/Envoy/_utils/dataTransferFn', () => {
  return {
    getFieldName: jest.fn(() => {
      return 'memoDesc';
    }),
  };
});
describe('saveReasonMemoDesc', () => {
  test('test.js', () => {
    const state = {
      currentReasonGroups: [
        {
          id: '233',
          reasonDetails: [
            {
              memoDesc: 'before',
              id: 'reason',
            },
          ],
        },
      ],
    };
    const payload = {
      groupId: '233',
      dataId: 'reason',
      value: 'after',
      name: 'memoDesc',
    };
    const result = saveReasonMemoDesc(state, { payload });
    expect(result).toEqual({
      currentReasonGroups: [
        {
          id: '233',
          reasonDetails: [
            {
              memoDesc: 'after',
              id: 'reason',
            },
          ],
        },
      ],
    });
  });
});
