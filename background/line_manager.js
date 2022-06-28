class LineManager {
    #line_list;
    
    constructor() {
        this.#line_list = {}
        setInterval(() => {this.tick()},CHECK_TICK)
    }
    
    new_line(info) {
        const domain = CTL.get_domain(info.url)
        if( CTL.in_block_list(domain) ){ return }
        if( info.tabId <= 0 ){ return }
        const line = new Line(info)
        this.insert(line)
    }

    insert(line) {
        if( this.exist(line.id) ) { return }
        this.#line_list[line.id] = line
        console.log(`add to loading list[${line.id},${line.url}]`)
    }

    remove(id) {
        if( !this.exist(id) ) { return }
        delete this.#line_list[id]
        console.log(`remove from loading list[${id}]`)
    }

    exist(id) {
        if( this.#line_list[id] ) { return true }
    }

    tick() {
        for ( const id in this.#line_list ) {
            this.#line_list[id].tick()
        }
    }
}