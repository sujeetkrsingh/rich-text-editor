# Rich Text Editor

A modern, dependency-free, customizable rich text editor for the web.  
Inspired by best practices from popular editors, but written from scratch using modern browser APIs.

## Demo

[Live Demo](https://sujeetkrsingh.github.io/rich-text-editor/)

## Features

- **Bold, Italic, Underline, Strikethrough, Superscript, Subscript**
- **Headings, Paragraphs, Blockquotes, Preformatted**
- **Font family, Font size, Text color, Highlight**
- **Text alignment, Indent/Outdent**
- **Ordered and Unordered lists**
- **Links and Images**
- **Insert Table, Emoji, Special Characters, Date/Time**
- **Undo/Redo, Remove Format**
- **Source code mode**
- **Preview, Print, Fullscreen**
- **Keyboard shortcuts**
- **Multiple editors per page**
- **No dependencies**

## Installation

1. Copy `src/rich-text-editor.js` and `src/rich-text-editor.css` to your project.
2. Include them in your HTML:

    ```html
    <link rel="stylesheet" href="src/rich-text-editor.css">
    <script src="src/rich-text-editor.js"></script>
    ```

## CDN

You can use the Rich Text Editor directly from CDN:

**CSS:**
```
https://cdn.jsdelivr.net/gh/sujeetkrsingh/rich-text-editor/src/rich-text-editor.css
```

**JS:**
```
https://cdn.jsdelivr.net/gh/sujeetkrsingh/rich-text-editor/src/rich-text-editor.js
```

**Add to your HTML:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sujeetkrsingh/rich-text-editor/src/rich-text-editor.css" />
<script src="https://cdn.jsdelivr.net/gh/sujeetkrsingh/rich-text-editor/src/rich-text-editor.js"></script>
```

## Basic Usage

Add a textarea with the class `js-rich-text-editor`:

```html
<textarea class="js-rich-text-editor" name="content"></textarea>
```

On page load, the editor will automatically replace the textarea with a rich text editor.

## Custom Toolbar

You can customize the toolbar globally or per editor:

```html
<script>
window.RichTextEditorConfig = {
  toolbar: [
    'bold', 'italic', 'underline', 'separator',
    'foreColor', 'hiliteColor', 'separator',
    'insertUnorderedList', 'insertOrderedList', 'separator',
    'createLink', 'unlink', 'separator',
    'table', 'emoji', 'specialChar', 'datetime', 'separator',
    'fullscreen', 'preview', 'print', 'source', 'help'
  ]
};
</script>
```

Or target a specific editor:

```js
window.RichTextEditorConfig = {
  '#myTextarea': ['bold', 'italic', 'underline', 'link', 'ul', 'ol', 'undo', 'redo']
};
```

## Custom Toolbar Example

```html
<script>
window.RichTextEditorConfig = {
  toolbar: [
    'bold', 'italic', 'underline', 'separator',
    'foreColor', 'hiliteColor', 'separator',
    'insertUnorderedList', 'insertOrderedList', 'separator',
    'createLink', 'unlink', 'separator',
    'table', 'emoji', 'specialChar', 'datetime', 'separator',
    'fullscreen', 'preview', 'print', 'source', 'help'
  ]
};
</script>
```

## Keyboard Shortcuts

- **Bold:** Ctrl/Cmd+B
- **Italic:** Ctrl/Cmd+I
- **Underline:** Ctrl/Cmd+U
- **Undo:** Ctrl/Cmd+Z
- **Redo:** Ctrl/Cmd+Y
- ...and more (see the Help button in the toolbar)

## Accessibility

- Toolbar buttons have ARIA labels and keyboard navigation.
- Editor is fully accessible and responsive.

## License

MIT License

---

**Contributions welcome!**  
See [issues](https://github.com/sujeetkrsingh/rich-text-editor/issues) or open a PR.
