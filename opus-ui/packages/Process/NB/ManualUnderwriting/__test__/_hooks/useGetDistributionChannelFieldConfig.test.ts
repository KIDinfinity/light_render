import { renderHook } from '@testing-library/react-hooks';
import useGetDistributionChannelFieldConfig from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannelFieldConfig';

jest.mock('basic/components/Elements/hooks/useGetSectionAtomConfig', () => {
  return jest.fn(() => {
    return [
      {
        section: 'DistributionChannel-Field',
        field: 'bankNo',
        'field-props': {
          'visible-condition': {
            combine: '&&',
            conditions: [
              {
                left: '$agentChannelCode',
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

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetPrimaryAgentChannel', () => {
  return jest.fn().mockImplementationOnce(() => {
    return 'AG';
  });
});
describe('useGetDistributionChannelFieldConfig', () => {
  test('generate config', () => {
    const renderer = renderHook(() => useGetDistributionChannelFieldConfig({ localConfig: {} }));
    expect(renderer.result.current).toEqual([
      {
        section: 'DistributionChannel-Field',
        field: 'bankNo',
        'field-props': {
          'visible-condition': {
            combine: '&&',
            conditions: [
              {
                left: 'AG',
                operator: 'in',
                right: ['AG', 'AGENCY'],
              },
            ],
          },
        },
      },
    ]);
  });
});
