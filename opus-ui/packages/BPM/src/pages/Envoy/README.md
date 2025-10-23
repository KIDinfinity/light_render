---
tag: packages/BPM/pages
order: 1
title: Envoy
group:
  title: BPM
nav:
  title: packages
---

# Envoy - Pending 管理

### 获取其他模块的数据

1. 入口：packages\BPM\src\pages\Envoy\index.tsx
2. 获取 CaseNo 和 TaskId
   > - 入口：packages\Navigator\src\components\CaseTaskDetail\Pending\Provider.tsx
   > - 业务逻辑：通过左侧的 taskDetail、高级查询、首页的列表模式卡片模式等含有 CaseNo、taskId 的数据获取，然后通过 setCaseNo 设置到 envoy 的 state 中
   > - 业务背景：Envoy 的数据，需要根据左侧的数据，展示对应的 envoy 列表数据。
3. 获取权限
   > - 入口：packages\BPM\src\pages\Envoy\Auth.tsx
   > - 业务逻辑：根据前面获取的 task 详情，获取对应的 envoy 的看、编辑、发送权限
   > - 业务背景：envoy 模块需要接入权限，但权限的逻辑不在 envoy 中，而在中的权限组件内，这边只是获取并使用权限组件返回的结果，然后觉得 envoy 是否有对应的权限。并且这里只是获取 envoy 的全局的权限，envoy 还有针对到每一条数据的权限设置（详见后面内容）

### Envoy UI 模块

> - 入口：packages\BPM\src\pages\Envoy\Envoy.tsx
> - 业务逻辑：在 history 有变化的时候，需要将焦点聚焦在那个最新的 history 上。
> - UI 内容：CaseNo 输入框、当前 envoy 列表、历史 envoy 列表。(详见后面内容)

### CaseNo 输入框

> - 入口：packages\BPM\src\pages\Envoy\CaseSearch\CaseSearch.tsx；
> - 业务逻辑：监听其他模块中获取过来的 caseNo 显示，或者手动输入 caseNo
> - 业务背景：envoy 列表和历史 envoy 列表就是显示当前 caseNo 的最新 taskId 的数据，如果 caseNo 的 taskId 和主页面内容的 taskId 一致，则会显示当前 taskId 的快照数据。这个模块只有显示 caseNo 和修改 caseNo 的功能

### envoy 数据内容（包括当前 envoy 列表和历史 envoy 列表）

> - 入口：packages\BPM\src\pages\Envoy\Content.tsx
> - 业务逻辑：获取 envoy 的数据，并展示
> - 业务背景：当前 envoy 列表和历史数据列表中的数据都是来自 /api/navigator/evy/findReasonInfo 接口，并且又共用一个 loading，于是有了内容主入口
> - 数据逻辑
>   > 1.  initEnvoyData 是初始化的总入口，注意 getReasonConfigs 需要依赖 getEnvoyInfo 中的一些数据，所以必须先用阻塞方法执行完 getEnvoyInfo，再执行 getReasonConfigs
>   > 2.  getEnvoyInfo
>   >     > - /api/navigator/evy/findReasonInfo 获取基础的 envoy 数据，caseNo 必传，在有 taskId 并且 taskId 与当前 caseNo 的 taskId 相同时，会传 taskId。只传 caseNo，会获取当前 caseNo 的最新的 taskId 的数据，如果传了 caseNo 和 taskId，或获取 taskId 对应的快照数据展示。（ps：其实只要是有 taskId 的页面，如 taskDetail、高级查询页等都会传 taskId 过去
>   >     > - /api/evy/reasons/markReasonGroupRead 标记已读
>   >     > - 遍历 findReasonInfo 接口返回的 currentReasonGroups、historyReasonGroups，调用设置权限和设置用户信息的 effect。
>   >     > - authController/CheckGroupEnvoy，一个获取单条 Envoy 权限，这是外部模块提供的功能，单纯返回每一条的看、编辑、发送权限
>   >     > - setReasonUserInfo，使用/api/evy/template/getParamData，获取对应的用户信息，并设置进 envoy 的模板中（channelDataList）
>   >     > - 模板替换规则。将 channelDataList 中的带{{}}包裹的变量取出来，匹配 getParamData 中返回的数据，如果能匹配到值，就替换，匹配不到，保持变量展示。（ps：因为变量替换完之后，需要记录每个变量值对应的变量名是什么，所以还需要有一个 map 对象来记录关系，方便改变 user 的时候，能重新替换不同的变量到对应变量模板中。
>   > 3.  getReasonConfigs，使用/api/evy/config/listConfigs?\${stringify(params)} 获取 envoy 原因列表，列表的详细配置。在修改原因的时候，需要通过这里的配置，组织数据，发送给后端。

