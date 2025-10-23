import initState from 'process/Document/OcrResults/_models/state';
import effects from 'process/Document/OcrResults/_models/effects';
import reducers from 'process/Document/OcrResults/_models/reducers';

export default {
  namespace: 'DocumentOfOcrResultsController',

  state: {
    ...initState,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
