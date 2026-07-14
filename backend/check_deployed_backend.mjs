(async () => {
  const base = "https://task-manager-backend-three-hazel.vercel.app";
  for (const path of ["/", "/api/tasks"]) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(base + path, { signal: controller.signal });
      clearTimeout(id);
      const text = await res.text();
      console.log(path, "STATUS", res.status);
      console.log(path, "BODY", text.slice(0, 500));
    } catch (err) {
      console.error(path, "ERROR", err.message);
    }
  }
})();
