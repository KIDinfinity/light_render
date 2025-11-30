# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started

copy config-sample.py => config.py 
`git rm --cached config.py` // exit config.py remove watch

- `python3 --version` (检查机子装的是 python3 还是 python) pip3/pip
- `python3 -m venv path/to/venv`  (装虚拟环境）
- `source path/to/venv/bin/activate`
- `pip3 install -r requirements.txt` (装依赖）

`python3 -m venv path/to/venv && source path/to/venv/bin/activate`

// pip freeze > requirements.txt

# Command  (python3 or python)

`python3 copyJira.py -h` 

`python3 copyJira_gui.py`

`python3 copyJira.py --jira SOGOTMOMEN-31178` // default done status without attachment and comment

`python3 copyJira.py --jira SOGOTMOMEN-31178 --attachment --comment` // with attachment and comment

