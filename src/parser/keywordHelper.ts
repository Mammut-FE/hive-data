import {IKeyword} from "../index";
import {dump, setToArray} from "../utils";
import keyword from "./keyword.data";

function generateAllKeyword() {
    return Object.keys(keyword).map(key => {
        let item = keyword[key];
        let tmpData = {
            nonReservedKeyword: new Set(),
            reservedKeyword: new Set()
        };

        item.nonReservedKeyword.added.trim().split(",").forEach(keyword => {
            tmpData.nonReservedKeyword.add(keyword.trim());
        });
        item.nonReservedKeyword.removed.trim().split(",").forEach(keyword => {
            tmpData.nonReservedKeyword.delete(keyword.trim());
        });

        item.reservedKeyword.added.trim().split(",").forEach(keyword => {
            tmpData.reservedKeyword.add(keyword.trim());
        });
        item.reservedKeyword.removed.trim().split(",").forEach(keyword => {
            tmpData.reservedKeyword.delete(keyword.trim());
        });

        return {
            version: key,
            keywords: setToArray(tmpData.reservedKeyword).concat(setToArray(tmpData.nonReservedKeyword))
        };
    }).reduceRight((prev, curr) => {
        prev.keywords = prev.keywords.concat(curr.keywords);

        return prev;
    }).keywords.sort();
}

function transformKeywordInfoList(): IKeyword[] {
    return generateAllKeyword().map(keyword => {
        return <IKeyword>{
            name: keyword,
            syntax: "",
            desc: "",
            returnType: ""
        };
    });
}

export function generateKeyword() {
    dump(transformKeywordInfoList(), "keywords");
}