import {$} from "@core/dom";
import {ActiveRoute} from "@core/router/ActiveRoute";

export class Router {
    constructor(selector, routes) {
        this.$placeholder = $(selector);
        this.routes = routes;

        this.page = null;

        this.hashChangeHandler = this.hashChangeHandler.bind(this);
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.hashChangeHandler);
        this.hashChangeHandler();
    }

    hashChangeHandler() {
        if (this.page) this.page.destroy();

        const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;

        this.page = new Page(ActiveRoute.param);
        this.$placeholder.append(this.page.getRoot(), true);
        this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.hashChangeHandler);
    }
}
