const TARGET_URL = "http://192.168.100.101:3000";
const SERVICE_RECORD = "record";

PaymentType = {
	"Eat" : "1", 
	"Life" : "2", 
	"Traffic" : "3",
	"Dress" : "4", 
	"Investment" : "5", 
	"Medical" : "6", 
	"Others" : "7", 
	getText : function(typeValue) {
		switch(typeValue) {
		  case "1": return "Eat";
		  case "2": return "Life";
		  case "3": return "Traffic";
		  case "4": return "Dress";
			case "5": return "Investment";
		  case "6": return "Medical";
		  case "7": return "Others";
		}
	},
	getValue : function(typeText) {
		switch(typeText) {
			case "Eat": return "1";
			case "Life": return "2";
			case "Traffic": return "3";
			case "Dress": return "4";
			case "Investment": return "5";
			case "Medical": return "6";
			case "Others": return "7";
		}
	}
} 
