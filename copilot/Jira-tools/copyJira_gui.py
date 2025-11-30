import sys
import threading
import tkinter as tk
from tkinter import messagebox, scrolledtext
import json
import os
from shared.jira import copy_group_to_local

class TextRedirector(object):
    def __init__(self, widget):
        self.widget = widget

    def write(self, msg):
        self.widget.config(state="normal")
        self.widget.insert(tk.END, msg)
        self.widget.see(tk.END)
        self.widget.config(state="disabled")

    def flush(self):
        pass

    def isatty(self):
        return False

CONFIG_PATH = "user_config.json"

def save_config(username, password):
    with open(CONFIG_PATH, "w") as f:
        json.dump({"username": username, "password": password}, f)

def load_config():
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH, "r") as f:
            data = json.load(f)
            return data.get("username", ""), data.get("password", "")
    return "", ""

def run_copy():
    def task():
        jira_keys = jira_entry.get().strip()
        update_status = status_var.get()
        upload_attachment = attachment_var.get()
        upload_comment = comment_var.get()
        username = username_entry.get().strip()
        password = password_entry.get().strip()

        print("🚀 Starting copy...")
        if not username or not password:
            print("❌ Username and password must be provided. Please check your credentials.")
            messagebox.showerror("Error", "❌ Username and password must be provided. Please check your credentials.")
            return

        if not jira_keys:
            print("Jira issue keys cannot be empty.")
            messagebox.showerror("Error", "Jira issue keys cannot be empty.")
            return

        save_config(username, password)

        try:
            copy_group_to_local(jira_keys, update_status, upload_attachment, upload_comment, False, username, password)
            print("✅ Jira issues copied successfully!")
            messagebox.showinfo("Success", "Jira issues copied successfully!")
        except Exception as e:
            print(f"Failed to copy Jira issues: {e}")
            messagebox.showerror("Error", f"Failed to copy Jira issues:\n{e}")

    threading.Thread(target=task).start()

def clear_log():
    log_text.config(state="normal")
    log_text.delete(1.0, tk.END)
    log_text.config(state="disabled")

root = tk.Tk()
root.title("Jira Issue Copier")
root.geometry("650x480")
root.configure(bg="white")

# 顶部标题
title_label = tk.Label(root, text="Jira Issue Copier", font=("Segoe UI", 18, "bold"), bg="white", fg="#3a3a3a")
title_label.pack(pady=(18, 0))

# setting区域
setting_frame = tk.Frame(root, bg="white", padx=12, pady=12)
setting_frame.pack(fill="x", padx=18, pady=(0, 0))

tk.Label(setting_frame, text="Username:", bg="white", font=("Segoe UI", 13)).grid(row=0, column=0, sticky="w", pady=(0, 8))
username_entry = tk.Entry(setting_frame, width=18, font=("Segoe UI", 12), bg="#f7fbff", fg="#333333", insertbackground="#333333")
username_entry.grid(row=0, column=1, padx=(0, 10), pady=(0, 8), sticky="ew")

tk.Label(setting_frame, text="Password:", bg="white", font=("Segoe UI", 13)).grid(row=0, column=2, sticky="w", pady=(0, 8))
password_entry = tk.Entry(setting_frame, width=18, font=("Segoe UI", 12), show="*", bg="#f7fbff", fg="#333333", insertbackground="#333333")
password_entry.grid(row=0, column=3, padx=(0, 0), pady=(0, 8), sticky="ew")

setting_frame.columnconfigure(1, weight=1)
setting_frame.columnconfigure(3, weight=1)

# 自动填充保存的用户名和密码
saved_username, saved_password = load_config()
username_entry.insert(0, saved_username)
password_entry.insert(0, saved_password)

# 分隔线
tk.Frame(root, height=2, bg="#e0e0e0").pack(fill="x", padx=20, pady=10)

main_frame = tk.Frame(root, bg="white", padx=18, pady=18)
main_frame.pack(fill="both", expand=True, padx=18, pady=0)

tk.Label(main_frame, text="Jira Issue Keys:", bg="white", font=("Segoe UI", 13)).grid(row=0, column=0, sticky="w", pady=(0, 8))
jira_entry = tk.Entry(main_frame, width=48, font=("Segoe UI", 12), bg="#f7fbff", fg="#333333", insertbackground="#333333")
jira_entry.grid(row=0, column=1, columnspan=3, padx=5, pady=(0, 8), sticky="ew")

status_var = tk.BooleanVar(value=True)
attachment_var = tk.BooleanVar(value=False)
comment_var = tk.BooleanVar(value=False)

tk.Label(main_frame, text="Options:", bg="white", font=("Segoe UI", 13)).grid(row=1, column=0, sticky="w", pady=(0, 6))
tk.Checkbutton(main_frame, text="Update Status", variable=status_var, bg="white", font=("Segoe UI", 12)).grid(row=1, column=1, sticky="w", pady=(0, 6))
tk.Checkbutton(main_frame, text="Upload Attachments", variable=attachment_var, bg="white", font=("Segoe UI", 12)).grid(row=1, column=2, sticky="w", pady=(0, 6))
tk.Checkbutton(main_frame, text="Upload Comments", variable=comment_var, bg="white", font=("Segoe UI", 12)).grid(row=1, column=3, sticky="w", pady=(0, 12))

tk.Frame(main_frame, height=2, bg="#e0e0e0").grid(row=2, column=0, columnspan=4, sticky="ew", pady=8)

tk.Button(main_frame, text="Start Copy", command=run_copy, font=("Segoe UI", 12), bg="white").grid(row=3, column=0, columnspan=2, pady=8)
tk.Button(main_frame, text="Clear Log", command=clear_log, font=("Segoe UI", 12), bg="white").grid(row=3, column=2, columnspan=2, pady=8)

tk.Label(main_frame, text="Log Output:", bg="white", font=("Segoe UI", 13)).grid(row=4, column=0, sticky="nw", pady=(10, 0))
log_text = scrolledtext.ScrolledText(main_frame, width=70, height=10, state="disabled", font=("Consolas", 10), bg="#f7fbff", fg="#333333")
log_text.grid(row=5, column=0, columnspan=4, padx=0, pady=5, sticky="nsew")

main_frame.columnconfigure(1, weight=1)
main_frame.columnconfigure(3, weight=1)
main_frame.rowconfigure(5, weight=1)

sys.stdout = TextRedirector(log_text)

root.mainloop()