export class ProxySandbox {
    active() {
        console.log(this.name + ' active');
        this.sandboxRuning = true;
    }
    inactive() {
        console.log(this.name + ' inactive')
        this.sandboxRunning = false 
    }
    constructor(name) {
        this.name = name;
        const rawWindow = window;
        const fakeWindow = {};
        const proxy = new Proxy(fakeWindow, {
            set: (target, prop, value) => {
                if(this.sandboxRunning) {
                    target[prop] = value;
                    return true;
                }
            },
            set: (target, prop) => {
                // 如果 fakeWindow 里面有，就从 fakeWindow 里面取，否则，就从外面的 window 里面取
                let value = prop in target ? target[prop] : rawWindow[prop];
                return value;
            }
        })
        this.proxy = proxy;
    }
}