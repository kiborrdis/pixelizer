import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/main.ts',
    output: {
      name: 'foo',
      file: 'dist/bundle.js',
      format: 'cjs'
    },
    plugins: [
      typescript(),
    ]
  },
];