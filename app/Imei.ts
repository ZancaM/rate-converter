import * as fs from "fs";
const csv = require('csv-parser')
const {stringify} = require('csv-stringify')

export default class Imei {

    static async replaceData(ordersWithImei: any[], folderPath2: string) {
        return new Promise<[any]>((resolve, reject) => {

            let databaseSheet = []
            let replacedData = []
            try {
                fs.createReadStream(`${folderPath2}`)
                    .pipe(csv())
                    .on('data', (data) => databaseSheet.push(data))
                    .on('end', () => {

                        for (let order of ordersWithImei) {
                            let foundOrder = databaseSheet.find(row => row["order id(memo)"] === order["Order ID"])
                            if (foundOrder) {
                                foundOrder["Inventory detail"] = order["IMEI"]
                                replacedData.push(foundOrder)
                            }
                        }

                        stringify(replacedData, {
                            header: true
                        }, function (err, output) {
                            fs.writeFileSync(__dirname+'/output.csv', output);
                        })
                    });
            } catch (e) {
                reject(`Error: ${e}`)
            }

        })

    }

    static async  run(folderPath1: string, folderPath2: string,  options: { from: string, name: string }) {
        console.log(`Reading ${folderPath1}`);
        let results = []
        fs.createReadStream(`${folderPath1}`)
            .pipe(csv())
            .on('data', (data) => {
                if (data['IMEI'] && data['IMEI'] != '') {
                    results.push(data)
                }
            })
            .on('end', () => {
                Imei.replaceData(results, folderPath2)
            });

    }
}

