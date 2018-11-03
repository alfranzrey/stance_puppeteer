//set constant variables
const puppeteer = require('puppeteer');
const vo = require('vo');
const fs = require('fs');
const parse = require('csv-parse');
	
//get csv data first
var csvData=[];
fs.createReadStream('styles.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        csvData.push(csvrow);        
    })
    .on('end',function() {
    });
//-----------------------
//-export file result
var exportToCSV = fs.createWriteStream('result.txt');
var header ='Style'  + '\t' +
			'Title'  + '\t' +
			'Description'  + '\t' +
            'Bullets'    + '\n';
console.log(header);
exportToCSV.write(header);
function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
           str += obj[p] + '\t';
        }
    }
    return str;
}
//-------------------------


//Main async function
(async function main() {
	try{
		//---------------
		const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
			headless: true});
		const page = await browser.newPage();
		page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');
		//-----------------

		//code starts here
		for(var i = 0; i < csvData.length; i++){
			await page.goto("https://www.stance.com/search?q="+csvData[i]);
			await page.waitForSelector('#primary');
			var title = "";
			var description = "";
			var bullets = "";
			var prod_care = "";

			if (await page.$('#pdpMain > div.pdp-top.max-width-content.clearfix > div.product-col-2.product-detail.product-detail-title > h1') !== null){
				title = await page.evaluate(() => document.querySelector('#pdpMain > div.pdp-top.max-width-content.clearfix > div.product-col-2.product-detail.product-detail-title > h1').innerText); 
				description = await page.evaluate(() => document.querySelector('#pdpMain > div.product-info > div.product-description > div > p').innerText); 
				bullets = await page.evaluate(() => document.querySelector('#pdpMain > div.product-info > div.product-description > section > div:nth-child(1) > ul').innerText); 
				prod_care = await page.evaluate(() => document.querySelector('#product-care > div.content-asset > ul').innerText); 
				bullets = bullets.replace(/\r?\n|\r/g, "|");
				prod_care = prod_care.replace(/\r?\n|\r/g, "|");
				bullets = bullets + "|" + prod_care;
			}
			else{
				title = "_";
				description = "_";
				bullets = "_";
			}
			let row = {
					'Style':csvData[i],
			        'Title':title,
			        'Description':description,
			        'Bullets':bullets
			    }
			exportToCSV.write(objToString(row) + '\n','utf-8');
    		console.log(objToString(row) + '\n'); 
		}

		//end
		console.log("All done!");
		browser.close();
	}
	catch(err){
		console.log("!!!! >>>>>  my error",err);
	}
})();





	

