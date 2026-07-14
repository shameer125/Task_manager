import http from "http";
const app = (await import("./server.js")).default;
const server = http.createServer(app);

server.listen(0, "127.0.0.1", async () => {
  const port = server.address().port;
  console.log("PORT", port);
  try {
    const root = await fetch(`http://127.0.0.1:${port}/`);
    console.log("ROOT STATUS", root.status);
    console.log("ROOT BODY", (await root.text()).slice(0, 200));

    const tasks = await fetch(`http://127.0.0.1:${port}/api/tasks`);
    console.log("TASKS STATUS", tasks.status);
    console.log("TASKS BODY", (await tasks.text()).slice(0, 200));
  } catch (error) {
    console.error("ERROR", error);
    process.exit(1);
  } finally {
    server.close();
  }
});
