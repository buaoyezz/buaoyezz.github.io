/**
 * Sakura.js - 樱花飘落效果
 * 为网站添加浪漫的樱花飘落动画
 */

class SakuraFalling {
    constructor(options = {}) {
        this.options = Object.assign({
            maxFlakes: 15,         // 最大花瓣数量
            minSize: 10,           // 最小花瓣尺寸
            maxSize: 20,           // 最大花瓣尺寸
            minDuration: 10,       // 最小飘落时间
            maxDuration: 20,       // 最大飘落时间
            colors: ['#ffc0cb', '#ffb7dd', '#ffd1dc', '#ffe0e6', '#fff0f5'],  // 花瓣颜色
            zIndex: 9999,          // z-index值
            container: document.body // 容器
        }, options);
        
        this.container = null;
        this.flakes = [];
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        // 创建樱花容器
        this.container = document.createElement('div');
        this.container.className = 'sakura-falling';
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.pointerEvents = 'none';
        this.container.style.zIndex = this.options.zIndex;
        
        this.options.container.appendChild(this.container);
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // 初始创建一些花瓣
        for (let i = 0; i < this.options.maxFlakes; i++) {
            this.createFlake();
        }
        
        // 定期检查并补充花瓣
        this.checkInterval = setInterval(() => {
            const currentFlakes = document.querySelectorAll('.sakura').length;
            const flakesToAdd = this.options.maxFlakes - currentFlakes;
            
            for (let i = 0; i < flakesToAdd; i++) {
                this.createFlake();
            }
        }, 500);
    }
    
    stop() {
        this.isRunning = false;
        clearInterval(this.checkInterval);
        
        // 移除所有花瓣
        const flakes = document.querySelectorAll('.sakura');
        flakes.forEach(flake => {
            flake.remove();
        });
    }
    
    createFlake() {
        // 创建一个花瓣元素
        const flake = document.createElement('div');
        flake.className = 'sakura';
        
        // 随机大小
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        
        // 随机位置
        const startPositionX = Math.random() * window.innerWidth;
        flake.style.left = `${startPositionX}px`;
        flake.style.top = '-10px';
        
        // 随机颜色
        const colorIndex = Math.floor(Math.random() * this.options.colors.length);
        flake.style.backgroundColor = this.options.colors[colorIndex];
        
        // 随机动画持续时间
        const duration = Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration;
        flake.style.animationDuration = `${duration}s`;
        
        // 随机动画延迟
        const delay = Math.random() * 5;
        flake.style.animationDelay = `${delay}s`;
        
        // 添加到容器
        this.container.appendChild(flake);
        
        // 动画结束后移除
        flake.addEventListener('animationend', () => {
            if (flake.parentNode === this.container) {
                this.container.removeChild(flake);
                if (this.isRunning) {
                    this.createFlake();
                }
            }
        });
    }
}

// 页面加载完成后启动樱花效果
document.addEventListener('DOMContentLoaded', () => {
    const sakura = new SakuraFalling();
    sakura.start();
    
    // 可选：添加控制按钮
    // const toggleButton = document.getElementById('toggle-sakura');
    // if (toggleButton) {
    //     toggleButton.addEventListener('click', () => {
    //         if (sakura.isRunning) {
    //             sakura.stop();
    //             toggleButton.textContent = '开启樱花';
    //         } else {
    //             sakura.start();
    //             toggleButton.textContent = '关闭樱花';
    //         }
    //     });
    // }
});