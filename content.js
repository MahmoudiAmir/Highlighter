chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "highlightText") {
    const highlightColor = request.highlightColor;
    const selection = window.getSelection();

    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(i);
      const span = document.createElement("span");
      span.classList.add("highlighted-text");

      span.style.backgroundColor = highlightColor;
      span.style.color = "black";

      // Create a fragment to hold the contents of the range
      const fragment = range.cloneContents();
      span.appendChild(fragment);

      // Replace the contents of the range with the span
      range.deleteContents();
      range.insertNode(span);
    }

    selection.removeAllRanges();
  }
});