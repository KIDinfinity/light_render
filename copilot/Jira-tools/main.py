import subprocess
import sys

scripts = [
    ("新建 Story 子任务", "createStoryDevelopmentTask.py"),
    ("复制 Jira", "copyJira.py"),
    ("完成 Jira", "doneJira.py")
]

def main():
    print("请选择要运行的脚本：")
    for idx, (desc, fname) in enumerate(scripts, 1):
        print(f"{idx}. {desc} ({fname})")
    choice = input("输入序号并回车: ")
    try:
        idx = int(choice) - 1
        if idx < 0 or idx >= len(scripts):
            raise ValueError
    except ValueError:
        print("输入无效，请输入正确的序号。")
        sys.exit(1)
    script_file = scripts[idx][1]
    print(f"正在运行 {script_file} ...")
    subprocess.run([sys.executable, script_file])

if __name__ == "__main__":
    main()
