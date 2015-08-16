function singletonEnforcer(): void {}

export default class Singleton {
    private static _instance: Singleton = null;

    private constructor(enforcer: Function) {
        if (enforcer !== singletonEnforcer) {
            throw new Error("Error: Attempted to instantiate singleton.");
        }
    }

    public static get instance(): Singleton {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton(singletonEnforcer);
        }
        return Singleton._instance;
    }
}
