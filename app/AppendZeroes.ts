import * as fs from "fs";

export default class AppendZeroes {
    static async append(filePath: string, options: { num: number }) {
        console.log(`Reading ${filePath}`);
        const num = options.num;
        let file: string = fs.readFileSync(filePath, 'utf8');
        let fileJSON: {[key: string]: {[key: string]: [{key: string, value: string}]}} = JSON.parse(file);
        for (let rateName in fileJSON) {
            for (let hierarchy in fileJSON[rateName]) {
                fileJSON[rateName][hierarchy].map((ele) => {
                    let rates = ele.value.split(',');
                    let key = ele.key.split(',');
                    let index = parseInt(key[key.length-1]);
                    for (let i = 0; i < index; i++) {
                        rates.push("0");
                    }
                    ele.value = rates.join(',');
                    return ele;
                });
            }
        }
        fs.writeFileSync(filePath,JSON.stringify(fileJSON),{encoding:'utf8',flag:'w'});
    }
}

