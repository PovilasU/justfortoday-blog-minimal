const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const srcDir = path.resolve(__dirname, "../client");
const outDir = path.resolve(__dirname, "../client/dist");

const compressFile = (srcPath, baseDir, outDir) => {
  const relativePath = path.relative(baseDir, srcPath); // e.g., css/style.css
  const outDirPath = path.join(outDir, relativePath); // dist/css/style.css

  // Ensure the output directory exists
  fs.mkdirSync(path.dirname(outDirPath), { recursive: true });

  const fileContents = fs.readFileSync(srcPath);

  // Gzip compression
  const gzipped = zlib.gzipSync(fileContents);
  fs.writeFileSync(`${outDirPath}.gz`, gzipped);

  // Brotli compression
  // const brotlied = zlib.brotliCompressSync(fileContents);
  // fs.writeFileSync(`${outDirPath}.br`, brotlied);

  console.log(`Compressed: ${srcPath} -> ${relativePath}.gz and .br`);
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

// Ensure dist directory exists
fs.mkdirSync(outDir, { recursive: true });
walk(srcDir);
