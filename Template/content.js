const tagBox = document.getElementById("tagpanel");
const highlightBtn = document.getElementById("highlight-btn");
const box = document.getElementById("boxup");
const tagBoxquit = document.getElementById('quitt');

// const editCardMenu = document.getElementById("editCardMenu");



document.addEventListener("DOMContentLoaded", function () {



function checkSelection() {
  const selectedText = window.getSelection().toString().trim();
  const highlightBtn = document.getElementById('highlight-btn'); // جایگزینی 'yourHighlightBtnId' با شناسه صحیح المان

  if (highlightBtn && selectedText.length) {
    const highlightBtnWidth = Number(getComputedStyle(highlightBtn).width.slice(0, -2));
    const highlightBtnHeight = Number(getComputedStyle(highlightBtn).height.slice(0, -2));

    highlightBtn.style.left = `${event.pageX - highlightBtnWidth * 0.5}px`;
    highlightBtn.style.top = `${event.pageY - highlightBtnHeight * 1.25}px`;

    highlightBtn.style.display = "block";
    highlightBtn.classList.add("btnEntrance");
  } else if (highlightBtn) {
    highlightBtn.style.display = "none";
    highlightBtn.classList.remove("btnEntrance");
  }
}

document.addEventListener("mouseup", checkSelection);


//refrence: https://www.youtube.com/watch?v=HOrViIclSjw



function openTagPanel(event) {
  const rect = event.target.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  tagBox.style.display = "block";
  tagBox.style.top = rect.top + scrollTop + "px";

}



function closeTagPanel() {
  if (tagBoxquit) {
      tagBox.style.display = "none";
  }
}

if (tagBoxquit) {
  tagBoxquit.addEventListener("click", closeTagPanel);
}
  
  












function highlightSelectedText() {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
      const highlightColor = document.getElementById("highlight-color").value;

      for (let i = 0; i < selection.rangeCount; i++) {
          const range = selection.getRangeAt(i);

          const existingHighlights = document.querySelectorAll('.highlighted-text');

          existingHighlights.forEach((highlight) => {
              const highlightRange = document.createRange();
              highlightRange.selectNodeContents(highlight);

              // مقایسه مرزهای دو Range
              if (
                  range.compareBoundaryPoints(Range.START_TO_START, highlightRange) <= 0 &&
                  range.compareBoundaryPoints(Range.END_TO_END, highlightRange) >= 0
              ) {
                  highlight.style.backgroundColor = highlightColor;
              }
          });

          // Check if the selection spans across different paragraphs
          if (
              range.startContainer.parentElement.tagName.toLowerCase() === 'p' &&
              range.endContainer.parentElement.tagName.toLowerCase() === 'p' &&
              range.startContainer.parentElement !== range.endContainer.parentElement
          ) {
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
              endSpan.addEventListener("click", openTagPanel);

          } else {
              // If the selection is within a single paragraph, or spans within the same paragraph, wrap the selection with the span
              const span = document.createElement("span");
              span.classList.add("highlighted-text");
              span.style.backgroundColor = highlightColor;
              span.style.color = "black";
              range.surroundContents(span);
              span.addEventListener("click", openTagPanel);

          }
      }

      selection.removeAllRanges();
  }
}


highlightBtn.addEventListener("click", highlightSelectedText);














  // const highlightedSpans = []; // آرایه برای نگه‌داری span های هایلایت شده

  // function highlightText() {
  //   const selection = window.getSelection();

  //   if (selection.rangeCount > 0) {
  //     const highlightColor = document.getElementById("highlight-color").value;

  //     // Iterate over the selected ranges
  //     for (let i = 0; i < selection.rangeCount; i++) {
  //       const range = selection.getRangeAt(i);

  //       // Create a span for each paragraph and wrap the content
  //       const span = document.createElement("span");
  //       span.className = "highlighted-text";
  //       span.style.backgroundColor = highlightColor;

  //       const clonedRange = range.cloneRange();
  //       clonedRange.surroundContents(span);

  //       span.addEventListener("click", openTagPanel);

        
  //       // Store the highlight color in a data attribute
  //       span.dataset.highlightColor = highlightColor;

  //       // Add the span to the array
  //       highlightedSpans.push(span);
  //     }

  //     // Clear the selection after highlighting
  //     selection.removeAllRanges();
  //   }
  // }



  // function showEditCardMenu(highlightedText) {
  //   const topPosition = highlightedText.getBoundingClientRect().top + window.scrollY;
  //   editCardMenu.style.display = "block";
  //   editCardMenu.style.top = topPosition - editCardMenu.offsetHeight + "px";
  //   editCardMenu.style.left = highlightedText.getBoundingClientRect().left + "px";
  // }

  // function hideEditCardMenu() {
  //   editCardMenu.style.display = "none";
  // }



  document.addEventListener("click", function (event) {
    const highlightedText = document.elementFromPoint(event.clientX, event.clientY);

    if (highlightedText && highlightedText.classList.contains("highlighted-text")) {
      showEditCardMenu(highlightedText);
    } else {
      editCardMenu.style.display = "none";
    }
  });

  // Add event listeners for color options
  const colorSections = document.querySelectorAll(".colorbox section");
  colorSections.forEach(function (colorSection) {
    colorSection.addEventListener("click", function () {
      const highlightedText = document.querySelector(".highlighted-text");

      if (highlightedText) {
        const color = this.classList[0]; // Assuming the first class is the color class
        highlightedText.style.backgroundColor = color;
        highlightedText.dataset.highlightColor = color;
        hideEditCardMenu();
      }
    });
  });

  highlightBtn.addEventListener("click", highlightSelectedText);







function showBox(event) {
  box.style.display = "block";
  const highlightBtnRect = highlightBtn.getBoundingClientRect();
  const boxLeft = highlightBtnRect.left + window.scrollX;
  const boxTop = highlightBtnRect.top + window.scrollY - box.offsetHeight;
  box.style.left = `${boxLeft}px`;
  box.style.top = `${boxTop}px`;
}
highlightBtn.addEventListener("mouseover", showBox);



function hideBox() {
  setTimeout(() => {
    if (!box.matches(":hover")) {
      box.style.display = "none";
    }
  }, 200);
}
highlightBtn.addEventListener("mouseleave", hideBox);
document.addEventListener("click", hideBox);



})