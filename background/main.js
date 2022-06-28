var CTL = new Controller()
var lineManager = new LineManager()

browser.webRequest.onBeforeSendHeaders.addListener(onMark,{urls: ["<all_urls>"]})
browser.webRequest.onHeadersReceived.addListener(onEstablish,{urls: ["<all_urls>"]})
browser.proxy.onRequest.addListener(onProxyRequest, {urls: ["<all_urls>"]})


function onMark(info) {
    //set_tab_url(info)
    lineManager.new_line(info)
    
}

function onEstablish(info) {
    //set_tab_ip(info)
    lineManager.remove(info.requestId)
}

function onProxyRequest(info) {
    const domain = CTL.get_domain(info.url)
    if( CTL.in_block_list(domain) ) {
        return {proxyDNS:true, type: "socks", host: SOCKS5_IP, port: SOCKS5_PORT}
    }
    return {type: "direct"}
}


