import useGetColumnsByCondition from 'process/NB/CustomerIdentification/_hooks/useGetColumnsByCondition';
import { renderHook } from '@testing-library/react-hooks';

describe('useGetColumnsByCondition', () => {
  test('001', () => {
    const columnList = [
      {
        visible: 'C',
        visibleCondition: {
          combine: '&&',
          conditions: [
            {
              combine: '&&',
              dataPath: 'ctfList[]',
              conditions: [
                {
                  left: { paramKey: 'type' },
                  operator: 'in',
                  right: ['A', 'B'],
                },
                {
                  left: { paramKey: 'aatype' },
                  operator: '===',
                  right: 'b',
                },
                {
                  combine: '||',
                  dataPath: 'XXX[]',
                  conditions: [
                    {
                      left: { paramKey: 'xxType' },
                      operator: '===',
                      right: 'GG',
                    },
                  ],
                },
              ],
            },
            {
              left: {
                paramKey: 'id',
              },
              operator: '===',
              right: '1',
            },
          ],
        },
      },
    ];
    const data = {
      id: '1',
      ctfList: [
        {
          type: 'A',
          aatype: 'b',
          XXX: [
            {
              xxType: 'GG',
              bbType: 'bb',
            },
          ],
        },
      ],
    };
    const renderer = renderHook(() => useGetColumnsByCondition({ columnList, data }));
    expect(renderer.result.current).toEqual([
      {
        visible: 'Y',
        visibleCondition: {
          combine: '&&',
          conditions: [
            {
              combine: '&&',
              dataPath: 'ctfList[]',
              conditions: [
                {
                  left: { paramKey: 'type' },
                  operator: 'in',
                  right: ['A', 'B'],
                },
                {
                  left: { paramKey: 'aatype' },
                  operator: '===',
                  right: 'b',
                },
                {
                  combine: '||',
                  dataPath: 'XXX[]',
                  conditions: [
                    {
                      left: { paramKey: 'xxType' },
                      operator: '===',
                      right: 'GG',
                    },
                  ],
                },
              ],
            },
            {
              left: {
                paramKey: 'id',
              },
              operator: '===',
              right: '1',
            },
          ],
        },
      },
    ]);
  });
  test('002', () => {
    const columnList = [
      {
        visible: 'C',
        visibleCondition: {
          combine: '&&',
          dataPath: 'crtInfoList[]',
          conditions: [
            {
              left: {
                paramKey: 'ctfType',
              },
              operator: 'in',
              right: ['MT', 'OT', 'PP', 'CT'],
            },
            {
              left: {
                paramKey: 'type',
              },
              operator: '===',
              right: 'P',
            },
          ],
        },
      },
    ];
    const data = {
      id: '1',
      crtInfoList: [
        {
          ctfType: 'MT',
          type: 'P',
        },
        {
          ctfType: 'OT',
          type: 'N',
        },
        {
          ctfType: 'NO',
          type: 'P',
        },
      ],
    };
    const renderer = renderHook(() => useGetColumnsByCondition({ columnList, data }));

    expect(renderer.result.current).toEqual([
      {
        visible: 'Y',
        visibleCondition: {
          combine: '&&',
          dataPath: 'crtInfoList[]',
          conditions: [
            {
              left: {
                paramKey: 'ctfType',
              },
              operator: 'in',
              right: ['MT', 'OT', 'PP', 'CT'],
            },
            {
              left: {
                paramKey: 'type',
              },
              operator: '===',
              right: 'P',
            },
          ],
        },
      },
    ]);
  });
});
