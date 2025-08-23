import { renderHook } from '@testing-library/react-hooks';
import useJudgeDispalyReason from 'bpm/pages/Information/_hooks/useJudgeDispalyReason';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn(() => {
      return {
        defaultCategoryCode: null,
        activityCategoryList: [
          {
            id: '4f4d42b3-db9b-4901-9e72-715d7b473a0d',
            creator: 'hedy',
            gmtCreate: '2021-05-14T07:52:34.000+0000',
            modifier: 'hedy',
            gmtModified: '2021-05-14T07:52:34.000+0000',
            deleted: 0,
            transId: 'bc017d10-757d-417a-a7c1-4378563ac8fb',
            caseNo: null,
            activityCode: 'BP_NB_ACT002',
            categoryCode: 'endCaseRemark',
            activityStatus: 'todo',
            taskId: null,
            pageController: 'BP_NB_CTG001-page02',
            applicationType: 'B',
            showAddButton: true,
            showHistory: 0,
            showReadButton: 1,
            showReasonDropdown: null,
            saveIfNull: 0,
            placeholder: null,
            flowIndicator: null,
            showEffectivePeriod: 0,
            operatorFlag: null,
            reasonRequired: '0',
          },
          {
            id: 'd444bd4c-cb2e-425d-9867-9722458723da',
            creator: 'johnny',
            gmtCreate: '2022-12-08T17:00:00.000+0000',
            modifier: 'johnny',
            gmtModified: '2022-12-12T08:30:46.000+0000',
            deleted: 0,
            transId: 'fa665493-4c5d-4455-9443-39607242429e',
            caseNo: null,
            activityCode: 'BP_NB_ACT002',
            categoryCode: 'requestMUW',
            activityStatus: 'todo',
            taskId: null,
            pageController: 'BP_NB_CTG001-page02',
            applicationType: 'B',
            showAddButton: true,
            showHistory: 0,
            showReadButton: 0,
            showReasonDropdown: 0,
            saveIfNull: 0,
            placeholder: null,
            flowIndicator: null,
            showEffectivePeriod: 0,
            operatorFlag: null,
            reasonRequired: '1',
          },
          {
            id: 'fe84e288-597d-4650-93fc-57af2db0c5fd',
            creator: 'hedy',
            gmtCreate: '2021-05-14T07:52:34.000+0000',
            modifier: 'hedy',
            gmtModified: '2021-05-14T07:52:34.000+0000',
            deleted: 0,
            transId: 'bc017d10-757d-417a-a7c1-4378563ac8fb',
            caseNo: null,
            activityCode: 'BP_NB_ACT002',
            categoryCode: 'remark',
            activityStatus: 'todo',
            taskId: null,
            pageController: 'BP_NB_CTG001-page02',
            applicationType: 'B',
            showAddButton: true,
            showHistory: 0,
            showReadButton: 0,
            showReasonDropdown: null,
            saveIfNull: 0,
            placeholder: null,
            flowIndicator: null,
            showEffectivePeriod: 0,
            operatorFlag: null,
            reasonRequired: '0',
          },
        ],
        activityCode: 'BP_NB_ACT002',
      };
    }),
  };
});

describe('judge reason button display', () => {
  test('showReadButton is 0', () => {
    const renderer = renderHook(() => useJudgeDispalyReason({ category: 'requestMUW' }));
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('showReadButton is 1', () => {
    const renderer = renderHook(() => useJudgeDispalyReason({ category: 'endCaseRemark' }));
    expect(renderer.result.current).toBeTruthy();
  });
});
