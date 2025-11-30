import sys


def select_choice(title, choices):
    # 如果有 Tkinter 主窗口，弹窗选择
    try:
        import tkinter as tk
        from tkinter import simpledialog

        root = tk._default_root
        if root:
            dialog = tk.Toplevel(root)
            dialog.title(title)
            var = tk.StringVar()
            for choice in choices:
                tk.Radiobutton(dialog, text=choice, variable=var, value=choice).pack(
                    anchor="w"
                )

            def on_ok():
                dialog.destroy()

            tk.Button(dialog, text="确定", command=on_ok).pack()
            dialog.grab_set()
            dialog.wait_window()
            return var.get()
    except Exception:
        pass
    # 否则用命令行交互
    print(title)
    for idx, choice in enumerate(choices):
        print(f"{idx+1}. {choice}")
    while True:
        sel = input("请选择序号: ")
        if sel.isdigit() and 1 <= int(sel) <= len(choices):
            return choices[int(sel) - 1]
