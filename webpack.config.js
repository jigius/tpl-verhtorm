const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const  OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  //devtool: 'source-map',
  entry: {
    main: ["./src/js/app.js"],
    category: glob.sync("./src/js/page/category/**/*.js"),
  },
  //mode: "production",
  mode: "development",
  output: {
    path: `${__dirname}/dist`,
    filename: "[name]-bundle.js",
    clean: true,
  },
  devServer: {
    static: "./dist",
    hot: true,
    watchFiles: ["./src"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/category.html"), // шаблон
      filename: "category.html", // название выходного файла
      chunks: ["main", "category"],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
              ]
            ]
          }
        }
      },
      {
        test: /\.html$/i,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
              attrs: ["img:src", "source:srcset"],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          //"style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  /*optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new OptimizeCssAssetsPlugin(),
        ],
    },*/
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
