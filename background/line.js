class Line {
    id;#tid;#url;
    #bornTime;#type;
    constructor(info) {
        this.id = info.requestId
        this.tid = info.tabId
        this.url = info.url
        this.bornTime = info.timeStamp
        this.type = info.type
    }

    tick() {
        if( this.too_old() ) {
            this.go_die()
        }
    }

    too_old() {
        if( Date.now() - this.bornTime > PATIENCE ){ return true }
    }

    go_die() {
        const domain = CTL.get_domain(this.url)
        CTL.add_block(domain)
        lineManager.remove(this.id)
    }
}