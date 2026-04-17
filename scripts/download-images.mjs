import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

const main = async () => {
  console.log('Downloading 50 placeholder images. This may take a moment...');
  const promises = [];
  
  for (let i = 1; i <= 50; i++) {
    const id = i.toString().padStart(3, '0');
    const filename = `q${id}.jpg`;
    const filepath = path.join(IMAGES_DIR, filename);
    const url = `https://picsum.photos/seed/writinggame${i}/800/600`;
    
    promises.push(
      downloadImage(url, filepath)
        .then(() => console.log(`[OK] ${filename}`))
        .catch(err => console.error(`[FAIL] ${filename}: ${err.message}`))
    );
  }
  
  await Promise.all(promises);
  console.log('All 50 images have been generated!');
};

main();
