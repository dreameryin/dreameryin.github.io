/* 正文字号切换：默认(16px) / 大(18px) / 超大(20px)
 * 选择写入 localStorage，对所有文章页生效（gov.cn 同款交互） */
(function () {
  var content = document.querySelector('.post-content');
  var buttons = document.querySelectorAll('.font-switch button[data-size]');
  if (!content || buttons.length === 0) {
    return;
  }

  var sizeClasses = {
    'default': '',
    'large': 'font-large',
    'xlarge': 'font-xlarge'
  };

  function apply(size) {
    content.classList.remove('font-large', 'font-xlarge');
    if (sizeClasses[size]) {
      content.classList.add(sizeClasses[size]);
    }
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute('data-size') === size) {
        buttons[i].classList.add('active');
      } else {
        buttons[i].classList.remove('active');
      }
    }
    try {
      localStorage.setItem('post-font-size', size);
    } catch (e) {}
  }

  var saved = 'default';
  try {
    saved = localStorage.getItem('post-font-size') || 'default';
  } catch (e) {}
  if (!sizeClasses.hasOwnProperty(saved)) {
    saved = 'default';
  }
  apply(saved);

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      apply(this.getAttribute('data-size'));
    });
  }
})();
