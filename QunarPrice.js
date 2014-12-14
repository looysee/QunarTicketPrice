var browser = require('casper').create();
var ticketPrice;
var args = browser.cli.args;
var searchDepartureAirport = args[0]
var searchArrivalAirport = args[1]
var searchDepartureTime = args[2]

browser.start();

var i = 1; //set retry times

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
 
    var data = arguments;      
    for (var i=0;i<data.length;i++) {
        var value = data[i];     
        if (undefined != value) {
            result = result.replace("{" + i + "}", value);           
        }
}
    return result;
}

while (!ticketPrice && i > 0)
{
	var url = 'http://flight.qunar.com/site/oneway_list.htm?searchDepartureAirport={0}&searchArrivalAirport={1}&searchDepartureTime={2}&searchArrivalTime={3}&nextNDays=0&startSearch=true&from=qunarindex&lowestPrice=null&sd_idx=1&SearchLocation=sevenday_search'
    var realurl = url.format(searchDepartureAirport,searchArrivalAirport,searchDepartureTime,searchDepartureTime)
	browser.thenOpen(realurl)
	browser.then(function getPrice() {
	    ticketPrice = browser.evaluate(function getPriceFromPage() {
	        return price = document.getElementsByClassName("cur")[0].getElementsByClassName("price")[0].innerText;});
	});
	i--;
}

browser.then(function outputTicketPrice(){
    console.log(ticketPrice);
    browser.exit();
});

browser.run();


