export default function Column(target: any, context: ClassGetterDecoratorContext) {
    return function() {
        console.log(`Accessing getter for: ${context.name.toString()}`);
        // @ts-ignore
        return target.call(this);
    };
}
