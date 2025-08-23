import { renderHook } from '@testing-library/react-hooks';
import lodash from 'lodash';
import useGetLoadingFilterDicts from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFilterDicts';

const dicts = [
  {
    id: 'test',
    dictCode: '0',
    dictName: '0%',
  },
  {
    id: 'test',
    dictCode: '100',
    dictName: '100%',
  },
  {
    id: 'test',
    dictCode: '125',
    dictName: '125%',
  },
  {
    id: 'test',
    dictCode: '150',
    dictName: '150%',
  },
  {
    id: 'test',
    dictCode: '175',
    dictName: '175%',
  },
  {
    id: 'test',
    dictCode: '200',
    dictName: '200%',
  },
  {
    id: 'test',
    dictCode: '225',
    dictName: '225%',
  },
  {
    id: 'test',
    dictCode: '25',
    dictName: '25%',
  },
  {
    id: 'test',
    dictCode: '250',
    dictName: '250%',
  },
  {
    id: 'test',
    dictCode: '275',
    dictName: '275%',
  },
  {
    id: 'test',
    dictCode: '300',
    dictName: '300%',
  },
  {
    id: 'test',
    dictCode: '325',
    dictName: '325%',
  },
  {
    id: 'test',
    dictCode: '350',
    dictName: '350%',
  },
  {
    id: 'test',
    dictCode: '375',
    dictName: '375%',
  },
  {
    id: 'test',
    dictCode: '400',
    dictName: '400%',
  },
  {
    id: 'test',
    dictCode: '50',
    dictName: '50%',
  },
  {
    id: 'test',
    dictCode: '75',
    dictName: '75%',
  },
];

const secondDicts = [
  {
    id: 'test',
    dictCode: '0',
    dictName: '0%',
  },
  {
    id: 'test',
    dictCode: '1.00',
    dictName: '100%',
  },
  {
    id: 'test',
    dictCode: '1.25',
    dictName: '125%',
  },
  {
    id: 'test',
    dictCode: '1.50',
    dictName: '150%',
  },
  {
    id: 'test',
    dictCode: '1.75',
    dictName: '175%',
  },
  {
    id: 'test',
    dictCode: '2.00',
    dictName: '200%',
  },
  {
    id: 'test',
    dictCode: '2.25',
    dictName: '225%',
  },
  {
    id: 'test',
    dictCode: '0.25',
    dictName: '25%',
  },
  {
    id: 'test',
    dictCode: '2.50',
    dictName: '250%',
  },
  {
    id: 'test',
    dictCode: '2.75',
    dictName: '275%',
  },
  {
    id: 'test',
    dictCode: '3.00',
    dictName: '300%',
  },
  {
    id: 'test',
    dictCode: '3.25',
    dictName: '325%',
  },
  {
    id: 'test',
    dictCode: '3.50',
    dictName: '350%',
  },
  {
    id: 'test',
    dictCode: '3.75',
    dictName: '375%',
  },
  {
    id: 'test',
    dictCode: '4.00',
    dictName: '400%',
  },
  {
    id: 'test',
    dictCode: '0.50',
    dictName: '50%',
  },
  {
    id: 'test',
    dictCode: '0.75',
    dictName: '75%',
  },
];

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageLoadingRule', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return null;
    })
    .mockImplementationOnce(() => {
      return {
        id: 'test',
      };
    })
    .mockImplementationOnce(() => {
      return {
        id: 'test',
      };
    })
    .mockImplementationOnce(() => {
      return {
        id: 'test',
      };
    });
});

describe('useGetLoadingFilterDicts', () => {
  test('Empty loading rules', () => {
    const renderer = renderHook(() =>
      useGetLoadingFilterDicts({ coverageId: 'test', dicts, rangeMax: 5, rangeMin: 3 })
    );
    expect(renderer.result.current).toEqual(
      lodash.orderBy(dicts, (item) => lodash.toNumber(item?.dictCode))
    );
  });
  test('Not empty loading rule, but no ranges', () => {
    const renderer = renderHook(() => useGetLoadingFilterDicts({ coverageId: 'test', dicts }));
    expect(renderer.result.current).toEqual(
      lodash.orderBy(dicts, (item) => lodash.toNumber(item?.dictCode))
    );
  });
  test('DictCode are percentages, ranges are integer', () => {
    const renderer = renderHook(() =>
      useGetLoadingFilterDicts({ coverageId: 'test', dicts, rangeMax: 3.25, rangeMin: 2.25 })
    );

    expect(renderer.result.current).toEqual([
      {
        id: 'test',
        dictCode: '225',
        dictName: '225%',
      },
      {
        id: 'test',
        dictCode: '250',
        dictName: '250%',
      },
      {
        id: 'test',
        dictCode: '275',
        dictName: '275%',
      },
      {
        id: 'test',
        dictCode: '300',
        dictName: '300%',
      },
      {
        id: 'test',
        dictCode: '325',
        dictName: '325%',
      },
    ]);
  });
  test('DictCode are floating numbers, ranges are percentage', () => {
    const renderer = renderHook(() =>
      useGetLoadingFilterDicts({
        coverageId: 'test',
        dicts: secondDicts,
        rangeMax: 500,
        rangeMin: 300,
      })
    );

    expect(renderer.result.current).toEqual([
      {
        id: 'test',
        dictCode: '3.00',
        dictName: '300%',
      },
      {
        id: 'test',
        dictCode: '3.25',
        dictName: '325%',
      },
      {
        id: 'test',
        dictCode: '3.50',
        dictName: '350%',
      },
      {
        id: 'test',
        dictCode: '3.75',
        dictName: '375%',
      },
      {
        id: 'test',
        dictCode: '4.00',
        dictName: '400%',
      },
    ]);
  });
});
