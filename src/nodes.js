import * as doms from './doms.js';
import * as regex from './regex.js';

/**
 * Base class for 'FileNode' and 'DirectoryNode'.
 * As a unique naming system.
 */
class NameNode {
  #name = 'noname';
  #version = 0;
  #duplications = [];
  #bracket = ['(', ')'];

  static DUPLICATE_CODE = {
    UNKNOWN: 0,
    NOT_FOUND: 1,
    FOUND: 2
  };

  /**
   * @param {string} name
   * @returns {NameNode}
   */
  constructor(name) {
    if (NameNode.isValidFilename(name)) {
      this.#name = name;
    }
  }

  /**
   * Checks whether a file name is generally valid.
   * The file name must not contain a series of dots
   * and must not contain any prohibited characters.
   * @param {string} name
   * @returns {boolean}
   */
  static isValidFilename(name) {
    return (
      typeof name === 'string' &&
      name.length > 0 &&
      !regex.isStringAllDots(name) &&
      !regex.isIllegalCharacterFilename(name)
    );
  }

  /**
   * Get original name or duplicate name with version number.
   * @returns {string}
   */
  getName() {
    // original
    if (this.#version === 0) {
      return this.#name;
    }

    // duplicate
    return this.#name + this.#bracket[0]
      + this.#version.toString() + this.#bracket[1];
  }

  /**
   * Add a node to 'duplications' array if its name is the same as this.
   * @param {NameNode} node
   * @returns {NameNode.DUPLICATE_CODE}
   */
  addDuplication(node) {
    if (node instanceof NameNode) {

      // duplicate check to this name
      if (node.getName() === this.getName()) {

        this.#duplications.push(node);
        node.#version = this.#duplications.length;
        return NameNode.DUPLICATE_CODE.FOUND;
      }
      else { // duplicate check to duplicate name
        let duplicateCode = NameNode.DUPLICATE_CODE.NOT_FOUND;

        for (let i = 0; i < this.#duplications.length; i++) {

          if (node.getName() === this.#duplications[i].getName()) {
            this.#duplications[i].addDuplication(node);
            duplicateCode = NameNode.DUPLICATE_CODE.FOUND;
            break;
          }
        }

        return duplicateCode;
      }
    }

    return NameNode.DUPLICATE_CODE.UNKNOWN;
  }
}

/**
 * This represents a file.
 * Contained by 'DirectoryNode' as array member.
 */
export class FileNode extends NameNode {
  #extension = '';
  #content = '';

  /**
   * @param {string} name - e.g. 'my_file'
   * @param {string} extension - e.g. 'txt'
   * @param {string} content - text that will be displayed when read
   * @returns {FileNode}
   */
  constructor(name, extension, content) {
    super(name);

    if (NameNode.isValidFilename(extension)) {
      let excessiveDotFirstIndexes = [0, name.length];

      // remove dots from the beginning
      for (let i = 0; i < extension.length; i++) {
        if (extension[i] != '.') {
          excessiveDotFirstIndexes[0] = i;
          break;
        }
      }

      // remove dots from the end
      for (let i = extension.length - 1; i >= 0; i--) {
        if (extension[i] != '.') {
          excessiveDotFirstIndexes[1] = i+1;
          break;
        }
      }

      console.log(excessiveDotFirstIndexes);

      // assign clean extension
      this.#extension = extension.slice(
        excessiveDotFirstIndexes[0], excessiveDotFirstIndexes[1]
      );
    }

