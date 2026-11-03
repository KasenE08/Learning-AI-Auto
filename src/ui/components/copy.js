// Copy text to the clipboard, falling back to selecting it so it can be copied by hand.
export async function copyText(text, fallbackEl) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (fallbackEl) {
      const r = document.createRange();
      r.selectNodeContents(fallbackEl);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
    return false;
  }
}
