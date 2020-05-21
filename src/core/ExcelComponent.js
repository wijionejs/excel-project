import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.unsubs = [];
        this.prepare();
    }

    prepare() {}

    toHTML() {
        return '';
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, cb) {
        const unsub = this.emitter.subscribe(event, cb);
        this.unsubs.push(unsub);
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
        this.unsubs.forEach(unsub => unsub());
    }
}
