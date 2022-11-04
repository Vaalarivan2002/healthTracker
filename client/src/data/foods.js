export const groups = [
    "Vegetables", "Fruits", "Grains", "Dairy", "Protein Foods"
]

export const subgroups = [
    "Dark-Green Vegetables", "Red & Orange Vegetables", "Beans, Peas, Lentils", "Starchy Vegetables", "Other Vegetables", "Whole Grains", "Refined Grains", "Meats, Poultry, Eggs", "Seafood", "Nuts, Seeds, Soy Products"
]

export const isDaily = [false, false, false, false, false, true, true, false, false, false]

// we are currently using foods and availbleCalories only. the other array may be used if needed
export const foods = [
    {
        name: "Vegetables",
        subgroup: false,
        quantity: 2,
        index: 0,
        notShowAdder: true,
        parentIndex: -1
    },
    {
        name: "Dark-Green Vegetables",        
        isWeekly: true,
        quantity: 2,
        foodList : ['Basil', 'Amaranth leaves', 'Broccoli', 'Poke Greens', 'romaine lettuce', 'spinach'],
        index: 1,
        parentIndex: 0

    }, 
    {
        name: "Red & Orange Vegetables",
        isWeekly: true,
        quantity: 4,
        foodList : ['Red chilly peppers', 'Carrots', 'Calabaza'],
        index: 2,
        parentIndex: 0
    },
    {
        name: "Beans, Peas, Lentils",
        isWeekly: true,
        quantity: 1,
        index: 3,
        foodList : ['peas', 'canned beans', 'dry beans', 'chick peas', 'black beans', 'black-eyed peas', 'bayo beans', 'garbanzo beans', 'edamame']   ,
        parentIndex: 0 
    },
    {
        name: "Starchy Vegetables",
        isWeekly: true,
        quantity: 4,
        index: 4,
        foodList : ['breadfruit', 'burdock root', 'cassava'],
        
        parentIndex: 0

    },
    {
        name: "Other Vegetables",
        isWeekly: true,
        quantity: 4,
        index: 5,
        foodList : ['asparagus', 'avocado', 'bamboo shoots', 'beets'],
        parentIndex: 0


    },
    {
        name: "Fruits",
        subgroup: false,
        quantity: 2,
        index: 6,
        foodList : ['apples', 'asian pears', 'bananas'],
        parentIndex: 6


    },
    {
        name: "Grains",
        subgroup: false,
        isOunce: true,
        quantity: 5,
        index: 7,
        notShowAdder: true,
        parentIndex: -1

    }, 
    {
        name: "Whole Grains",
        isOunce: true,
        quantity: 3,
        index: 8,
        foodList : ['amaranth', 'unpearled barley', 'brown rice'],
        parentIndex: 7
    },
    {
        isOunce: true,
        name: "Refined Grains",
        quantity: 2,
        index: 9,
        foodList : ['corn grits', 'refined-grain cereals and crackers', 'white breads'],
        parentIndex: 7
    },
    {
        name: "Dairy",
        subgroup: false,
        quantity: 3,
        index: 10,
        foodList : ['fluid milk', 'dry milk', 'evaporated milk', 'soy milk', 'buttermilk', 'yogurt'],
        parentIndex: 10

    },
    {
        name: "Protein Foods",
        isOunce: true,
        subgroup: false,
        quantity: 5,
        index: 11,
        notShowAdder: true,
        parentIndex: -1
    }, 
    {
        name: "Meats, Poulty, Eggs",
        isWeekly: true,
        isOunce: true,
        quantity: 23,
        foodList : ['Beef', 'Goat', 'Lamb'],
        index: 12,
        parentIndex: 11
    },
    {
        name: "Seafood",
        isOunce: true,
        isWeekly: true,
        quantity: 8,
        foodList : ['Catfish', 'Black sea bass', 'Anchovy'],
        index: 13,
        parentIndex: 11

    },
    {
        name: "Nuts, Seeds, Soy Products",
        isOunce: true,
        isWeekly: true,
        quantity: 4,
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
        // foodMap.set(ele, element.name)
        foodMap.push({key: ele, value: element})
    })
}
});

// export let parents = [], children = []
// for (let index = 0; index < foods.length; index++) {
//     const element = foods[index];
//     if ((element.index !== element.parentIndex) && element.parentIndex !== -1) children.push(index)
//     if (element.parentIndex === -1) parents.push(index)
// }

// export default foodMap

export const zeroQuantities = []
for (let index = 0; index < 15; index++) {
    zeroQuantities.push(0) 
}