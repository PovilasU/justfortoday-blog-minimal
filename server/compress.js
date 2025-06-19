const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const srcDir = path.resolve(__dirname, "../client");
const outDir = path.resolve(__dirname, "../client/dist");

const compressFile = (srcPath, outDir) => {
  const fileName = path.basename(srcPath);

  const fileContents = fs.readFileSync(srcPath);

  // Gzip
  const gzipped = zlib.gzipSync(fileContents);
  fs.writeFileSync(path.join(outDir, `${fileName}.gz`), gzipped);

  // Brotli
  const brotlied = zlib.brotliCompressSync(fileContents);
  fs.writeFileSync(path.join(outDir, `${fileName}.br`), brotlied);

  console.log(`Compressed: ${srcPath} -> ${fileName}.gz/.br`);
};

const walk = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const srcFull = path.join(dir, file);

    if (fs.lstatSync(srcFull).isDirectory()) {
      walk(srcFull);
    } else if (/\.(html|js|css)$/.test(file)) {
      compressFile(srcFull, outDir);
    }
  });
};

fs.mkdirSync(outDir, { recursive: true });
walk(srcDir);
