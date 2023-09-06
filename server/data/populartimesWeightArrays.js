const lowestWeights = [5, 8, 10, 10, 15];
const lowWeights = [15, 20, 25, 30, 35];
const midWeights = [45, 50, 55, 60, 65];
const highWeights = [70, 70, 70, 75, 75];
const variableMidDayWeights = [ 35, 40, 40, 45, 50, 55, 60, 65 ];

const setWeight = (weightArray) => {
    return weightArray[Math.floor(Math.random() * weightArray.length)];
};

const hourWeights = [
    0, //12am
    0, //1am
    0, //2am
    0, //3am
    0, //4am
    5, //5am
    setWeight(lowestWeights), //6am
    setWeight(lowestWeights), //7am
    setWeight(lowWeights), //8am
    setWeight(midWeights), //9am
    setWeight(midWeights), //10am
    setWeight(highWeights), //11am
    setWeight(variableMidDayWeights), //12pm
    setWeight(variableMidDayWeights), //1pm
    setWeight(highWeights), //2pm
    setWeight(highWeights), //3pm
    setWeight(variableMidDayWeights), //4pm
    setWeight(midWeights), //5pm
    setWeight(lowWeights), //6pm
    setWeight(lowestWeights), //7pm
    setWeight(lowestWeights), //8pm
    0, //9pm
    0, //10pm
    0 //11pm
];

module.exports = {
    lowestWeights,
    lowWeights,
    midWeights,
    highWeights,
    variableMidDayWeights,
    hourWeights
};