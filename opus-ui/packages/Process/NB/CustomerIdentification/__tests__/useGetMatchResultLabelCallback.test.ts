import { renderHook } from '@testing-library/react-hooks';
import useGetMatchResultLabelCallback from 'process/NB/CustomerIdentification/_hooks/useGetMatchResultLabelCallback';

jest.mock('@/utils/dictFormatMessage', () => {
  const actual = jest.requireActual('dva');

  return {
    ...actual,
    formatMessageApi: jest.fn((params: any) => {
      const rr = Object.entries(params);
      const dists = {
        Dropdown_NB_ClientTag: {
          FullyMatch: 'FullyMatch',
          Mismatch: 'Mismatch',
        },
      };
      return dists[rr[0][0]][rr[0][1]];
    }),
  };
});

describe('useGetMatchResultLabelCallback', () => {
  test('fullyMatch label', () => {
    const item = {
      identificationList: [
        {
          clientTag: 'FullyMatch',
        },
      ],
    };
    const renderer = renderHook(() => useGetMatchResultLabelCallback({ item }));
    const handler = renderer.result.current;
    const result = handler({ item });
    expect(result).toEqual('FullyMatch');
  });

  test('Mismatch label', () => {
    const item = {
      identificationList: [
        {
          clientTag: 'Mismatch',
        },
      ],
    };
    const renderer = renderHook(() => useGetMatchResultLabelCallback({ item }));
    const handler = renderer.result.current;
    const result = handler({ item });
    expect(result).toEqual('Mismatch');
  });
});
