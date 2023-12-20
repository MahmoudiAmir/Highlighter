const tagBox = document.querySelector(".tag");
const highlightBtn = document.getElementById("highlight-btn");
const box = document.getElementById("boxup");





function checkSelection() {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length) {
    const highlightBtnWidth = Number(
      getComputedStyle(highlightBtn).width.slice(0, -2)
    );
    const highlightBtnHeight = Number(
      getComputedStyle(highlightBtn).height.slice(0, -2)
    );

    highlightBtn.style.left = `${event.pageX - highlightBtnWidth * 0.5}px`;
    highlightBtn.style.top = `${event.pageY - highlightBtnHeight * 1.25}px`;

    highlightBtn.style.display = "block";
    highlightBtn.classList.add("btnEntrance");
    isTextHighlighted = true;
  } else {
    highlightBtn.style.display = "none";
    highlightBtn.classList.remove("btnEntrance");
    isTextHighlighted = false;
  }
}
document.addEventListener("mouseup", checkSelection);



function openTagPanel(event) {
  const rect = event.target.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  tagBox.style.display = "block";
  tagBox.style.top = rect.top + scrollTop + "px";

}




function closeTagPanel() {
  tagBox.style.display = "none";
}
tagBox.addEventListener("mouseleave", closeTagPanel);






document.addEventListener("DOMContentLoaded", function () {
  const editCardMenu = document.getElementById("editCardMenu");
  const highlightedSpans = []; // آرایه برای نگه‌داری span های هایلایت شده

  function highlightText() {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const highlightColor = document.getElementById("highlight-color").value;

      // Iterate over the selected ranges
      for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i);

        // Create a span for each paragraph and wrap the content
        const span = document.createElement("span");
        span.className = "highlighted-text";
        span.style.backgroundColor = highlightColor;

        const clonedRange = range.cloneRange();
        clonedRange.surroundContents(span);
        span.addEventListener("click" , openTagPanel);

        // Store the highlight color in a data attribute
        span.dataset.highlightColor = highlightColor;

        // Add the span to the array
        highlightedSpans.push(span);
      }

      // Clear the selection after highlighting
      selection.removeAllRanges();
    }
  }

  function showEditCardMenu(highlightedText) {
    const topPosition = highlightedText.getBoundingClientRect().top + window.scrollY;
    editCardMenu.style.display = "block";
    editCardMenu.style.top = topPosition - editCardMenu.offsetHeight + "px";
    editCardMenu.style.left = highlightedText.getBoundingClientRect().left + "px";

    // Hide editCardMenu when clicking outside of it
    document.addEventListener("click", hideEditCardMenu);
  }

  function hideEditCardMenu(event) {
    editCardMenu.style.display = "none";
    document.removeEventListener("click", hideEditCardMenu);
  }

  // Add contextmenu event to highlighted texts
  document.addEventListener("contextmenu", function (event) {
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

  highlightBtn.addEventListener("click", highlightText);
});




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
