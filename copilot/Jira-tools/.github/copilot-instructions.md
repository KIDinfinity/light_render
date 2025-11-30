
# Copilot Instructions for Jira-tools

## 项目架构与核心流程
- **目标**：在 FWD 多 Jira 系统间高效同步、批量管理 issue，支持命令行与 GUI 操作，适配多项目、多类型、多状态流转。
- **主要入口脚本**：
  - `copyJira.py`：命令行同步 group Jira 到本地 Jira，支持状态、附件、评论可选同步。
  - `copyJira_gui.py`：Tkinter GUI，便捷批量同步，自动保存账号到 `user_config.json`。
  - `createStoryDevelopmentTask.py`：为指定 parent issue 批量创建 FE 子任务并自动父子关联。
  - `doneJira.py`：批量将当前用户分配的本地 Jira issue 状态切 Done。
  - `main.py`：命令行菜单入口，统一调度上述脚本。
- **共享逻辑**：所有 Jira 交互、正则、账号、批量处理等核心逻辑集中于 `shared/` 目录（如 `shared/jira.py`、`shared/excel.py`）。

## 配置与依赖
- 复制 `config-sample.py` 为 `config.py`，填写 Jira 账号、API Token（仅本地保存，勿提交 git）。
- `setting.py` 配置项目 ID、Jira 域名、Done 状态 ID、正则表达式（支持多项目/多类型）。
- 依赖管理：
  - `python3 -m venv venv && source venv/bin/activate`
  - `pip install -r requirements.txt`

## 典型开发与运行流程
- 命令行同步：
  - `python3 copyJira.py --jira SOGOTMOMEN-31178 [--attachment] [--comment] [--no-status]`
- GUI 同步：
  - `python3 copyJira_gui.py`，支持账号记忆、日志输出、批量操作。
- 批量创建子任务：
  - `python3 createStoryDevelopmentTask.py`，输入 parent key，自动新建并关联 FE 子任务。
- 批量 Done：
  - `python3 doneJira.py`，自动查找并批量流转当前用户未完成 issue。
- 入口菜单：
  - `python3 main.py`，交互式选择上述功能。
- 代码审查提示生成：
  - `./gen_reivew_prompt.sh <Jira Issue ID>`，自动生成审查提示词，结合 Jira 字段与 git commit。

## 关键约定与特殊模式
- **所有 Jira 交互统一封装于 `shared/jira.py`，如需扩展新类型/新 API，优先在此实现。**
- **正则与项目/issue 类型强相关，详见 `setting.py`，如需适配新项目需同步维护。**
- **自定义字段映射**：见 `constant/custom_field_mapping.json`，如需扩展自定义字段，需同步维护此文件及相关解析逻辑。
- **批量/自动化**：所有批量操作（如批量 Done、批量创建子任务、批量同步）均自动处理异常与日志输出，便于追踪。
- **安全**：`config.py`、`user_config.json` 等敏感信息仅本地保存，已加入 `.gitignore`，严禁泄露。
- **中文注释与交互**：代码、交互、日志均大量使用中文，便于本地团队理解。
- **日志与调试**：所有脚本均在终端或 GUI 日志区输出详细进度与异常，便于排查。

## 易错点与扩展建议
- 401/403 错误多因 API Token、Jira 域名、网络问题，优先排查配置。
- 若需支持新 issue 类型/项目，需同步维护 `setting.py` 正则与相关逻辑。
- 若需扩展同步内容（如新自定义字段、附件类型），建议先在 `shared/jira.py` 增加 API 封装。
- 若需适配新批量场景，参考 `createStoryDevelopmentTask.py`、`doneJira.py` 的批量处理与日志模式。

---
如需补充说明或有特殊约定，请在此文件继续补充。
