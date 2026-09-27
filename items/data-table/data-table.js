// Dependency-free sorting and select-all for tables marked data-sortable.
document.querySelectorAll(".uif-table[data-sortable]").forEach((table) => {
  const tbody = table.querySelector("tbody");

  table.querySelectorAll("th button").forEach((button) => {
    button.addEventListener("click", () => {
      const th = button.closest("th");
      const index = [...th.parentNode.children].indexOf(th);
      const descending = th.getAttribute("aria-sort") === "ascending";

      table.querySelectorAll("th").forEach((other) => other.removeAttribute("aria-sort"));
      th.setAttribute("aria-sort", descending ? "descending" : "ascending");

      const rows = [...tbody.querySelectorAll("tr")];
      rows.sort((a, b) => {
        const av = a.children[index].textContent.trim();
        const bv = b.children[index].textContent.trim();
        const cmp = av.localeCompare(bv, undefined, { numeric: true });
        return descending ? -cmp : cmp;
      });
      rows.forEach((row) => tbody.append(row));
    });
  });

  const all = table.querySelector("th input[type='checkbox']");
  if (all) {
    all.addEventListener("change", () => {
      table.querySelectorAll("tbody input[type='checkbox']").forEach((box) => {
        box.checked = all.checked;
      });
    });
  }
});
