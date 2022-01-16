/* eslint-disable */

const serializeCursor = (payload: any[]) => {
  console.log("serializecursor: " + payload);
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

export default serializeCursor;
