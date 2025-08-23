import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findByUserId, update } from '@/services/userCenterCustomizationControllerService';
import { findDictionaryByTypeCode as findDictionaryByTypeCodeCache } from '@/utils/dictionary';
import { changeTheme } from '@/global';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import { tenant } from '@/components/Tenant';

interface IResponse {
  success: boolean;
  resultData: any;
}

export default {
  namespace: 'customization',
  state: {},

  effects: {
    *loadCustomization(_: any, { call, put, select }: any) {
      const userId: string = yield select(({ user }: any) => user.currentUser?.userId);
      if (!userId) return true;
      const response: IResponse = yield call(
        findByUserId,
        objectToFormData({
          userId,
        })
      );

      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isPlainObject(response.resultData)
      ) {
        // 1-theme
        const { theme, allTheme }: any = lodash.pick(response.resultData, ['theme', 'allTheme']);
        if ((lodash.isString(theme) || lodash.isNull(theme)) && lodash.isArray(allTheme)) {
          yield put({
            type: 'theme/initTheme',
            payload: {
              activeTheme: theme,
              themeList: allTheme,
            },
          });
          changeTheme(theme);
        }

        // 2-language
        const { language, allLanguage } = lodash.pick(response.resultData, [
          'language',
          'allLanguage',
        ]);
        if ((lodash.isString(language) || lodash.isNull(language)) && lodash.isArray(allLanguage)) {
          const lang = language || tenant.getLocaleLang();
          yield put({
            type: 'language/initLanguages',
            payload: {
              language: lang,
              languages: allLanguage,
            },
          });
          if (lang && LS.getItem(LSKey.LANGUAGE, false) !== lang) {
            LS.setItem(LSKey.LANGUAGE, lang);
            window.language = lang;
          }
        }

        // 3-taskFolder
        const { taskFolders, allTaskFolders } = lodash.pick(response.resultData, [
          'taskFolders',
          'allTaskFolders',
        ]);
        if (lodash.isArray(taskFolders) && lodash.isArray(allTaskFolders)) {
          yield put({
            type: 'taskFolder/initSelectedFolder',
            payload: {
              selectedFolder: taskFolders,
              allFolder: allTaskFolders,
            },
          });
        }

        // 4-buttonMode
        let { defaultMode } = lodash.pick(response.resultData, ['defaultMode']);
        const { allDefaultMode } = lodash.pick(response.resultData, ['allDefaultMode']);
        const sessionMode = SS.getItem(SSKey.TaskMode, false);
        if (sessionMode) {
          defaultMode = sessionMode;
        }
        if (
          (lodash.isString(defaultMode) || lodash.isNull(defaultMode)) &&
          lodash.isArray(allDefaultMode)
        ) {
          yield put({
            type: 'mode/initModes',
            payload: {
              activeMode: defaultMode,
              modeList: allDefaultMode,
            },
          });
          yield put({
            type: 'navigatorHomeWatching/saveModeButton',
            payload: {
              mode: defaultMode,
            },
          });
        }
      }

      return true;
    },
    *saveCustomization(_: any, { call, select, put }: any) {
      const defaultMode = yield select((state: any) => state.mode.activeMode);
      const theme = yield select((state: any) => state.theme.activeTheme);
      const language = yield select((state: any) => state.language.activeLanguage);
      const taskFolders = yield select((state: any) => state.taskFolder.selectedFolder);
      const userId = yield select((state: any) => state.user.currentUser.userId);
      const response = yield call(update, {
        defaultMode,
        theme,
        language,
        userId,
        taskFolders,
      });
      const success = lodash.get(response, 'success');
      if (success) {
        if (language && LS.getItem(LSKey.LANGUAGE, false) !== language) {
          LS.setItem(LSKey.LANGUAGE, language);
          window.language = language;
          window.location.reload();
          return;
        }

        yield put({
          type: 'loadCustomization',
        });
      }
    },
    *loadFormatMessage(_: any, { call }: any) {
      const language = tenant.getLocaleLang();

      const activityStatus = yield call(findDictionaryByTypeCodeCache, {
        language,
        typeCode: 'Label_BPM_TaskActivity',
      });
      if (activityStatus.Label_BPM_TaskActivity) {
        LS.setItem(LSKey.ACTIVITY_STATUS, activityStatus.Label_BPM_TaskActivity);
      }
    },
  },
};
