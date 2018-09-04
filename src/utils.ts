import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

const outDataFolder = path.join(__dirname, "./data");

function createFolder() {
    if (!fs.existsSync(outDataFolder)) {
        fs.mkdirSync(outDataFolder);
    }
}

export function getDocument(name: string): CheerioStatic {
    return cheerio.load(fs.readFileSync(path.join(__dirname, "../rawData/" + name)).toString());
}

export function dump(data: any, name) {
    createFolder();

    const str = JSON.stringify(data);
    const filePath = path.join(outDataFolder, name + ".json");

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    fs.writeFileSync(filePath, str);
}

export function setToArray(set: Set<string>): string[] {
    let result = [];

    set.forEach(_ => {
        result.push(_);
    });

    return result;
}