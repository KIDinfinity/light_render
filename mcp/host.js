// host.js
const { spawn } = require("child_process");

const server = spawn("node", ["server.js"]);

server.stdout.on("data", (data) => {
    console.log("← Response:", data.toString());
});

function sendRPC(method, params, id = 1) {
    const request = {
        jsonrpc: "2.0",
        id,
        method,
        params: params || {}
    };

    console.log("→ Request:", request);

    server.stdin.write(JSON.stringify(request) + "\n");
}

// 1️⃣ 列出工具
setTimeout(() => {
    sendRPC("list_tools", {}, 1);
}, 500);

// 2️⃣ 调用工具
setTimeout(() => {
    sendRPC("call_tool", { name: "get_sales" }, 2);
}, 1000);