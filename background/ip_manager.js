class IpManager {
    
    inside_china(ip) {
        let num = this.to_number(ip)
        for (const v of china_route) {
            if( num > v[0] && num < v[1] ) {
                return true
            }
        }
        return false
    }

    to_number(ip) {
        let ret = 0
        let vec = ip.split('.')
        for (const key in vec) 
        {
            let m = vec[key] * Math.pow(2,8*(3-key))
            ret += m
        }
        return ret
    }
}