(function (parentWin, parentDoc) {

    var iframe = parentDoc.createElement('iframe'),
        ifrDoc,
        html = '<html><head><title>Welcome to the Contextificator</title>' + 
            '<script src="http://yui.yahooapis.com/3.9.1/build/yui/yui-min.js"></script>' +
            '<link rel="stylesheet" type="text/css" href="http://localhost/yh2013/css/ifr.css"/>' +
            '</head><body><div id="contxt-container"></div>' +
            '<script src="http://localhost/yh2013/goContext.js"></script>' + 
            '</body></html>';

    iframe.style.cssText = "right:0; width:15%; min-height:100%; border:0; background-color:rgba(20,20,20,0.67);top:0;position:fixed;z-index:99999";
    iframe.id = 'contextificator-' + (new Date().getTime());

    
    parentDoc.body.appendChild(iframe);

    ifrDoc = iframe.contentWindow.document;
    ifrDoc.open();
    ifrDoc.write(html);
    ifrDoc.close();

    parentWin.CONTEXTIFICATOR.Bookmarklet.loaded = true;
    parentWin.CONTEXTIFICATOR.Bookmarklet.iframeId = iframe.id;


        
}(window, window.document));