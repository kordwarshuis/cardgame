// https://stackoverflow.com/a/59329495
// input can be json string or object
export function fixJSON(json) {
    function bulkRegex(str, callback) {
        if (callback && typeof callback === 'function') {
            return callback(str);
        } else if (callback && Array.isArray(callback)) {
            for (var i = 0; i < callback.length; i++) {
                if (callback[i] && typeof callback[i] === 'function') {
                    str = callback[i](str);
                } else {
                    break;
                }
            }
            return str;
        }
        return str;
    }

    if (json && json !== '') {
        if (typeof json !== 'string') {
            try {
                json = JSON.stringify(json);
            } catch (e) {
                return false;
            }
        }

        if (typeof json === 'string') {
            json = bulkRegex(json, false, [function (str) {
                return str.replace(/[\n\t]/gm, '');
            }, function (str) {
                return str.replace(/,\}/gm, '}');
            }, function (str) {
                return str.replace(/,\]/gm, ']');
            }, function (str) {
                str = str.split(/(?=[,\}\]])/g);
                str = str.map(function (s) {
                    if (s.includes(':') && s) {
                        var strP = s.split(/:(.+)/, 2);
                        strP[0] = strP[0].trim();

                        if (strP[0]) {
                            var firstP = strP[0].split(/([,\{\[])/g);
                            firstP[firstP.length - 1] = bulkRegex(firstP[firstP.length - 1], false, function (p) {
                                return p.replace(/[^A-Za-z0-9\-_]/, '');
                            });
                            strP[0] = firstP.join('');
                        }

                        var part = strP[1].trim();

                        if (part.startsWith('"') && part.endsWith('"') || part.startsWith('\'') && part.endsWith(
                                '\'') || part.startsWith('`') && part.endsWith('`')) {
                            part = part.substr(1, part.length - 2);
                        }

                        part = bulkRegex(part, false, [function (p) {
                            return p.replace(/(["])/gm, '\\$1');
                        }, function (p) {
                            return p.replace(/\\'/gm, '\'');
                        }, function (p) {
                            return p.replace(/\\`/gm, '`');
                        }]);
                        strP[1] = ('"' + part + '"').trim();
                        s = strP.join(':');
                    }

                    return s;
                });
                return str.join('');
            }, function (str) {
                return str.replace(/(['"])?([a-zA-Z0-9\-_]+)(['"])?:/g, '"$2":');
            }, function (str) {
                str = str.split(/(?=[,\}\]])/g);
                str = str.map(function (s) {
                    if (s.includes(':') && s) {
                        var strP = s.split(/:(.+)/, 2);
                        strP[0] = strP[0].trim();

                        if (strP[1].includes('"') && strP[1].includes(':')) {
                            var part = strP[1].trim();

                            // dont need this and now it works in more browsers
                            // if (part.startsWith('"') && part.endsWith('"')) {
                            //   part = part.substr(1, part.length - 2);
                            //   part = bulkRegex(part, false, function (p) {
                            //     return p.replace(/(?<!\\)"/gm, '');// only works in Chrome, KD
                            //   });
                            // }

                            strP[1] = ('"' + part + '"').trim();
                        }

                        s = strP.join(':');
                    }
                    return s;
                });
                return str.join('');
            }]);

            try {
                json = JSON.parse(json);
            } catch (e) {
                return false;
            }
        }
        return json;
    }
    return false;
}