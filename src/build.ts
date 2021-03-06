import {generateBuiltInFunction} from "./parser/builtInFunctionsHelper";
import {generateKeyword} from "./parser/keywordHelper";

console.log("----- start generate built-in functions data -----");
try {
    generateBuiltInFunction();

    console.log("----- generate built-in functions data success -----");
} catch (e) {
    console.error("----- generate built-in functions data error -----");
    console.error(e);
}

console.log("----- start generate keyword data -----");
try {
    generateKeyword();

    console.log("----- generate keyword data success -----");
} catch (e) {
    console.error("----- generate keyword data error -----");
    console.error(e);
}
