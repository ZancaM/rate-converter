import * as fs from "fs";
import * as xlsx from 'xlsx';

export default class Illustration {
    static convert(filePath: string, options: any) {
        if(!options.dividend) throw `You have to specify a dividend option (Accumulate, PRCash, PRPUA, PUA, Cash)`;
        console.log(`Reading ${filePath}`);
        let xlsxContent = xlsx.readFile(filePath, {type: 'string', raw: true});
        console.log(`Reading ${options.configpath}`);
        let configraw = fs.readFileSync(options.configpath, 'utf8');
        let config = JSON.parse(configraw);
        console.log(`Processing ${filePath} ...`);
        const sheetName = config.sheetName || xlsxContent.SheetNames[0];
        let sheet = xlsxContent.Sheets[sheetName];
        console.log(`Converting ${filePath} to JSON object`);

        let rows = xlsx.utils.sheet_to_json(sheet, {header: 1, raw: false}) as [string[] | number[]];
        let rowheaders = rows[config.headerRow - 1] as [any];
        let headers = rowheaders.map( header => header.trim()); // trim leading and trailing spaces
        let headerMapping = config.headerMapping[options.dividend];
        if(!headerMapping) { throw `Error ${options.dividend} option not recognized` }
        let headerToIndex = {} as any;
        for (let header in headerMapping) {
            let index = headers.indexOf(headerMapping[header]);
            if (index >= 0) {
                headerToIndex[header] = index;
            }
        }
        let illustrationList: any = [];
        for (let i = config.headerRow; illustrationList.length == 0 || illustrationList[illustrationList.length - 1].ageEndYear != '121'; i++){
            let returnValue = {} as any;
            for (let header in headerToIndex) {
                let index = headerToIndex[header];
                returnValue[header] = Illustration.adjustValue(rows[i][index] as string);
            }
            illustrationList.push(returnValue);
        }
        console.log(`Saving to illustrationList.json`);
        fs.writeFileSync(`illustrationList.json`, JSON.stringify(illustrationList,null,2));
        return;
    }

    static adjustValue(value: string) {
        value = value.trim();
        if(value === '-' || value === '') {
            value = '0';
        }
        if(value.startsWith('(') && value.endsWith(')')) {
            value = '-' + value.substring(1, value.length-1);
        }
        return parseFloat(value.replace(/,/g, ''));
    }
}

