export function getReadableDate(value: string | number) {
    let date: Date = new Date(value);
    if(typeof value === 'string') date = new Date(value + 'T00:00:00');


    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const fromattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${fromattedMonth}-${formattedDay}-${year}`;
};

export function getReadableCash(value: string | number) {
    const formattedCash = value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    return formattedCash;
}