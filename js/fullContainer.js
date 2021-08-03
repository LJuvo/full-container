/**
 * Author: Juvos
 * Email: www.704921698@qq.com
 */
class FullContainer {
    allWidth = 0;

    /**
     * 入参
     * @param id 自适应Box Id
     * @param width 自适应原始宽度，默认1920
     * @param height 自适应原始高度，默认1080
     */
    constructor(id, width = 1920, height = 1080) {
        document
            .getElementById(id)
            .setAttribute(
                "style",
                `overflow: hidden;transform-origin: left top;`
            );
        document.getElementById(id).style.width = `${width}px`;
        document.getElementById(id).style.height = `${height}px`;
        this.id = id;
        this.width = width;
        this.height = height;
        this.allWidth = width;
        this.debounce(100, this.initWH(id));
        this.bindDomResizeCallback();
    }

    initWH(id, resize = true) {
        return new Promise((resolve) => {
            const dom = document.getElementById(id);

            let width = dom ? dom.clientWidth : 0;
            let height = dom ? dom.clientHeight : 0;

            if (!dom) {
                console.warn(
                    "DataV: Failed to get dom node, component rendering may be abnormal!"
                );
            } else if (!width || !height) {
                console.warn(
                    "DataV: Component width or height is 0px, rendering abnormality may occur!"
                );
            }

            if (resize) this.onResize();
            resolve();
        });
    }

    onResize() {
        const { allWidth, id } = this;

        document.getElementById(id).style.transform = `scale(${
            document.body.clientWidth / allWidth
        })`;
    }

    bindDomResizeCallback() {
        window.addEventListener("resize", () => {
            this.debounce(100, this.initWH(this.id));
        });
    }

    debounce(delay, callback) {
        let lastTime;

        return function () {
            clearTimeout(lastTime);

            const [that, args] = [this, arguments];
            lastTime = setTimeout(() => {
                callback.apply(that, args);
            }, delay);
        };
    }
}
