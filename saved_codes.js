const browser = puppeteer.launch({
		executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
		headless: false
	});
//------------------------------------
//read csv file
var styles=[];
fs.createReadStream('styles.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        styles.push(csvrow);        
    })
    .on('end',function() {
      console.log('Gathering Data...');
    });
//-----------------------------------


//-export file result
var exportToCSV = fs.createWriteStream('result.txt');
var header ='ASIN'  + '\t' +
            'Title'    + '\n';
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


//get results
let row = {
        'ASIN':"test ASIN",
        'Title':"test title"
    }
    //call exportToCsv
    exportToCSV.write(objToString(row) + '\n');
    console.log(objToString(row) + '\n'); 
//