module.exports = {
  resolve: {
    modules: ['node_modules'],
    alias: {
      public: path.join(__dirname, './public'),
      src: path.join(__dirname, './src')
    }
  },
}
