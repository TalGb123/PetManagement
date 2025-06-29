export const dateTimeFormater_il = {
    formatDate: (date) => {
        if (!date) return '';
        return new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', dateStyle: 'short' }).format(new Date(date));
    },
    formatTime: (date) => {
        if (!date) return '';
        return new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', timeStyle: 'short' }).format(new Date(date));
    },
    formatDateTime: (date) => {
        if (!date) return '';
        return new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', dateStyle: 'short', timeStyle: 'short' }).format(new Date(date));
    }
};