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

    append(node) {
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

    data(property, value = null) {
        if (!value) {
            return this.$el.getAttribute(`data-${property}`);
        }
        this.$el.setAttribute(`data-${property}`, value);
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.find = selector => {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(el => $(el));
};

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
