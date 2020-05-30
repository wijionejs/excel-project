import {Page} from "@core/Page";
import {createStore} from "@core/createStore";
import {rootReducer} from "@/redux/rootReducer";
import {getInitialState} from "@/redux/initialState";
import {storage} from "@core/utils.";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import * as actions from '@/redux/actions';

function storageName(param) {
    return `excel:${param}`;
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params || Date.now().toString();
        window.location.hash = `#excel/${params}`;
        const state = storage(storageName(params));
        const store = createStore(rootReducer, getInitialState(state));

        store.subscribe(state => {
            storage(storageName(params), state);
        });

        store.dispatch(actions.changeOpenedDate());

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store,
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}
