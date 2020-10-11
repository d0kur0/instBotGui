document.addEventListener("click", ({ target }) => {
  if (!target.hasAttribute("data-href")) return;
  const { shell } = require("electron");
  shell.openExternal(target.getAttribute("data-href")).catch(console.error);
});
