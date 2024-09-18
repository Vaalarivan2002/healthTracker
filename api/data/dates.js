export const getDates = () => {
    let today = new Date();
    const sundayOffset = today.getDay();  
    let offset = sundayOffset;

    let tempDiff = offset;
    const currWeek = [];
    for (let i = 0; i < 7; ++i) {
        const curr = new Date(new Date().setDate(today.getDate() - offset)); 
        currWeek.push([curr.getDate(), curr.getMonth() + 1]);
        offset -= 1;
    }
    const initialDays = [currWeek];
    for (let i = 0; i < 10; ++i) {
        let currWeek = [];
        let offset = tempDiff + (i + 1) * 7;
        for (let j = 0; j < 7; ++j) {
            const curr = new Date(new Date().setDate(today.getDate() - offset)); 
            currWeek.push([curr.getDate(), curr.getMonth() + 1]);
            offset -= 1;
        }
        initialDays.push(currWeek);
    }
    initialDays.reverse();
    return initialDays;
}