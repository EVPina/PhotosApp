const { spawn } = require('child_process');

const run = (args, cwd, prefix, color) => {
  const child = spawn('npm', args, {
    cwd, // Ejecuta el comando dentro de la carpeta especificada
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(`\x1b[${color}m[${prefix}]\x1b[0m ${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(`\x1b[${color}m[${prefix}]\x1b[0m ${data}`);
  });

  child.on('close', (code) => {
    console.log(`[${prefix}] process exited with code ${code}`);
  });

  return child;
};

// Colores ANSI: 34 = azul, 35 = magenta
// Nota: ya no usamos --prefix, usamos cwd para ubicarnos en la carpeta correcta
run(['run', 'dev'], 'backend', 'BACKEND', 34);
run(['run', 'dev'], 'frontend', 'FRONTEND', 35);

process.on('SIGINT', () => {
  process.exit();
});