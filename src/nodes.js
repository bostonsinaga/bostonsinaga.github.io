import * as doms from './doms.js';
import * as regex from './regex.js';

/**
 * Checks whether a filename is generally valid.
 * The file name must not contain a series of dots
 * and must not contain any prohibited characters.
 * @param {string} str - filename or directory name
 * @returns {boolean}
 */
function isValidFileName(str) {
  return (
    typeof str === 'string' &&
    str.length > 0 &&
    !regex.isStringAllDots(str) &&
    !regex.isIllegalCharacterFilename(str)
  );
}

/**
 * This represents a file.
 * Contained by 'DirectoryNode'.
 */
class FileNode {
  /**
   * @param {string} name - e.g. 'my_file'
   * @param {string} extension - e.g. 'txt'
   * @param {string} content - text that will be displayed when read
   */
  constructor(name, extension, content) {

    if (isValidFileName(name)) {
      this.name = name;
    }
    else this.name = 'noname';

    if (isValidFileName(extension)) {
      let excessiveDotFirstIndex = name.length;

      // clears dots from the end of extension
      for (let i = extension.length - 1; i >= 0; i--) {
        if (extension[i] != '.') {
          excessiveDotFirstIndex = i+1;
        }
      }

      // assign clean extension
      this.extension = extension.slice(0, excessiveDotFirstIndex);
    }
    else this.extension = '';

    // expected as descriptive text
    this.content = content;
  }

  /**
   * Enter the filename with its extension
   * or just the name if it has no extension.
   * This method will display the content.
   */
  read() {
    const strarr = doms.getCommandStrings();

    if (strarr.length > 0 &&
      (this.extension.length === 0 && strarr[0] === this.name) ||
      (this.extension.length !== 0 && strarr[0] === this.name + '.' + this.extension)
    ) {
      doms.displayOutput(this.content);
    }
  }
};

/**
 * This represents a directory.
 * Contains 'FileNode' array.
 */
class DirectoryNode {
  /**
   * @param {string} name - e.g. 'my_dir'
   */
  constructor(name) {

    if (isValidFileName(name)) {
      this.name = name;
    }
    else this.name = 'noname';

    this.parent = null;
    this.children = [];
    this.files = [];
  }

  /**
   * Add a new subdirectory with a different name.
   * @param {DirectoryNode} child - node
   */
  addChild(child) {
    if (child instanceof DirectoryNode) {
      child.parent = this;
      this.children.push(child);
    }
  }

  /**
   * Add a new file with a different name.
   * @param {FileNode} file - node
   */
  addFile(file) {
    if (file instanceof FileNode) {
      this.files.push(file);
    }
  }

  /**
   * Converts nodes connection into a string representing a path.
   * @returns {string}
   */
  stringifyPath() {
    let current = this;
    let text = '>';

    // from this node up towards the root
    while (current.parent) {
      text = '\\' + current.name + text;
      current = current.parent;
    }

    // root node
    text = current.name + text;
    return text;
  }
};

// create node started from root
export let dirnode = new DirectoryNode('home');
