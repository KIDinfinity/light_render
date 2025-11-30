# 配置Copilot Agent

## 准备代码目录
将所有需要review的代码仓库放在一个目录下，假设这个目录叫`opus`

```
├── opus
│   ├── Venus-UI
│   ├── owb-nb
│   ├── pos
│   ├── venus-c360
└── └── venus-claim
```

使用VSCode打开`opus`目录，这样就让所有代码仓库都处于VSCode的工作区中，其中的文件可以被Copilot访问。

## 准备工具脚本
将以下文件复制到`opus`目录中，确保它们在工作区中，可以被Copilot访问

```
.github
copilot_find_jira_commits.sh
copilot_get_jira_content.py
config-sample.py
setting.py
```

将`config-sample.py`重命名为`config.py`，在其中填写自己的Jira用户名和API Key

`.github/prompts`是预置的提示词文件，可以直接在聊天窗口中用`/`快速调用
![alt text](img/slash_prompt.jpg)

## 使用Copilot Agent
打开Copilot聊天窗口，将左下角模式选择为Agent，模型选择GPT-4.1。GPT-4.1是目前我们可以使用的最新模型。Copilot还支持GPT-5，Claude-Sonnet等模型，但是还没有开放给我们的帐号。

![Config Copilot](img/config_copilot.jpg)

在窗口中输入提示词，开始执行。过程中会有一些操作需要我们授权，仔细检查命令，确认无误后允许操作。

![alt text](img/approve_action.jpg)