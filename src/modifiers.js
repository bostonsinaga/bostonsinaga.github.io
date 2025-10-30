import * as doms from './doms.js';
import * as regex from './regex.js';
import * as nodes from './nodes.js';

/**
 * Change directory.
 * @param {string[]} [strarr] - strings separated at each space
 * @returns {void}
 */
function cd(strarr) {
  let patharr = [];

  // get strings by default from command input
  if (!strarr) strarr = doms.getCommandStrings();

  if (strarr.length === 2) {
    /**
     * Strings are separated at each slash
     * and reversed to pop from the front.
     */
    patharr = strarr[1].trim().split('/');
    patharr.reverse();

    // reduce array to empty
    while (patharr.length > 0) {
      const n = patharr.length - 1;

      // current
      if (patharr[n] === '.') {
        patharr.pop();
      }
      // go up
      else if (patharr[n] === '..') {
        if (parent) {
          nodes.setDirnode(nodes.dirnode.parent);
        }
        else break;

        patharr.pop();
      }
      // go down
      else if (!regex.isStringAllDots(patharr[n])) {
        let foundDir = null;

        // find sub directory
        nodes.dirnode.forEachSubdir((dir) => {
          if (patharr[n] === dir.getName()) {
            foundDir = dir;
            return true;
          }
          return false;
        });

        // change 'dirnode' to found sub directory
        if (foundDir) nodes.setDirnode(foundDir);
        else break;

        patharr.pop();
      }
    }
  }

  // insufficient/excessive input or path not found
  if (strarr.length !== 2 || patharr.length > 0) {
    doms.displayOutput(
      'The system cannot find the path specified.',
      doms.DISPLAY_COLOR_ERROR
    );
  }
}

/** Clear Screen */
function cls(strarr) {

}

/** Delete file or folder */
function del(strarr) {

}

/** Print available folders and files in current directory */
function dir(strarr) {

}

/** Print input or write input to a file */
function echo(strarr) {

}

/** Crate new directory */
function mkdir(strarr) {

}

/** Download file or folder */
function save() {

}

/**
 * Select prebuilt commands that interact with file and directory nodes.
 * @param {string[]} [strarr] - strings separated at each space
 * @returns {boolean}
 */
export function selectCommands(strarr) {
  let retbool = true;

  // get strings by default from command input
  if (!strarr) strarr = doms.getCommandStrings();

  // compare first string with available commands
  if (strarr.length > 0) {
    if (strarr[0] == 'cd') {
      cd(strarr);
    }
    else if (strarr[0] == 'cls') {
      cls(strarr);
    }
    else if (strarr[0] == 'del') {
      del(strarr);
    }
    else if (strarr[0] == 'dir') {
      dir(strarr);
    }
    else if (strarr[0] == 'echo') {
      echo(strarr);
    }
    else if (strarr[0] == 'mkdir') {
      mkdir(strarr);
    }
    else if (strarr[0] == 'save') {
      save(strarr);
    }
    else retbool = false;
  }
  else retbool = false;

  return retbool;
}
