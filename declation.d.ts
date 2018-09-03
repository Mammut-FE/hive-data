import {IKeyword} from "./src";

declare module "*.json" {
    const value: [IKeyword[]];
    export default value;
}