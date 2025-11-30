import argparse
import requests
import ssl
import re
from requests.auth import HTTPBasicAuth
from requests.adapters import HTTPAdapter
from config import username, password
from setting import group_jira_url, local_jira_url

_STRIKE_PATTERN = re.compile(
    r'(?:~~(?P<cloud>([^\n~]|~(?!~))+?)~~)|-(?P<wiki>[^\n-]+)-'
)

pem_path = "/Users/226838/Documents/company/codeReview/ui/perm/_.atlassian.net.pem"

# custom field 映射
CUSTOM_FIELDS = {
    "description": "description",
    "businessRule": "customfield_10131",
    "acceptanceCriteria": "customfield_10132",
    "designDetail": "customfield_10133"
}

class SSLContextAdapter(HTTPAdapter):
    """Custom adapter to use OS certificate store via ssl.create_default_context()."""
    def init_poolmanager(self, *args, **kwargs):
        kwargs['ssl_context'] = ssl.create_default_context()  # Uses OS certs on Windows/macOS
        return super().init_poolmanager(*args, **kwargs)
    

def create_session_with_os_certs():
    session = requests.Session()
    session.mount("https://", SSLContextAdapter())
    return session


def remove_strikethrough(text: str) -> str:
    """
    Remove all substrings under Jira strikethrough formatting.
    Handles both Cloud (~~text~~) and Wiki renderer (-text-).
    """
    # Pattern matches either ~~...~~ or -...-

    cleaned_text = _STRIKE_PATTERN.sub('', text)
    return cleaned_text.strip()


def get_local_issue(issue_key):
    # session = create_session_with_os_certs()
    url = f"{local_jira_url}/rest/api/2/issue/{issue_key}"
    resp = requests.get(
        url,
        auth=HTTPBasicAuth(username, password),
        headers={"Accept": "application/json"},
        timeout=10,
        verify=pem_path,
    )
    resp.raise_for_status()
    return resp.json()

## 获取 group Jira 单个 issue
def get_group_issue(issue_key):
    session = create_session_with_os_certs()
    url = f"{group_jira_url}/rest/api/2/issue/{issue_key}"
    resp = session.get(
        url,
        auth=HTTPBasicAuth(username, password),
        headers={"Accept": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()

def get_custom_fields_str(ticket_id, source):
    if source == "group":
        try:
            issue = get_group_issue(ticket_id)
        except Exception as e:
            print(f"获取group Jira失败: {e}")
            return None
    elif source == "local":
        try:
            issue = get_local_issue(ticket_id)
        except Exception as e:
            print(f"获取local Jira失败: {e}")
            return None
    else:
        print("source参数必须为 'group' 或 'local'")
        return None
    if not issue or "fields" not in issue:
        print(f"未找到Jira: {ticket_id}")
        return None
    fields = issue["fields"]
    values = []
    for key in CUSTOM_FIELDS.keys():
        v = fields.get(CUSTOM_FIELDS[key], "")
        if isinstance(v, dict) and "content" in v:
            v = str(v["content"])
        value_str = str(v) if v is not None else ""
        # 
        value_str = remove_strikethrough(value_str)
        # 拼接字段名和内容
        values.append(f"{key}: {value_str}")
    return "\n\n".join(values)


def parse_args():
    parser = argparse.ArgumentParser(description="获取Jira自定义字段内容")
    parser.add_argument("ticket_id", help="Jira Ticket ID")
    parser.add_argument("source", choices=["group", "local"], help="数据来源: group 或 local")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    result = get_custom_fields_str(args.ticket_id, args.source)
    if result is not None:
        print(result)
