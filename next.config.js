 // next.config.js

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
}
const {  withKeystone } = require("@keystone-6/core/next");

module.exports = withKeystone({
  reactStrictMode: true,
})