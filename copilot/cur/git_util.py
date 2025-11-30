def load_repo_list_from_file(repo_list_file):
    """
    从指定的repo列表文件读取仓库路径，每行一个，忽略空行和前后空白。
    :param repo_list_file: 文件路径
    :return: repo路径列表
    """
    import os
    if not os.path.isfile(repo_list_file):
        raise FileNotFoundError(f"[ERROR] 指定的repo列表文件不存在: {repo_list_file}")
    repo_paths = []
    with open(repo_list_file, encoding="utf-8") as f:
        for line in f:
            repo = line.strip()
            if repo:
                repo_paths.append(repo)
    return repo_paths
