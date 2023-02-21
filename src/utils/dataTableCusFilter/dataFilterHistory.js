/* eslint-disable array-callback-return */
const dataFilterHistory = (data, search, start, end) => {
    return data?.filter((row, index) => {
        if (index + 1 >= start && index + 1 <= end) return true;
    });
};

export default dataFilterHistory;
