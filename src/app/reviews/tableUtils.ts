export function compareData(a: any, b: any, type: string) {
    switch (type) {
        case ">":
            return parseFloat(a) > parseFloat(b);
        case ">=":
            return parseFloat(a) >= parseFloat(b);
        case "<":
            return parseFloat(a) < parseFloat(b);
        case "<=":
            return parseFloat(a) <= parseFloat(b);
        case "==":
            return a == b;
        case "===":
            return a === b;
        case "!=":
            return a != b;
        case "!==":
            return a !== b;
        case "includes":
            return a.toLowerCase().includes(b.toLowerCase());
        default:
            return false;
    }
}