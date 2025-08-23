import { medicalSearchGroup } from 'claim/enum/medicalSearchGroup';
// @ts-ignore
import { saga } from 'dva';
import lodash from 'lodash';
import claimJpTblControllerService from '@/services/claimJpTblControllerService';
import { humptoLine } from '@/utils/string';
import { v4 as uuid } from 'uuid';
import { searchContent } from '@/utils/constant/SearchContent';
import { transSorter } from '@/utils/table';
import medicalSearchRenderConfig from 'claim/utils/medicalSearchRenderConfig';
import timeUtils from '@/utils/time';
import moment from 'moment';

const { delay } = saga;

export default {
  namespace: 'medicalSearch',
  state: {
    visible: false,
    groups: {
      diagnosisName: {
        columns: [
          {
            key: 'standandDiagnosisName',
            dataIndex: 'standandDiagnosisName',
            sorter: true,
            index: 1,
            filterDropdownVisible: false,
          },
          {
            key: 'icdTenthCode',
            dataIndex: 'icdTenthCode',
            sorter: true,
            index: 2,
            filterDropdownVisible: false,
          },
          {
            key: 'icdNinthCode',
            dataIndex: 'icdNinthCode',
            sorter: true,
            index: 3,
            filterDropdownVisible: false,
          },
          {
            key: 'diagnosisNo',
            dataIndex: 'diagnosisNo',
            sorter: true,
            index: 4,
            filterDropdownVisible: false,
          },
          {
            key: 'womenDisease',
            dataIndex: 'womenDisease',
            index: 5,
            filterDropdownVisible: false,
          },
          {
            key: 'adultDiseases',
            dataIndex: 'adultDiseases',
            index: 5.5,
          },
          {
            key: 'cancerFlag',
            dataIndex: 'cancerFlag',
            index: 6,
            filterDropdownVisible: false,
          },
          {
            key: 'specificDiseaseP',
            dataIndex: 'specificDiseaseP',
            index: 7,
            filterDropdownVisible: false,
          },
          {
            key: 'threeMajorDiseaseP',
            dataIndex: 'threeMajorDiseaseP',
            index: 8,
            filterDropdownVisible: false,
          },
          {
            key: 'sevenMajorDisease',
            dataIndex: 'sevenMajorDisease',
            index: 9,
            filterDropdownVisible: false,
          },
          {
            key: 'lifeLivingFlag',
            dataIndex: 'lifeLivingFlag',
            index: 10,
          },
          {
            key: 'specificMajorDisease',
            dataIndex: 'specificMajorDisease',
            index: 11,
          },
          {
            key: 'exclusionsCode',
            dataIndex: 'exclusionsCode',
            index: 12,
          },
          {
            key: 'diseasePeriod',
            dataIndex: 'diseasePeriod',
            index: 13,
          },
          {
            key: 'moralCode',
            dataIndex: 'moralCode',
            index: 14,
          },
          {
            key: 'averageDays',
            dataIndex: 'averageDays',
            index: 15,
          },
          {
            key: 'reasonCode',
            dataIndex: 'reasonCode',
            index: 16,
          },
          {
            key: 'remindFlag',
            dataIndex: 'remindFlag',
            index: 17,
          },
        ],
        width: '100vw',
        dataSource: [],
        title: 'diagnosisName',
        api: claimJpTblControllerService.getStdDiagnosis,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
        },
        searchParams: {},
        searchIndexList: ['standandDiagnosisName', 'icdTenthCode', 'icdNinthCode', 'diagnosisNo'],
        scroll: {
          y: '60vh',
        },
        sorter: {},
      },
      procedureName: {
        columns: [
          {
            dataIndex: 'approvalProcedureName',
            sorter: true,
            width: 100,
            index: 2,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'kjCode',
            sorter: true,
            width: 80,
            index: 1,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'branchNo',
            width: 80,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'procedureCode',
            width: 80,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'reimbursementPercentage',
            width: 80,
            filterDropdownVisible: false,
          },
          {
            title: 'presentApprovalFlag',
            dataIndex: 'presentApprovalFlag',
            width: 100,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'newApprovalFlag',
            width: 100,
            filterDropdownVisible: false,
          },
        ],
        dataSource: [],
        width: '80vw',
        title: 'procedureName',
        api: claimJpTblControllerService.getStdProcedures,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
        },
        searchParams: {},
        searchIndexList: ['kjCode', 'approvalProcedureName'],
        sorter: {},
        scroll: {
          y: '60vh',
        },
      },
      otherProcedure: {
        columns: [
          {
            dataIndex: 'itemNo',
            index: 0,
            width: 100,
          },
          {
            dataIndex: 'treatmentCode',
            sorter: true,
            index: 1,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'treatmentName',
            sorter: true,
            render: medicalSearchRenderConfig.treatmentName,
            index: 3,
            filterDropdownVisible: false,
          },
          {
            title: 'treatmentArea',
            dataIndex: 'treatmentArea',
            sorter: true,
            index: 5,
            filterDropdownVisible: false,
          },
          {
            sorter: true,
            dataIndex: 'treatmentProvider',
            index: 4,
            width: 300,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'diseaseDescription',
            sorter: true,
            render: medicalSearchRenderConfig.diseaseDescription,
            index: 6,
            filterDropdownVisible: false,
          },
          {
            sorter: true,
            dataIndex: 'treatmentDescription',
            render: medicalSearchRenderConfig.treatmentDescription,
            index: 7,
            filterDropdownVisible: false,
          },
          {
            dataIndex: 'applyDate',
            sorter: true,
            index: 2,
            filterDropdownVisible: false,
            render: (text: any) => {
              return moment(text).format('YYYY-MM-DD');
            },
          },
        ],
        dataSource: [],
        width: '80vw',
        title: 'otherProcedure',
        api: claimJpTblControllerService.getStdAdvancedMedical,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
        },
        searchIndexList: ['treatmentCode', 'applyDate', 'treatmentName', 'treatmentProvider'],
        legalitySearchKeys: [
          'treatmentCode',
          'applyDateFrom',
          'applyDateTo',
          'treatmentName',
          'treatmentProvider',
        ],
        searchFiledsConfig: {
          applyDate: {
            type: 'RangePicker',
            format: (value: any) => {
              const [from, to] = value;
              const applyDateFrom = timeUtils.formatWithTimeZone({
                time: from,
                format: 'YYYY-MM-DDT00:00:00.000',
              });
              const applyDateTo = timeUtils.formatWithTimeZone({
                time: to,
                format: 'YYYY-MM-DDT23:59:59.999',
              });
              return {
                applyDateFrom,
                applyDateTo,
              };
            },
            action: 'medicalSearch/changeApplyDate',
          },
        },
        sorter: {},
        scroll: {
          y: '60vh',
        },
      },
    },
    enableGroups: [
      medicalSearchGroup.diagnosisName,
      medicalSearchGroup.procedureName,
      medicalSearchGroup.otherProcedure,
    ],
    activeGroup: medicalSearchGroup.diagnosisName,
    defaultActiveGroup: medicalSearchGroup.diagnosisName,
  },
  effects: {
    /**
     * tbl 检索
     * @param {String} payload.api 检索所调用的接口
     * @param {String} payload.group 搜索的分组tab 医疗查询/手术名查询/先进医疗查询
     * @param {String} payload.pagination 分页信息
     * @param {String} payload.sorter 排序
     */
    *search({ payload }: any, { put, call, select }: any) {
      const { api, group, pagination, sorter = {} } = lodash.pick(payload, [
        'api',
        'group',
        'pagination',
        'sorter',
        'searchParamKeys',
      ]);
      const s: any = transSorter(sorter);
      const groups = yield select((state: any) => state.medicalSearch.groups);
      const { legalitySearchKeys, searchParams, searchIndexList } = lodash.pick(groups[group], [
        'legalitySearchKeys',
        'searchParams',
        'searchIndexList',
      ]);
      const keys = legalitySearchKeys || searchIndexList;
      const legalitySearchParams = {};
      lodash.keys(searchParams).forEach((key) => {
        if (keys.includes(key)) {
          legalitySearchParams[key] = searchParams[key];
        }
      });
      let params: any = {
        currentPage: pagination?.current,
        pageSize: pagination?.pageSize - 1,
        params: legalitySearchParams,
      };
      if (s.sortName && s.sortOrder) {
        params = {
          ...params,
          sortName: humptoLine(s.sortName),
          sortOrder: s?.sortOrder,
        };
      }
      const response = yield call(api, params);
      const { rows } = lodash.pick(response?.resultData, ['rows']);
      const addSearchRow = {
        id: uuid(),
      };
      const columns = yield groups[group]?.columns;
      lodash.forEach(columns, (c) => {
        addSearchRow[c.dataIndex] = '';
      });
      lodash.map(groups[group]?.searchIndexList, (i) => {
        addSearchRow[i] = searchContent;
      });
      const dataSource = [addSearchRow, ...rows];
      yield put({
        type: 'updateDataSource',
        payload: {
          group,
          dataSource,
        },
      });
      const { total, currentPage } = lodash.pick(response?.resultData, [
        'total',
        'pageSize',
        'currentPage',
      ]);
      yield put({
        type: 'updatePagination',
        payload: {
          pagination: {
            ...pagination,
            total,
            current: currentPage,
          },
          group,
        },
      });
      yield put({
        type: 'updateSorter',
        payload: {
          group,
          sorter,
        },
      });
    },
    /**
     * 重置某个分组的数据
     * @param {String} payload.group 需要被重置的分组
     */
    *handleResetSingleGroup({ payload }: any, { put, select }: any) {
      const groups = yield select((state: any) => state.medicalSearch.groups);
      const { group } = payload;
      const newGroups = {
        ...groups,
        [group]: {
          ...groups[group],
          searchParams: {},
          pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
          },
          dataSource: [],
        },
      };
      yield put({
        type: 'updateGroups',
        payload: {
          groups: newGroups,
        },
      });
    },
    /**
     * 重置所有分组数据，一般用户cancel modal框的时候
     */
    *handleResetAll(_: any, { put, select }: any) {
      const { groups, defaultActiveGroup } = yield select((state: any) => state.medicalSearch);
      const newGroups = groups;
      // eslint-disable-next-line no-restricted-syntax
      for (const [group, config] of lodash.entries(groups)) {
        groups[group] = {
          // @ts-ignore
          ...config,
          searchParams: {},
          pagination: {
            ...config.pagination,
            current: 1,
            pageSize: 10,
            total: 0,
          },
          dataSource: [],
        };
      }
      yield put({
        type: 'updateGroups',
        payload: {
          groups: newGroups,
        },
      });
      yield put({
        type: 'changeActiveGroup',
        payload: {
          activeGroup: defaultActiveGroup,
        },
      });
    },
    /**
     * 修改filter下拉组件可见状态
     * @param {String} payload.group
     * @param {String} payload.dataIndex
     * @param {String} payload.filterDropdownVisible
     */
    *handleChangeFilterDropdownVisible({ payload }: any, { put, select }: any) {
      const { filterDropdownVisible, group, dataIndex } = lodash.pick(payload, [
        'filterDropdownVisible',
        'group',
        'dataIndex',
      ]);
      const groups = yield select((state: any) => state.medicalSearch.groups);
      const newGroups = {
        ...groups,
        [group]: {
          ...groups[group],
          columns: lodash.map(groups[group]?.columns, (item) => {
            if (item.dataIndex === dataIndex) {
              return {
                ...item,
                filterDropdownVisible,
              };
            }
            return item;
          }),
        },
      };
      yield put({
        type: 'updateGroups',
        payload: {
          groups: newGroups,
        },
      });
    },
    /**
     * 更新排序状态
     * @param {Object} payload.sorter
     * @param {String} payload.group
     */
    *updateSorter({ payload }: any, { put, select }: any) {
      const { group, sorter } = lodash.pick(payload, ['sorter', 'group']);
      const groups = yield select((state: any) => state.medicalSearch.groups);
      const newGroups = {
        ...groups,
        [group]: {
          ...groups[group],
          sorter,
        },
      };
      yield put({
        type: 'updateGroups',
        payload: {
          groups: newGroups,
        },
      });
    },
    /**
     * 更新搜索参数
     * @param {String} payload.group
     * @param {String} payload.dataIndex
     * @param {String} payload.value
     */
    *updateSearchParams({ payload }: any, { put, select }: any) {
      const { group, dataIndex, value } = lodash.pick(payload, ['group', 'dataIndex', 'value']);
      const groups = yield select((state: any) => state.medicalSearch.groups);
      const newGroups = {
        ...groups,
        [group]: {
          ...groups[group],
          searchParams: {
            ...groups[group].searchParams,
            [dataIndex]: value,
          },
        },
      };
      yield put({
        type: 'updateGroups',
        payload: {
          groups: newGroups,
        },
      });
    },
    /**
     * 更新table数据源
     * @param {String} payload.group
     * @param {Array} payload.dataSource
     */
    *updateDataSource({ payload }: any, { put, select }: any) {
      const groups = yield select((state: any) => state.medicalSearch.groups);
      const { group, dataSource } = lodash.pick(payload, ['group', 'dataSource']);
      const newGroups = {
        ...groups,
        [group]: {
          ...groups[group],
          dataSource,
        },
      };
      yield put({
        type: 'updateGroups',
        payload: {
          groups: newGroups,
        },
      });
    },
    /**
     * 更新分页信息
     * @param {String} payload.group
     * @param {Object} payload.pagination
     */
    *updatePagination({ payload }: any, { put, select }: any) {
      const { group, pagination } = lodash.pick(payload, ['group', 'pagination']);
      const groups = yield select((state: any) => state.medicalSearch.groups);
      const newGroups = {
        ...groups,
        [group]: {
          ...groups[group],
          pagination,
        },
      };
      yield put({
        type: 'updateGroups',
        payload: {
          groups: newGroups,
        },
      });
    },
    /**
     * 修改模态框可见状态
     * @param {Boolean} payload.visible
     */
    *changeVisible({ payload }: any, { put }: any) {
      const { visible } = lodash.pick(payload, ['visible']);
      yield put({
        type: 'setVisible',
        payload: {
          visible,
        },
      });
      yield put({
        type: 'changeVisibleEffects',
        payload,
      });
    },
    /**
     * 修改模态框可见状态的副作用
     * @param {Boolean} payload.visible
     */
    *changeVisibleEffects({ payload }: any, { put }: any) {
      delay(1000);
      const { visible } = lodash.pick(payload, ['visible']);
      if (visible === false) {
        yield put({
          type: 'handleResetAll',
        });
      }
    },
    *changeApplyDate({ payload }: any, { put }: any) {
      const {
        applyDateFrom,
        applyDateTo,
        api,
        group,
        pagination,
        searchParams,
      } = lodash.pick(payload, [
        'applyDateFrom',
        'applyDateTo',
        'api',
        'group',
        'pagination',
        'searchParams',
      ]);
      yield put({
        type: 'updateSearchParams',
        payload: {
          group,
          dataIndex: 'applyDateFrom',
          value: applyDateFrom,
        },
      });
      yield put({
        type: 'updateSearchParams',
        payload: {
          group,
          dataIndex: 'applyDateTo',
          value: applyDateTo,
        },
      });
      yield put({
        type: 'medicalSearch/search',
        payload: {
          api,
          group,
          searchParams,
          pagination: {
            ...pagination,
            current: 1,
          },
        },
      });
    },
  },
  reducers: {
    /**
     * 更新搜索组数据
     * @param {Object} action.payload.groups
     */
    updateGroups(state: any, action: any) {
      const groups = action?.payload?.groups;
      return {
        ...state,
        groups,
      };
    },
    /**
     * 修改模态框可见状态
     * @param {Boolean} action.payload.visible
     */
    setVisible(state: any, action: any) {
      const visible = action?.payload?.visible;
      return {
        ...state,
        visible,
      };
    },
    /**
     * 修改模态框tab
     * @param {String} action.payload.activeGroup
     */
    changeActiveGroup(state: any, action: any) {
      const activeGroup = action?.payload?.activeGroup;
      return {
        ...state,
        activeGroup,
      };
    },
  },
};
