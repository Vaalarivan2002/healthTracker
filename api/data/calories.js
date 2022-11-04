export const availableCalories = [1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]

export const zeroQuantities = []
for (let index = 0; index < 15; index++) {
    zeroQuantities.push(0) 
}

const TwoDQuantities = []
for (let index = 0; index < 7; index++) {
    TwoDQuantities.push(zeroQuantities)
}

export const defaultQuantities = []
for (let index = 0; index < 11; index++) {
    defaultQuantities.push(TwoDQuantities)
}


