/*
 * 站内搜索：读取 search.json 文章索引，按关键词匹配标题/分类/摘要，关键词红色高亮。
 * 零依赖原生 JS，文章 push 后索引由 Jekyll 自动重建，无需维护。
 */
(function () {

  // 从地址栏取 ?q= 参数
  function getQueryKeyword() {
    var params = new URLSearchParams(window.location.search);
    var keyword = params.get("q");
    if (keyword === null) {
      return "";
    }
    return keyword.trim();
  }

  // HTML 转义，防止索引内容里的特殊字符破坏页面
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // 转义正则特殊字符
  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // 关键词高亮（先转义再包高亮标签）
  function highlightKeyword(text, keyword) {
    var escapedText = escapeHtml(text);
    if (keyword === "") {
      return escapedText;
    }
    var pattern = new RegExp("(" + escapeRegExp(escapeHtml(keyword)) + ")", "gi");
    return escapedText.replace(pattern, '<span class="hl">$1</span>');
  }

  var keyword = getQueryKeyword();
  var countElement = document.getElementById("search-count");
  var resultsElement = document.getElementById("search-results");
  var pageInput = document.getElementById("search-page-input");

  // 回填搜索框（搜索页大输入框 + 页头小输入框）
  pageInput.value = keyword;
  var headerInput = document.querySelector(".header-search input");
  if (headerInput !== null) {
    headerInput.value = keyword;
  }

  if (keyword === "") {
    countElement.textContent = "请输入关键词开始搜索";
    return;
  }

  fetch("/search.json")
    .then(function (response) { return response.json(); })
    .then(function (posts) {
      var lowerKeyword = keyword.toLowerCase();
      var matchedPosts = [];
      for (var index = 0; index < posts.length; index++) {
        var post = posts[index];
        var haystack = (post.title + " " + post.categories + " " + post.excerpt).toLowerCase();
        if (haystack.indexOf(lowerKeyword) !== -1) {
          matchedPosts.push(post);
        }
      }

      countElement.textContent = "相关结果：约 " + matchedPosts.length + " 篇";

      if (matchedPosts.length === 0) {
        resultsElement.innerHTML = '<p class="empty-tip">没有找到相关文章，换个关键词试试。</p>';
        return;
      }

      var html = "";
      for (var resultIndex = 0; resultIndex < matchedPosts.length; resultIndex++) {
        var matchedPost = matchedPosts[resultIndex];
        html += '<div class="search-result-item">'
          + '<a class="result-title" href="' + matchedPost.url + '">'
          + highlightKeyword(matchedPost.title, keyword)
          + '</a>'
          + '<p class="result-excerpt">' + highlightKeyword(matchedPost.excerpt, keyword) + '</p>'
          + '<p class="result-date">发布时间：' + matchedPost.date + '</p>'
          + '</div>';
      }
      resultsElement.innerHTML = html;
    })
    .catch(function () {
      countElement.textContent = "搜索索引加载失败，请稍后重试。";
    });

})();
