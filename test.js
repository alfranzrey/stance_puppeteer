//set constant variables
const puppeteer = require('puppeteer');
const vo = require('vo');
const fs = require('fs');
const parse = require('csv-parse');

//-export file
var exportToCSV = fs.createWriteStream('result.txt');
var header ='ASIN'  + '\t' +
            'Title'    + '\n';
console.log(header);
exportToCSV.write(header);
function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
           // str += p + ': ' + obj[p] + '\t';
           str += obj[p] + '\t';
        }
    }
    return str;
}
//-


//-functions here
async function run() {
	const browser = await puppeteer.launch({
		executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
		headless: false
	});
	const page = await browser.newPage();
	//-
	
	await page.goto('https://google.com');
	await page.screenshot({ path: 'screenshots/github.png' });
	
	let row = {
            'ASIN':"test ASIN",
            'Title':"test title"
        }

        exportToCSV.write(objToString(row) + '\n');
        console.log(objToString(row) + '\n'); 

	browser.close();
}
//-

//-Main run
try{
	run();
}
catch(err){
	console.log(err);
}


