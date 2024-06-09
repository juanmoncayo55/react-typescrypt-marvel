export function formatDate(dateStr: string) : string{
    const dateObj = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month:'long',
        day: 'numeric'
    }

    return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}