function formatDate(timestamp) {
    // Intl is used to format the date
    return Intl.DateTimeFormat('en-US').format(timestamp);
}

module.exports = formatDate;


