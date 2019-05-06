export class CurrencyMask {
    private n: any;
    private len: any;

    private thousands_char: any;
    private decimal_char: any;

    constructor(thousands_char, decimal_char) {
        this.thousands_char = thousands_char;
        this.decimal_char = decimal_char;
    }

    public detectAmountReverse(v: any): string {
        if (typeof(v) === 'number') {
            return this.fixAmountReverse(v);
        }
        return v;
     }

    public detectAmount(v): string {
        if (v) {
            this.n = v[v.length - 1];
            if (isNaN(this.n)) {
                v = v.substring(0, v.length - 1);
                return v;
            }
            v = this.fixAmount(v);
            return v;
        }
    }

    private fixAmountReverse(a: number) {
        return a.toFixed(2).replace(this.decimal_char, this.thousands_char);
    }

    private fixAmount(a: string): string {
        const period = a.indexOf(this.decimal_char);
        if (period > -1) {
        a = a.substring(0, period) + a.substring(period + 1);
        }
        this.len = a.length;
        while (this.len < 3) {
        a = '0' + a;
        this.len = a.length;
        }
        a = a.substring(0, this.len - 2) + this.decimal_char + a.substring(this.len - 2, this.len);
        while (a.length > 4 && (a[0] === '0')) {
        a = a.substring(1)
        }
        if (a[0] === ',') {
        a = '0' + a;
        }
        a = this.removeAllDots(a);
        const spComma = a.split(this.decimal_char);
        if (spComma[0].length >= 4) {
        let hundreds = [];
        let b = spComma[0];
        let h = [];
        while (h = b.match(/.{1,3}$/g)) {
            if (h && h[0].length === 3) {
            hundreds.push(h[0]);
            } else {
            break;
            }
            b = b.replace(h[0], '');
        }
        hundreds = hundreds.reverse();
        hundreds.forEach((hd) => {
            b += this.thousands_char + hd;
        });
        b = b.replace(/^\./g, '');
        a = b.concat(this.decimal_char).concat(spComma[1]);
        }
        return (a);
    }

    private removeAllDots(a: string): string {
        return a.replace(/\./g, '');
    }
}
