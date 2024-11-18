import { handleRouter } from './handle-router'
// 缓存上一个路由，下一个路由 （应用切换的时候，需要卸载上一个，加载下一个）
let prevRoute = "";
let nextRoute = window.location.pathname;

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export const rewriteRouter = () => {
    console.log('重写路由匹配方法');

    window.addEventListener('popstate', () => {
        // popstate触发的时候，路由就已经完成了
        prevRoute = nextRoute;
        nextRoute = window.location.pathname;
        console.log('popstat中的handleRouter');
        handleRouter();
    })

    const rawPushState = window.history.pushState;
    window.history.pushState = (...args) => {
        // 导航前
        prevRoute = window.location.pathname;
        rawPushState.apply(window.history, args);
        // 导航后
        nextRoute = window.location.pathname;
        console.log('pushState中的handleRouter');
        handleRouter();
    }

    const rawReplacestate = window.history.replaceState;
    window.history.replaceState = (...args) => {
        // 导航前
        prevRoute = window.location.pathname;
        rawReplacestate.apply(window.history, args);
        // 导航后
        nextRoute = window.location.pathname;
        console.log('replaceState中的handleRouter');
        handleRouter();
    }
}