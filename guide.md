# guide

0. background.js: 会一直运行。是 panels, contentScript 和 backend 的服务中心。

- 加载 contentScript.js 文件
  > content scripts 的作用：除了可以访问页面的上下文对象（如 window/document），还能够访问 chrome runtime 接口（https://developer.chrome.com/docs/extensions/mv2/content_scripts）
  > 有两种方式加载 contentScript.js 文件：https://developer.chrome.com/docs/extensions/mv2/content_scripts/#functionality
  > 这里采用的是 “以编程的方式” 加载 contentScript.js（在 background.js 中加载）

1. contentScript.js: 充当 panel 和 backend 的代理。

- 每隔 500ms ping 一次 backend，直到 backend 响应。（确保 backend 准备就绪）

2. 在 panel-loader.html 中会加载 panel-loader.js

3. panel-loader.js: 检测 **MOBX_DEVTOOLS_GLOBAL_HOOK**，判断 Mobx 是否存在。如果存在，就在 devtools 中创建一个 Mobx 的 panel（panel.html）。

4. 在 panel.html 中会加载 panel.jsx

5. panel.jsx: 渲染 Mobx devtools 界面。

在渲染时，会进行以下操作：

- 通过 `chrome.devtools.inspectedWindow.eval` 方法，在 `页面的上下文` 中执行 js 代码。在 js 代码中，会加载 `backend.js` 文件。

6. backend.js: 会等待和 contentScript.js ping 通，确保 “建立连接”。“建立连接” 后，会拿到 **MOBX_DEVTOOLS_GLOBAL_HOOK** 初始化后端（initBackend）。
