export const groups = [
    "Vegetables", "Fruits", "Grains", "Dairy", "Protein Foods"
]

export const subgroups = [
    "Dark-Green Vegetables", "Red & Orange Vegetables", "Beans, Peas, Lentils", "Starchy Vegetables", "Other Vegetables", "Whole Grains", "Refined Grains", "Meats, Poultry, Eggs", "Seafood", "Nuts, Seeds, Soy Products"
]

export const isDaily = [false, false, false, false, false, true, true, false, false, false]

export const foods = [
    {
        name: "Vegetables",
        subgroup: false,
        quantity: [2, 2, 2, 3, 3, 4, 4, 4],
        index: 0,
        notShowAdder: true,
        parentIndex: -1,
        foodList: []
    },
    {
        name: "Dark-Green Vegetables",        
        isWeekly: true,
        quantity: [2, 2, 2, 2, 2, 2, 2, 2],
        foodList : ['Basil', 'Amaranth leaves', 'Broccoli', 'Poke Greens', 'romaine lettuce', 'spinach'],
        index: 1,
        parentIndex: 0
    }, 
    {
        name: "Red & Orange Vegetables",
        isWeekly: true,
        quantity: [4, 6, 6, 6, 6, 7, 7, 8],
        foodList : ['Red chilly peppers', 'Carrots', 'Calabaza'],
        index: 2,
        parentIndex: 0
    },
    {
        name: "Beans, Peas, Lentils",
        isWeekly: true,
        quantity: [1, 2, 2, 2, 2, 2, 2, 3],
        index: 3,
        foodList : ['peas', 'canned beans', 'dry beans', 'chick peas', 'black beans', 'black-eyed peas', 'bayo beans', 'garbanzo beans', 'edamame']   ,
        parentIndex: 0 
    },
    {
        name: "Starchy Vegetables",
        isWeekly: true,
        quantity: [4, 5, 5, 6, 6, 7, 7, 8],
        index: 4,
        foodList : ['breadfruit', 'burdock root', 'cassava'],
        parentIndex: 0
    },
    {
        name: "Other Vegetables",
        isWeekly: true,
        quantity: [4, 4, 4, 5, 5, 6, 6, 7],
        index: 5,
        foodList : ['asparagus', 'avocado', 'bamboo shoots', 'beets'],
        parentIndex: 0
    },
    {
        name: "Fruits",
        subgroup: false,
        quantity: [2, 2, 2, 2, 2, 2, 2, 2],
        index: 6,
        foodList : ['apples', 'asian pears', 'bananas'],
        parentIndex: 6
    },
    {
        name: "Grains",
        subgroup: false,
        isOunce: true,
        quantity: [5, 6, 6, 7, 8, 9, 10, 10],
        index: 7,
        notShowAdder: true,
        foodList: [],
        parentIndex: -1
    }, 
    {
        name: "Whole Grains",
        isOunce: true,
        quantity: [3, 3, 3, 4, 4, 4, 5, 5],
        index: 8,
        foodList : ['amaranth', 'unpearled barley', 'brown rice'],
        parentIndex: 7
    },
    {
        isOunce: true,
        name: "Refined Grains",
        quantity: [2, 3, 3, 4, 4, 4, 5, 5],
        index: 9,
        foodList : ['corn grits', 'refined-grain cereals and crackers', 'white breads'],
        parentIndex: 7
    },
    {
        name: "Dairy",
        subgroup: false,
        quantity: [3, 3, 3, 3, 3, 3, 3, 3],
        index: 10,
        foodList : ['fluid milk', 'dry milk', 'evaporated milk', 'soy milk', 'buttermilk', 'yogurt'],
        parentIndex: 10
    },
    {
        name: "Protein Foods",
        isOunce: true,
        subgroup: false,
        quantity: [5, 5, 6, 6, 6, 6, 7, 7],
        index: 11,
        notShowAdder: true,
        parentIndex: -1,
        foodList: [],
    }, 
    {
        name: "Meats, Poulty, Eggs",
        isWeekly: true,
        isOunce: true,
        quantity: [23, 23, 26, 28, 31, 31, 33, 33],
        foodList : ['Beef', 'Goat', 'Lamb'],
        index: 12,
        parentIndex: 11
    },
    {
        name: "Seafood",
        isOunce: true,
        isWeekly: true,
        quantity: [8, 8, 8, 9, 10, 10, 10, 10],
        foodList : ['Catfish', 'Black sea bass', 'Anchovy'],
        index: 13,
        parentIndex: 11
    },
    {
        name: "Nuts, Seeds, Soy Products",
        isOunce: true,
        isWeekly: true,
        quantity: [4, 4, 5, 5, 5, 5, 6, 6],
        index: 14,
        foodList : ['nut butters', 'peanuts', 'tree nuts', 'chia'],
        parentIndex: 11
    }
]

export const availableCalories = [1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]

export const foodMap = []

foods.forEach(element => {
    if (element.foodList) {
        element.foodList.forEach(ele => {
            foodMap.push({key: ele, value: element})
            if (element.parentIndex !== element.index && element.index !== -1) {
                foods[element.parentIndex].foodList.push(ele)
            }
        })
    }
});

export const zeroQuantities = []
for (let index = 0; index < 15; index++) {
    zeroQuantities.push(0) 
}

export const BMR = (gender, age, height, weight) => {
    if (gender === "Male") {
        return 10 * weight + 6.25 * height - 5 * age + 5
    } else if (gender === "Female") {
        return 10 * weight + 6.25 * height - 5 * age - 161
    }
}

export const relevantCalorie = (calories) => {
    let minDifference = Infinity
    let relevantCalorie
    for (let index = 0; index < availableCalories.length; index++) {
        const element = availableCalories[index];
        const currDifference = Math.abs(element - calories)
        if (currDifference < minDifference) {
            minDifference = currDifference
            relevantCalorie = element
        }
    }
    return relevantCalorie
}