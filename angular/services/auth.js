app.service('AuthService', ['$http', '$window', 'jwtHelper',
    function ($http, $window, jwtHelper) {
        this.login = function (username, password, sname) {
            return $http.post('/auth/login', {
                uname: username,
                pword: password,
                sname: sname || ''
            });
        };
        this.reset = function (uname, current, newP, newAgain) {
            return $http.post('/auth/reset', {
                uname: uname,
                current: current,
                newP: newP,
                newAgain: newAgain
            });
        };

        this.saveToken = function (token) {
            $window.localStorage['jwtToken'] = token;
            var tokenPayload = jwtHelper.decodeToken(token);
            $window.localStorage['jwtToken_sname'] = tokenPayload._doc.orgId;
            $window.localStorage['jwtToken_uid'] = tokenPayload._doc._id;
        };

        this.getToken = function () {
            return $window.localStorage['jwtToken'];
        };

        this.getDecodedToken = function(){
            return jwtHelper.decodeToken($window.localStorage['jwtToken']);
        };

        this.validToken = function () {
            var token = this.getToken();
            if (typeof token != 'undefined')
                return !jwtHelper.isTokenExpired(token);
            else return false;
        };

        this.validSname = function (sname) {
            if (sname != "") {
                return $window.localStorage['jwtToken_sname'] == sname;
            }

            return true;
        }

    }
]);