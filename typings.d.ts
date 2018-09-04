export interface IKeyword {
    desc: string;
    name: string;
    returnType: string;
    syntax: string;
}

export const keywords: IKeyword[];
export const builtInFunctions: IKeyword[];