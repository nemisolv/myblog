function truncateString(str,maxLength) {
    return str.length > maxLength? str.substring(0,maxLength) + '...' : str;
}

export default truncateString;
