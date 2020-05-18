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
    }

    off(eventName, callback) {
        this.$el.removeEventListener(eventName, callback);
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