### 当前 envoy 列表

> - 入口：packages\BPM\src\pages\Envoy\EnvoyList\EnvoyList.tsx
> - 业务逻辑：如果 reasonConfigs 的长度为 0，即没有 envoy reason 可以选择，则会隐藏 添加 envoy 的按钮。

### envoy reason group 详情（CurrentReasonGroup）

1. 入口：packages\BPM\src\pages\Envoy\EnvoyList\CurrentReasonGroup\CurrentReasonGroup.tsx
2. 自动保存。如果是当前 envoy 列表，并且这条 envoy 是展开状态，30s 会自动保存一次
3. 删除按钮。如果是还处于 draft 状态的 envoy，可以删除，调用/api/evy/reasons/deleteReasonGroup 接口
4. GroupSelect。
   > - 入口：packages\BPM\src\pages\Envoy\EnvoyList\CurrentReasonGroup\GroupSelect.tsx
   > - 业务逻辑：展示当前的 envoyGroup 的 name，以及提供 envoy reason 下拉列表。
   > - 数据逻辑
   >   > - reasonGroup name 的展示。1.有些 reason 是其他节点带过来的，当前节点没有，所以需要把当前的 reason 和 config 合并并去重处理，2.有时候只是本地添加的一个空数组，占位用，没有实际数据，这种无需加进 config
   >   > - 修改 envoyGroup reason 时，需要严格按照与后端约定的格式，调用/api/evy/reasons/draftReasonGroup 保存进数据库，然后如果返回成功，需要对返回的数据做权限设置以及模板变量替换的操作。
5. CurrentReasonHeader
   > - 入口：packages\BPM\src\pages\Envoy\EnvoyList\CurrentReasonHeader\CurrentReasonHeader.tsx
   > - 业务逻辑：展示当前 reason 的 name（是 reason，不是 reasonGroup），并且可以切换展示 reason 或者 reminder 的详情。
   > - 数据逻辑
   >   > - 如果当前 group 只有一个 reason 的时候，不显示 reason 的 name，约定 reagonGroup 的 name 与 reason 的 name 相同。
   >   > - 如果包含的内容有错误信息，会汇总提示到 reason name 的位置
   >   > - 在可编辑的时候可以调用/api/evy/reasons/switchReminder，开 or 关闭当前的 reminder，如果 reminder 关闭，则全部 reminder 都不可编辑
6. 当前 reason 的内容。（reason 和 reminder）
   > - reason
   >   > - 入口：packages\BPM\src\pages\Envoy\EnvoyList\CurrentReason\CurrentReason.tsx
   >   > - 业务逻辑：根据 displayConfig，渲染组件。（详见 MapComponent 的介绍）
   > - reminder
   >   > - 入口：packages\BPM\src\pages\Envoy\EnvoyList\Reminder\Reminder.tsx
   >   > - 业务逻辑：用 tab 的形式展示全部的 reminder，每个 reminder 会分别根据 displayConfig，渲染组件。（详见 MapComponent 的介绍）。

### MapComponent 介绍

