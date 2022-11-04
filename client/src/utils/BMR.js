export const BMR = (gender, age, height, weight) => {
    if (gender === "Male") {
        return 10 * weight + 6.25 * height - 5 * age + 5
    } else if (gender === "Female") {
        return 10 * weight + 6.25 * height - 5 * age - 161
    }
}