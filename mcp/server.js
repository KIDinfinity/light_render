// server.js
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
//host把有哪些context（工具）注入给模型
// 大模型只会在「已注入的 Context 能力集合」和「User Prompt」的约束下进行推理，
// 决定“用哪些能力、以什么顺序、给出什么参数”；
// 然后把这些“能力使用意图”交给 Client，
// 由 Client 按协议（JSON-RPC）调度到对应的 MCP Server 执行。
function handleRequest(req) {
    if (req.method === "list_tools") {
        return {
            jsonrpc: "2.0",
            id: req.id,
            result: [
                {
                    name: "get_sales",
                    description: "Return mock sales data"
                }
            ]
        };
    }

    if (req.method === "call_tool") {
        if (req.params.name === "get_sales") {
            return {
                jsonrpc: "2.0",
                id: req.id,
                result: {
                    Q1: 1000,
                    Q2: 920
                }
            };
        }
    }

    return {
        jsonrpc: "2.0",
        id: req.id,
        error: {
            code: -32601,
            message: "Method not found"
        }
    };
}

rl.on("line", (line) => {
    const request = JSON.parse(line);
    const response = handleRequest(request);
    process.stdout.write("测试" + JSON.stringify(response) + "\n");
});