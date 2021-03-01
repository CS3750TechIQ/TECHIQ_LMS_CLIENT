
module.exports = {
  overrides: [{
    include: [
      './node_modules'
    ],
    plugins: [
      ['babel-plugin-transform-require-ignore', {
        extensions: ['.css']
      }]
    ]
  }]

}