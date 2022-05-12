import * as esbuild from 'esbuild-wasm';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let isEsbuildInitialized = false;
const bundler = async (rawCode: string) => {
  if (!isEsbuildInitialized) {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    });
    isEsbuildInitialized = true;
  }
  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      platform: 'browser',
      plugins: [unpkgPathPlugin(), unpkgFetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': "'production'",
        global: 'window',
      },
      jsxFactory: `__React.createElement`,
      jsxFragment: `__React.Fragment`,
    });
    return {
      code: result.outputFiles[0].text,
      error: '',
    };
  } catch (error: any) {
    return {
      code: '',
      error: error.message,
    };
  }
};

export default bundler;
