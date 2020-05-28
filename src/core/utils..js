export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }
    return string[0].toUpperCase() + string.slice(1);
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, idx) => idx + start);
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function camelToDash(str) {
    return str.replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);
}

export function toInlineStyles(styles) {
    return Object.keys(styles).map(key => `${camelToDash(key)}:${styles[key]}`).join(';');
}

export function debounce(fn, ms) {
    let timeout;
    return function(...args) {
        const later = () => {
            // eslint-disable-next-line
            fn.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, ms);
    };
}
