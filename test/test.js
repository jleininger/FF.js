/* global FaF */
(function() {
    var testFamilyMember = FaF.getFamilyMembers('#testFamilyMember');
    testFamilyMember.addVinyl('testStyle');
    //testFamilyMember.removeVinyl('testStyle');
    testFamilyMember.attr('title', 'This title was set dynamically');
    var appendedFamilyMember = FaF.createFamilyMember('div', { id: 'prependedFamilyMember' });
    FaF.getFamilyMembers('#list').prepend(appendedFamilyMember);
    testFamilyMember.stickyScroll();

    //AJAX test
    FaF.overnightPartsFromJapan({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        dataType: 'json',
        data: {
            q: 'London,uk',
            appid: '44db6a862fba0b067b1930da0d769e98'
        },
        successfulQuarterMile: function(weatherData) {
            console.log('Response: ', weatherData);
        },
        damagedManifold: function(status, text) {
            console.log(status, text);
        }
    });
    
    testFamilyMember.decal('backgroundColor', '#333333');
    testFamilyMember.decal('color', '#FFFFFF');
    testFamilyMember.text('Hello World!');
    testFamilyMember.html('<h2>Some New Text</h2>');
    
    var createdElem = FaF.createFamilyMember('div', {className: 'box'});
    FaF.getFamilyMembers('body').append(createdElem);
    
    createdElem.tokyoDrift({ duration: 10 });
    createdElem.onGreen('click', function(e) {
        createdElem.move({ direction: 'left', distance: 200 });    
    });
    
    function clickEventCallback(e) {
       window.alert('This is the last time you will hear from me');
       testFamilyMember.hitTrain('click', clickEventCallback); 
    }
    testFamilyMember.onGreen('click', clickEventCallback);
    
    testFamilyMember.paulWalker();
}());