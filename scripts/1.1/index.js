import * as fs from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url';
import createStatementData from './createStatementData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const playsPath = path.join(__dirname, 'plays.json');
const invoicesPath = path.join(__dirname, 'invoices.json');

const plays = JSON.parse(fs.readFileSync(playsPath, 'utf-8'));
const invoices = JSON.parse(fs.readFileSync(invoicesPath, 'utf-8'));

const plainText = statement(invoices, plays);
console.log(plainText);

const html = htmlStatement(invoices, plays);
console.log(html);


function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

    return result;
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;

    result += '<table>\n';
    result += '<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>';

    for (let perf of data.performances) {
        result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}석</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }

    result += '</table>\n';
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${usd(data.totalVolumeCredits)}</em>점</p>\n`;

    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat('en-US',
        {style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(aNumber / 100);
}