export default {
  fileSystem: {
    path: './DB',
  },
  mongodb: {
    cnxStr: 'xxx',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {},
}
