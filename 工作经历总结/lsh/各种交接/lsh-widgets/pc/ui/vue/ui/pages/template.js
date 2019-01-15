export default {
    nav:
        `<div v-if="!scrollpaing">
            <div class="ui-jpages-wrap">
                <div class="ui-jpages-nav">
                    <span class="nav-first navitem" data-nav="first">{{first}}</span>
                    <span class="nav-prev navitem" data-nav="prev">{{prev}}</span>
                    <span class="nav-pages">
                        <span :data-nav="n.index" v-for="n in navs" class="nav-page navitem" :class="{curNav: n.cur}" :disabled="n.cur">{{n.index}}</span>
                    </span>
                    <span class="nav-next navitem" data-nav="next">{{next}}</span>
                    <span class="nav-last navitem" data-nav="last">{{last}}</span>
                </div>
            </div>
        </div>`
};