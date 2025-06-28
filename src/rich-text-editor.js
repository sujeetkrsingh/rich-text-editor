document.addEventListener('DOMContentLoaded', function () {
  const TOOLBAR_TOOL_MAP = {
    // Undo/Redo
    'undo': { cmd: 'undo', icon: '<i class="fa-solid fa-rotate-left"></i>', title: 'Undo' },
    'redo': { cmd: 'redo', icon: '<i class="fa-solid fa-rotate-right"></i>', title: 'Redo' },
    'separator': 'separator',
    // Font style
    'bold': { cmd: 'bold', icon: '<i class="fa-solid fa-bold"></i>', title: 'Bold' },
    'italic': { cmd: 'italic', icon: '<i class="fa-solid fa-italic"></i>', title: 'Italic' },
    'underline': { cmd: 'underline', icon: '<i class="fa-solid fa-underline"></i>', title: 'Underline' },
    'strikethrough': { cmd: 'strikethrough', icon: '<i class="fa-solid fa-strikethrough"></i>', title: 'Strikethrough' },
    'superscript': { cmd: 'superscript', icon: '<i class="fa-solid fa-superscript"></i>', title: 'Superscript' },
    'subscript': { cmd: 'subscript', icon: '<i class="fa-solid fa-subscript"></i>', title: 'Subscript' },
    'separator': 'separator',
    // Font family
    'fontName': { cmd: 'fontName', icon: '<i class="fa-solid fa-font"></i>', title: 'Font', dropdown: [
      { label: 'Font', value: '' },
      { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
      { label: 'Courier New', value: '"Courier New", Courier, monospace' },
      { label: 'Georgia', value: 'Georgia, serif' },
      { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
      { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' }
    ] },
    // Font size
    'fontSize': {
      cmd: 'fontSize', icon: '<i class="fa-solid fa-text-height"></i>', title: 'Font Size', dropdown: [
        { label: 'Size', value: '' },
        { label: '8pt', value: '1' },
        { label: '10pt', value: '2' },
        { label: '12pt', value: '3' },
        { label: '14pt', value: '4' },
        { label: '18pt', value: '5' },
        { label: '24pt', value: '6' },
        { label: '36pt', value: '7' }
      ]
    },
    'separator': 'separator',
    // Color
    foreColor: {
      cmd: 'foreColor',
      icon: '<i class="fa-solid fa-font"></i>',
      title: 'Text Color',
      color: true
    },
    hiliteColor: {
      cmd: 'hiliteColor',
      icon: '<i class="fa-solid fa-highlighter"></i>',
      title: 'Highlight',
      color: true
    },
    'separator': 'separator',
    // Alignment
    'justifyLeft': { cmd: 'justifyLeft', icon: '<i class="fa-solid fa-align-left"></i>', title: 'Align Left' },
    'justifyCenter': { cmd: 'justifyCenter', icon: '<i class="fa-solid fa-align-center"></i>', title: 'Align Center' },
    'justifyRight': { cmd: 'justifyRight', icon: '<i class="fa-solid fa-align-right"></i>', title: 'Align Right' },
    'justifyFull': { cmd: 'justifyFull', icon: '<i class="fa-solid fa-align-justify"></i>', title: 'Justify' },
    'separator': 'separator',
    // Indent/Outdent
    'outdent': { cmd: 'outdent', icon: '<i class="fa-solid fa-outdent"></i>', title: 'Outdent' },
    'indent': { cmd: 'indent', icon: '<i class="fa-solid fa-indent"></i>', title: 'Indent' },
    'separator': 'separator',
    // Lists
    'insertUnorderedList': { cmd: 'insertUnorderedList', icon: '<i class="fa-solid fa-list-ul"></i>', title: 'Bullet List' },
    'insertOrderedList': { cmd: 'insertOrderedList', icon: '<i class="fa-solid fa-list-ol"></i>', title: 'Numbered List' },
    'separator': 'separator',
    // Format block
    'formatBlock': { cmd: 'formatBlock', icon: '<i class="fa-solid fa-heading"></i>', title: 'Format', dropdown: [
      { label: 'Format', value: '' },
      { label: 'Paragraph', value: 'P' },
      { label: 'Heading 1', value: 'H1' },
      { label: 'Heading 2', value: 'H2' },
      { label: 'Heading 3', value: 'H3' },
      { label: 'Heading 4', value: 'H4' },
      { label: 'Heading 5', value: 'H5' },
      { label: 'Heading 6', value: 'H6' },
      { label: 'Pre', value: 'PRE' },
      { label: 'Blockquote', value: 'BLOCKQUOTE' }
    ] },
    'separator': 'separator',
    // Links & images
    'createLink': { cmd: 'createLink', icon: '<i class="fa-solid fa-link"></i>', title: 'Insert Link' },
    'unlink': { cmd: 'unlink', icon: '<i class="fa-solid fa-unlink"></i>', title: 'Remove Link' },
    'insertImage': { cmd: 'insertImage', icon: '<i class="fa-solid fa-image"></i>', title: 'Insert Image' },
    'separator': 'separator',
    // Remove formatting
    'removeFormat': { cmd: 'removeFormat', icon: '<i class="fa-solid fa-eraser"></i>', title: 'Remove Format' },
    'source': { cmd: 'source', icon: '<i class="fa-solid fa-code"></i>', title: 'Source Code' },
    // Tables, special characters, emojis, fullscreen, preview, print, datetime
    'table': { cmd: 'table', icon: '<i class="fa-solid fa-table"></i>', title: 'Insert Table' },
    'specialChar': { cmd: 'specialChar', icon: '<i class="fa-solid fa-asterisk"></i>', title: 'Insert Special Character' },
    'emoji': { cmd: 'emoji', icon: '<i class="fa-solid fa-face-smile"></i>', title: 'Insert Emoji' },
    'fullscreen': { cmd: 'fullscreen', icon: '<i class="fa-solid fa-expand"></i>', title: 'Toggle Full Screen' },
    'preview': { cmd: 'preview', icon: '<i class="fa-solid fa-eye"></i>', title: 'Preview' },
    'print': { cmd: 'print', icon: '<i class="fa-solid fa-print"></i>', title: 'Print' },
    'datetime': { cmd: 'datetime', icon: '<i class="fa-solid fa-clock"></i>', title: 'Insert Date/Time' },
    'help': { cmd: 'help', icon: '<i class="fa-solid fa-circle-question"></i>', title: 'Editor Help / Shortcuts' }
  };

const DEFAULT_TOOLBAR = [
    'formatBlock', 'fontName', 'fontSize', 'separator',
    'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'separator',
    'undo', 'redo', 'separator',
    'foreColor', 'hiliteColor', 'separator',
    'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'separator',
    'outdent', 'indent', 'separator',
    'insertUnorderedList', 'insertOrderedList', 'separator',
    'createLink', 'unlink', 'insertImage', 'separator',
    'table', 'specialChar', 'emoji', 'fullscreen', 'preview', 'print', 'datetime', 'separator', 
    'removeFormat', 'source', 'help'
  ];


  // Keyboard shortcuts mapping (Windows/Linux and Mac)
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const RTE_SHORTCUTS = [
    { keys: isMac ? '⌘+B' : 'Ctrl+B', desc: 'Bold', cmd: 'bold' },
    { keys: isMac ? '⌘+I' : 'Ctrl+I', desc: 'Italic', cmd: 'italic' },
    { keys: isMac ? '⌘+U' : 'Ctrl+U', desc: 'Underline', cmd: 'underline' },
    { keys: isMac ? '⌘+Z' : 'Ctrl+Z', desc: 'Undo', cmd: 'undo' },
    { keys: isMac ? '⌘+Y' : 'Ctrl+Y', desc: 'Redo', cmd: 'redo' },
    { keys: isMac ? '⌘+L' : 'Ctrl+L', desc: 'Insert Link', cmd: 'createLink' },
    { keys: isMac ? '⌘+K' : 'Ctrl+K', desc: 'Insert Link', cmd: 'createLink' },
    { keys: isMac ? '⌘+Shift+S' : 'Ctrl+Shift+S', desc: 'Source Code Mode', cmd: 'source' },
    { keys: isMac ? '⌘+Shift+F' : 'Ctrl+Shift+F', desc: 'Full Screen', cmd: 'fullscreen' },
    { keys: isMac ? '⌘+Shift+P' : 'Ctrl+Shift+P', desc: 'Preview', cmd: 'preview' },
    { keys: isMac ? '⌘+Shift+T' : 'Ctrl+Shift+T', desc: 'Insert Table', cmd: 'table' },
    { keys: isMac ? '⌘+Shift+E' : 'Ctrl+Shift+E', desc: 'Insert Emoji', cmd: 'emoji' },
    { keys: isMac ? '⌘+Shift+C' : 'Ctrl+Shift+C', desc: 'Insert Special Character', cmd: 'specialChar' },
    { keys: isMac ? '⌘+Shift+D' : 'Ctrl+Shift+D', desc: 'Insert Date/Time', cmd: 'datetime' },
    { keys: isMac ? '⌘+Shift+R' : 'Ctrl+Shift+R', desc: 'Remove Format', cmd: 'removeFormat' },
    { keys: isMac ? '⌘+P' : 'Ctrl+P', desc: 'Print', cmd: 'print' }
  ];

  // Show help modal with shortcuts
  function showHelpModal(editableDiv) {
    document.querySelectorAll('.rte-modal-overlay').forEach(el => el.remove());
    const overlay = document.createElement('div');
    overlay.className = 'rte-modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'rte-modal';
    modal.style.maxWidth = '500px';
    modal.innerHTML = `<h3>Editor Shortcuts &amp; Help</h3>
      <div style="max-height:300px;overflow:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr><th style="text-align:left;padding:4px 8px;">Shortcut</th><th style="text-align:left;padding:4px 8px;">Action</th></tr>
          </thead>
          <tbody>
            ${RTE_SHORTCUTS.map(s => `<tr><td style="padding:4px 8px;"><kbd>${s.keys}</kbd></td><td style="padding:4px 8px;">${s.desc}</td></tr>`).join('')}
          </tbody>
        </table>
        <div style="margin-top:1em;font-size:0.97em;color:#64748b;">
          <b>Tip:</b> Click the <i class="fa-solid fa-code"></i> icon for source mode, <i class="fa-solid fa-expand"></i> for full screen, <i class="fa-solid fa-eye"></i> for preview, <i class="fa-solid fa-table"></i> for table, <i class="fa-solid fa-face-smile"></i> for emoji, <i class="fa-solid fa-asterisk"></i> for special character, <i class="fa-solid fa-clock"></i> for date/time, <i class="fa-solid fa-print"></i> for print.
        </div>
      </div>
      <div class="rte-modal-actions">
        <button type="button" class="rte-cancel">Close</button>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    modal.querySelector('.rte-cancel').onclick = () => { overlay.remove(); editableDiv && editableDiv.focus(); };
  }

  // Support per-selector toolbar config
  function getToolbarConfigForElement(textarea) {
    if (window.RichTextEditorConfig) {
      // If config is an object with selectors, check for a match
      for (const selector in window.RichTextEditorConfig) {
        if (selector === 'toolbar') continue;
        if (textarea.matches(selector)) {
          return window.RichTextEditorConfig[selector];
        }
      }
      // Fallback to global toolbar config
      if (Array.isArray(window.RichTextEditorConfig.toolbar)) {
        return window.RichTextEditorConfig.toolbar;
      }
    }
    // Default toolbar
    return DEFAULT_TOOLBAR;
  }

  function createToolbar(onCommand, toolbarConfig) {
    const toolbar = document.createElement('div');
    toolbar.className = 'rich-text-editor-toolbar';
    toolbarConfig.forEach(toolKey => {
      const btn = TOOLBAR_TOOL_MAP[toolKey];
      if (!btn) return;
      if (btn === 'separator') {
        const sep = document.createElement('span');
        sep.className = 'rte-separator';
        toolbar.appendChild(sep);
        return;
      }
      if (btn.dropdown) {
        const select = document.createElement('select');
        select.title = btn.title;
        select.setAttribute('aria-label', btn.title);
        btn.dropdown.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.label;
          if (btn.cmd === 'fontName' && opt.value) {
            option.style.fontFamily = opt.value;
          }
          select.appendChild(option);
        });
        select.addEventListener('change', function () {
          if (!select.value) return;
          let value = select.value;
          if (btn.cmd === 'formatBlock') value = `<${value}>`;
          onCommand(btn.cmd, value);
          select.selectedIndex = 0;
        });
        toolbar.appendChild(select);
      } else if (btn.color) {
        // Use a wrapper for color input to allow clicking the icon or the color input
        const colorWrapper = document.createElement('span');
        colorWrapper.style.display = 'inline-flex';
        colorWrapper.style.alignItems = 'center';
        colorWrapper.style.gap = '2px';

        // The icon is clickable and triggers the color input
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = btn.icon;
        button.title = btn.title;
        button.setAttribute('aria-label', btn.title);
        button.tabIndex = -1;
        button.style.background = 'none';
        button.style.border = 'none';
        button.style.padding = '0 2px 0 0';
        button.style.cursor = 'pointer';

        const input = document.createElement('input');
        input.type = 'color';
        input.title = btn.title;
        input.setAttribute('aria-label', btn.title);
        input.style.width = '22px';
        input.style.height = '22px';
        input.style.border = 'none';
        input.style.background = 'none';
        input.style.padding = '0';
        input.style.marginLeft = '-8px';
        input.style.cursor = 'pointer';
        input.style.opacity = '0.7';

        // When icon is clicked, trigger color input
        button.addEventListener('click', function (e) {
          e.preventDefault();
          input.click();
        });

        input.addEventListener('input', function () {
          onCommand(btn.cmd, input.value);
        });

        colorWrapper.appendChild(button);
        colorWrapper.appendChild(input);
        toolbar.appendChild(colorWrapper);
      } else {
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = btn.icon;
        button.title = btn.title;
        button.setAttribute('aria-label', btn.title);
        button.dataset.cmd = btn.cmd;
        button.addEventListener('click', function (e) {
        e.preventDefault();
        onCommand(btn.cmd, null, button);
      });
      toolbar.appendChild(button);
    }
  });
  return toolbar;
}

  function syncContent(editableDiv, hiddenTextarea) {
    hiddenTextarea.value = editableDiv.innerHTML;
  }

  function showImageModal(editableDiv, imgEl) {
    // Remove any existing modal
    document.querySelectorAll('.rte-modal-overlay').forEach(el => el.remove());

    const overlay = document.createElement('div');
    overlay.className = 'rte-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'rte-modal';

    const title = document.createElement('h3');
    title.textContent = imgEl ? 'Edit Image' : 'Insert Image';
    modal.appendChild(title);

    // Tabs
    const tabs = document.createElement('div');
    tabs.className = 'rte-tabs';
    const tabLink = document.createElement('div');
    tabLink.className = 'rte-tab active';
    tabLink.textContent = 'Add Link';
    const tabUpload = document.createElement('div');
    tabUpload.className = 'rte-tab';
    tabUpload.textContent = 'Upload Image';
    tabs.appendChild(tabLink);
    tabs.appendChild(tabUpload);
    modal.appendChild(tabs);

    // Tab contents
    const tabContentLink = document.createElement('div');
    tabContentLink.className = 'rte-tab-content active';
    tabContentLink.innerHTML = `
      <label>Image URL</label>
      <input type="text" placeholder="https://example.com/image.png" class="rte-image-url">
      <label>Alt Text</label>
      <input type="text" placeholder="Describe the image" class="rte-image-alt">
      <label>Width (px or %)</label>
      <input type="text" placeholder="auto" class="rte-image-width">
      <label>Height (px or %)</label>
      <input type="text" placeholder="auto" class="rte-image-height">
    `;

    const tabContentUpload = document.createElement('div');
    tabContentUpload.className = 'rte-tab-content';
    tabContentUpload.innerHTML = `
      <label>Upload Image</label>
      <input type="file" accept="image/*" class="rte-image-file">
      <label>Alt Text</label>
      <input type="text" placeholder="Describe the image" class="rte-image-alt">
      <label>Width (px or %)</label>
      <input type="text" placeholder="auto" class="rte-image-width">
      <label>Height (px or %)</label>
      <input type="text" placeholder="auto" class="rte-image-height">
    `;

    modal.appendChild(tabContentLink);
    modal.appendChild(tabContentUpload);

    // Tab switching
    tabLink.addEventListener('click', () => {
      tabLink.classList.add('active');
      tabUpload.classList.remove('active');
      tabContentLink.classList.add('active');
      tabContentUpload.classList.remove('active');
    });
    tabUpload.addEventListener('click', () => {
      tabUpload.classList.add('active');
      tabLink.classList.remove('active');
      tabContentUpload.classList.add('active');
      tabContentLink.classList.remove('active');
    });

    // If editing an image, prefill values
    if (imgEl) {
      tabContentLink.querySelector('.rte-image-url').value = imgEl.src || '';
      tabContentLink.querySelector('.rte-image-alt').value = imgEl.alt || '';
      tabContentLink.querySelector('.rte-image-width').value = imgEl.width ? imgEl.width : (imgEl.style.width || '');
      tabContentLink.querySelector('.rte-image-height').value = imgEl.height ? imgEl.height : (imgEl.style.height || '');
      tabLink.classList.add('active');
      tabUpload.classList.remove('active');
      tabContentLink.classList.add('active');
      tabContentUpload.classList.remove('active');
    }

    // Actions
    const actions = document.createElement('div');
    actions.className = 'rte-modal-actions';

    const btnInsert = document.createElement('button');
    btnInsert.type = 'button';
    btnInsert.textContent = imgEl ? 'Update' : 'Insert';

    const btnCancel = document.createElement('button');
    btnCancel.type = 'button';
    btnCancel.textContent = 'Cancel';
    btnCancel.className = 'rte-cancel';

    let btnRemove = null;
    if (imgEl) {
      btnRemove = document.createElement('button');
      btnRemove.type = 'button';
      btnRemove.textContent = 'Remove';
      btnRemove.className = 'rte-remove';
      btnRemove.style.background = '#ef4444';
      btnRemove.style.color = '#fff';
      btnRemove.style.marginRight = 'auto';
      actions.appendChild(btnRemove);
    }

    actions.appendChild(btnCancel);
    actions.appendChild(btnInsert);
    modal.appendChild(actions);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    setTimeout(() => {
      modal.querySelector('input')?.focus();
    }, 100);

    btnCancel.addEventListener('click', () => {
      overlay.remove();
      editableDiv.focus();
    });

    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        if (imgEl) {
          imgEl.parentNode && imgEl.parentNode.removeChild(imgEl);
        }
        overlay.remove();
        editableDiv.focus();
      });
    }

    btnInsert.addEventListener('click', () => {
      const isLinkTab = tabLink.classList.contains('active');
      const width = modal.querySelector('.rte-tab-content.active .rte-image-width').value.trim();
      const height = modal.querySelector('.rte-tab-content.active .rte-image-height').value.trim();
      const alt = modal.querySelector('.rte-tab-content.active .rte-image-alt').value.trim();

      if (isLinkTab) {
        const url = modal.querySelector('.rte-image-url').value.trim();
        if (url) {
          editableDiv.focus();
          if (imgEl) {
            imgEl.src = url;
            imgEl.alt = alt;
            applyDimension(imgEl, width, height);
          } else {
            // Save and restore selection for correct insert position
            const sel = window.getSelection();
            const range = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
            if (range) {
              sel.removeAllRanges();
              sel.addRange(range);
            }
            document.execCommand('insertImage', false, url);
            const imgs = editableDiv.querySelectorAll('img');
            if (imgs.length) {
              const inserted = imgs[imgs.length - 1];
              if (alt) inserted.alt = alt;
              applyDimension(inserted, width, height);
            }
          }
          overlay.remove();
        }
      } else {
        const fileInput = modal.querySelector('.rte-image-file');
        const file = fileInput.files && fileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            editableDiv.focus();
            if (imgEl) {
              imgEl.src = e.target.result;
              imgEl.alt = alt;
              applyDimension(imgEl, width, height);
            } else {
              // Save and restore selection for correct insert position
              const sel = window.getSelection();
              const range = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
              if (range) {
                sel.removeAllRanges();
                sel.addRange(range);
              }
              document.execCommand('insertImage', false, e.target.result);
              const imgs = editableDiv.querySelectorAll('img');
              if (imgs.length) {
                const inserted = imgs[imgs.length - 1];
                if (alt) inserted.alt = alt;
                applyDimension(inserted, width, height);
              }
            }
            overlay.remove();
          };
          reader.readAsDataURL(file);
        }
      }
      editableDiv.focus();
    });

    // ESC to close
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        overlay.remove();
        editableDiv.focus();
      }
    });
    setTimeout(() => overlay.focus(), 50);

    function applyDimension(el, width, height) {
      // Accept px, %, or auto. If only digits, treat as px.
      if (width) {
        if (/^\d+$/.test(width)) el.style.width = width + 'px';
        else if (/^\d+px$/.test(width) || width.endsWith('%') || width === 'auto') el.style.width = width;
        else el.style.width = width;
      } else {
        el.style.removeProperty('width');
      }
      if (height) {
        if (/^\d+$/.test(height)) el.style.height = height + 'px';
        else if (/^\d+px$/.test(height) || height.endsWith('%') || height === 'auto') el.style.height = height;
        else el.style.height = height;
      } else {
        el.style.removeProperty('height');
      }
    }
  }

  function handleCommand(cmd, value, editableDiv) {
    if (typeof document.execCommand !== 'function') {
      alert('Rich text editing is not supported in this browser.');
      return;
    }
    if (cmd === 'createLink') {
      let url = prompt('Enter URL:', 'https://');
      if (url) document.execCommand('createLink', false, url);
    } else if (cmd === 'insertImage') {
      // Save selection before opening modal
      const selection = window.getSelection();
      const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      showImageModal(editableDiv);

      // Restore selection before inserting image
      const overlay = document.querySelector('.rte-modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', function restoreSelection(e) {
          if (e.target === overlay) {
            overlay.removeEventListener('click', restoreSelection);
            editableDiv.focus();
          }
        });
        overlay.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', function () {
            if (range) {
              editableDiv.focus();
              const sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
            }
          });
        });
      }
    } else if (cmd === 'formatBlock') {
      document.execCommand('formatBlock', false, value);
    } else if (cmd === 'fontName') {
      document.execCommand('fontName', false, value);
    } else if (cmd === 'fontSize') {
      document.execCommand('fontSize', false, value);
    } else if (cmd === 'foreColor' || cmd === 'hiliteColor') {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand(cmd, false, null);
    }
    editableDiv && editableDiv.focus();
  }

  function showTableModal(editableDiv) {
    // Simple modal for table insertion
    document.querySelectorAll('.rte-modal-overlay').forEach(el => el.remove());
    const overlay = document.createElement('div');
    overlay.className = 'rte-modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'rte-modal';
    modal.innerHTML = `
      <h3>Insert Table</h3>
      <label>Rows</label>
      <input type="number" min="1" max="20" value="2" class="rte-table-rows">
      <label>Columns</label>
      <input type="number" min="1" max="10" value="2" class="rte-table-cols">
      <div class="rte-modal-actions">
        <button type="button" class="rte-cancel">Cancel</button>
        <button type="button" class="rte-insert">Insert</button>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    modal.querySelector('.rte-cancel').onclick = () => { overlay.remove(); editableDiv.focus(); };
    modal.querySelector('.rte-insert').onclick = () => {
      const rows = Math.max(1, parseInt(modal.querySelector('.rte-table-rows').value, 10) || 2);
      const cols = Math.max(1, parseInt(modal.querySelector('.rte-table-cols').value, 10) || 2);
      let html = '<table style="border-collapse:collapse;width:100%">';
      for (let r = 0; r < rows; ++r) {
        html += '<tr>';
        for (let c = 0; c < cols; ++c) {
          html += `<td style="border:1px solid #ccc;padding:4px;">&nbsp;</td>`;
        }
        html += '</tr>';
      }
      html += '</table><br>';
      editableDiv.focus();
      document.execCommand('insertHTML', false, html);
      overlay.remove();
      editableDiv.focus();
    };
  }

  function showSpecialCharModal(editableDiv) {
    // Simple modal for special characters
    document.querySelectorAll('.rte-modal-overlay').forEach(el => el.remove());
    const chars = ['©','®','™','§','¶','•','–','—','±','÷','×','°','µ','¿','¡','¢','£','¥','€','₩','₽','₨','₩','₦','₴','₱','₲','₡','₵','₸','₺','₽','₿','∞','≠','≈','≤','≥','∑','∏','∫','√','∇','∂','∈','∉','∋','∏','∑','∗','∧','∨','∩','∪','∴','∵','∼','≅','≡','⊂','⊃','⊆','⊇','⊕','⊗','⊥','⋅','⋆','⋈','⋉','⋊','⋋','⋌','⋍','⋎','⋏','⋐','⋑','⋒','⋓','⋔','⋕','⋖','⋗','⋘','⋙','⋚','⋛','⋜','⋝','⋞','⋟','⋠','⋡','⋢','⋣','⋤','⋥','⋦','⋧','⋨','⋩','⋪','⋫','⋬','⋭','⋮','⋯','⋰','⋱','⋲','⋳','⋴','⋵','⋶','⋷','⋸','⋹','⋺','⋻','⋼','⋽','⋾','⋿'];
    const overlay = document.createElement('div');
    overlay.className = 'rte-modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'rte-modal';
    modal.innerHTML = `<h3>Insert Special Character</h3>
      <div style="display:flex;flex-wrap:wrap;gap:6px;max-width:350px;max-height:180px;overflow:auto;">
        ${chars.map(c => `<button type="button" class="rte-char-btn" style="font-size:1.2em;padding:4px 8px;">${c}</button>`).join('')}
      </div>
      <div class="rte-modal-actions">
        <button type="button" class="rte-cancel">Cancel</button>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    modal.querySelector('.rte-cancel').onclick = () => { overlay.remove(); editableDiv.focus(); };
    modal.querySelectorAll('.rte-char-btn').forEach(btn => {
      btn.onclick = () => {
        editableDiv.focus();
        document.execCommand('insertText', false, btn.textContent);
        overlay.remove();
        editableDiv.focus();
      };
    });
  }

  function showEmojiModal(editableDiv) {
    // Simple emoji picker
    document.querySelectorAll('.rte-modal-overlay').forEach(el => el.remove());
    const emojis = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','😚','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🥴','😇','🥳','🥺','🤠','🤡','🤥','🤫','🤭','🧐','🤓','😈','👿','👹','👺','💀','👻','👽','🤖','💩'];
    const overlay = document.createElement('div');
    overlay.className = 'rte-modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'rte-modal';
    modal.innerHTML = `<h3>Insert Emoji</h3>
      <div style="display:flex;flex-wrap:wrap;gap:6px;max-width:350px;max-height:180px;overflow:auto;">
        ${emojis.map(e => `<button type="button" class="rte-emoji-btn" style="font-size:1.3em;padding:4px 8px;">${e}</button>`).join('')}
      </div>
      <div class="rte-modal-actions">
        <button type="button" class="rte-cancel">Cancel</button>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    modal.querySelector('.rte-cancel').onclick = () => { overlay.remove(); editableDiv.focus(); };
    modal.querySelectorAll('.rte-emoji-btn').forEach(btn => {
      btn.onclick = () => {
        editableDiv.focus();
        document.execCommand('insertText', false, btn.textContent);
        overlay.remove();
        editableDiv.focus();
      };
    });
  }

  function toggleFullScreen(wrapper) {
    if (!document.fullscreenElement) {
      wrapper.requestFullscreen?.();
      wrapper.classList.add('rte-fullscreen');
      document.body.style.overflow = 'hidden';
    } else {
      document.exitFullscreen?.();
      wrapper.classList.remove('rte-fullscreen');
      document.body.style.overflow = '';
    }
  }

  function showPreviewModal(editableDiv) {
    document.querySelectorAll('.rte-modal-overlay').forEach(el => el.remove());
    const overlay = document.createElement('div');
    overlay.className = 'rte-modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'rte-modal';
    modal.style.maxWidth = '900px';
    modal.style.width = '90vw';
    modal.style.maxHeight = '90vh';
    modal.innerHTML = `<h3>Preview</h3>
      <div style="background:#f8fafc;border:1px solid #e5e7eb;padding:1em;min-height:120px;max-height:60vh;overflow:auto;border-radius:6px;">
        ${editableDiv.innerHTML}
      </div>
      <div class="rte-modal-actions">
        <button type="button" class="rte-cancel">Close</button>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    modal.querySelector('.rte-cancel').onclick = () => { overlay.remove(); editableDiv.focus(); };
  }

  function printEditorContent(editableDiv) {
    const win = window.open('', '', 'width=900,height=700');
    win.document.write('<html><head><title>Print</title>');
    win.document.write('<link rel="stylesheet" href="rich-text-editor.css">');
    win.document.write('</head><body>');
    win.document.write(editableDiv.innerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  }

  function insertCurrentDatetime(editableDiv) {
    const now = new Date();
    const str = now.toLocaleString();
    editableDiv.focus();
    document.execCommand('insertText', false, str);
  }

  document.querySelectorAll('textarea.js-rich-text-editor').forEach(function (textarea) {
    textarea.style.display = 'none';

    const wrapper = document.createElement('div');
    wrapper.className = 'rich-text-editor-wrapper';

    let editableDiv = null;
    let isSourceMode = false;
    let sourceWrapper = null;
    let sourceTextarea = null;
    let sourceLines = null;

    // Get per-editor toolbar config
    const toolbarConfig = getToolbarConfigForElement(textarea);

    const toolbar = createToolbar((cmd, value, btnEl) => {
      // --- Fix: Always get the correct editableDiv and wrapper in this closure ---
      // ...existing code...
      if (cmd === 'source') {
        const allToolbarButtons = Array.from(toolbar.children);
        if (!isSourceMode) {
          // Hide all except source/help
          allToolbarButtons.forEach(el => {
            // Show if this is the source or help button (works for both <button> and <span> wrappers)
            let show = false;
            if (el.querySelector) {
              const btn = el.querySelector('button[data-cmd="source"],button[data-cmd="help"]');
              if (btn) show = true;
            }
            if (el.dataset && (el.dataset.cmd === 'source' || el.dataset.cmd === 'help')) show = true;
            el.style.display = show ? '' : 'none';
          });

          // ...existing code for showing source editor...
          sourceWrapper = document.createElement('div');
          sourceWrapper.className = 'rte-source-wrapper';
          sourceLines = document.createElement('div');
          sourceLines.className = 'rte-source-lines';
          sourceWrapper.appendChild(sourceLines);
          sourceTextarea = document.createElement('textarea');
          sourceTextarea.className = 'rte-source-textarea';
          sourceTextarea.value = editableDiv.innerHTML;
          sourceWrapper.appendChild(sourceTextarea);
          editableDiv.style.display = 'none';
          editableDiv.parentNode.insertBefore(sourceWrapper, editableDiv);

          function updateLineNumbers() {
            const lines = sourceTextarea.value.split('\n').length || 1;
            sourceLines.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
          }
          updateLineNumbers();
          sourceTextarea.addEventListener('input', updateLineNumbers);
          sourceTextarea.addEventListener('scroll', function () {
            sourceLines.scrollTop = sourceTextarea.scrollTop;
          });

          sourceTextarea.focus();
          sourceTextarea.setSelectionRange(0, 0);
          sourceTextarea.scrollTop = 0;
          sourceLines.scrollTop = 0;

          isSourceMode = true;
        } else {
          // Show all toolbar buttons
          allToolbarButtons.forEach(el => {
            el.style.display = '';
          });

          editableDiv.innerHTML = sourceTextarea.value;
          editableDiv.style.display = '';
          sourceWrapper.remove();
          sourceWrapper = null;
          sourceTextarea = null;
          sourceLines = null;
          editableDiv.focus();
          isSourceMode = false;
          syncContent(editableDiv, hiddenTextarea);
        }
        return;
      }

      // --- Fix: Always allow these tools to work, even in source mode ---
      if (cmd === 'help') {
        showHelpModal(editableDiv);
        return;
      }
      if (cmd === 'fullscreen') {
        toggleFullScreen(wrapper);
        return;
      }
      if (cmd === 'preview') {
        showPreviewModal(editableDiv);
        return;
      }
      if (cmd === 'table') {
        showTableModal(editableDiv);
        return;
      }
      if (cmd === 'emoji') {
        showEmojiModal(editableDiv);
        return;
      }
      if (cmd === 'specialChar') {
        showSpecialCharModal(editableDiv);
        return;
      }
      if (cmd === 'print') {
        printEditorContent(editableDiv);
        return;
      }
      if (cmd === 'datetime') {
        insertCurrentDatetime(editableDiv);
        return;
      }

      // Only allow editing commands if not in source mode
      if (!isSourceMode) {
        handleCommand(cmd, value, editableDiv);
      }
    }, toolbarConfig);
    wrapper.appendChild(toolbar);

    editableDiv = document.createElement('div');
    editableDiv.className = 'rich-text-editor-content';
    editableDiv.contentEditable = 'true';
    editableDiv.innerHTML = textarea.value;
    wrapper.appendChild(editableDiv);

    const hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.name = textarea.name;
    hiddenTextarea.style.display = 'none';
    hiddenTextarea.value = textarea.value;
    wrapper.appendChild(hiddenTextarea);

    textarea.parentNode.insertBefore(wrapper, textarea.nextSibling);

    editableDiv.addEventListener('input', function () {
      if (!isSourceMode) syncContent(editableDiv, hiddenTextarea);
    });
    editableDiv.addEventListener('blur', function () {
      if (!isSourceMode) syncContent(editableDiv, hiddenTextarea);
    });

    // Create footer for word/char count
    const editorFooter = document.createElement('div');
    editorFooter.className = 'rich-text-editor-footer';
    editorFooter.style.cssText = 'padding: 6px 10px 4px 0; font-size: 0.97em; color: #64748b; text-align: right; background: #f8f8f8; border-top: 1px solid #eee; border-radius: 0 0 6px 6px;';
    wrapper.appendChild(editorFooter);

    function updateEditorFooter() {
      let text = editableDiv.innerText || '';
      // Remove extra whitespace for word count
      let words = text.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean);
      let chars = text.replace(/\s/g, '');
      editorFooter.textContent = `${words.length} word${words.length !== 1 ? 's' : ''} | ${chars.length} character${chars.length !== 1 ? 's' : ''}`;
    }

    editableDiv.addEventListener('input', function () {
      if (!isSourceMode) {
        syncContent(editableDiv, hiddenTextarea);
        updateToolbarState();
        updateEditorFooter();
      }
    });
    editableDiv.addEventListener('blur', function () {
      if (!isSourceMode) {
        syncContent(editableDiv, hiddenTextarea);
        updateEditorFooter();
      }
    });

    // Initial update
    updateEditorFooter();

    // Add image click handler
    editableDiv.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'IMG') {
        // Always show modal for the clicked image
        showImageModal(editableDiv, e.target);
      }
    });

    toolbar.addEventListener('mousedown', function (e) {
      // Prevent toolbar from stealing focus from editor
      if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
      }
    });

    // --- Toolbar state update logic ---
    function updateToolbarState() {
      if (isSourceMode) return;
      const selection = document.getSelection();
      if (!selection || !editableDiv.contains(selection.anchorNode)) {
        // Remove all active states
        toolbar.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        toolbar.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
        return;
      }
      // Toggle button states
      [
        {cmd: 'bold', query: 'bold'},
        {cmd: 'italic', query: 'italic'},
        {cmd: 'underline', query: 'underline'},
        {cmd: 'strikethrough', query: 'strikeThrough'},
        {cmd: 'superscript', query: 'superscript'},
        {cmd: 'subscript', query: 'subscript'},
        {cmd: 'justifyLeft', query: 'justifyLeft'},
        {cmd: 'justifyCenter', query: 'justifyCenter'},
        {cmd: 'justifyRight', query: 'justifyRight'},
        {cmd: 'justifyFull', query: 'justifyFull'},
        {cmd: 'insertUnorderedList', query: 'insertUnorderedList'},
        {cmd: 'insertOrderedList', query: 'insertOrderedList'}
      ].forEach(item => {
        const btn = toolbar.querySelector(`button[data-cmd="${item.cmd}"]`);
        if (btn) {
          try {
            btn.classList.toggle('active', document.queryCommandState(item.query));
          } catch (e) {
            btn.classList.remove('active');
          }
        }
      });

      // Font name
      const fontNameSel = toolbar.querySelector('select');
      toolbar.querySelectorAll('select').forEach(sel => {
        if (sel.title === 'Font') {
          let value = '';
          try {
            value = document.queryCommandValue('fontName');
          } catch (e) {}
          for (let i = 0; i < sel.options.length; ++i) {
            if (sel.options[i].value && value && value.toLowerCase().includes(sel.options[i].value.split(',')[0].replace(/"/g, '').toLowerCase())) {
              sel.selectedIndex = i;
              return;
            }
          }
          sel.selectedIndex = 0;
        }
        if (sel.title === 'Font Size') {
          let value = '';
          try {
            value = document.queryCommandValue('fontSize');
          } catch (e) {}
          // Map browser fontSize value (1-7) to dropdown value
          for (let i = 0; i < sel.options.length; ++i) {
            if (sel.options[i].value && value == sel.options[i].value) {
              sel.selectedIndex = i;
              return;
            }
          }
          sel.selectedIndex = 0;
        }
        if (sel.title === 'Format') {
          let value = '';
          try {
            // Find block element
            let node = selection.anchorNode;
            while (node && node !== editableDiv) {
              if (node.nodeType === 1 && /^H[1-6]$|^P$|^PRE$|^BLOCKQUOTE$/i.test(node.nodeName)) {
                value = node.nodeName;
                break;
              }
              node = node.parentNode;
            }
          } catch (e) {}
          for (let i = 0; i < sel.options.length; ++i) {
            if (sel.options[i].value && value && sel.options[i].value.toUpperCase() === value.toUpperCase()) {
              sel.selectedIndex = i;
              return;
            }
          }
          sel.selectedIndex = 0;
        }
      });
    }

    // Listen to selection and input events
    editableDiv.addEventListener('keyup', updateToolbarState);
    editableDiv.addEventListener('mouseup', updateToolbarState);
    editableDiv.addEventListener('focus', updateToolbarState);
    editableDiv.addEventListener('input', function () {
      if (!isSourceMode) {
        syncContent(editableDiv, hiddenTextarea);
        updateToolbarState();
      }
    });
    editableDiv.addEventListener('blur', function () {
      if (!isSourceMode) syncContent(editableDiv, hiddenTextarea);
    });

    // Also update toolbar state on toolbar click (for undo/redo etc)
    toolbar.addEventListener('click', function () {
      setTimeout(updateToolbarState, 0);
    });

    // Keyboard shortcuts
    wrapper.tabIndex = 0;
    wrapper.addEventListener('keydown', function (e) {
      // Mac: use metaKey, Windows/Linux: use ctrlKey
      const ctrl = isMac ? e.metaKey : e.ctrlKey;
      const shift = e.shiftKey;
      if (ctrl && !shift && !e.altKey) {
        if (e.key.toLowerCase() === 'b') { e.preventDefault(); handleCommand('bold', null, editableDiv); }
        if (e.key.toLowerCase() === 'i') { e.preventDefault(); handleCommand('italic', null, editableDiv); }
        if (e.key.toLowerCase() === 'u') { e.preventDefault(); handleCommand('underline', null, editableDiv); }
        if (e.key.toLowerCase() === 'z') { e.preventDefault(); handleCommand('undo', null, editableDiv); }
        if (e.key.toLowerCase() === 'y') { e.preventDefault(); handleCommand('redo', null, editableDiv); }
        if (e.key.toLowerCase() === 'l' || e.key.toLowerCase() === 'k') { e.preventDefault(); handleCommand('createLink', null, editableDiv); }
        if (e.key.toLowerCase() === 'p') { e.preventDefault(); printEditorContent(editableDiv); }
      }
      if (ctrl && shift) {
        if (e.key.toLowerCase() === 's') { e.preventDefault(); toolbar.querySelector('button[data-cmd="source"]')?.click(); }
        if (e.key.toLowerCase() === 'f') { e.preventDefault(); toolbar.querySelector('button[data-cmd="fullscreen"]')?.click(); }
        if (e.key.toLowerCase() === 'p') { e.preventDefault(); toolbar.querySelector('button[data-cmd="preview"]')?.click(); }
        if (e.key.toLowerCase() === 't') { e.preventDefault(); toolbar.querySelector('button[data-cmd="table"]')?.click(); }
        if (e.key.toLowerCase() === 'e') { e.preventDefault(); toolbar.querySelector('button[data-cmd="emoji"]')?.click(); }
        if (e.key.toLowerCase() === 'c') { e.preventDefault(); toolbar.querySelector('button[data-cmd="specialChar"]')?.click(); }
        if (e.key.toLowerCase() === 'd') { e.preventDefault(); toolbar.querySelector('button[data-cmd="datetime"]')?.click(); }
        if (e.key.toLowerCase() === 'r') { e.preventDefault(); handleCommand('removeFormat', null, editableDiv); }
      }
    });
    

  });
});