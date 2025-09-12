module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'ci',
        'revert',
        'perf',
        'build',
      ],
    ],
    'scope-empty': [2, 'never'],
    'header-max-length': [2, 'always', 72],
  },
};
