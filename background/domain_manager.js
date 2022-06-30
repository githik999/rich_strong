class DomainManager {
    #white_list;
    #block_list;
    #dns_list;

    constructor() {
        this.#white_list = {}
        this.#block_list = {}
        this.#dns_list = {}
    }

    white(domain) {
        if( domain.endsWith('.cn') ) { return true }
        if( this.#white_list[domain] ) { return true }
    }

    add_to_white_list(domain) {
        this.#white_list[domain] = true
        console.log('add_to_white_list',domain)
    }

    block(domain) {
        if( this.#block_list[domain] ) { return true }
    }

    add_to_block_list(domain) {
        this.#block_list[domain] = true
        console.log('add_to_block_list',domain)
    }

    dns(domain,url) {
        if( this.#dns_list[domain] ){ return }
        this.#dns_list[domain] = true

        browser.dns.resolve(domain).then(record => {
            if( IP.inside_china(record.addresses[0]) ) {
                this.add_to_white_list(domain)
            } else {
                this.add_to_block_list(domain)
            }
        })
    }

       
}