import { fetchResource } from "./fetch-resource"
export const importHTML = async (url) => {
    const html = await fetchResource(url);
    const template = document.createElement('div');
    // 浏览器出于安全考虑，innerHTML只是将html转为DOM元素,不会加载或执行其中的js
    template.innerHTML = html;
    const scripts = template.querySelectorAll('script');
    const styles = template.querySelectorAll('link');
    console.log('styles', styles);
    // 获取所有style的内容
    function fetchStyles() {
        const filterStyle = Array.from(styles).filter(item => item.rel==='stylesheet');
        return Promise.all(filterStyle.map(style => {
            const hrefUrl = style.href.replace('http://localhost:1000/', url);
            // const hrefUrl = style.href;
            console.log('hrefUrl', hrefUrl);
            return fetchResource(hrefUrl);
        }))
    }
    // 请求到的styles
    const allStyleContent = await fetchStyles();
    console.log('请求到的style', allStyleContent)
    for(let style of allStyleContent) {
        const newStyle = document.createElement('style');
        newStyle.setAttribute('type', 'text/css');
        newStyle.innerHTML = style;
        template.appendChild(newStyle);
    }

    // 获取所有的script标签的代码
    function getExternalScripts() {
        return Promise.all(
            Array.from(scripts).map(script => {
                const src = script.getAttribute('src');
                if(!src) {
                    // 内联js代码
                    return Promise.resolve(script.innerHTML);
                } else {
                    return fetchResource(src.startsWith('http') ? src: `${url}${src}`);
                }
            })
        )
    }
    // 获取并执行所有的 script脚本代码
    async function execScripts(global) {
        const scripts = await getExternalScripts();
        //手动构造一个 CommonJS 模块环境
        // const module = { exports: {} };
        // const exports = module.exports;
        // scripts.forEach(code => {
        //     eval(code);
        // })
        // console.log('exports', exports);
        // return module.exports;

        scripts.forEach(code => {
            window.proxy = global
            const scriptText = `
            ((window) => {
                ${code}
            })(window.proxy)
            `
            new Function(scriptText)();
        })
    }

    return {
        template,
        getExternalScripts,
        execScripts
    };
}
