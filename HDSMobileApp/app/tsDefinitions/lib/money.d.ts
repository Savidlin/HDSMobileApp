// money.js TypeScript definition

interface MoneyPrototype {
    convert: (...args: { from?: string; to?: string; }[]) => number;
    from: (currency: string) => Money;
    to: (currency: string) => number;
}

interface Money extends MoneyPrototype {
}

interface MoneyStatic extends MoneyPrototype {

    (val: string): Money;

    version: string;
    rates: { [index: string]: number };
    base: string;
    settings: {
        from: string;
        to: string;
    };

    convert: (val: number | number[] | any[], ...opts: { from?: string; to?: string; }[]) => number;
}

declare var fx: MoneyStatic;