const postcssScss = require('postcss-scss');

module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recommended-scss'],
  customSyntax: postcssScss,
  plugins: ['stylelint-scss', 'stylelint-order'],
  ignoreFiles: ['src/styles'], // 특정 파일 또는 폴더를 무시합니다.
  rules: {
    'annotation-no-unknown': null, // 알 수 없는 주석 규칙을 무시합니다.
    'at-rule-no-unknown': null, // 알 수 없는 @규칙을 무시합니다.
    'comment-no-empty': null, // 빈 주석을 허용합니다.
    'function-no-unknown': null, // 알 수 없는 함수 규칙을 무시합니다.
    'media-query-no-invalid': null, // 잘못된 미디어 쿼리 규칙을 무시합니다.
    'no-invalid-position-at-import-rule': [
      true,
      {
        ignoreAtRules: ['use', 'forward'], // 특정 @규칙을 무시합니다.
      },
    ],
    'scss/at-extend-no-missing-placeholder': true, // @extend 사용 시 플레이스홀더가 필요합니다.
    'scss/at-if-no-null': true, // @if 사용 시 null 값을 허용하지 않습니다.
    'scss/at-import-partial-extension': 'never', // @import에서 파일 확장자를 생략해야 합니다.
    'scss/at-rule-no-unknown': true, // 알 수 없는 @규칙을 금지합니다. (SCSS의 @규칙 제외)
    'scss/comment-no-empty': true, // 빈 주석을 금지합니다.
    'scss/declaration-nested-properties-no-divided-groups': true, // 중첩된 속성 선언을 금지합니다.
    'scss/dollar-variable-no-missing-interpolation': true, // $변수 사용 시 보간법이 필요합니다.
    'scss/function-quote-no-quoted-strings-inside': true, // 함수 내에 인용된 문자열을 금지합니다.
    'scss/function-unquote-no-unquoted-strings-inside': true, // 함수 내에 인용되지 않은 문자열을 금지합니다.
    'scss/load-no-partial-leading-underscore': true, // 로드 시 파일명 앞에 언더스코어를 금지합니다.
    'scss/no-duplicate-mixins': true, // 중복된 믹스인을 금지합니다.
    'scss/no-global-function-names': true, // 전역 함수 이름을 금지합니다.
    'scss/operator-no-newline-after': true, // 연산자 뒤에 줄바꿈을 금지합니다.
    'scss/operator-no-newline-before': true, // 연산자 앞에 줄바꿈을 금지합니다.
    'scss/operator-no-unspaced': true, // 연산자 주위에 공백이 필요합니다.
    'no-empty-source': null, // 빈 소스를 무시합니다.
    'no-descending-specificity': null, // 하향식 특이성 규칙을 무시합니다.
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$', // 클래스 이름을 className 형식으로 강제합니다.
      {
        message: 'Expected class selector to be in className format',
      },
    ],
  },
};
