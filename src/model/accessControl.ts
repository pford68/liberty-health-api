
function roles(...roleNames:string[]) {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const advised = descriptor.value;
        descriptor.value = function (...args: any[]) {
            return advised.apply(this, args);
        };
    }
}

function secured(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const advised = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const [req, res] = args;
        if (res.constructor != Response) {
            throw new Error("");
        } else if (req.constructor != Request) {
            throw new Error("");
        } else {
            return advised.apply(this, args);
        }
    };
}