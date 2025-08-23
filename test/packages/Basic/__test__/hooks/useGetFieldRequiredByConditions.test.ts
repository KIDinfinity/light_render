import { renderHook } from '@testing-library/react-hooks';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';

jest.mock('basic/components/Form', () => {
  return {
    Rule: jest
      .fn()
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false),
    Required: {
      Yes: 'Y',
      Conditions: 'C',
    },
  };
});

describe('useGetFieldRequiredByConditions', () => {
  test('field is disabled', () => {
    const renderer = renderHook(() =>
      useGetFieldRequiredByConditions({
        disabled: true,
        localConfig: {},
        config: {},
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('use rule & Rule return true', () => {
    const renderer = renderHook(() =>
      useGetFieldRequiredByConditions({
        disabled: false,
        localConfig: {},
        config: {
          required: 'C',
        },
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('use rule and Rule return false', () => {
    const renderer = renderHook(() =>
      useGetFieldRequiredByConditions({
        disabled: false,
        localConfig: {},
        config: {
          required: 'C',
        },
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('required is Y', () => {
    const renderer = renderHook(() =>
      useGetFieldRequiredByConditions({
        disabled: false,
        localConfig: {},
        config: {
          required: 'Y',
        },
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('required is N', () => {
    const renderer = renderHook(() =>
      useGetFieldRequiredByConditions({
        disabled: false,
        localConfig: {},
        config: {
          required: 'N',
        },
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
});
