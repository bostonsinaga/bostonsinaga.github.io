/**
 * 
 */
function createStaticLine(promptString, commandString) {
  // create static line
  const staticLine_DOM = document.createElement('div');
  staticLine_DOM.classList.add('static');
  staticLine_DOM.classList.add('line');
  staticLine_DOM.contentEditable = 'false';

  // create static prompt
  const staticPrompt_DOM = document.createElement('div');
  staticPrompt_DOM.classList.add('prompt');
  staticPrompt_DOM.textContent = promptString;

  // create static command
  const staticCommand_DOM = document.createElement('div');
  staticCommand_DOM.classList.add('command');
  staticCommand_DOM.textContent = commandString;

  // put static line above newline
  staticLine_DOM.appendChild(staticPrompt_DOM);
  staticLine_DOM.appendChild(staticCommand_DOM);

  return staticLine_DOM;
}

/**
 * 
 */
class ExecutableNode {
  constructor(name, extension, callback) {

    if (typeof name === 'string') {
      this.name = name;
    }

    if (typeof extension === 'string') {
      this.extension = extension;
    }

    if (typeof callback === 'function') {
      this.callback = callback;
    }
    else this.callback = () => {};
  }

  execute(testStr) {
    if (testStr === this.name ||
      testStr === this.name + '.' + this.extension
    ) {
      this.callback();
      return staticContent_DOM;
    }

    return null;
  }
};

class FileNode {
  constructor(name, extension, content, content) {
    if (typeof name === 'string') {
      this.name = name;
    }

    if (typeof extension === 'string') {
      this.extension = extension;
    }

    if (typeof extension === 'string') {
      this.content = content;
    }
  }

  read(testStr) {
    if (testStr === this.name ||
      testStr === this.name + '.' + this.extension
    ) {
      const staticContent_DOM = document.createElement('div');
      staticContent_DOM.classList.add('static');
      staticContent_DOM.classList.add('line');
      staticContent_DOM.contentEditable = 'false';
      staticContent_DOM.textContent = this.content;

      return staticContent_DOM;
    }

    return null;
  }
};

const cd_exenode = new ExecutableNode(
  'cd', '', () => {
    // if 
  }
);

/**
 * This class represents a directory.
 * This is a doubly linked list.
 */
class DirectoryNode {
  constructor(name) {
    this.name = name;
    this.prev = null;
    this.next = null;
    this.exenodes = [];
  }

  setPrev(prev) {
    this.prev = prev;
  }

  setNext(next) {
    this.next = next;
  }

  addExecutableNode(exenode) {
    if (exenode instanceof ExecutableNode) {
      this.exenodes.push(exenode);
    }
  }

  stringifyPath() {
    let current = this;
    let text = '';

    // previous nodes
    while (current.next) {
      text += current.name;
      current = current.next + '\\';
    }

    // current node
    text += current.name + '>';
    return text;
  }
};

// Boston Sinaga CEO Siberasta
// Boston Sinaga CEO Otometro
// Boston Sinaga CEO Jelkasa
/**  */
document.addEventListener('DOMContentLoaded', () => {

  // create node started from root
  let dirnode = new DirectoryNode('home');

  dirnode.addExecutableNode(
    new ExecutableNode('foo', 'exe', 'Hello World!')
  );

  const rootDirnode = dirnode;

  // access DOMs
  const cli_DOM = document.getElementById('cli');
  const dynamicLine_DOM = document.getElementById('dynamic');
  const dynamicPrompt_DOM = document.querySelector('#dynamic .prompt');
  const dynamicCommand_DOM = document.querySelector('#dynamic .command');

  // prompt-command initialization
  dynamicCommand_DOM.focus();
  dynamicPrompt_DOM.innerText = dirnode.stringifyPath();

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

      // 
      cli_DOM.insertBefore(
        createStaticLine(dirnode.stringifyPath(), text),
        dynamicLine_DOM
      );

      // 
      for (const exe of dirnode.exenodes) {
        const staticContent_DOM = exe.execute(text);

        if (staticContent_DOM) {
          cli_DOM.insertBefore(staticContent_DOM, dynamicLine_DOM);
          break;
        }
      }

      // keep focus to input
      dynamicCommand_DOM.textContent = '';
      dynamicCommand_DOM.focus();
    }
  });
});