    // expected as descriptive text
    this.#content = content;
  }

  /**
   * Get name with or without extension.
   * @returns {string}
   */
  getName() {
    const name = super.getName();

    if (this.#extension) {
      return name + '.' + this.#extension
    }

    return name;
  }

  /**
   * Displays content after checking for the existence of file name.
   * @param {string[]} [strarr] - strings separated at each space
   * @returns {boolean}
   */
  read(strarr) {
    // get strings by default from command input
    if (!strarr) strarr = doms.getCommandStrings();

    // compare first string with name that has or does not have extension
    if (strarr.length > 0 &&
      (this.#extension && strarr[0] === this.getName()) ||
      (!this.#extension && strarr[0] === this.getName() + '.' + this.#extension)
    ) {
      doms.displayOutput(this.#content);
      return true;
    }

    return false;
  }
}

/**
 * This represents a directory.
 * Contains 'DirectoryNode' (sub directory) and 'FileNode' array.
 */
export class DirectoryNode extends NameNode {
  #subdirs = [];
  #files = [];

  /**
   * @param {string} name - e.g. 'my_dir'
   * @returns {DirectoryNode}
   */
  constructor(name) {
    super(name);
    this.parent = null;
  }

  /**
   * Add a new subdirectory with a different name.
   * @param {DirectoryNode} dir
   * @returns {void}
   */
  addSubdir(dir) {
    let duplicateCode = NameNode.DUPLICATE_CODE.NOT_FOUND;

    if (dir instanceof DirectoryNode) {
      for (const d of this.#subdirs) {
        duplicateCode = d.addDuplication(dir);

        if (duplicateCode === NameNode.DUPLICATE_CODE.FOUND) {
          dir.parent = this;
          this.#subdirs.push(dir);
          break;
        }
      }
    }
    else duplicateCode = NameNode.DUPLICATE_CODE.UNKNOWN;

    // messages
    if (duplicateCode === NameNode.DUPLICATE_CODE.UNKNOWN) {
      doms.displayOutput(
        `The '${dir.getName()}' is not a 'DirectoryNode'.`,
        doms.DISPLAY_COLOR_ERROR
      );
    }
    else if (duplicateCode === NameNode.DUPLICATE_CODE.NOT_FOUND) {
      dir.parent = this;
      this.#subdirs.push(dir);
    }
    else if (duplicateCode === NameNode.DUPLICATE_CODE.FOUND) {
      doms.displayOutput(
        `Duplicate name detected. Renamed as '${dir.getName()}'.`,
        doms.DISPLAY_COLOR_WARNING
      );
    }
  }

  /**
   * Add a new file with a different name.
   * @param {FileNode} file
   * @returns {void}
   */
  addFile(file) {
    let duplicateCode = NameNode.DUPLICATE_CODE.NOT_FOUND;

    if (file instanceof FileNode) {

      for (const f of this.#files) {
        duplicateCode = f.addDuplication(file);

        if (duplicateCode === NameNode.DUPLICATE_CODE.FOUND) {
          this.#files.push(file);
          break;
        }
      }
    }
    else duplicateCode = NameNode.DUPLICATE_CODE.UNKNOWN;

    if (duplicateCode === NameNode.DUPLICATE_CODE.UNKNOWN) {
      doms.displayOutput(
        `'${file}' is not a 'FileNode'.`,
        doms.DISPLAY_COLOR_ERROR
      );
    }
    else if (duplicateCode === NameNode.DUPLICATE_CODE.NOT_FOUND) {
      this.#files.push(file);
    }
    else if (duplicateCode === NameNode.DUPLICATE_CODE.FOUND) {
      doms.displayOutput(
        `Duplicate name detected. Renamed as '${file.getName()}'.`,
        doms.DISPLAY_COLOR_WARNING
      );
    }
  }

  /**
   * @callback ForEachSubdirCallback
   * @param {DirectoryNode} dir
   * @param {number} index
   * @returns {boolean}
   */

  /**
   * Iterate each sub directory.
   * @param {ForEachSubdirCallback} callback - return true (stop loop), false (continue loop)
   * @returns {void}
   */
  forEachSubdir(callback) {
    for (let i = 0; i < this.#subdirs.length; i++) {
      if (callback(this.#subdirs[i], i)) break;
    }
  }

  /**
   * @callback ForEachFileCallback
   * @param {FileNode} file
   * @param {number} index
   * @returns {boolean}
   */

  /**
   * Iterate each file.
   * @param {ForEachFileCallback} callback - return true (stop loop), false (continue loop)
   * @returns {void}
   */
  forEachFile(callback) {
    for (let i = 0; i < this.#files.length; i++) {
      if (callback(this.#files[i], i)) break;
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
      text = '\\' + current.getName() + text;
      current = current.parent;
    }

    // root node
    text = current.getName() + text;
    return text;
  }
}

// create node started from root
export let dirnode = new DirectoryNode('home');

/**
 * Cannot directly set 'dirnode' outside this file.
 * @param {DirectoryNode} newDirnode
 * @returns {void}
 */
export function setDirnode(newDirnode) {
  if (newDirnode instanceof DirectoryNode) {
    dirnode = newDirnode;
  }
}
