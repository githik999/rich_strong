class Controller {
    #block_list;
    
    constructor() {
        this.#block_list = {}
    }

    in_block_list(domain) {
        const hit = (keyword) => domain.includes(keyword)
        if( BLACK_DOMAIN_KEYWORD.some(hit) ) { return true }
        if( CTL.#block_list[domain] ) { return true }
    }

    add_block(domain) {
        if( domain.endsWith('.cn') ) { return }
        if( CTL.in_block_list(domain) ) { return }
        CTL.#block_list[domain] = true
        console.log(`add to block list[${domain}]`)
    }
    
    
    get_domain(url) {
        return new URL(url).hostname
    }
}