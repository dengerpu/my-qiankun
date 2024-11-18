import { getApps } from "./index";
import { getNextRoute, getPrevRoute } from "./rewrite-router";
import { importHTML } from "./import-html";
import { bootstrap, mount, unmount } from "./life-cycle";

export const handleRouter = async () => {
    console.log('前一个路由', getPrevRoute(), '后一个路由', getNextRoute());
    const apps = getApps();
    // 卸载上一个路由应用
    const prevApp = apps.find(item => getPrevRoute().startsWith(item.activeRule));
    if(prevApp) {
        console.log('上一个应用', prevApp);
       await unmount(prevApp);
    }
    // 需要加载的当前路由应用
    const app = apps.find(item => getNextRoute().startsWith(item.activeRule));
    if(!app) {
        return;
    }
    // 3. 加载子应用
    const { template, execScripts } = await importHTML(app.entry);
    // 获取到渲染器（子应用挂载到父应用的dom结点）
    const container = document.querySelector(app.container);
    const subWrap = document.createElement('div');
    subWrap.id = "__inner_sub_wap__";
    const shadowDom = subWrap.attachShadow({mode: 'open'});
    shadowDom.innerHTML = template.innerHTML;
    console.log('template', template);
    container.innerHTML = "";
    container.appendChild(subWrap);

    // 配置全局环境变量 （子应用mount方法会根据这个来渲染到#app还是container下的#app ）
    window.__POWERED_BY_QIANKUN__ = true;
    // 解决图片无法加载问题
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry;

    // 执行子应用的js
    // const appExports = await execScripts();
    // console.log('获取到的子应用js', appExports);

    await execScripts(window);
    console.log('app', app.name);
    const appExports = window[app.name];
    console.log('appExports', appExports)

    app.bootstrap = appExports.bootstrap;
    app.mount = appExports.mount;
    app.unmount = appExports.unmount;

    // 调用子应用暴露出来的生命周期函数
    await bootstrap(app);
    await mount(app);
}