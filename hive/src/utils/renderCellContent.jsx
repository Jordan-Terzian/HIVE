const renderCellContent = (date, calendarEvents) => {
    // Helper function to check if a UTC date is the same day as the local date
    const isSameDayUTC = (utcDate, localDate) => {
        // Convert the UTC date to local time
        const localUTCDate = new Date(utcDate);
        // Check if the year, month, and day are the same
        return localUTCDate.getUTCFullYear() === localDate.getFullYear() &&
               localUTCDate.getUTCMonth() === localDate.getMonth() &&
               localUTCDate.getUTCDate() === localDate.getDate();
    };

    // Find events for this date
    const eventsForDate = calendarEvents.filter(event => {
        // Check if the event starts on the calendar date
        return isSameDayUTC(event.start, date);
    });

    return (
        <div>
            {eventsForDate.map((event, index) => (
                <div key={index}>
                    <span>{event.title}</span>
                </div>
            ))}
        </div>
    );
};

export default renderCellContent;