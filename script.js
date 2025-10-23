/**
 * This class represents a file path.
 * The last node without a next node is the current directory.
 */
class CLINode {
  constructor(name) {
    this.name = name;
    this.next = null;
  }

  setNext(next) {
    this.next = next;
  }

  stringify() {
    let current = this;
    let text = '';

    while (current.next) {
      text += current.name;
      current = current.next + '\\';
    }

    text += current.name + '>';
    return text;
  }
};

// create node started from root
let node = new CLINode('home');

document.addEventListener('DOMContentLoaded', () => {

  // access DOMs
  const cli_DOM = document.getElementById('cli');
  const dynamicLine_DOM = document.getElementById('dynamic');
  const dynamicPrompt_DOM = document.querySelector('#dynamic .prompt');
  const dynamicCommand_DOM = document.querySelector('#dynamic .command');

  // prompt-command initialization
  dynamicCommand_DOM.focus();
  dynamicPrompt_DOM.innerText = node.stringify();

  // cursor always active and placed at the end of newline
  cli_DOM.addEventListener('click', () => {
    dynamicCommand_DOM.focus();

    const range = document.createRange();
    range.selectNodeContents(dynamicCommand_DOM);
    range.collapse(false);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });

  dynamicCommand_DOM.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 

      // get string from user input
      const text = dynamicCommand_DOM.textContent.trim();

      // create static line
      const staticLine_DOM = document.createElement('div');
      staticLine_DOM.classList.add('static');
      staticLine_DOM.classList.add('line');
      staticLine_DOM.contentEditable = 'false';

      // create static prompt
      const staticPrompt_DOM = document.createElement('div');
      staticPrompt_DOM.classList.add('prompt');
      staticPrompt_DOM.textContent = node.stringify();

      // create static command
      const staticCommand_DOM = document.createElement('div');
      staticCommand_DOM.classList.add('command');
      staticCommand_DOM.textContent = text;

      // put static line above newline
      staticLine_DOM.appendChild(staticPrompt_DOM);
      staticLine_DOM.appendChild(staticCommand_DOM);
      cli_DOM.insertBefore(staticLine_DOM, dynamicLine_DOM);

      // keep focus to input
      dynamicCommand_DOM.textContent = '';
      dynamicCommand_DOM.focus();
    }
  });
});
