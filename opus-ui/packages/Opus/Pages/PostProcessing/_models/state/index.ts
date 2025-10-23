import { ConfigurationMap } from 'opus/Enums';

export default {
  [ConfigurationMap.opusmyteampostprocessing_todo]: {
    list: [],
    total: 0,
    current: 1,
    filterChoice: {},
    filterDatas: {},
  },
  [ConfigurationMap.opusmypostprocessing_todo]: {
    list: [],
    total: 0,
    current: 1,
    filterChoice: {},
    filterDatas: {},
  },
  incompleteCases: {
    filterChoice: {},
    filterDatas: {},
    sortName: '',
    sortOrder: '',
    total: 0,
    list: [],
    current: 1,
  },
  loading: false,
};
