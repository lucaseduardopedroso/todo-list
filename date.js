exports.getDate = function () {

const today = new Date();
    
const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

return today.toLocaleDateString("en-US", options);
}

exports.getDateBR = function () {

const today = new Date();
    
const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

return today.toLocaleDateString("pt-BR", options);
    
return day;
}