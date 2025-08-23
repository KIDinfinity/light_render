import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientManualEdit', () => {
  return jest
    .fn(() => {
      return 0;
    })
    .mockImplementationOnce(() => {
      return 1;
    })
    .mockImplementationOnce(() => {
      return 1;
    })
    .mockImplementationOnce(() => {
      return 0;
    })
});
jest.mock('process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextClientId', () => {
  return jest.fn(() => {
    return '';
  });
});

jest.mock('basic/hooks/useGetEditableByConfig', () => {
  return jest.fn(() => {
    return true;
  })
  .mockImplementationOnce(() => {
    return true;
  })
  .mockImplementationOnce(() => {
    return false
  })
  .mockImplementationOnce(() => {
    return false
  })
});
describe('useJudgeNewClientDisabled', () => {
  test('is manual add client & editable by config is true', () => {
    const renderer = renderHook(() =>
      useJudgeNewClientDisabled({
        editableConditions: true,
        config: {
          'field-props': {
            editable: 'C',
            'editable-condition': {
              conditions: [
                {
                  left: {
                    field: 'isManuallyAdded',
                    domain: 'field',
                  },
                  right: 1,
                  operator: '===',
                },
              ],
              combine: '&&',
            },
          },
        },
      })
    );

    const result = renderer.result.current;
    expect(result).not.toBeTruthy();
  });

  test('is manual add client & editable by config is false', () => {
    const renderer = renderHook(() =>
      useJudgeNewClientDisabled({
        editableConditions: true,
        config: {
          'field-props': {
            editable: 'C',
            'editable-condition': {
              conditions: [
                {
                  left: {
                    field: 'isManuallyAdded',
                    domain: 'field',
                  },
                  right: 1,
                  operator: '===',
                },
              ],
              combine: '&&',
            },
          },
        },
      })
    );

    const result = renderer.result.current;
    expect(result).not.toBeTruthy();
  });
  test('not manual add client & editable by config is false', () => {
    const renderer = renderHook(() =>
      useJudgeNewClientDisabled({
        editableConditions: true,
        config: {
          'field-props': {
            editable: 'C',
            'editable-condition': {
              conditions: [
                {
                  left: {
                    field: 'isManuallyAdded',
                    domain: 'field',
                  },
                  right: 1,
                  operator: '===',
                },
              ],
              combine: '&&',
            },
          },
        },
      })
    );

    const result = renderer.result.current;
    expect(result).toBeTruthy();
  });
});
