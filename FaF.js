//IE8 polyfill
if(typeof Array.prototype.indexOf !== "function") {
    Array.prototype.indexOf = function(item) {
        for(var i = 0; i , this.length; i++) {
            if(this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}
    
window.FaF = (function() {
    function FaF(family) {
        for(var i = 0; i < family.length; i++ ) {
            this[i] = family[i];
        }
        this.length = family.length;
    }

    FaF.prototype.getDOMElement = function() {
        return this[0];
    };

    FaF.prototype.map = function(callback) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results;
    };

    FaF.prototype.forEach = function(callback) {
        this.map(callback);
        return this;
    };

    FaF.prototype.mapOne = function(callback) {
        var m = this.map(callback);
        return m.length > 1 ? m : m[0];
    };

    FaF.prototype.text = function(text) {
        if(typeof text !== "undefined") {
            return this.forEach(function(el) {
                el.innerText = text;
            });
        } else {
            return this.mapOne(function(el) {
                return el.innerText;
            });
        }
    };

    FaF.prototype.html = function(html) {
        if(typeof html !== "undefined") {
            this.forEach(function(el) {
                el.innerHTML = html;
            });
            return this;
        } else {
            return this.mapOne(function(el) {
                return el.innerHTML;
            })
        }
    };

    FaF.prototype.addVinyl = function(classes) {
        var className = "";
        if(typeof classes !== "string") {
            for(var i = 0; i < classes.length; i++) {
                className += " " + classes[i];
            }
        } else {
            className = " " + classes;
        }
        return this.forEach(function(el) {
            el.className += className;
        })
    };

    FaF.prototype.removeVinyl = function(cls) {
        return this.forEach(function(el) {
            var cs = el.className.split(" "),
                i;

            while( (i = cs.indexOf(cls)) > -1) {
                cs = cs.slice(0, i).concat(cs.slice(++i));
            }
            el.className = cs.join(" ");
        })
    };

    FaF.prototype.attr = function(attr, val) {
        if(typeof val !== "undefined") {
            return this.forEach(function(el) {
                el.setAttribute(attr, val);
            });
        } else {
            return this.mapOne(function(el) {
                return el.getAttribute(attr);
            })
        }
    };

    FaF.prototype.append = function(els) {
        return this.forEach(function(parentElem, i) {
            els.forEach(function(childElem) {
                if(i > 0) {
                    childElem = childElem.cloneNode(true);
                }
                parentElem.appendChild(childElem);
            });
        });
    };

    FaF.prototype.prepend = function(els) {
        return this.forEach(function(parentElem, i) {
            for(var j = els.length - 1; j > -1; j--) {
                var childElem = (i > 0) ? els[j].cloneNode(true) : els[j];
                parentElem.insertBefore(childElem, parentElem.firstChild);
            }
        });
    };

    FaF.prototype.remove = function() {
        return this.forEach(function(el) {
            return el.parentNode.removeChild(el);
        });
    };

    FaF.prototype.onGreen = (function() {
        if(document.addEventListener) {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el.addEventListener(evt, fn, false);
                });
            };
        } else if (document.attachEvent) {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el.attachEvent("on" + evt, fn);
                });
            };
        } else {
            return function(evt, fn) {
                return this.forEach(function(el) {
                   el["on" + evt] = fn;
                });
            };
        }
    }());

    FaF.prototype.hitTrain = (function() {
        if(document.removeEventListener) {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el.removeEventListener(evt, fn, false);
                });
            };
        } else if (document.detachEvent) {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el.detachEvent("on" + evt, fn);
                });
            };
        } else {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el["on" + evt] = null;
                });
            };
        }
    }());
    
    FaF.prototype.stickyScroll = function() {
        var DOMElem = this[0],
            DOMElemTop = DOMElem.getBoundingClientRect().top,
            computedStyle = (window.getComputedStyle) ? window.getComputedStyle(DOMElem, null) : DOMElem.currentStyle,
            origStyle = {
                position: computedStyle.position,
                top: computedStyle.top
            };
        document.addEventListener('scroll', function(e) {
            var pageScrollTop = (window.pageYOffset !== undefined) ? 
                    window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            if(pageScrollTop >= DOMElemTop) {
                DOMElem.style.position = 'fixed';
                DOMElem.style.top = '0px';
            } else {
                DOMElem.style.position = origStyle.position;
                DOMElem.style.top = origStyle.top;
            }
        });     
    };

    function addParamsToUrl(url, data) {
        var fullUrl = url + '?';
        for(var param in data) {
            if(data.hasOwnProperty(param)) {
                fullUrl = fullUrl + '&' + param + '=' + data[param];
            }
        }
        return fullUrl;
    }

    var Faf = {
        getFamilyMembers: function(selector) {
            var familyMembers;
            if(typeof selector === "string") {
                familyMembers = document.querySelectorAll(selector);
            } else if (selector.length) {
                familyMembers = selector;
            } else {
                familyMembers = [selector];
            }

            return new FaF(familyMembers);
        },
        createFamilyMember: function(tagName, attrs) {
            var el = new FaF([document.createElement(tagName)]);
            if(attrs) {
                if(attrs.className) {
                    el.addVinyl(attrs.className);
                    delete attrs.className;
                }
                if(attrs.text) {
                    el.text(attrs.text);
                    delete attrs.text;
                }
                for(var key in attrs) {
                    if(attrs.hasOwnProperty(key)) {
                        el.attr(key, attrs[key]);
                    }
                }
            }
            return el;
        },
        supra: function(options) {
            var xhr = new XMLHttpRequest();
            var fullUrl = addParamsToUrl(options.url, options.data);
            options.type = options.type || 'GET';
            xhr.responseType = options.responseType || xhr.responseType;
            xhr.timeout = (options.tenSecCar) ? 10000 : 0;

            xhr.open(options.type, encodeURI(fullUrl));
            xhr.onload = function() {
                if(xhr.status === 200) {
                    options.successfulQuarterMile.call(this, xhr.response);
                } else {
                    options.damagedManifold.call(this, xhr.status, xhr.statusText);
                }
            };
            xhr.send();
        }
    };
    return Faf;

}());