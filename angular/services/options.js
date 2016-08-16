app.service('OptionsService', ['$translate',
    function ($translate) {
        this.getActivityTypeOptions = function (namespace, resolve) {
            var ns = namespace + '.activityTypes.';
            var keys = ['operational', 'advocacy', 'hybrid', 'na'];
            $translate(keys).then(function (translations) {
                var retVals = [];
                keys.map(function (key) {
                    var item = {};
                    item.value = ns + key;
                    item.label = translations[ns + key];
                    retVals.push(item);
                });
                resolve(retVals);
            });
        }
    }
]);