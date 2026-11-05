# 大家好我是尹煜同学

个人技术博客，基于 Jekyll + GitHub Pages。线上地址：https://dreameryin.github.io/

---

## 一、发新文章（日常唯一要做的事）

**最省事的方式：复制模板**

1. 复制 `_templates/年-月-日-文章标题.md` 到对应分类文件夹：

   ```
   _posts/
   ├── 人工智能/     ← AI 类文章放这里
   ├── 虚幻引擎/     ← UE 类文章放这里
   ├── Unity引擎/    ← Unity 类文章放这里
   └── 软件架构/     ← 架构类文章放这里
   ```

2. 重命名为：`年-月-日-标题.md`，例如 `2026-11-05-我的文章标题.md`
   - **日期前缀必须有**（Jekyll 识别文章的硬性规则）
   - 横线后面随意命名，**直接用中文标题就行**，它会成为文章网址的一部分（如 `/202611/我的文章标题.html`）

3. 头部只需填 `title` 一行，其他可选字段模板里有注释说明；**分类不用写**，由 _config.yml 按所在文件夹自动注入。

4. 用 Markdown 写正文，写完删掉模板里的使用说明注释块。

5. 提交发布：

   ```bash
   git add .
   git commit -m "新文章：文章标题"
   git push
   ```

   约 1 分钟后线上自动更新（首页、列表页、搜索索引全部自动刷新）。

## 二、front matter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| ~~`categories`~~ | 否 | **不用写**，由 _config.yml 的 defaults 按所在子文件夹自动注入 |
| ~~`date`~~ | 否 | **不用写**，发布日期取文件名里的日期 |
| `featured` | 否 | 写 `featured: true` 即进入首页焦点区轮播（最近 3 篇带此标记的文章参与轮播，自动切换） |
| `image` | 否 | 焦点区配图路径。不写则自动用 `assets/images/featured/default.svg`；文件夹里预置了 ai/ue/unity/architecture 等主题图，可指定，如 `image: /assets/images/featured/ue.svg` |
| `summary` | 否 | 文章一句话摘要，显示在首页头条大标题下方。不写则自动截取正文第一段（限 90 字） |
| `permalink` / `hidden` | 否 | 页面级控制字段（网址写死/不进任何列表），**写文章永远不用碰**，目前只有「关于我」在用 |

## 三、文章里插图 / 视频 / 代码

| 内容 | 写法 |
|------|------|
| 图片 | 图片放 `assets/images/posts/<分类>/`，文件名加文章名前缀防重名（如 `引擎安装-1.png`），正文写 `![描述](/assets/images/posts/虚幻引擎/引擎安装-1.png)` |
| 站内视频（mp4） | `<video src="/assets/videos/demo.mp4" controls width="100%"></video>` |
| B站视频 | 直接粘贴 B 站分享的 iframe 嵌入代码（Markdown 可混写 HTML） |
| 代码块 | 三个反引号 + 语言名（如 ` ```csharp `），自动语法高亮 |

## 四、新增分类（如"技术美术"）

四步：

1. `_config.yml` 的 `sections:` 下加一项：

   ```yaml
   - slug: ta
     name: 技术美术
   ```

2. `_config.yml` 的 `defaults:` 下加一条分类注入规则（与该分类的文件夹同名）：

   ```yaml
   - scope:
       path: "_posts/技术美术"
     values:
       categories: ["技术美术"]
   ```

3. 在 `categories/` 目录复制 `ai.html` 为 `ta.html`，改里面两行：

   ```yaml
   title: 技术美术
   section_name: 技术美术
   ```

4. 在 `_posts/` 下新建子文件夹 `技术美术/`（该分类的文章以后放这里）。

push 后导航、首页栏目块、分类页自动出现。

## 五、其他常用修改

| 需求 | 改哪里 |
|------|--------|
| 改博客名 | `_config.yml` 的 `title` |
| 改页脚 | `_layouts/default.html` 底部的 footer |
| 改关于我 | `_posts/关于我/2025-11-04-about.md`（头部带 `hidden: true`，不会出现在任何文章列表；`permalink: /about.html` 保证网址不变） |
| 改配色样式 | `assets/css/style.css` |

## 六、本地预览（可选，不装也不影响使用）

GitHub 服务器会自动构建，本地不是必须预览。如需本地预览：安装 Ruby 后在项目根目录执行 `jekyll serve`，访问 http://localhost:4000。
