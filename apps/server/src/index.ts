import app from "./app.ts";

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✍️  Server listenting on http://localhost:${PORT}…`);
});
