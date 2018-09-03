import * as cheerio from "cheerio";
import {dump, getDocument} from "../utils";
import {IKeyword} from "../index";

export function getKeywordInfoList(tableElement: CheerioElement[]): IKeyword[] {
    const result = [];

    tableElement.forEach(elem => {
        const children = elem.children;
        const syntax = cheerio(children[1]).text();
        const name = syntax.split("(")[0];

        if (syntax === "Name (Signature)") {
            return;
        }

        result.push({
            desc: cheerio(children[2]).text(),
            name,
            returnType: cheerio(children[0]).text(),
            syntax
        });
    });

    return result;
}

export function getTableTrElements($: CheerioStatic, targetId: string): CheerioElement[] {
    return $(`#${targetId} + p + div.table-wrap > table  > tbody tr`).toArray();
}

const builtInFunction = {
    htmlName: "LanguageManual UDF - Apache Hive - Apache Software Foundation.htm",
    targetIds: [
        "LanguageManualUDF-MathematicalFunctions",
        "LanguageManualUDF-CollectionFunctions",
        "LanguageManualUDF-TypeConversionFunctions",
        "LanguageManualUDF-DateFunctions",
        "LanguageManualUDF-ConditionalFunctions",
        "LanguageManualUDF-StringFunctions",
        "LanguageManualUDF-DataMaskingFunctions",
        "LanguageManualUDF-Misc\.Functions",
        "LanguageManualUDF-Built-inAggregateFunctions",
        "LanguageManualUDF-Built-inTable-GeneratingFunctions"
    ]
};

export function generateBuiltInFunction() {
    const $ = getDocument(builtInFunction.htmlName);

    const result = builtInFunction.targetIds.reduce((prev, id) => {
        const trList = getTableTrElements($, id);
        const result = getKeywordInfoList(trList);

        return prev.concat(result);
    }, []);

    dump(result, "builtInFunction");
}