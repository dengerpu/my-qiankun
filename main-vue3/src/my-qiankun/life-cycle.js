export async function bootstrap(app) {
    app.bootstrap && (await app.bootstrap());
}
export async function mount(app) {
    if(app.mount) {
        await app.mount({
            container: document.querySelector(app.container)
        })
    }
}
export async function unmount(app) {
    app.unmount && (await app.unmount());
}