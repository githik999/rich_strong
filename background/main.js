var IP = new IpManager()
var DM = new DomainManager()

browser.proxy.onRequest.addListener(onProxyRequest, {urls: ["<all_urls>"]})

function onProxyRequest(info) {
    const domain = url_to_domain(info.url)
    if ( DM.white(domain) ) {
        //console.log(`direct: ${info.url}`)
        return {type: "direct"}
    }
    if( DM.block(domain) ) {
        //console.log(`proxy: ${info.url}`)
    } else {
        DM.dns(domain,info.url)
    }
    
    return { proxyDNS:true, type: "socks", host: "127.0.0.1", port: 1080 }
}

function url_to_domain(url) {
    return new URL(url).hostname
}