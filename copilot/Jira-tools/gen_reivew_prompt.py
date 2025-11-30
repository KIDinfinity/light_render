#!/usr/bin/env python3
import argparse
import os


from get_jira_custom_fields import get_custom_fields_str
from git_show_jira_commits import get_jira_commits_content
from git_util import load_repo_list_from_file


def load_template():
    template_path = 'copilot_review_template.md'
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

def main():
    parser = argparse.ArgumentParser(description='生成代码审查提示词')
    parser.add_argument('ticket_id', help='Jira Issue ID')
    parser.add_argument('repo_base_path', help='包含多个git仓库的根目录')
    parser.add_argument('--source', choices=['local', 'group'], default='local', help='Jira数据来源: local 或 group，默认local')
    parser.add_argument('--output', '-o', dest='output_file', help='输出文件路径')

    args = parser.parse_args()

    # 遍历repo_base_path下所有子目录，筛选git仓库
    repo_base_path = args.repo_base_path
    git_repo_paths = []
    if os.path.isdir(repo_base_path):
        for entry in os.listdir(repo_base_path):
            full_path = os.path.join(repo_base_path, entry)
            if os.path.isdir(full_path) and os.path.isdir(os.path.join(full_path, '.git')):
                git_repo_paths.append(full_path)
    if not git_repo_paths:
        git_repo_paths = None

    # 获取Jira自定义字段内容
    jira_info = get_custom_fields_str(args.ticket_id, args.source)
    if jira_info is None:
        jira_info = '[获取Jira自定义字段失败]'

    # 获取git commit内容，遍历所有仓库路径
    git_commit_info = get_jira_commits_content(args.ticket_id, git_repo_paths)
    if not git_commit_info:
        git_commit_info = '[未找到相关git commit]'

    template = load_template()
    prompt = template.replace('{jira}', jira_info).replace('{git_commit}', git_commit_info).replace('<填写>', args.ticket_id)

    # 如果指定了输出文件，则写入文件，否则打印到控制台
    if args.output_file:
        # 确保输出目录存在
        output_dir = os.path.dirname(args.output_file)
        if output_dir:
            os.makedirs(output_dir, exist_ok=True)
        with open(args.output_file, 'w', encoding='utf-8') as f:
            f.write(prompt)
        print(f"提示词已生成并保存到: {args.output_file}")
    else:
        print(prompt)

if __name__ == '__main__':
    main()
