const createBundler = require('@airtable/blocks-webpack-bundler').default;

function createConfig(baseConfig) {
    baseConfig.module.rules.push({
        test: /\.s[ac]ss$/i,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
        ],
    });
    return baseConfig;
}

exports.default = () => {
    return createBundler(createConfig);
};