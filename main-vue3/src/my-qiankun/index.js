import { handleRouter } from "./handle-router";
import { rewriteRouter } from './rewrite-router';

let _apps = []
export const getApps = () => _apps
// 注册
export const registerMicroApps = apps => _apps = apps
// 开启
export const start = () => {
    console.log('my-qiankun启动', _apps);
    // 1.监视路由变化
    rewriteRouter();
    //初始执行匹配,保证刷新可用
    handleRouter();
}