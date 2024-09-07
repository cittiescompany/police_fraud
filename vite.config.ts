import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import browserslistToEsbuild from 'browserslist-to-esbuild'
export default defineConfig({
  server:{watch:{usePolling:true},port:3000},
  css: {
    modules: {
      scopeBehaviour: 'local'
    }, 
  },
  build: {
    outDir:'build', 
  },
  define: {
    global: 'globalThis',
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgr({
      svgrOptions:{
        icon:true
      }
    })
  ],

  // ...
});
// export default defineConfig({
//   build: {
//     outDir:'build', 
//   },
//   define: {
//     global: 'globalThis',
//   },
//   plugins: [
//     react({
//       jsxImportSource: '@emotion/react',
//       babel: {
//         plugins: ['@emotion/babel-plugin'],
//       },
//     }),
//     svgr({
//       svgrOptions:{
//         icon:true
//       }
//     })
//   ],

//   // ...
// });
// export default defineConfig({
//   define: {
//     global: 'globalThis',
//   },
//   plugins: [
//     react({
//       jsxImportSource: '@emotion/react',
//       babel: {
//         plugins: ['@emotion/babel-plugin'],
//       },
//     }),
//   ],
//   build: {
   
//     target: browserslistToEsbuild([
//       '>0.2%',
//     	'not dead',
//     	'not op_mini all'
//     ]), 
//   },
//   // ...
// });