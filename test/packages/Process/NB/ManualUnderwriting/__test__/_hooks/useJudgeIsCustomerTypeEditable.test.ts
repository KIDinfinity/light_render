import { renderHook } from '@testing-library/react-hooks';
import useJudgeIsCustomerTypeEditable from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsCustomerTypeEditable';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test',
          roleList: [
            { customerRole: 'CUS002' },
            { customerRole: 'CUS005' },
            { customerRole: 'CUS007' },
            { customerRole: 'CUS011' },
          ],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test',
          roleList: [{ customerRole: 'CUS005' }, { customerRole: 'CUS007' }],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test',
          roleList: [{ customerRole: 'CUS003' }, { customerRole: 'CUS001' }],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test',
          roleList: [{ customerRole: 'CUS007' }],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test',
          roleList: [{ customerRole: 'CUS001' }],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test',
          roleList: [{ customerRole: 'CUS003' }],
        },
      ];
    });
});

describe('useJudgeIsCustomerTypeEditable', () => {
  test('no match item', () => {
    const id = 'test';
    const renderer = renderHook(() => useJudgeIsCustomerTypeEditable(id));

    expect(renderer.result.current).toBeFalsy();
  });
  test('two items, but no match roles ', () => {
    const id = 'test';
    const renderer = renderHook(() => useJudgeIsCustomerTypeEditable(id));

    expect(renderer.result.current).toBeFalsy();
  });
  test('two items, both match', () => {
    const id = 'test';
    const renderer = renderHook(() => useJudgeIsCustomerTypeEditable(id));

    expect(renderer.result.current).toBeTruthy();
  });
  test('one item, no match', () => {
    const id = 'test';
    const renderer = renderHook(() => useJudgeIsCustomerTypeEditable(id));

    expect(renderer.result.current).toBeFalsy();
  });
  test('one item, one match, role is insured', () => {
    const id = 'test';
    const renderer = renderHook(() => useJudgeIsCustomerTypeEditable(id));

    expect(renderer.result.current).toBeTruthy();
  });
  test('one item, one match, role is benificary', () => {
    const id = 'test';
    const renderer = renderHook(() => useJudgeIsCustomerTypeEditable(id));

    expect(renderer.result.current).toBeTruthy();
  });
});
