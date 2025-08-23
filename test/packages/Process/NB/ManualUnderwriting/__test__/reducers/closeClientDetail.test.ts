import closeClientDetail from 'process/NB/ManualUnderwriting/_models/reducers/closeClientDetail';

describe('test close client detail', () => {
  test('set expanded client', () => {
    const state = {
      expendedClient: '233',
    };
    const result = closeClientDetail(state);
    expect(result).toEqual({
      expendedClient: '',
    });
  });
});
