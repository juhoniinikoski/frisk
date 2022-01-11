
const serializeCursor = (payload: [number, string] | any) => {
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

export default serializeCursor
