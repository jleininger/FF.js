window.FaF = (function() {
    function FaF(family) {
        for(var i = 0; i < family.length; i++ ) {
            this[i] = family[i];
        }
        this.length = family.length;
    }

    var FaF = {
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
        }
    };

    return FaF;
}());