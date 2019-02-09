import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/main.ts',
    output: {
      name: 'foo',
      file: 'dist/bundle.js',
      format: 'cjs'
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      uglify({
        compress: {
          keep_fnames: true,
        },
        mangle: {
          keep_fnames: true,
        },
      }),
    ]
  },
];