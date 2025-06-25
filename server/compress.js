const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const srcDir = path.resolve(__dirname, "../client");
const outDir = path.resolve(__dirname, "../client/dist");

const compressFile = (srcPath, baseDir, outDir) => {
  const relativePath = path.relative(baseDir, srcPath);
  const outFilePath = path.join(outDir, `${relativePath}.br`);

  // Ensure the output directory exists
  fs.mkdirSync(path.dirname(outFilePath), { recursive: true });

  const fileContents = fs.readFileSync(srcPath);
  const brotlied = zlib.brotliCompressSync(fileContents);
  fs.writeFileSync(outFilePath, brotlied);

  console.log(`Compressed: ${srcPath} -> ${outFilePath}`);
};

const walk = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const srcFull = path.join(dir, file);

    if (fs.lstatSync(srcFull).isDirectory()) {
      walk(srcFull);
    } else if (/\.(html|js|css)$/.test(file)) {
      compressFile(srcFull, srcDir, outDir);
    }
  });
};

fs.mkdirSync(outDir, { recursive: true });
walk(srcDir);