- 入口：packages\BPM\src\pages\Envoy\EnvoyList\MapComponent.tsx
- 业务背景：envoy 的组件是可以根据 displayConfig 的配置自定义组合的，displayConfig 会有不同的 key，对应这里的不同组件，根据组件的功能，可以配置显示隐藏、编辑、排序等。（packages\BPM\src\pages\Envoy\_utils\getSortModuleArr.ts，在这里将配置转换为前端使用的数据结构）

### MapComponent 中的组件

1. DateProcess
   > - 入口：packages\BPM\src\pages\Envoy\modules\DateProcess\DateProcess.tsx
   > - 业务逻辑：部分 envoy 是有处理时间限制的，该组件就是用于展示已经使用了多长时间的百分比进度条。
   > - 数据逻辑
   >   > - 如果没有 startTime，视为未激活，已使用的时间为 0，
   >   > - 如果有 startTime，则使用 endTime（如果有）或者当前时间来计算经过了多少天，从而计算出占总时间 period 的比例（ps：这个方式有 bug，因为前端计算出来的是自然日，可是实际上应该要根据工作日来计算的，这个需要后端给数据才行，不过暂时没有需求说要改这块逻辑，知道这么件事即可
   >   > - 如果已经超时了，应该把进度条显示为红色
2. EnvoyTo
   > - 入口：packages\BPM\src\pages\Envoy\modules\EnvoyTo\EnvoyTo.tsx
   > - 业务逻辑：展示发送给哪个角色的哪个用户。
   > - 数据逻辑：
   >   > - 角色通过 data 中的 destRole 获取，如果 destRole 为空，则获取 destRoleOpt[0]
   >   > - 用户通过 data 中的 dest 获取，如果 dest 为空，则获取当前角色的用户列表的第一个用户
   >   > - 改变角色或者用户的时候，会获取/api/evy/template/getParamData 接口中的数据，并通过模板变量替换规则，替换进对应的数据里
   >   > - 因为当前的 reasonGroup 可能是其他节点传过来的，所以需要在/api/evy/config/listConfigs?\${stringify(params)}中获取查找匹配的 reasouGroup 配置，然后在对应配置里再查出对应的角色的模板（不同角色模板可能不同
   >   > - syncDestToReminder，如果这个值为 true，意味着角色或者用户的修改，导致的数据变更也应该同步到这个 reason 下面的所有 reminder 中
3. DispatchDate
   > - 入口：packages\BPM\src\pages\Envoy\modules\DispatchDate\DispatchDate.tsx
   > - 业务逻辑：印在信件上的发出日期，只是展示用，不影响后端发送的逻辑
   > - 数据逻辑
   >   > - 获取数据中的 dispatchDate
   >   > - 不可以设置早于当前时间
4. Channel
   > - 入口：packages\BPM\src\pages\Envoy\modules\Channel\Channel.tsx
   > - 业务逻辑：根据配置的消息通道，用 tab 形式展示。根据 displayConfig 中的配置，展示 ChannelInfo、ChannelTpl
   > - 数据逻辑：可以切换或者关闭某些消息通道，如果是关闭的通道，通道对应的内容不可编辑
5. ChannelInfo
   > - 入口：packages\BPM\src\pages\Envoy\modules\ChannelInfo\ChannelInfo.tsx
   > - 业务逻辑：根据 channelDataList 中的 info，遍历渲染输入框，输入 phoneNo、emailAddress 等
   > - 数据逻辑
   >   > - 部分 input 有正则校验
   >   > - 变量的标记{{}}不需要显示出来
6. ChannelTpl
   > - 入口：packages\BPM\src\pages\Envoy\modules\ChannelTpl\ChannelTpl.tsx
   > - 业务逻辑：根据 channelDataList 中的 content，显示邮件 or 信件 or 短信 or 备注的具体内容
   > - 数据逻辑
   >   > - 如果 isAllEditable 为 true。判断通道为 Email 的时候使用富文本框，否则使用多行文本框
   >   > - 如果 isAllEditable 为 false。除了变量之外，全部不可编辑
