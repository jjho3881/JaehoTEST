exports.abs = function(number){
	if(0 < number){
		return number;
	}else{
		return -number;
	}
};

exports.circleArea = function(radius) {
	return Math.ROUND(radius * radius * Math.PI);
};