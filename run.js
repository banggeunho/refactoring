// run.js
const {spawn} = require('child_process');
const path = require('path');

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
