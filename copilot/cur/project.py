import requests
from requests.auth import HTTPBasicAuth
from tabulate import tabulate  
from config import username, password
from setting import  local_jira_url


## 获取project列表
def get_project_list():
    url = f"{local_jira_url}/rest/api/2/project"
    resp = requests.get(url, auth=HTTPBasicAuth(username, password), timeout=10)
    resp.raise_for_status()
    projects = resp.json()
    table = [[p['name'], p['id'], p['key']] for p in projects]
    print(tabulate(table, headers=["Name", "ID", "Key"], tablefmt="grid"))
    return projects


get_project_list()