7. Documents
   > - 入口：packages\BPM\src\pages\Envoy\modules\Documents\Documents.tsx
   > - 业务逻辑：根据 docGroupCodes 显示对应的书类按钮，按钮可以激活对应的下拉列表，可以选择对应书类，选中的书类后端会将其附在发出去的邮件内容里面
   > - 数据逻辑
   >   > - 通过/api/misc/dictionary/findDictionariesByTypeCode 获取到全部书类的 key，然后通过全部书类的 key 作为参数通过/api/doc/listDocsByGroupCode 获取全部的书类及对应列表，书类列表再国际化。
   >   > - docGroupCodes 获取当前要展示的书类按钮
   >   > - reasonDocs 获取当前选择的书类
8. AttachDocument
   > - 入口：packages\BPM\src\pages\Envoy\modules\AttachDocument\AttachDocument.tsx
   > - 业务逻辑：attachDocs 展示当前选中的附件
   > - 数据逻辑：通过/api/doc/view/list/docViewInfo/attachDocByCaseNo 获取附件列表，然后根据 attachDocs 展示选择的附件
9. Subcase
   > - 入口：packages\BPM\src\pages\Envoy\modules\Subcase\Subcase.tsx
   > - 业务逻辑：有些 envoy 会创建一条子流程，这用来展示 subCaseNo，并且可以点击跳转至对应的 caseDetail 页面
10. Policy
    > - 入口：packages\BPM\src\pages\Envoy\modules\Policy\Policy.tsx
    > - 业务逻辑：根据 policy 解析，遍历显示出一系列复杂组件，可以以组件为单位增加或减少（最少为一个），附在 email 上，告诉用户有哪些保单，保单备注、日期等
    > - 数据逻辑：
    >   > - 通过/api/bpm/pend/th/getThPendPolicyReasons，根据当前 reasonCode 获取 reason 列表
    >   > - 通过/api/claim/assessment/incident/benefit/getClaimIncidentBenefitPolicyNosByClaimNo 根据当前 businessNo 获取 policyNo 列表
    >   > - 根据当前选择的 policyReaons，查询是否有必填的 otherReason 和日期
11. Attachment
    > - 入口：packages\BPM\src\pages\Envoy\modules\Attachment\Attachment.tsx
    > - 业务逻辑：根据 attachment 遍历渲染 input 框，可以增加或减少（最少为一个）,可以输入缺失的文件的名字（那边是选择人工输入的，不是要列表选择）
12. Payment
    > - 入口：packages\BPM\src\pages\Envoy\modules\Payment\Payment.tsx
    > - 业务逻辑：通过/api/claim/case/th/ihb/getPaymentNoByBatchClaimNo 根据 businessNo 获取 paymentNo 列表，并根据 payment 展示对应选项。选择后的 paymentNo 会附在 email 上发送给用户，相当于告诉用户有哪些账单已经到了
13. Remark
    > - 入口：packages\BPM\src\pages\Envoy\modules\Remark\Remark.tsx
    > - 业务逻辑：展示 remark 的内容，单纯的描述一下事情
14. DelayLetter
    > - 入口：packages\BPM\src\pages\Envoy\modules\DelayLetter\DelayLetter.tsx
    > - 业务逻辑：是否延迟送信（不明），一个普通复选框，如果勾选了，用户会把一封名为“delayLetter”的信件发出去，不勾选则不发
15. Define
    > - 入口：packages\BPM\src\pages\Envoy\modules\Define\Define.tsx
    > - 业务逻辑：一个普通输入框，内部沟通用，告诉内部人员因为什么原因需要 pend 住这个 task
