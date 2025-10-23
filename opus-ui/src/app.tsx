import { getDvaApp } from 'umi';

export default {
  dva: {
    immer: true,
    extraModels: [],
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
