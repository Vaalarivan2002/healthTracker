const dummyMap = {

}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

for (let index = 0; index < 60; index++) {
    dummyMap[index] = days[index % 7]    
}

// console.log(dummyMap);

module.exports = {dummyMap}

// dummyMap
//{
//     '0': 'Sunday',
//     '1': 'Monday',
//     '2': 'Tuesday',
//     '3': 'Wednesday',
//     '4': 'Thursday',
//     '5': 'Friday',
//     '6': 'Saturday',
//     '7': 'Sunday',
//     '8': 'Monday',
//     '9': 'Tuesday',
//     '10': 'Wednesday',
//     '11': 'Thursday',
//     '12': 'Friday',
//     '13': 'Saturday',
//     '14': 'Sunday',
//     '15': 'Monday',
//     '16': 'Tuesday',
//     '17': 'Wednesday',
//     '18': 'Thursday',
//     '19': 'Friday',
//     '20': 'Saturday',
//     '21': 'Sunday',
//     '22': 'Monday',
//     '23': 'Tuesday',
//     '24': 'Wednesday',
//     '25': 'Thursday',
//     '26': 'Friday',
//     '27': 'Saturday',
//     '28': 'Sunday',
//     '29': 'Monday',
//     '30': 'Tuesday',
//     '31': 'Wednesday',
//     '32': 'Thursday',
//     '33': 'Friday',
//     '34': 'Saturday',
//     '35': 'Sunday',
//     '36': 'Monday',
//     '37': 'Tuesday',
//     '38': 'Wednesday',
//     '39': 'Thursday',
//     '40': 'Friday',
//     '41': 'Saturday',
//     '42': 'Sunday',
//     '43': 'Monday',
//     '44': 'Tuesday',
//     '45': 'Wednesday',
//     '46': 'Thursday',
//     '47': 'Friday',
//     '48': 'Saturday',
//     '49': 'Sunday',
//     '50': 'Monday',
//     '51': 'Tuesday',
//     '52': 'Wednesday',
//     '53': 'Thursday',
//     '54': 'Friday',
//     '55': 'Saturday',
//     '56': 'Sunday',
//     '57': 'Monday',
//     '58': 'Tuesday',
//     '59': 'Wednesday'
//   }