16. PendingMemo
    > - 入口：packages\BPM\src\pages\Envoy\modules\PendingMemo\PendingMemo.tsx
    > - 业务逻辑：根据 pendingMemoList 渲染一系列复杂组件，可以增加 or 减少，最少为 1。这里选择的选项，到时候会夹在发出去了 letter 或者 email 里，通知用户还缺少了哪些书（还会有对各自书的一些描述），如果收到了，会显示收到，如果不需要了可以人工点收到。
    > - 数据逻辑
    >   > - 通过/api/evy/memo/listMemos?\${stringify(params)}根据 reasonCode 获取 memo 的列表
    >   > - memo 列表，出来 fire 之外，都不可以重复选择
    >   > - 选择 memo 之后最后 input 框中显示对应的模板内容，模板可编辑
    >   > - 根据需要，可以人工取消已经发送的 memo（/api/evy/reasons/waivePendingMemo?\${stringify(params)}）
    >   > - waived 的 memo，会显示在最下方
17. FreeFields
    > - 入口：packages\BPM\src\pages\Envoy\modules\FreeFields\FreeFields.tsx
    > - 业务逻辑：有一些输入项，没有任何前端的业务逻辑在，只是单纯的显示or输入用，但是可能出现多个，为了不每次都单独配置一个组件，以及未来这种简单组件的类型扩展，单独创建了个文件，用于处理各类简单组件的实现
    > - 数据逻辑
    >   > - 后端的配置里会有一个custom字段，里面包含labelTypeCode（显示的标签的type_code), labelDictCode（显示的标签的dict_code）, name（前端map数据用的formName）, dataPath（数据所在路径，现在一般都在当前层级，不会跨数据层级取数据，所以datapath目前都与name相同）

### envoyGroup 的操作按钮

1. 根据 allowActions 渲染当前可操作的按钮，外加一颗 send 按钮
2. 不可编辑的按钮，直接隐藏
3. Save 按钮可以暂时保存编辑的数据（/api/evy/reasons/saveReasonGroup）
4. Waive 按钮可以人工取消一条 envoy（/api/evy/reasons/waiveReasonGroup）
5. Resolve 按钮，可以人工解决一条 envoy（/api/evy/reasons/resolveReasonGroup）
6. 如果 waive、resolve 时，taskDetail 是 pending 状态，会触发一次 bpm.reload，更新主页面的状态
7. Send 按钮，可以发送一条 envoy（/api/navigator/evy/activateReasonGroup），发送的时候，会将原本前端格式化，便于使用的数据，转回 json，再发送给后端。如果发送 Envoy 的时候，当前 taskDetail 状态是 todo，会触发一次 bpm.reload，刷新主页面状态

### reminder 特有组件

1. SendDay
   > - 入口：packages\BPM\src\pages\Envoy\modules\SendDay\SendDay.tsx
   > - 业务逻辑：已发送的，展示真实发送时间，如果未发送的，展示机会发送时间
   > - 数据逻辑：修改日期，需要请求/api/evy/reasons/getReminderSendTime 接口，获取后端返回的工作日日期
2. Switch
   > - 入口：packages\BPM\src\pages\Envoy\EnvoyList\CurrentReasonHeader\CurrentReasonHeader.tsx
   > - 业务逻辑：调用/api/evy/reasons/switchReminder 切换 reminder 的开关状态
   > - 数据逻辑
   >   > - 只有 reason 发出去之后，并且还没有进入 history，reminder 的 switch 开关才会显示，否则只显示 reminder 当前的状态（开 or 关）
   >   > - 如果 reminder 是关闭的，reminder 中的内容都是不可编辑的，而且后端的定时发送功能也会被停止

### 大屏模式

业务逻辑：开启大屏模式，隐藏原本小屏的 channelTpl，显示在右侧。如果是没有 channelTpl 的 envoy，提示没有 content

### disabled 列表

入口：packages\BPM\src\pages\Envoy_utils\getDisabled.ts
业务逻辑：用于判断各个按钮、输入框等是否可以编辑
