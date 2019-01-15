export default {
    main: `<div class="ui-tables">
            <template v-if="dataResource">
                <slot name="tablesSlot"></slot>
                <p style="margin: 3px;" v-if="dataResource.statistics && sumcontent" v-html="generateSumContent()"></p>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th v-if="selectable">
                                <input ref="checkall" type="checkbox" v-model="allchecked" @click="oncheckall"/> 全选
                            </th>
                            <th v-for="head in thead" v-html="head.title"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in dataResource.list">
                            <td v-if="selectable">
                                <template v-if="selectableFilter(data)">
                                    <input type="checkbox" :value="index" v-model="checkedindex">
                                </template>
                                <template v-else>
                                    ----
                                </template>
                            </td>
                            <td v-for="head in thead" v-html="renderTdContent(head,data)"></td>
                        </tr>
                    </tbody>
                </table>
                <pages ref="pages" v-if="paging" :total="dataResource.total" :size="pages.size" :scrollpaing="pages.scrollPaing"></pages>
            </template>
            <template v-else>
                <p class="error-info"><i class="icon icon-error"></i>{{errorMessage}}</p>
            </template>
        </div>`
};
