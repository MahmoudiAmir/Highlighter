const highlightBtn = document.getElementById("highlight-btn");




function checkSelection() {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length) {

      
        const highlightBtnWidth = Number(getComputedStyle(highlightBtn).width.slice(0, -2));
        const highlightBtnHeight = Number(getComputedStyle(highlightBtn).height.slice(0, -2));

        highlightBtn.style.left = `${event.pageX - highlightBtnWidth * 0.5}px`;
        highlightBtn.style.top = `${event.pageY - highlightBtnHeight * 1.25}px`;
        
        highlightBtn.style.display = "block";
        highlightBtn.classList.add("btnEntrance");
    } else {
        highlightBtn.style.display = "none";
        highlightBtn.classList.remove("btnEntrance");
    }
}
document.addEventListener("mouseup", checkSelection);

//refrence: https://www.youtube.com/watch?v=HOrViIclSjw



function highlightSelectedText() {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i);
            const span = document.createElement("span");
            span.classList.add("highlighted-text");

            const highlightColor = document.getElementById("highlight-color").value;

            span.style.backgroundColor = highlightColor;
            span.style.color = "black";

            const existingHighlights = document.querySelectorAll('.highlighted-text');
            existingHighlights.forEach((highlight) => {
                highlight.replaceWith(...highlight.childNodes);
            });

            // Check if the selection spans across different paragraphs
            if (range.startContainer.parentElement.tagName.toLowerCase() === 'p' &&
                range.endContainer.parentElement.tagName.toLowerCase() === 'p' &&
                range.startContainer.parentElement !== range.endContainer.parentElement) {
                // If the selection spans across paragraphs, wrap each paragraph individually
                const startParagraph = range.startContainer.parentElement;
                const endParagraph = range.endContainer.parentElement;

                const startRange = document.createRange();
                startRange.setStart(range.startContainer, range.startOffset);
                startRange.setEnd(startParagraph.childNodes[startParagraph.childNodes.length - 1], startParagraph.childNodes[startParagraph.childNodes.length - 1].length);

                const endRange = document.createRange();
                endRange.setStart(endParagraph.childNodes[0], 0);
                endRange.setEnd(range.endContainer, range.endOffset);

                const startContents = startRange.extractContents();
                const endContents = endRange.extractContents();

                const startSpan = document.createElement("span");
                startSpan.classList.add("highlighted-text");
                startSpan.style.backgroundColor = highlightColor;
                startSpan.style.color = "black";
                startSpan.appendChild(startContents);
                startRange.insertNode(startSpan);

                const endSpan = document.createElement("span");
                endSpan.classList.add("highlighted-text");
                endSpan.style.backgroundColor = highlightColor;
                endSpan.style.color = "black";
                endSpan.appendChild(endContents);
                endRange.insertNode(endSpan);
            } else {
                // If the selection is within a single paragraph, or spans within the same paragraph, wrap the selection with the span
                range.surroundContents(span);
            }
        }

        selection.removeAllRanges();
    }

    highlightBtn.style.display = "none";
    highlightBtn.classList.remove("btnEntrance");
}
highlightBtn.addEventListener("click", highlightSelectedText);





// document.getElementById("highlight-btn").addEventListener("click", function () {
//     const highlightColor = document.getElementById("highlight-color").value;
  
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "highlightText", highlightColor });
//     });
//   });
