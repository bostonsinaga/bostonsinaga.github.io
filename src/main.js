import * as doms from './doms.js';
import * as nodes from './nodes.js';
import * as modifiers from './modifiers.js';

/**
 * Initial Point.
 * HTML DOMs still accessed via document 'DOMContentLoaded' event
 * for simplicity and to avoid unnecessary waiting loop (e.g. 'setInterval').
 */
document.addEventListener('DOMContentLoaded', () => {

  // dynamic line (prompt-command) initialization
  doms.dynamicPrompt_DOM.textContent = nodes.dirnode.stringifyPath();
  doms.dynamicCommand_DOM.focus();

  // cursor always active and placed at the end of dynamic line
  doms.cli_DOM.addEventListener('click', () => {
    doms.dynamicCommand_DOM.focus();

    const range = document.createRange();
    range.selectNodeContents(doms.dynamicCommand_DOM);
    range.collapse(false);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });

  /** Keyword Events in Dynamic Line */
  doms.dynamicCommand_DOM.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      // strings separated at each space
      const strarr = doms.getCommandStrings();

      // current prompt-command strings will be a static 'div' above
      doms.createStaticLine(nodes.dirnode.stringifyPath());

      // find a file and read it
      if (!modifiers.selectCommands(strarr)) {
        nodes.dirnode.forEachFile((file) => {
          return file.read(strarr);
        });
      }

      // prompt path is changed and command input is reset
      doms.dynamicPrompt_DOM.textContent = nodes.dirnode.stringifyPath();
      doms.dynamicCommand_DOM.textContent = '';
      doms.dynamicCommand_DOM.focus();
    }
    else if (event.key === 'Tab') {
      event.preventDefault();
      doms.dynamicCommand_DOM.textContent = '';
    }
    else if (event.key === 'Escape') {
      event.preventDefault();
      doms.dynamicCommand_DOM.textContent = '';
    }
  });
});
