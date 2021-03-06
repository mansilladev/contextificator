YUI.add('CFDataBoss', function (Y) {

    /**
     @class CFContextAnalyse
     Analyses text or page using Yahoo! Context Analysis API
     */

    Y.CFDataBoss = Y.Base.create('CFDataBoss', Y.Base, [], {



        /**
         Will run BOSS on url passed
         @param {String} text to search
         */
        text: function (str, oCfg) {


            var cfg = oCfg || {},
                ob = {
                    q: str,
                    service: cfg.service || 'web',
                    count: cfg.count || 2
                }
            this._getContentAnalysis(ob);
        },

        /**
         Runs the YQL query
         @param {Object}  Keys 'text' or 'url'
         */
        _getContentAnalysis: function (oCfg) {
            
            var query = "select * from boss.search where service='{service}' and q='{q}' and count='{count}' and " +
                    "ck='dj0yJmk9YWF3ODdGNWZPYjg2JmQ9WVdrOWVsWlZNRk5KTldFbWNHbzlNVEEyTURFNU1qWXkmcz1jb25zdW1lcnNlY3JldCZ4PTUz'" + 
                    " and secret='a3d93853ba3bad8a99a175e8ffa90a702cd08cfa'" +
                    " and filter='-porn' and abstract='long'";
            
            query = Y.Lang.sub(query, oCfg);
            
            Y.YQL(query, Y.bind(this._parse, this, oCfg.service));
        
        },

        /**
         Parses the YQL return data
         @param {Object} o Response object
         */
        _parse: function (service, o) {

            var res;

            try {
                res = o.query.results.bossresponse;
                if (res.responsecode !== "200") {
                    this.fire("error", {msg: "Response code " + res.responsecode + " suggests a problem."});
                } else {
                    this.fire("results", {results: o.query, service: service});

                    this.fire(service + "results", {results: res[service]});
                }

            } catch (e) {
                this.fire("error", {msg: "Results could not be extracted", resp: o});
            }


        }


    }, {
        ATTRS: {
        }
    })


}, '0.0.1', {
    requires: ['yql']
});