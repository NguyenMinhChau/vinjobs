import moment from 'moment';

export const dateVn = (date) => {
    return new Date(
        date.getTime() + new Date().getTimezoneOffset() * -60 * 1000
    )
        .toISOString()
        .slice(0, 19);
};

export const dateFormat = (date, format) => {
    return moment(date).format(format);
};
// return date format yyyy-mm-dd
export const dateVnFormat2 = (date) => {
    const dateVn = new Date(
        date.getTime() + new Date().getTimezoneOffset() * -60 * 1000
    );
    const day = dateVn.getDate();
    const month = dateVn.getMonth() + 1;
    const year = dateVn.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${
        day < 10 ? '0' + day : day
    }`;
};
