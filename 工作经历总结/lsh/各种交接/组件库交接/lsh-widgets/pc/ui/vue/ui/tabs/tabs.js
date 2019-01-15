/*
 * tabs默认从CMS中获取tabs字段的数据
 * tabs负责将切换后的currentTab传给Vuex管理
 */
import * as typeCheck from '../../../lib/typeCheck'
const cmsConfig = conf.cmsData && conf.cmsData.tabs || {};

export default function ( tabConfig = {} ) {
    let config = Object.assign({
        tabs: cmsConfig
    }, tabConfig);

    // 默认选中第一个
    if (typeCheck.isArray(config.tabs) && config.tabs.length) {
        config.cur = config.tabs[0].key;
    } else {
        console.warn("tabs配置类型错误");
    }

    let template = `<ul class="nav-tabs clearfix">
                        <template v-for="c in tabs">
                            <li :class="c.key === cur ? 'active' : ''">
                                <a class="tab-item" :data-key="c.key" @click="setCurrent">{{c.title}}</a>
                            </li>
                        </template>
                    </ul>`;

    return {
        template: template,
        data () {
            return config
        },
        methods: {
            setCurrent (e) {
                let key = e.target.dataset.key;
                this.cur = key;
                this.$store.commit('CURRENTTAB', key);
            }
        },
        created () {
            this.$store.commit('CURRENTTAB', this.cur);
        }
    }
}