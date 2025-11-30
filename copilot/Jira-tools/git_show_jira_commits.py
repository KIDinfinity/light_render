#!/usr/bin/env python3
# 原 git-show-jira-commits.py 内容，重命名为 git_show_jira_commits.py 以便 import
import argparse
import subprocess

def get_jira_commits_content(ticket_id, git_repo_paths=None):
    """
    获取包含指定Jira Ticket ID的所有git提交变更内容，并以字符串返回。
    :param ticket_id: Jira Ticket ID，例如 VENUS-1234
    :param git_repo_paths: git 仓库路径列表，默认为当前目录
    :return: 所有相关commit内容的字符串，若无则返回空字符串
    """
    def _run_git(cmd, **kwargs):
        return subprocess.run(cmd, stdout=subprocess.PIPE, text=True, check=True, **kwargs)

    import os
    if git_repo_paths is None:
        git_repo_paths = [os.getcwd()]
    elif isinstance(git_repo_paths, str):
        git_repo_paths = [git_repo_paths]

    content = []
    for repo_path in git_repo_paths:
        print(f"[DEBUG] 正在查找Repo: {repo_path}")
        git_log_cmd = [
            "git", "log", "--grep", ticket_id, "--pretty=format:%H", "--reverse"
        ]
        try:
            result = _run_git(git_log_cmd, cwd=repo_path)
        except Exception as e:
            print(f"[DEBUG] Repo: {repo_path} 获取提交时出错: {e}")
            content.append(f"\n[Repo: {repo_path}] 获取提交时出错: {e}\n")
            continue
        commit_hashes = result.stdout.strip().splitlines()
        print(f"[DEBUG] Repo: {repo_path} 找到 {len(commit_hashes)} 个相关commit")
        if not commit_hashes:
            continue
        for commit in commit_hashes:
            print(f"[DEBUG] Repo: {repo_path} 处理commit: {commit}")
            content.append(f"\n===== Commit: {commit} (Repo: {repo_path}) =====\n\n")
            # 获取完整的git show输出，然后将相对路径替换为绝对路径
            show_result = _run_git(["git", "show", commit], cwd=repo_path)
            # 将相对路径替换为绝对路径
            output_with_absolute_paths = show_result.stdout
            # 简单地将相对路径替换为绝对路径的思路是：在显示时使用绝对路径
            # 但更准确的做法是使用 git -C 命令或者在输出中处理路径
            content.append(output_with_absolute_paths)
    return ''.join(content)

def export_jira_commits(ticket_id, output_filename=None, git_repo_paths=None):
    """
    查找并输出包含指定Jira Ticket ID的所有git提交变更内容到文件。
    :param ticket_id: Jira Ticket ID，例如 VENUS-1234
    :param output_filename: 输出文件名，默认为 {ticket_id}_commits.txt
    :param git_repo_paths: git 仓库路径列表，默认为当前目录
    :return: 输出文件名
    """
    def _run_git(cmd, **kwargs):
        return subprocess.run(cmd, stdout=subprocess.PIPE, text=True, check=True, **kwargs)

    import os
    if git_repo_paths is None:
        git_repo_paths = [os.getcwd()]
    elif isinstance(git_repo_paths, str):
        git_repo_paths = [git_repo_paths]

    found = False
    if output_filename is None:
        output_filename = f"{ticket_id}_commits.txt"
    with open(output_filename, "w", encoding="utf-8") as f:
        for repo_path in git_repo_paths:
            print(f"[DEBUG] 正在查找Repo: {repo_path}")
            git_log_cmd = [
                "git", "log", "--grep", ticket_id, "--pretty=format:%H", "--reverse"
            ]
            try:
                result = _run_git(git_log_cmd, cwd=repo_path)
            except Exception as e:
                print(f"[DEBUG] Repo: {repo_path} 获取提交时出错: {e}")
                f.write(f"\n[Repo: {repo_path}] 获取提交时出错: {e}\n")
                continue
            commit_hashes = result.stdout.strip().splitlines()
            print(f"[DEBUG] Repo: {repo_path} 找到 {len(commit_hashes)} 个相关commit")
            if not commit_hashes:
                continue
            found = True
            for commit in commit_hashes:
                print(f"[DEBUG] Repo: {repo_path} 处理commit: {commit}")
                f.write(f"\n===== Commit: {commit} (Repo: {repo_path}) =====\n\n")
                show_result = _run_git(["git", "show", commit], cwd=repo_path)
                f.write(show_result.stdout)
    if not found:
        print(f"未找到包含 {ticket_id} 的提交。")
        return None
    print(f"输出已保存到 {output_filename}")
    return output_filename

def main():
    parser = argparse.ArgumentParser(description="查找并输出包含指定Jira Ticket ID的所有git提交变更内容")
    parser.add_argument("ticket_id", help="Jira Ticket ID，例如 VENUS-1234")
    parser.add_argument("--git-repo-path", dest="git_repo_paths", nargs="+", default=None, help="git仓库路径，可指定多个，默认为当前目录")
    parser.add_argument("--git-repo-list-file", dest="git_repo_list_file", default=None, help="包含git仓库路径的纯文本文件，每行一个repo，忽略空行")
    args = parser.parse_args()

    git_repo_paths = []
    if args.git_repo_paths:
        git_repo_paths.extend(args.git_repo_paths)
    if args.git_repo_list_file:
        from git_util import load_repo_list_from_file
        try:
            repo_list = load_repo_list_from_file(args.git_repo_list_file)
            git_repo_paths.extend(repo_list)
        except Exception as e:
            print(e)
            exit(1)
    if not git_repo_paths:
        git_repo_paths = None
    export_jira_commits(args.ticket_id, git_repo_paths=git_repo_paths)

if __name__ == "__main__":
    main()
