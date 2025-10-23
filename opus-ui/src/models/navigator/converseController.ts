import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import moment from 'moment';
import mcConverseControllerService from '@/services/mcConverseControllerService';

export default {
  namespace: 'converseController',

  state: {
    conversationList: [],
    messagerTotal: 0,
  },

  effects: {
    *conversationList(_, { select, call, put }) {
      const userId = yield select((state) => state.user.currentUser.userId);

      if (userId) {
        const response = yield call(
          mcConverseControllerService.list,
          objectToFormData({
            userId,
          })
        );

        if (
          lodash.isPlainObject(response) &&
          response.success &&
          lodash.isArray(response.resultData)
        ) {
          yield put({
            type: 'saveConversationList',
            payload: {
              conversationList: response.resultData,
            },
          });
        }
      }
    },
    *createConversation({ payload }, { select, put }) {
      const conversationList = yield select((state) => state.converseController.conversationList);
      const userId = yield select((state) => state.user.currentUser?.userId);
      const { srcId, destId } = payload;
      const sessionPeer = srcId === userId ? destId : srcId;
      const hasConversation = lodash.find(conversationList, ['sessionPeer', sessionPeer]);

      if (!hasConversation) {
        const { srcName, destName } = payload;
        const sessionPeerName = srcId === userId ? destName : srcName;
        const sessionOwner = srcId === userId ? srcId : destId;
        const sessionOwnerName = srcId === userId ? srcName : destName;

        yield put({
          type: 'createConversationReducer',
          payload: {
            conversation: {
              sessionId: `${sessionOwner}@${sessionPeer}`,
              sessionName: sessionPeerName,

              sessionOwner,
              sessionOwnerName,

              sessionPeer,
              sessionPeerName,

              avatar: payload.userAvatar, // TODO
              lcontent: payload.content,
              ltime: moment().format(),

              sessionType: 'chat',
              ustate: 1,
              unread: 0,
            },
          },
        });
      }
    },
  },

  reducers: {
    saveConversationList(state, action) {
      const {
        payload: { conversationList },
      } = action;

      return {
        ...state,
        conversationList,
        messagerTotal: lodash.sumBy(conversationList, (item) => item.unread),
      };
    },
    createConversationReducer(state, action) {
      const { conversationList } = state;
      const {
        payload: { conversation },
      } = action;

      return {
        ...state,
        conversationList: lodash.concat(conversation, conversationList),
      };
    },
    cleanUnreadOfConveration(state, action) {
      const { conversationList, messagerTotal } = state;

      const {
        payload: { sessionId },
      } = action;
      let unread = 0;
      const newConversationList = lodash.map(conversationList, (item) => {
        if (item?.sessionId === sessionId) {
          unread = item?.unread;
          return {
            ...item,
            unread: 0,
          };
        }

        return item;
      });
      return {
        ...state,
        messagerTotal: messagerTotal - unread,
        conversationList: newConversationList,
      };
    },
    updateStateOfConversation(state, action) {
      const { conversationList } = state;
      const {
        payload: { srcId, destId, destId: userId, state: ustate },
      } = action;
      const sessionPeer = srcId === userId ? destId : srcId;

      return {
        ...state,
        conversationList: lodash.map(conversationList, (item) => {
          if (item?.sessionPeer === sessionPeer) {
            return {
              ...item,
              ustate,
            };
          }

          return item;
        }),
      };
    },
    updateConversation(state, action) {
      // 更新聊天列表
      const {
        payload: { srcId, destId, destId: userId, content, time },
      } = action;
      const { conversationList, messagerTotal } = state;
      const sessionPeer = srcId === userId ? destId : srcId;

      const newConverSation = lodash.reduce(
        conversationList,
        (result, item) => {
          if (item?.sessionOwner === sessionPeer || item?.sessionPeer === sessionPeer) {
            const newMessage = {
              ...item,
              lcontent: content, // 更新内容
              ltime: time, // 更新时间
              unread: item.unread + 1, // 更新未读
            };
            result.unshift(newMessage);

            return result;
          }

          result.push(item);

          return result;
        },
        []
      );

      return {
        ...state,
        conversationList: newConverSation,
        messagerTotal: messagerTotal + 1,
      };
    },
    setTopOfZeroUnreadOfConversation(state, action) {
      const { conversationList } = state;
      const {
        payload: { srcId, destId, destId: userId },
      } = action;
      const sessionPeer = srcId === userId ? destId : srcId;
      const conversation = lodash.find(conversationList, ['sessionPeer', sessionPeer]);

      return {
        ...state,
        conversationList: !conversation?.unread
          ? lodash.sortBy(conversationList, (item) => item.sessionPeer !== sessionPeer)
          : conversationList,
      };
    },
    updateMessagerTotal(state, action) {
      const { messagerTotal } = state;
      const {
        payload: { num },
      } = action;

      return {
        ...state,
        messagerTotal: messagerTotal - num,
      };
    },
    cleanConversationList(state) {
      return {
        ...state,
        conversationList: [],
        messagerTotal: 0,
      };
    },
  },
};
