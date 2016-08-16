app.service('OptionsService', ['$translate',
    function ($translate) {
        this.getActivityTypeOptions = function (namespace, resolve) {
            var ns = namespace + '.activityTypeOptions.';
            var keys = ['operational', 'advocacy', 'hybrid', 'na'];
            this.translateData(ns,keys,resolve);
        };

        this.getCategoryOptions = function(namespace,resolve){
            var ns = namespace + '.categoryOptions.';
            var keys = ['philanthropy','voluntary','social services','education','research','culture','health','arts','sports','recreation','environmental-protection','rights','defense','economic-development','womens-rights','gender-equality','business-interests','international-cooperation','na'];
            this.translateData(ns,keys,resolve);
        };

        this.getOrientationOptions = function(namespace,resolve){
            var ns = namespace + '.orientationOptions.';
            var keys = ['charitable','service','participatory','empowering','na'];
            this.translateData(ns,keys,resolve);
        };

        this.getOperationLevelOptions = function(namespace,resolve){
            var ns = namespace + '.operationLevelOptions.';
            var keys = ['local-community','national','international'];
            this.translateData(ns,keys,resolve);
        };

        this.getSkillsOptions = function(namespace,resolve){
            var ns = namespace + '.skillsOptions.';
            var keys = ['verbal-communication','teamwork','creativity','initiative-motivation','written-communication','planning-organization','flexibility','time-management','leadership','active-listening','tasks-prioritization','influence','team-building','resilience','energy-enthusiasm'];
            this.translateData(ns,keys,resolve);
        };

        this.translateData = function(ns,keys,resolve){
            $translate(keys.map(function(key){return ns + key})).then(function (translations) {
                var retVals = [];
                keys.map(function (key) {
                    var item = {};
                    item.value = ns + key;
                    item.label = translations[ns + key];
                    retVals.push(item);
                });
                resolve(retVals);
            });
        };
    }
]);