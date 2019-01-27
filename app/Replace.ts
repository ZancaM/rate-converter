import * as fs from "fs";

export default class Convert {
    static async  convert(folderPath: string, options: { from: string, name: string }) {
        console.log(`Reading ${folderPath}`);
        const oldName = options.from;
        const newName = options.name;
        let files: string[] = fs.readdirSync(folderPath);
        let filteredItems = files.filter(name => name.indexOf(options.from) >= 0);
        for (let i=0; i<filteredItems.length; i++) {
            let fileName = filteredItems[i];
            let fileNamePath = `${folderPath}/${fileName}`;
            let newFileName = fileName.replace(oldName, newName);
            let newFileNamePath = `${folderPath}/${newFileName}`;
            fs.copyFileSync(fileNamePath, `${newFileNamePath}_tmp`);
            console.log(`Replacing ${fileName} to ${newFileName}`);
            let result = fs.readFileSync(`${newFileNamePath}_tmp`, 'utf8');
            result = result.replace(oldName, newName);
            fs.writeFileSync(newFileNamePath, result, 'utf8');
            fs.unlinkSync(`${newFileNamePath}_tmp`);
        }
    }
}

