const path = require('path');
const gaze = require('gaze');
const {transformAsync} = require('@babel/core');
const fs = require('fs-extra');
const glob = require('glob');
const locales = ['en', 'ru'];

const GLOB_PATTERN = 'src/**/*.{js,jsx}';
const fileToMessages = {};
let messages = {};

const posixPath = (fileName) => fileName.replace(/\\/g, '/');

async function writeMessages(fileName, msgs) {
  await fs.writeFile(fileName, `${JSON.stringify(msgs, null, 2)}\n`);
}

// merge messages to source files
async function mergeToFile(locale, toBuild) {
  const fileName = `src/messages/${locale}.json`;
  const originalMessages = {};

  try {
    const oldFile = await fs.readFile(fileName);

    let oldJson;
    try {
      oldJson = JSON.parse(oldFile);
    } catch (err) {
      throw new Error(`Error parsing messages JSON in file ${fileName}`);
    }

    oldJson.forEach((message) => {
      delete message.files;
      originalMessages[message.id] = message;
    });
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }


  Object.keys(messages).forEach((id) => {
    const newMsg = messages[id];
    originalMessages[id] = originalMessages[id] || {id};
    const msg = originalMessages[id];
    msg.description = newMsg.description || msg.description;
    msg.defaultMessage = newMsg.defaultMessage || msg.defaultMessage;
    msg.message = msg.message || '';
    msg.files = newMsg.files;
  });

  const result = Object.keys(originalMessages)
    .map((key) => originalMessages[key])
    .filter((msg) => msg.files);

  await writeMessages(fileName, result);

  console.log(`Messages updated: ${fileName}`);

  if (toBuild && locale !== '_default') {
    const buildFileName = `build/messages/${locale}.json`;
    try {
      await writeMessages(buildFileName, result);
      console.log(`Build messages updated: ${buildFileName}`);
    } catch (err) {
      console.error(`Failed to update ${buildFileName}`);
    }
  }
}

// call everytime before updating file!
function mergeMessages() {
  messages = {};
  Object.keys(fileToMessages).forEach((fileName) => {
    fileToMessages[fileName].forEach((newMsg) => {
      const message = messages[newMsg.id] || {};
      messages[newMsg.id] = {
        description: newMsg.description || message.description,
        defaultMessage: newMsg.defaultMessage || message.defaultMessage,
        message: newMsg.message || message.message || '',
        files: message.files ? [...message.files, fileName].sort() : [fileName]
      };
    });
  });
}

async function updateMessages(toBuild) {
  mergeMessages();
  await Promise.all(
    ['_default', ...locales].map((locale) => mergeToFile(locale, toBuild))
  );
}

/**
 * Extract react-intl messages and write it to src/messages/_default.json
 * Also extends known localizations
 */
async function extractMessages({watch} = {}) {
  const compare = (a, b) => {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  };

  const compareMessages = (a, b) => compare(a.id, b.id);

  const processFile = async(fileName) => {
    try {
      const code = await fs.readFile(fileName, 'utf8');
      // code = code.replace(/import .*;/g, '// replaced');
      // code = code.split('\n').map((line) => line.replace(/^import .*/, '')).join('\n');
      // console.log(fileName);
      // console.log(code);
      const posixName = posixPath(fileName);
      if (code.indexOf('defineMessages') === -1) {
        delete fileToMessages[posixName];
        return;
      }
      const result = (await transformAsync(code, {
        filename: posixName,
        presets: ['@babel/preset-react'],
        plugins: ['react-intl']
      })).metadata['react-intl'];
      if (result.messages && result.messages.length) {
        fileToMessages[posixName] = result.messages.sort(compareMessages);
      } else {
        delete fileToMessages[posixName];
      }
    } catch (err) {
      console.error(`extractMessages: In ${fileName}:\n`, err.codeFrame || err);
    }
  };

  const files = glob.sync(GLOB_PATTERN).filter((f) => !f.startsWith('src/apexLib'));

  console.time('transform');
  await Promise.all(files.map(processFile));
  console.timeEnd('transform');
  await updateMessages(false);

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze(GLOB_PATTERN, (err, val) => (err ? reject(err) : resolve(val)));
    });
    watcher.on('changed', async(file) => {
      const relPath = file.substr(path.join(__dirname, '../').length);
      await processFile(relPath);
      await updateMessages(true);
    });
  }
}

module.exports = extractMessages;
