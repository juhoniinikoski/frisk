const importDynamic = new Function('modulePath', 'return import(modulePath)');

export const fetch = async (...args:any[]) => {
  const module = await importDynamic('node-fetch');
  return module.default(...args);
};