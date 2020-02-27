exports.getDocument = html =>
  html
    .replace(
      'width=device-width, initial-scale=1.0',
      'width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover'
    )
    .replace('<html data-saber-ssr>', '<html lang=zh-Hans data-saber-ssr>')
    .replace('</head>', `<!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-159221418-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-159221418-1');
    </script>`)
