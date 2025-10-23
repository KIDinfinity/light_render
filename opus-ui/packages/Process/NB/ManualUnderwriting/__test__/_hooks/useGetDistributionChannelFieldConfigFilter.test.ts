import { renderHook } from '@testing-library/react-hooks';
import useGetDistributionChannelFieldConfigFilter from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannelFieldConfigFilter';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetDistributionChannelFieldConfig', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        section: 'DistributionChannel-Field',
        field: 'bankNo',
        'field-props': {
          visible: 'C',
          'visible-condition': {
            combine: '&&',
            conditions: [
              {
                left: 'PP',
                operator: 'in',
                right: ['AG', 'AGENCY'],
              },
            ],
          },
        },
      },
    ];
  });
});

describe('useGetDistributionChannelFieldConfigFilter', () => {
  test('filter by condition', () => {
    const renderer = renderHook(() =>
      useGetDistributionChannelFieldConfigFilter({
        localConfig: {},
      })
    );
    expect(renderer.result.current).toEqual([]);
  });
});
