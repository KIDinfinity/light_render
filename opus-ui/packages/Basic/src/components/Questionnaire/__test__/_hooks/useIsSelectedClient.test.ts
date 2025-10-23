import { renderHook } from '@testing-library/react-hooks';
import useIsSelectedClient from 'basic/components/Questionnaire/_hooks/useIsSelectedClient';

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useContext: jest.fn(() => {
      return {
        state: {
          selectedClientId: '233',
        },
      };
    }),
  };
});

describe('is selected', () => {
  test('has clientId', () => {
    const renderer = renderHook(() => useIsSelectedClient({ clientId: '233' }));
    expect(renderer.result.current).toBeTruthy();
  });
  test('has no clietId', () => {
    const renderer = renderHook(() => useIsSelectedClient({}));
    expect(renderer.result.current).not.toBeTruthy();
  });
});
