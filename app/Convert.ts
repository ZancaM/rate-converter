import * as xlsx from 'xlsx';
import * as fs from "fs";

export default class Convert {

    static convert(filePath: string, options: { sheet?: string, newName?: string }) {
        console.log(`Reading ${filePath}`);
        const newFileName = options.newName ? options.newName : 'newRateFile';
        let xlsxContent = xlsx.readFile(filePath);
        console.log(`Processing ${filePath} ...`);
        const sheetName = options.sheet || xlsxContent.SheetNames[0];
        let sheet = xlsxContent.Sheets[sheetName];
        console.log(`Converting ${filePath} to JSON object`);

        let rows = xlsx.utils.sheet_to_json(sheet, {header: 1}) as [string[] | number[]];
        let rateJSONData = rows.map( row =>  {
            return {
                'key': row[0],
                'value': row.slice(1, row.length).join(',')
            }
        });
        console.log(`Saving to ${__dirname}/${newFileName}.json`);
        fs.writeFileSync(`${newFileName}.json`, JSON.stringify(rateJSONData,null,2));

        return;
    }
}

