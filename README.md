# 大家好我是尹煜同学

个人技术博客，基于 Jekyll + GitHub Pages。线上地址：https://dreameryin.github.io/

---

## 一、发新文章（日常唯一要做的事）

1. 在 `_posts/` 目录新建文件，文件名格式：

   ```
   2026-11-04-wen-zhang-ming.md
   （日期 + 拼音或英文短横线，这段决定文章网址）
   ```

2. 文件开头写元信息（front matter）：

   ```yaml
   ---
   title: 文章标题
   categories: [软件架构]
   ---
   ```

3. 下面用 Markdown 写正文。

4. 提交发布：

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
| `categories` | 是 | 分类，只能填已存在的栏目名：人工智能 / 虚幻引擎 / Unity 引擎 / 软件架构 |
| `featured` | 否 | 写 `featured: true` 即进入首页焦点区轮播（最近 3 篇带此标记的文章参与轮播，自动切换） |
| `image` | 否 | 焦点区配图路径。不写则自动用 `assets/images/featured/default.svg`；文件夹里预置了 ai/ue/unity/architecture 等主题图，可指定，如 `image: /assets/images/featured/ue.svg` |
| `summary` | 否 | 文章一句话摘要，显示在首页头条大标题下方。不写则自动截取正文第一段（限 90 字） |

## 三、文章里插图 / 视频 / 代码

| 内容 | 写法 |
|------|------|
| 图片 | 图片放到 `assets/images/`，正文写 `![描述](/assets/images/xxx.png)` |
| 站内视频（mp4） | `<video src="/assets/videos/demo.mp4" controls width="100%"></video>` |
| B站视频 | 直接粘贴 B 站分享的 iframe 嵌入代码（Markdown 可混写 HTML） |
| 代码块 | 三个反引号 + 语言名（如 ` ```csharp `），自动语法高亮 |

## 四、新增分类（如"技术美术"）

两步，共改不到 5 行：

1. `_config.yml` 的 `sections:` 下加一项：

   ```yaml
   - slug: ta
     name: 技术美术
   ```

2. 在 `categories/` 目录复制 `ai.html` 为 `ta.html`，改里面两行：

   ```yaml
   title: 技术美术
   section_name: 技术美术
   ```

push 后导航、首页栏目块、分类页自动出现。

## 五、其他常用修改

| 需求 | 改哪里 |
|------|--------|
| 改博客名 | `_config.yml` 的 `title` |
| 改页脚 | `_layouts/default.html` 底部的 footer |
| 改关于我 | `about.md` |
| 改配色样式 | `assets/css/style.css` |

## 六、本地预览（可选，不装也不影响使用）

GitHub 服务器会自动构建，本地不是必须预览。如需本地预览：安装 Ruby 后在项目根目录执行 `jekyll serve`，访问 http://localhost:4000。
