import * as fs from "fs";

export default class Shift {
    static async shift(filePath: string, options: { num: number }) {
        console.log(`Reading ${filePath}`);
        const num = options.num;
        let file: string = fs.readFileSync(filePath, 'utf8');
        let fileJSON: {[key: string]: {[key: string]: [{key: string, value: string}]}} = JSON.parse(file);
        for (let rateName in fileJSON) {
            for (let hierarchy in fileJSON[rateName]) {
                fileJSON[rateName][hierarchy].map((ele) => {
                    let rates = ele.value.split(',');
                    ele.value = rates.slice(num, rates.length).join(',');
                    return ele;
                });
            }
        }
        fs.writeFileSync(filePath,JSON.stringify(fileJSON),{encoding:'utf8',flag:'w'});
    }
}

