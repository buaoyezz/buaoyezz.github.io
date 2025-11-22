# 个人主页样式指南 / Personal Homepage Style Guide

## 📁 文件结构 / File Structure

```
├── index.html      # 主页
├── about.html      # 关于页面
├── style.css       # 共享样式表
└── README.md       # 本文档
```

## 🎨 CSS 组件说明 / CSS Components

### 1. 全局样式 (Global Styles)
```css
* { ... }           /* 重置所有元素的默认样式 */
body { ... }        /* 页面背景渐变和基础样式 */
.container { ... }  /* 主容器，最大宽度 1200px */
```

### 2. 头部导航 (Header Navigation)
```css
header { ... }      /* 顶部导航栏布局 */
.logo { ... }       /* Logo 容器 */
.logo-text { ... }  /* Logo 文字样式 */
```

### 3. 语言切换器 (Language Switcher)
```css
.language-switcher { ... }  /* 语言选择器容器 */
.lang-select { ... }        /* 下拉选择框样式 */
.language-switcher::after { ... }  /* 下拉箭头图标 */
```

### 4. 主横幅区域 (Hero Section)
```css
.hero { ... }       /* 主要展示区域 */
.hero h1 { ... }    /* 主标题 */
.hero .subtitle { ... }  /* 副标题 */
.hero p { ... }     /* 描述文字 */
.hero-buttons { ... }  /* 按钮容器 */
```

### 5. 按钮样式 (Button Styles)
```css
.btn { ... }           /* 基础按钮样式 */
.btn-primary { ... }   /* 主要按钮（蓝色背景） */
.btn-secondary { ... } /* 次要按钮（透明背景） */
```

### 6. 内容区块 (Content Section)
```css
.content-section { ... }  /* 白色卡片容器 */
.section-title { ... }    /* 区块标题 */
.section-title:after { ... }  /* 标题下方的蓝色装饰线 */
```

### 7. 项目卡片 (Project Cards)
```css
.projects { ... }       /* 项目网格布局 */
.project-card { ... }   /* 单个项目卡片 */
.project-icon { ... }   /* 项目图标 */
.project-title { ... }  /* 项目标题 */
.project-desc { ... }   /* 项目描述 */
.project-link { ... }   /* 项目链接 */
```

### 8. 技能标签 (Skills Tags)
```css
.skills { ... }      /* 技能标签容器 */
.skill-tag { ... }   /* 单个技能标签 */
```

### 9. 页脚 (Footer)
```css
footer { ... }         /* 页脚容器 */
.social-links { ... }  /* 社交链接容器 */
.social-links a { ... }  /* 社交图标链接 */
```

### 10. 响应式设计 (Responsive Design)
```css
@media (max-width: 768px) { ... }  /* 移动端适配 */
```

## 🌐 语言切换功能 / Language Switching

### HTML 结构
```html
<div class="language-switcher">
    <select class="lang-select" id="lang-select">
        <option value="en">English</option>
        <option value="zh">中文</option>
    </select>
</div>
```

### JavaScript 实现
1. **Cookie 存储**: 使用 `setCookie()` 和 `getCookie()` 函数保存用户语言偏好
2. **自动加载**: 页面加载时自动读取 cookie 并应用保存的语言
3. **有效期**: Cookie 有效期为 365 天

### 添加新语言步骤
1. 在 `languageData` 对象中添加新语言的翻译
2. 在 HTML 的 `<select>` 中添加新的 `<option>`
3. 在 `switchLanguage()` 函数中为新元素添加对应的 ID

## 🎯 使用方法 / Usage

### 在新页面中使用样式
```html
<link rel="stylesheet" href="style.css">
```

### 添加新的内容区块
```html
<section class="content-section">
    <h2 class="section-title" id="your-title">Your Title</h2>
    <!-- 你的内容 -->
</section>
```

### 添加新的项目卡片
```html
<div class="project-card">
    <i class="fas fa-icon project-icon"></i>
    <h3 class="project-title" id="project-title">Project Name</h3>
    <p class="project-desc" id="project-desc">Description</p>
    <a href="#" class="project-link" id="project-link">Link</a>
</div>
```

## 🎨 颜色方案 / Color Scheme

- **主色调**: `#4a6ee0` (蓝色)
- **深色文字**: `#2c3e50`
- **浅色文字**: `#555`, `#666`
- **背景渐变**: `#f5f7fa` → `#c3cfe2`
- **卡片背景**: `#f8f9ff`
- **边框颜色**: `#eaefff`

## 📱 响应式断点 / Responsive Breakpoints

- **移动端**: `max-width: 768px`
- **桌面端**: `> 768px`

## 💡 提示 / Tips

1. 所有需要多语言的元素都应该有唯一的 `id`
2. 在 `languageData` 对象中为每个 `id` 添加对应的翻译
3. 使用 Font Awesome 图标库提供图标支持
4. 保持一致的圆角 (`border-radius: 15px` 或 `30px`)
5. 使用 `transition` 属性添加平滑的动画效果
