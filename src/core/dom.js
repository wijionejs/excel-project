class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML;
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text.toString();
            return this;
        }
        return this.$el.textContent;
    }

    input(text) {
        if (text) {
            this.$el.value = text.trim();
            return this;
        }
        return this.$el.value.trim();
    }

    clear() {
        this.html('');
        return this;
    }

    on(eventName, callback) {
        this.$el.addEventListener(eventName, callback);
        return this;
    }

    off(eventName, callback) {
        this.$el.removeEventListener(eventName, callback);
        return this;
    }

    append(node, clear = false) {
        if (clear) {
            this.$el.innerHTML = '';
        }
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    css(property, value = null) {
        if (!value) {
            return getComputedStyle(this.$el)[property];
        }
        this.$el.style[property] = value;
        return this;
    }

    clearCss() {
        this.$el.removeAttribute('style');
        return this;
    }

    setStyles(styles) {
        Object.keys(styles).forEach(s => {
            this.$el.style[s] = styles[s];
        });
    }

    getStyles(styles) {
        return styles.reduce((acc, style) => {
            acc[style] = this.$el.style[style];
            return acc;
        }, {});
    }

    focus() {
        this.$el.focus();
        return this;
    }

    data(property, value = null) {
        if (!value) {
            return this.$el.getAttribute(`data-${property}`);
        }
        this.$el.setAttribute(`data-${property}`, value);
        return this;
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    hasClass(className) {
        return Array.from(this.$el.classList).includes(className);
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    id(parse) {
        if (parse) {
            const id = this.id();
            const [row, col] = id.split(':');
            return {row: +row, col: +col};
        }
        return this.$el.dataset.id;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tag, classes = '') => {
    const el = document.createElement(tag);
    if (classes) {
        const arr = classes.split(' ');
        arr.forEach(className => {
            el.classList.add(className);
        });
    }
    return $(el);
};

$.find = selector => {
    return $(document.querySelector(selector));
};

$.findAll = selector => {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(el => $(el));
};
