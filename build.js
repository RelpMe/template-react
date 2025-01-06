const { build } = require('esbuild');

const { dependencies, peerDependencies } = require('./package.json');

/**
 * Executes a shell command.
 * @param {string} command - The command to be executed.
 */
async function executeCommand(command) {
  const exec = await import('child_process').then((m) => m.exec);

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${command}`, error);
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

/**
 * Executes a Build
 * @param {string} folder - The command to be executed.
 */
async function runBuild(folder) {
  const sharedConfigModels = {
    entryPoints: [`src/${folder}/index.ts`],
    bundle: true,
    minify: true,
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
  };

  await build({
    ...sharedConfigModels,
    platform: 'node', // for CJS
    outfile: `dist/${folder}/index.js`,
  });

  await build({
    ...sharedConfigModels,
    platform: 'neutral', // for ESM
    format: 'esm',
    outfile: `dist/${folder}/index.esm.js`,
  });
}

/**
 * Generate Models Files
 */
async function generateModels() {
  await runBuild('models');
}

/**
 * Generate Type Interfaces
 */
async function generateComponents() {
  await executeCommand('cp -R src/components dist');
}

async function generateConstants() {
  await executeCommand('cp -R src/constants dist');
}

async function generateHooks() {
  await executeCommand('cp -R src/hooks dist');
}

async function generateProviders() {
  await executeCommand('cp -R src/provider dist');
}

/**
 * Initialize build
 */
async function start() {
  const finalizeCommands = [];

  finalizeCommands.push('rm -fr dist');
  finalizeCommands.push('mkdir dist');
  finalizeCommands.push('cp -R src/index.ts dist');
  finalizeCommands.push('cp -R package.json dist');
  // finalizeCommands.push('cp -R .npmrc dist')

  for (const command of finalizeCommands) {
    await executeCommand(command);
  }

  await generateComponents();
  await generateConstants();
  await generateHooks();
  await generateProviders();

  // Generate d.ts
  // await executeCommand('npx tsc --emitDeclarationOnly --declaration --outDir ./dist');
}

start();
