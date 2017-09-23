let preludeTsContractViolationCb = (msg:string):void => { throw msg; };

/**
 * Some programmatic errors are only detectable at runtime
 * (for instance trying to setup a HashSet of Option<number[]>: you
 * can't reliably compare a number[] therefore you can't compare
 * an Option<number[]>.. but we can't detect this error at compile-time
 * in typescript). So when we detect them at runtime, prelude.ts throws
 * an exception by default.
 * This function allows you to change that default action
 * (for instance, you could display an error message in the console,
 * or log the error)
 *
 * You can reproduce the issue easily by running for instance:
 *
 *     HashSet.of(Option.of([1]))
 */
export function setContractViolationAction(action: (msg:string)=>void) {
    preludeTsContractViolationCb = action;
}

/**
 * @hidden
 */
export function reportContractViolation(msg: string): void {
    preludeTsContractViolationCb(msg);
}

/**
 * @hidden
 */
export function contractTrueEquality(context: string, val: any) {
    if (val.hasTrueEquality && (!val.hasTrueEquality())) {
        reportContractViolation(
            context + ": element doesn't support true equality: " + val);
    }
}
