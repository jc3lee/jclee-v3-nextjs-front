export const wwwEncode = (data: any) => {
  return encodeURIComponent(JSON.stringify(data))
};

export const wwwDecode = (data: any) => {
  return JSON.parse(decodeURIComponent(data))
};
