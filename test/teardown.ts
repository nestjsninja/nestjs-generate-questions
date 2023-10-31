module.exports = async () => {
  await globalThis.databaseConfig.dropDatabase();
};
