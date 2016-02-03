/* global FaF */
(function() {
    var testId = FaF.getFamilyMembers('#testId');
    testId.addVinyl('testStyle');
    testId.stickyScroll();

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
    
    testId.css('backgroundColor', '#333333');
    testId.css('color', '#FFFFFF');
    testId.text('Hello World!');
    
    var createdElem = FaF.createFamilyMember('div', {className: 'box'});
    var body = FaF.getFamilyMembers('body');
    body.append(createdElem);
    
    createdElem.tokyoDrift({ duration: 10 });
    createdElem.onGreen('click', function(e) {
       createdElem.move({ direction: 'up', distance: 200 });
    });
}());