(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{46:function(e,t,o){"use strict";o.r(t);var i=o(0),r=function(e){var t,o,i=((t={}).internal=o=void 0,t.contentType="markdown",t.slug="tag-plugins",t.content=o,t.layout="article",t.title="Tag Plugins",t.date="2013-12-25 00:14:39",t.tags=null,t.markdownHeadings=[{text:"Block Quote",slug:"block-quote",level:2},{text:"Normal blockquote",slug:"normal-blockquote",level:3},{text:"Quote from a book",slug:"quote-from-a-book",level:3},{text:"Quote from Twitter",slug:"quote-from-twitter",level:3},{text:"Quote from an article on the web",slug:"quote-from-an-article-on-the-web",level:3},{text:"Code Block",slug:"code-block",level:2},{text:"Normal code block",slug:"normal-code-block",level:3},{text:"With caption",slug:"with-caption",level:3},{text:"With caption and URL",slug:"with-caption-and-url",level:3},{text:"With marked lines",slug:"with-marked-lines",level:3},{text:"Gist",slug:"gist",level:3},{text:"jsFiddle",slug:"jsfiddle",level:3},{text:"Pullquote",slug:"pullquote",level:2},{text:"Left",slug:"left",level:3},{text:"Right",slug:"right",level:3}],t.excerpt='<p>This post is used for testing tag plugins. See <a href="http://zespia.tw/hexo/docs/tag-plugins.html" target="_blank" rel="noopener noreferrer noopener noreferrer">docs</a> for more info.</p>\n',t.createdAt=new Date(1387901679e3),t.updatedAt=new Date(1566643106895),t.type="post",t.permalink="/2013/12/25/tag-plugins",t.assets={},t.attributes=t,t),r=e.options.beforeCreate||[];e.options.beforeCreate=[function(){this.$page=i}].concat(r);["layout","transition"].forEach(function(t){var o=e.options.PageComponent;o&&(e.options[t]=o[t]),void 0===e.options[t]&&(e.options[t]=i[t])}),e.options.name="page-wrapper-"+i.slug.replace(/[^0-9a-z\-]/i,"-")},a=Object(i.a)({},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("layout-manager",[o("p",[e._v("This post is used for testing tag plugins. See "),o("a",{attrs:{href:"http://zespia.tw/hexo/docs/tag-plugins.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("docs")]),e._v(" for more info.")]),e._v(" "),o("h2",{attrs:{id:"block-quote"}},[e._v("Block Quote")]),e._v(" "),o("h3",{attrs:{id:"normal-blockquote"}},[e._v("Normal blockquote")]),e._v(" "),o("blockquote",[o("p",[e._v("Praesent diam elit, interdum ut pulvinar placerat, imperdiet at magna.")])]),e._v(" "),o("h3",{attrs:{id:"quote-from-a-book"}},[e._v("Quote from a book")]),e._v(" "),o("p",[e._v("{% blockquote David Levithan, Wide Awake %}\nDo not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.\n{% endblockquote %}")]),e._v(" "),o("h3",{attrs:{id:"quote-from-twitter"}},[e._v("Quote from Twitter")]),e._v(" "),o("p",[e._v("{% blockquote @DevDocs "),o("a",{attrs:{href:"https://twitter.com/devdocs/status/356095192085962752",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://twitter.com/devdocs/status/356095192085962752")]),e._v(" %}\nNEW: DevDocs now comes with syntax highlighting. "),o("a",{attrs:{href:"http://devdocs.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://devdocs.io")]),e._v("\n{% endblockquote %}")]),e._v(" "),o("h3",{attrs:{id:"quote-from-an-article-on-the-web"}},[e._v("Quote from an article on the web")]),e._v(" "),o("p",[e._v("{% blockquote Seth Godin "),o("a",{attrs:{href:"http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html")]),e._v(" Welcome to Island Marketing %}\nEvery interaction is both precious and an opportunity to delight.\n{% endblockquote %}")]),e._v(" "),o("h2",{attrs:{id:"code-block"}},[e._v("Code Block")]),e._v(" "),o("h3",{attrs:{id:"normal-code-block"}},[e._v("Normal code block")]),e._v(" "),o("div",{pre:!0,attrs:{class:"saber-highlight","data-lang":""}},[o("pre",{pre:!0,attrs:{class:"saber-highlight-code language-text"}},[o("code",{pre:!0,attrs:{class:"language-text"}},[e._v("alert('Hello World!');")])])]),o("h3",{attrs:{id:"with-caption"}},[e._v("With caption")]),e._v(" "),o("p",[e._v("{% codeblock Array.map %}\narray.map(callback[, thisArg])\n{% endcodeblock %}")]),e._v(" "),o("h3",{attrs:{id:"with-caption-and-url"}},[e._v("With caption and URL")]),e._v(" "),o("p",[e._v("{% codeblock .compact "),o("a",{attrs:{href:"http://underscorejs.org/#compact",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://underscorejs.org/#compact")]),e._v(" Underscore.js %}\n.compact([0, 1, false, 2, ‘’, 3]);\n=> [1, 2, 3]\n{% endcodeblock %}")]),e._v(" "),o("h3",{attrs:{id:"with-marked-lines"}},[e._v("With marked lines")]),e._v(" "),o("p",[e._v("Line 1,7-8,10 should be marked with different color.")]),e._v(" "),o("p",[e._v("{% codeblock lang:js mark:1,7-8,10 %}\nconst http = require('http');")]),e._v(" "),o("p",[e._v("const hostname = '127.0.0.1';\nconst port = 1337;")]),e._v(" "),o("p",[e._v("http.createServer((req, res) => {\nres.writeHead(200, { 'Content-Type': 'text/plain' });\nres.end('Hello World\\n');\n}).listen(port, hostname, () => {\nconsole.log("),o("code",{pre:!0},[e._v("Server running at http://${hostname}:${port}/")]),e._v(");\n});\n{% endcodeblock %}")]),e._v(" "),o("p",[e._v("Note: Theme's style should support "),o("code",{pre:!0},[e._v(".highlight.line.marked")]),e._v(" (recommend to use the selection or current line color).")]),e._v(" "),o("h3",{attrs:{id:"gist"}},[e._v("Gist")]),e._v(" "),o("p",[e._v("{% gist 996818 %}")]),e._v(" "),o("h3",{attrs:{id:"jsfiddle"}},[e._v("jsFiddle")]),e._v(" "),o("p",[e._v("{% jsfiddle ccWP7 %}")]),e._v(" "),o("h2",{attrs:{id:"pullquote"}},[e._v("Pullquote")]),e._v(" "),o("h3",{attrs:{id:"left"}},[e._v("Left")]),e._v(" "),o("p",[e._v("{% pullquote left %}\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n{% endpullquote %}")]),e._v(" "),o("p",[e._v("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus molestie arcu, et fringilla mauris placerat ac. Nullam luctus bibendum risus. Ut cursus sed ipsum feugiat egestas. Suspendisse elementum, velit eu consequat consequat, augue lorem dapibus libero, eget pulvinar dolor est sit amet nulla. Suspendisse a porta tortor, et posuere mi. Pellentesque ultricies, mi quis volutpat malesuada, erat felis vulputate nisl, ac congue ante tortor ut ante. Proin aliquam sem vel mauris tincidunt, eget scelerisque tortor euismod. Nulla tincidunt enim nec commodo dictum. Mauris id sapien et orci gravida luctus id ut dui. In vel vulputate odio. Duis vel turpis molestie, scelerisque enim eu, lobortis eros. Cras at ipsum gravida, sagittis ante vel, viverra tellus. Nunc mauris turpis, elementum ullamcorper nisl pretium, ultrices cursus justo. Mauris porttitor commodo eros, ac ornare orci interdum in. Cras fermentum cursus leo sed mattis. In dignissim lorem sem, sit amet elementum mauris venenatis ac.")]),e._v(" "),o("h3",{attrs:{id:"right"}},[e._v("Right")]),e._v(" "),o("p",[e._v("{% pullquote right %}\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n{% endpullquote %}")]),e._v(" "),o("p",[e._v("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ligula justo, lobortis sit amet semper vel, dignissim sit amet libero. Praesent ac tempus ligula. Maecenas at gravida odio. Etiam tristique volutpat lacus eu faucibus. Donec non tempus arcu. Phasellus adipiscing, mauris nec mollis egestas, ipsum nunc auctor velit, et rhoncus lorem ipsum at ante. Praesent et sem in velit volutpat auctor. Duis vel mauris nulla. Maecenas mattis interdum ante, quis sagittis nibh cursus et. Nulla facilisi. Morbi convallis gravida tortor, ut fermentum enim gravida et. Nunc vel dictum nisl, non ultrices libero. Proin vestibulum felis eget orci consectetur lobortis. Vestibulum augue nulla, iaculis vitae augue vehicula, dignissim ultrices libero. Sed imperdiet urna et quam ultrices tincidunt nec ac magna. Etiam vel pharetra elit.")])])},[],!1,null,null,null);"function"==typeof r&&r(a);t.default=a.exports}}]);