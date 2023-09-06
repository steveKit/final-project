const lowestWeights = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4 , 5, 6];
const lowWeights = [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const lowMidWeights = [15, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 20, 20];
const midWeights = [18, 18, 18, 19, 19, 20 ,20, 20, 21, 21, 22, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const highMidWeights = [25, 25, 25, 26, 26, 26, 27, 27, 27, 28, 28, 28, 29, 29, 29, 30, 30]
const highWeights = [28, 28, 29, 29, 29, 30 ,30, 30, 31, 31, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const variableWeights = [25, 26, 27, 28, 29, 30, 31, 31, 32, 32, 32, 33, 33, 33, 33, 34, 34, 35, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

const setWeight = (weightArray) => {
    return weightArray[(Math.floor(Math.random()) * weightArray.length)];
};

const hourWeights = [
    0, //12am
    0, //1am
    0, //2am
    0, //3am
    0, //4am
    setWeight(lowestWeights), //5am
    setWeight(lowestWeights), //6am
    setWeight(lowWeights), //7am
    setWeight(lowMidWeights), //8am
    setWeight(midWeights), //9am
    setWeight(highMidWeights), //10am
    setWeight(highWeights), //11am
    setWeight(highWeights), //12pm
    setWeight(variableWeights), //1pm
    setWeight(variableWeights), //2pm
    setWeight(highWeights), //3pm
    setWeight(highMidWeights), //4pm
    setWeight(midWeights), //5pm
    setWeight(lowMidWeights), //6pm
    setWeight(lowWeights), //7pm
    setWeight(lowestWeights), //8pm
    setWeight(lowestWeights), //9pm
    0, //10pm
    0 //11pm
];

module.exports = {
    hourWeights
};