/**
 * 樱花飘落效果 - 增强版
 * @author ZZBuAoYe
 * @date 2025/04/03
 * @version 2.0
 * @description 使用SVG实现更真实的樱花形状，添加旋转和摇摆动画，优化性能，增加自定义选项
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
            container: document.body, // 容器
            windIntensity: 5,      // 风力强度 (0-10)
            windDirection: 0,      // 风向 (-10到10，负值向左，正值向右)
            swayIntensity: 5,      // 摇摆强度 (0-10)
            petalTypes: 3,         // 花瓣类型数量 (1-3)
            responsive: true,      // 响应式设计
            reduceOnMobile: true   // 在移动设备上减少花瓣数量
        }, options);
        
        this.container = null;
        this.flakes = [];
        this.isRunning = false;
        this.isMobile = window.innerWidth < 768;
        this.svgNS = "http://www.w3.org/2000/svg";
        this.petalTemplates = [];
        
        // 性能优化：如果在移动设备上且启用了减少选项
        if (this.isMobile && this.options.reduceOnMobile) {
            this.options.maxFlakes = Math.max(5, Math.floor(this.options.maxFlakes / 2));
        }
        
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
        
        // 创建花瓣模板
        this.createPetalTemplates();
        
        // 添加容器到DOM
        this.options.container.appendChild(this.container);
        
        // 如果启用了响应式设计，添加窗口大小变化监听
        if (this.options.responsive) {
            window.addEventListener('resize', this.handleResize.bind(this));
        }
    }
    
    // 创建花瓣SVG模板
    createPetalTemplates() {
        // 花瓣类型1：基本五瓣樱花
        const petalType1 = `
            <svg xmlns="${this.svgNS}" viewBox="0 0 100 100">
                <g>
                    <circle cx="50" cy="50" r="12" />
                    <ellipse cx="50" cy="25" rx="15" ry="12" />
                    <ellipse cx="75" cy="50" rx="12" ry="15" />
                    <ellipse cx="50" cy="75" rx="15" ry="12" />
                    <ellipse cx="25" cy="50" rx="12" ry="15" />
                    <circle cx="50" cy="50" r="8" fill="#fff" opacity="0.5" />
                </g>
            </svg>
        `;
        
        // 花瓣类型2：更圆润的樱花
        const petalType2 = `
            <svg xmlns="${this.svgNS}" viewBox="0 0 100 100">
                <g>
                    <circle cx="50" cy="50" r="10" />
                    <ellipse cx="67" cy="33" rx="10" ry="8" transform="rotate(45 67 33)" />
                    <ellipse cx="67" cy="67" rx="10" ry="8" transform="rotate(135 67 67)" />
                    <ellipse cx="33" cy="67" rx="10" ry="8" transform="rotate(45 33 67)" />
                    <ellipse cx="33" cy="33" rx="10" ry="8" transform="rotate(135 33 33)" />
                    <circle cx="50" cy="50" r="6" fill="#fff" opacity="0.5" />
                </g>
            </svg>
        `;
        
        // 花瓣类型3：简单单瓣
        const petalType3 = `
            <svg xmlns="${this.svgNS}" viewBox="0 0 100 100">
                <g>
                    <path d="M50,20 C70,30 70,70 50,80 C30,70 30,30 50,20 Z" />
                    <circle cx="50" cy="50" r="5" fill="#fff" opacity="0.5" />
                </g>
            </svg>
        `;
        
        this.petalTemplates = [petalType1, petalType2, petalType3];
    }
    
    // 处理窗口大小变化
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth < 768;
        
        // 如果设备类型改变且启用了减少选项
        if (wasMobile !== this.isMobile && this.options.reduceOnMobile) {
            if (this.isRunning) {
                this.stop();
                this.start();
            }
        }
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
            const currentFlakes = this.container.querySelectorAll('.sakura').length;
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
        const flakes = this.container.querySelectorAll('.sakura');
        flakes.forEach(flake => {
            flake.remove();
        });
    }
    
    // 设置风向和强度
    setWind(direction, intensity) {
        this.options.windDirection = Math.max(-10, Math.min(10, direction));
        this.options.windIntensity = Math.max(0, Math.min(10, intensity));
        
        // 更新现有花瓣的动画
        const flakes = this.container.querySelectorAll('.sakura');
        flakes.forEach(flake => {
            this.updateFlakeAnimation(flake);
        });
    }
    
    // 更新花瓣动画
    updateFlakeAnimation(flake) {
        const windFactor = this.options.windDirection * (this.options.windIntensity / 10);
        const swayFactor = this.options.swayIntensity / 10;
        
        // 移除现有动画
        flake.style.animation = 'none';
        
        // 触发重排
        void flake.offsetWidth;
        
        // 应用新动画
        const duration = parseFloat(flake.dataset.duration);
        const size = parseFloat(flake.dataset.size);
        const delay = parseFloat(flake.dataset.delay);
        
        // 计算风的影响
        const windOffset = 20 * windFactor * (size / this.options.maxSize);
        
        // 创建自定义关键帧动画
        const keyframes = `
            @keyframes fall-${flake.dataset.id} {
                0% {
                    opacity: 1;
                    top: -10%;
                    transform: translateX(0) rotate(0deg) scale(1);
                }
                25% {
                    opacity: 0.8;
                    transform: translateX(${10 + windOffset}%) rotate(${45 + swayFactor * 15}deg) scale(0.95);
                }
                50% {
                    opacity: 0.6;
                    transform: translateX(${-10 + windOffset * 1.5}%) rotate(${90 + swayFactor * 25}deg) scale(0.9);
                }
                75% {
                    opacity: 0.4;
                    transform: translateX(${10 + windOffset * 2}%) rotate(${135 + swayFactor * 35}deg) scale(0.85);
                }
                100% {
                    opacity: 0;
                    top: 110%;
                    transform: translateX(${-10 + windOffset * 2.5}%) rotate(${180 + swayFactor * 45}deg) scale(0.8);
                }
            }
        `;
        
        // 添加样式到头部
        const styleId = `sakura-style-${flake.dataset.id}`;
        let styleEl = document.getElementById(styleId);
        
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = keyframes;
        
        // 应用动画
        flake.style.animation = `fall-${flake.dataset.id} ${duration}s linear ${delay}s infinite`;
    }
    
    createFlake() {
        // 创建一个花瓣容器元素
        const flake = document.createElement('div');
        flake.className = 'sakura';
        const flakeId = `sakura-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        flake.dataset.id = flakeId;
        
        // 随机大小
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.dataset.size = size;
        
        // 随机位置
        const startPositionX = Math.random() * window.innerWidth;
        flake.style.left = `${startPositionX}px`;
        flake.style.top = '-10px';
        
        // 随机颜色
        const colorIndex = Math.floor(Math.random() * this.options.colors.length);
        const color = this.options.colors[colorIndex];
        
        // 随机动画持续时间
        const duration = Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration;
        flake.dataset.duration = duration;
        
        // 随机动画延迟
        const delay = Math.random() * 5;
        flake.dataset.delay = delay;
        
        // 随机选择花瓣类型
        const petalTypeIndex = Math.floor(Math.random() * Math.min(this.options.petalTypes, this.petalTemplates.length));
        const petalSvg = this.petalTemplates[petalTypeIndex];
        
        // 设置花瓣样式
        flake.style.position = 'absolute';
        flake.style.pointerEvents = 'none';
        
        // 插入SVG到花瓣
        flake.innerHTML = petalSvg;
        
        // 设置SVG颜色
        const svgElement = flake.querySelector('svg');
        const gElement = svgElement.querySelector('g');
        gElement.setAttribute('fill', color);
        
        // 添加到容器
        this.container.appendChild(flake);
        
        // 应用自定义动画
        this.updateFlakeAnimation(flake);
        
        // 动画结束后移除
        flake.addEventListener('animationiteration', () => {
            // 只有在动画完成一次循环且元素仍在容器中时才移除
            if (flake.parentNode === this.container && !this.isRunning) {
                this.container.removeChild(flake);
                const styleEl = document.getElementById(`sakura-style-${flake.dataset.id}`);
                if (styleEl) styleEl.remove();
            }
        });
    }
    
    // 设置樱花数量
    setFlakeCount(count) {
        const oldCount = this.options.maxFlakes;
        this.options.maxFlakes = Math.max(1, count);
        
        if (this.isRunning) {
            if (oldCount > count) {
                // 减少花瓣数量
                const flakes = this.container.querySelectorAll('.sakura');
                const excessCount = flakes.length - count;
                
                if (excessCount > 0) {
                    // 移除多余的花瓣
                    for (let i = 0; i < excessCount; i++) {
                        if (flakes[i]) {
                            flakes[i].remove();
                            const styleEl = document.getElementById(`sakura-style-${flakes[i].dataset.id}`);
                            if (styleEl) styleEl.remove();
                        }
                    }
                }
            }
            // 如果增加数量，checkInterval会自动添加新花瓣
        }
    }
    
    // 设置摇摆强度
    setSwayIntensity(intensity) {
        this.options.swayIntensity = Math.max(0, Math.min(10, intensity));
        
        // 更新现有花瓣的动画
        const flakes = this.container.querySelectorAll('.sakura');
        flakes.forEach(flake => {
            this.updateFlakeAnimation(flake);
        });
    }
}

// 页面加载完成后启动樱花效果
document.addEventListener('DOMContentLoaded', () => {
    const sakura = new SakuraFalling();
    sakura.start();
    
    // 可选：添加控制按钮
    const toggleButton = document.getElementById('toggle-sakura');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (sakura.isRunning) {
                sakura.stop();
                toggleButton.textContent = '开启樱花';
            } else {
                sakura.start();
                toggleButton.textContent = '关闭樱花';
            }
        });
    }
    
    // 可选：添加风向控制
    const windDirectionSlider = document.getElementById('wind-direction');
    const windIntensitySlider = document.getElementById('wind-intensity');
    
    if (windDirectionSlider && windIntensitySlider) {
        const updateWind = () => {
            const direction = parseInt(windDirectionSlider.value);
            const intensity = parseInt(windIntensitySlider.value);
            sakura.setWind(direction, intensity);
        };
        
        windDirectionSlider.addEventListener('input', updateWind);
        windIntensitySlider.addEventListener('input', updateWind);
    }
    
    // 可选：添加摇摆强度控制
    const swayIntensitySlider = document.getElementById('sway-intensity');
    if (swayIntensitySlider) {
        swayIntensitySlider.addEventListener('input', () => {
            const intensity = parseInt(swayIntensitySlider.value);
            sakura.setSwayIntensity(intensity);
        });
    }
    
    // 可选：添加花瓣数量控制
    const flakeCountSlider = document.getElementById('flake-count');
    if (flakeCountSlider) {
        flakeCountSlider.addEventListener('input', () => {
            const count = parseInt(flakeCountSlider.value);
            sakura.setFlakeCount(count);
        });
    }
});