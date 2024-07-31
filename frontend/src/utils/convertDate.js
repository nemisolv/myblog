function dateConverter(date) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    const dateObject = new Date(date);
  
   
    // Lấy thông tin ngày, tháng, năm
    const dayOfMonth = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const formattedDateString = `${monthNames[monthIndex]} ${dayOfMonth} ${year}`;

    return formattedDateString;

}
export default dateConverter;