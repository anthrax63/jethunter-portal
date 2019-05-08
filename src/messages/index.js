import en from './en';
import ru from './ru';

const locales = {en, ru};
const messages = {};

Object.keys(locales).forEach((key) => {
  const data = locales[key];
  messages[key] = data.reduce((msgs, msg) => {
    msgs[msg.id] = msg.message;
    return msgs;
  }, {});
});

export default messages;
