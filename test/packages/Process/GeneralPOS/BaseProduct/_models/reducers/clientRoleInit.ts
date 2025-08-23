/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

// 使用 immer 的 produce 函数生成不可变状态的更新逻辑
export default (state: any) =>
  produce(state, (draftState: any) => {
    // 从 processData 中提取 policyInfo 和相关字段
    const policyInfo = draftState.processData?.policyInfo;
    const {
      mainPolicyId = '', // 主保单 ID
      mainInsuredClientId = '', // 主被保险人 ID
      mainOwnerClientId = '', // 主保单持有人 ID
      mainPayorClientId = '', // 主付款人 ID
      clientInfoList = [], // 客户信息列表
    } = draftState.processData?.policyInfo || {};

    // 筛选出当前保单的客户角色列表
    const clientRoleListByCurrentPolicy =
      lodash.filter(policyInfo?.policyClientRoleList, (item) => item?.policyId === mainPolicyId) ||
      [];

    // 将 clientInfoList 转换为以 clientId 为键，客户姓名为值的对象
    const objClientIdName = clientInfoList
      ?.map((item) => {
        return {
          clientId: item.clientId,
          name: [
            tenant.isPH() && item.clientId === mainOwnerClientId ? item?.title : '', // 如果是主保单持有人，添加称谓
            item.firstName, // 名
            item.middleName, // 中间名
            item.surname, // 姓
          ]
            .filter((item) => item) // 过滤掉空值
            .join(' '), // 拼接成完整姓名
        };
      })
      .reduce((acc, cur) => {
        acc[cur.clientId] = cur.name; // 将 clientId 作为键，姓名作为值
        return acc;
      }, {});

    // 自定义角色排序顺序
    const customOrder = ['CUS002', 'SA', 'CUS001', 'CUS005'];

    // 按 clientId 对客户角色列表进行分组，并生成包含角色信息的对象
    const grouyByClientID = Object.fromEntries(
      Object.entries(lodash.groupBy(clientRoleListByCurrentPolicy, 'clientId'))?.map(
        ([key, value]) => [
          key,
          value.reduce((acc, cur) => {
            if (lodash.isEmpty(acc)) {
              // 如果 acc 为空，初始化对象
              return {
                clientId: cur.clientId,
                name: objClientIdName?.[cur.clientId], // 获取客户姓名
                roles: [cur.customerRole], // 初始化角色数组
              };
            } else {
              // 如果 acc 不为空，追加角色并按自定义顺序排序
              acc.roles.push(cur.customerRole);
              return {
                ...acc,
                roles: acc.roles.sort((a, b) => {
                  return customOrder.indexOf(a) - customOrder.indexOf(b);
                }),
              };
            }
          }, {}),
        ]
      )
    );

    // 获取owner的角色信息
    const ownerRole = grouyByClientID[mainOwnerClientId];

    // 获取agent信息
    const agentInfo =
      lodash.find(policyInfo?.policyAgentList, (item) => item.policyId === mainPolicyId) || {};

    // 构造agent角色对象
    const agentRole = {
      name: [agentInfo.firstName, agentInfo.middleName, agentInfo.surname]
        .filter((item) => item) // 拼接代理人姓名
        .join(' '),
      roles: ['SA'], // 角色为代理人
      clientId: 'agent', // 客户 ID 为 'agent'
    };

    // 获取insured列表，按mainInsured优先排序
    const insuredRoleList = clientRoleListByCurrentPolicy
      .filter((item) => item?.customerRole === 'CUS001' && item?.clientId !== mainOwnerClientId)
      .sort((a, b) => {
        return a.clientId === mainInsuredClientId ? -1 : b.clientId === mainInsuredClientId ? 1 : 0;
      })
      .map((item) => {
        return grouyByClientID[item.clientId];
      });

    // 获取payor列表，按mainPayor优先排序
    const payorRoleList = clientRoleListByCurrentPolicy
      .filter(
        (item) =>
          item?.customerRole === 'CUS005' &&
          item?.clientId !== mainOwnerClientId &&
          !lodash.isEmpty(grouyByClientID?.[item?.clientId]?.name)
      )
      .sort((a, b) => {
        return a.clientId === mainPayorClientId ? -1 : b.clientId === mainPayorClientId ? 1 : 0;
      })
      .map((item) => {
        return grouyByClientID[item.clientId];
      });

    // 合并所有角色列表，并去重
    const sortRoleList =
      lodash.uniqBy(
        [ownerRole, insuredRoleList, agentRole, payorRoleList]
          .flat()
          .filter((item) => item)
          .map((item) => ({ ...item, roles: lodash.uniq(item?.roles || []) })),
        'clientId'
      ) || [];

    // 提取角色的 clientId 列表
    const sortRoleClientIdList = sortRoleList?.map((item) => item.clientId);

    // 将角色列表转换为以 clientId 为键的对象
    const sortRoleByClientId = sortRoleList.reduce((acc, cur) => {
      acc[cur.clientId] = cur;
      return acc;
    }, {});

    // 更新状态中的排序角色列表和角色映射
    draftState.sortRoleClientIdList = sortRoleClientIdList;
    draftState.sortRoleByClientId = sortRoleByClientId;
  });
