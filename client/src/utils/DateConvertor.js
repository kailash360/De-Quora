const DateConvertor = (_date) => {
    if (!_date) return null

    _date = parseInt(_date)

    console.log({ _date })
    const date = new Date(_date).toDateString()
    return date
}

export default DateConvertor