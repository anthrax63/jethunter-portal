export default function(actionPrefix) {
  const actionList = [
    'start',
    'success',
    'error'
  ];
  const actions = {};
  actionList.forEach((item) => {
    actions[item.toLowerCase()] = `${actionPrefix}_${item.toUpperCase()}`;
  });
  return actions;
}
