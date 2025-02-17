export function compareData(a: number | string, b: string | number | undefined, type: string) {
    switch (type) {
        case ">":
            return parseFloat(<string>a) > parseFloat(<string>b);
        case ">=":
            return parseFloat(<string>a) >= parseFloat(<string>b);
        case "<":
            return parseFloat(<string>a) < parseFloat(<string>b);
        case "<=":
            return parseFloat(<string>a) <= parseFloat(<string>b);
        case "==":
            return a == b;
        case "===":
            return a === b;
        case "!=":
            return a != b;
        case "!==":
            return a !== b;
        case "includes":
            return a?.toString().toLowerCase().includes(b?.toString().toLowerCase() ?? "");
        default:
            return false;
    }
}

