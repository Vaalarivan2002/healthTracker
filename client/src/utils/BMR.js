export const BMR = (gender, age, height, weight) => {
    if (gender === "Male") {
        return Math.max(10 * weight + 6.25 * height - 5 * age + 5, 0)
    } else if (gender === "Female") {
        return Math.max(10 * weight + 6.25 * height - 5 * age - 161, 0)
    }
}