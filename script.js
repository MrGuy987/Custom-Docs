    const editor = document.getElementById('editor');
    const placeholder = document.getElementById('placeholder');

    editor.addEventListener('focus', () => {
      if (placeholder) placeholder.remove();
    });

    function format(command) {
      document.execCommand(command, false, null);
    }

    function createLink() {
      const url = prompt("Enter URL:");
      if (url) document.execCommand('createLink', false, url);
    }

    function setFont(font) {
      document.execCommand('fontName', false, font);
    }

    function applyStyle(style, value) {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      const span = document.createElement('span');
      span.style[style] = value;
      span.appendChild(range.extractContents());
      range.deleteContents();
      range.insertNode(span);
      // Move cursor to end of selection
      sel.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      newRange.collapse(false);
      sel.addRange(newRange);
    }

    function savePDF() {
      window.print();
    }