import lodash from 'lodash';

export default {
  namespace: 'taskFolder',
  state: {
    allFolder: [
      {
        name: 'toDo',
        title: 'todo',
        disabled: true,
      },
      {
        name: 'pending',
        title: 'pending',
        disabled: true,
      },
      {
        name: 'completed',
        title: 'completed',
      },
      {
        name: 'favorite',
        title: 'favorite',
      },
      {
        name: 'unassigned',
        title: 'unassigned',
        disabled: true,
      },
    ],
    selectedFolder: [],
    originSelectedFolder: [],
  },
  reducers: {
    initSelectedFolder(state, action) {
      const selectedFolder = lodash.get(action, 'payload.selectedFolder');
      const allFolder = lodash.get(action, 'payload.allFolder', []);
      const { allFolder: oldFolder } = state;
      // 通过接口传回值来控制展示
      const newAllFolder = oldFolder.filter((item) => allFolder.includes(item.name));

      return {
        ...state,
        selectedFolder,
        allFolder: newAllFolder,
        originSelectedFolder: selectedFolder,
      };
    },
    resetSelectedFolder(state) {
      return {
        ...state,
        selectedFolder: state.originSelectedFolder,
      };
    },
    setSelectedFolder(state, action) {
      const { selectedFolder } = state;
      const value = lodash.get(action, 'payload.value');
      let newSelected = selectedFolder;
      if (selectedFolder.includes(value)) {
        newSelected = selectedFolder.filter((item) => item !== value);
      } else {
        newSelected = [...selectedFolder, value];
      }

      return {
        ...state,
        selectedFolder: newSelected,
      };
    },
  },
};
