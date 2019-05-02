export default function (yupSchema, data) {
  if (!data) {
    data = {};
  }
  const newData = {...data};
  Object.keys(yupSchema.fields).forEach((f) => {
    const field = yupSchema.fields[f];
    if (field._type === 'string' && !newData[f]) {
      newData[f] = '';
    }
  });
  return newData;
}
