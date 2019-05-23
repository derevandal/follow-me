const FollowMe = (function () {
    function getQueries (url) {
        var vars = {}
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
            vars[key] = decodeURI(value)
        });
        return vars;
    }
    function update (string) {
        this.element.value = JSON.stringify(string)
    }

    function queriesByReferrer () {
        const hostname =
            'URL' in window
                ? new URL(referrer).hostname.replace(/((www|^m).)/gm, '')
                : referrer.replace(/((www|^m).)/gm, '')
        const response = { utm_source: hostname, utm_medium: 'referral' }
        if (/(google|bing|duckgo)/g.test(hostname)) response.utm_medium = 'organic'
        else if (/(facebook|twitter|linkedin|youtube|instgram)/g.test(hostname))
            response.utm_medium = 'social'
        return response
    }

    return {
        init: (id) => {
            const { referrer } = document
            const query = getQueries(window.location.href)
            this.element = document.getElementById(id)

            if (query.utm_source && query.utm_medium) return update(query)
            if (referrer) return update(queriesByReferrer())
            return update({
                utm_source: 'direct',
                utm_medium: '(not set)'
            })
        }
    }
})();
