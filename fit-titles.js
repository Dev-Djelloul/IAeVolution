
export function initFitTitles() {
const fitTitles = Array.from(document.querySelectorAll("h1, h2")).filter((title) => title.id !== "compass-title");
const fitTitle = (title) => {
  title.style.fontSize = "";
  let size = parseFloat(getComputedStyle(title).fontSize);
  while (title.scrollWidth > title.clientWidth + 1 && size > 14) {
    size -= 1;
    title.style.fontSize = `${size}px`;
  }
};
const fitAllTitles = () => fitTitles.forEach(fitTitle);
fitTitles.forEach((title) => title.classList.add("fit-title"));
fitAllTitles();
window.addEventListener("resize", fitAllTitles);
document.fonts?.ready.then(fitAllTitles);
const fitObserver = new MutationObserver((records) => {
  fitObserver.disconnect();
  records.forEach((record) => fitTitle(record.target.closest?.("h1, h2") || record.target.parentElement.closest("h1, h2")));
  fitTitles.forEach((title) => fitObserver.observe(title, { childList: true, characterData: true, subtree: true }));
});
fitTitles.forEach((title) => fitObserver.observe(title, { childList: true, characterData: true, subtree: true }));
}
