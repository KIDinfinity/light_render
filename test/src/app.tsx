import { getDvaApp } from 'umi';
import _handleActions from './dva-immer';

export default {
  dva: {
    plugins: [{
      _handleActions
    }]
  },
  onRouteChange: ({ location: { pathname, search } }) => {
    const dispatch = getDvaApp?.()?._store?.dispatch;
    if (typeof window.ga !== 'undefined') {
      window.ga('send', 'pageview', pathname + search);
    }
    // if (dispatch) {
    //   dispatch({
    //     type: 'global/pathnameUpdate',
    //     payload: { pathname },
    //   });
    // }
  },
};
