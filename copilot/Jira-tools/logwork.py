import argparse
import sys
from datetime import datetime
import os
from shared.excel import outputExcel, inputExcel

parser = argparse.ArgumentParser()
now = datetime.now()

parser = argparse.ArgumentParser()
parser.add_argument("--year", type=int, default=now.year, help="统计年份，默认为今年")
parser.add_argument("--month", type=int, default=now.month, help="统计月份，默认为本月")
parser.add_argument(
    "--input", type=str, help="读取本地Excel文件路径，默认当前_logworks目录"
)
parser.add_argument("--output", action="store_true", help="生成logworkExcel日历")
args = parser.parse_args()

if not args.input:
    # timestamp = datetime.now().strftime("%H%M%S")
    args.input = f"_logworks/logworks_{args.year}_{args.month}.xlsx"

logworks_dir = os.path.dirname(args.input)
if logworks_dir and not os.path.exists(logworks_dir):
    os.makedirs(logworks_dir)


if args.output:
    outputExcel(args.year, args.month, args.input)
elif args.input:
    inputExcel(args.year, args.month, args.input)
else:
    print("⚠️ 请指定 --input 读取本地Excel，或使用 --output 生成Excel文件")
    sys.exit(1)
