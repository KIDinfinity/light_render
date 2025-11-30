# gen_reivew_prompt.sh 使用说明

## 1. 环境配置

### 1.1 系统要求
- 操作系统：macOS 或 Linux
- Shell：zsh
- Python 3 环境
- Git 工具

### 1.2 依赖环境准备
在使用此脚本前，请确保已完成以下环境配置：

```bash
# 检查 Python 版本
python3 --version

# 创建虚拟环境（推荐）
python3 -m venv path/to/venv
source path/to/venv/bin/activate

# 安装依赖
pip3 install -r requirements.txt
```

### 1.3 配置文件
确保已正确配置以下文件：
- `config-sample.py` → `config.py` (需要根据实际环境修改)
- `constant/repo_list.txt` (包含需要扫描的git仓库路径)

## 2. 脚本功能说明

`gen_review_prompt.sh` 是一个用于生成代码审查提示词的脚本，它会：
1. 根据指定的 Jira Issue ID 获取相关Jira信息
2. 获取相关的git commit内容
3. 生成完整的代码审查提示词文件

## 3. 使用方法

### 3.1 基本用法
```bash
./gen_reivew_prompt.sh <Jira Issue ID>
```

参数说明：
- `<Jira Issue ID>`：需要生成评审提示的 Jira 任务编号，例如 `IBCLAIM-38`。

### 3.2 示例
```bash
./gen_reivew_prompt.sh IBCLAIM-38
```

### 3.3 输出文件
脚本会生成一个 Markdown 文件，路径格式如下：
```
./review_prompts/<Jira Issue ID>_review.prompt.md
```

## 4. 需要修改的文件内容

### 4.1 修改脚本中的代码仓库路径
如需修改代码仓库路径，请编辑脚本中的 `repo_base_path` 变量：

```bash
# 当前默认路径
repo_base_path="/Users/gzorzz/workspace/fwd/opus"
```

### 4.2 修改输出文件路径
如需修改输出文件路径，请编辑脚本中的 `target_dir` 或 `target_prompt` 变量：

```bash
# 当前默认输出目录
target_dir="./review_prompts"
# 输出文件名格式
target_prompt="${target_dir}/${issue_id}_review.prompt.md"
```

## 5. 脚本工作流程

1. 检查命令行参数是否正确（未传入 Jira Issue ID 时输出用法并退出）
2. 设置代码仓库路径和输出文件路径
3. 自动创建输出目录（如不存在）
4. 调用 Python 脚本 `gen_reivew_prompt.py` 生成提示词内容，参数包括 Jira Issue ID、代码仓库路径、输出文件路径
    - 从 Jira 获取指定 Issue 的相关信息
    - 在指定仓库中搜索相关 commit 并获取变更内容
    - 合并信息并生成 Markdown 文件

## 6. 依赖组件说明

该脚本依赖以下组件：
- `gen_reivew_prompt.py` - 核心 Python 脚本，负责生成提示词内容
- `copilot_review_template.md` - 提示词模板文件
- `get_jira_custom_fields.py` - 获取 Jira 自定义字段的脚本
- `git_show_jira_commits.py` - 获取 git commit 内容的脚本
- `constant/repo_list.txt` - 包含 git 仓库路径的列表文件

## 7. 注意事项

- 确保所有依赖的 Python 脚本和模块都已正确安装
- 确保 Jira 访问权限正常
- 确保代码仓库路径和输出目录配置正确
- 输出文件将覆盖同名文件，请注意备份重要文件
