![示例图片.png](https://upload-images.jianshu.io/upload_images/1620097-c35617ed937b8b4d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 解决问题
- 设计稿字体大小不适用于网页呈现
- 背景图片、视频呈现偏移
- 栅格化自适应元素偏移
- 16:9自适应实现
## 适用范围
HTML、Javascript、Vue、React、Angular

## 上代码
fullContainer.js
```
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
```

## 使用方法
```
<script src="../js/fullContainer.js"></script>
<script>
    new FullContainer("screenContainer");
</script>
```

## 示例
[Git示例](https://github.com/LJuvo/full-container.git)

## 参考
[阿里云可视化页面](https://datav.aliyuncs.com/share/f20536920003610a9e544f7c02bcb2fb?spm=5176.15036128.0.0.78bd1f40Zy7Avr)