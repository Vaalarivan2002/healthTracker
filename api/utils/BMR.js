import { availableCalories } from "./../data/calories.js"

export const BMR = (gender, age, height, weight) => {
    // Mifflin st jeor equation
    if (gender === "Male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "Female") {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

export const relevantCalorie = (calories) => {
    let minDifference = Infinity;
    let relevantCalorie;
    for (let index = 0; index < availableCalories.length; index++) {
        const element = availableCalories[index];
        const currDifference = Math.abs(element - calories);
        if (currDifference < minDifference) {
            minDifference = currDifference;
            relevantCalorie = element;
        }
    }
    return relevantCalorie;
}