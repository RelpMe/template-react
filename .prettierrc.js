module.exports = {
  printWidth: 100,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  endOfLine: 'auto',
  importOrder: [
    '^(react|react-native|react-native-paper)$',
    '^@react-navigation/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
};
