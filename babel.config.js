module.exports = api => {
  api.cache(true);

  const presets = [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react"
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties",
    [
      "babel-plugin-transform-remove-imports",
      {
        test: "\\.(less|css|scss)$"
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
