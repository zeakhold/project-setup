module.exports = {
  // 配置示例一，自动修复错误
  "src/*.js": ["eslint --fix"],
  // 配置示例二，自动格式化代码（谨慎使用）：
  // "*.{js,ts,css,json,yml,md}": ["prettier --write"]
}
