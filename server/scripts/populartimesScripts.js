const {
    lowestWeights,
    lowWeights,
    midWeights,
    highWeights,
    variableMidDayWeights,
    hourWeights
} = require("../data/populartimesWeightArrays");

const getPopularTimes = () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const populartimesData = [];

    const todayIndex = new Date().getDay();

    populartimesData.push({
        name: "Today",
        data: hourWeights.map(weight => Math.floor(Math.random() * weight)),
    });

    for (let i = 0; i < daysOfWeek.length - 1; i++) {
        const dayIndex = (todayIndex + i) % 7;
        const day = daysOfWeek[dayIndex];

        const hourlyData = hourWeights.map(weight => Math.floor(Math.random() * weight));

        populartimesData.push({
            name: day,
            data: hourlyData,
        });
    }
    return populartimesData;
};

const getBusynessNow = () => {
    const currentDate = new Date();
    const timeNow = currentDate.getHours();
    const currentPopularity = Math.floor(Math.random() * hourWeights[timeNow]);
    
    return currentPopularity;
};

module.exports = {
    getPopularTimes,
    getBusynessNow
};