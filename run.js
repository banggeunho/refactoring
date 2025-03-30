// run.js (ESM용)
import {spawn} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';

// __dirname 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 실행할 스크립트 이름
const scriptName = process.argv[2];

if (!scriptName) {
    console.error('❌ 스크립트 이름을 입력하세요. 예: node run hello');
    process.exit(1);
}

const scriptPath = path.join(__dirname, 'scripts', `${scriptName}.js`);

const child = spawn('node', [scriptPath, ...process.argv.slice(3)], {
    stdio: 'inherit',
});

child.on('exit', (code) => {
    process.exit(code);
});
