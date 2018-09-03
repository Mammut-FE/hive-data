import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

export function getDocument(name: string): CheerioStatic {
    return cheerio.load(fs.readFileSync(path.join(__dirname, "../rawData/" + name)).toString());
}

export function dump(data: any, name) {
    const str = JSON.stringify(data);
    const filePath = path.join(__dirname, "../data/" + name + ".json");

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