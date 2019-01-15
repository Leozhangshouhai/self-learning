export default {
    main:
        `<div class="ui-search-group form-control">
            <span class="ui-search-wrap " v-for="c in config">
                <label v-if="c.label">{{c.label}}</label>
                
                <template v-if="c.type===widgetConfig.input">
                    <input v-model="c.value" :name="c.key" type="text" class="ui-search-input ui-search-item" :placeholder="c.placeholder"/>
                </template>
                
                <template v-if="c.type===widgetConfig.select">
                    <select type="text" class="ui-search-select ui-search-item" :name="c.key" v-model="c.value" @change="submit">
                        <option value="false">{{c.optionText}}{{c.label}}</option>
                        <option v-for="(option, key) in c.options" :value="key">{{option}}</option>
                    </select>
                </template>
                
                <template v-if="c.type===widgetConfig.dateRange">
                    <datepicker :type="c.type" :name="c.key.begin" :value="c.value.begin" class="date-single" :options="c.option" @change="changeDatesingle"></datepicker>
                     -
                    <datepicker :type="c.type" :name="c.key.end" :value="c.value.end" class="date-range" :options="c.option" @change="changeDatesingle"></datepicker>   
                </template>
                
                <template v-if="c.type===widgetConfig.dateSingle">
                    <datepicker :type="c.type" :name="c.key" :value="c.value" class="date-range" :options="c.option" @change="changeDatesingle"></datepicker>            
                </template>
                
                <template v-if="c.type===widgetConfig.batchInput">
                    <batchInput :type="c.type" :name="c.key" :value="c.value" :placeholder="c.placeholder" cssClass="field-control input-with-btn ui-search-input ui-search-item" @change="changeBatchInput"></batchInput>
                </template>
            </span>
            <div class="btns">
                <button class="ui-search-submit btn btn-primary" @click="submit"><i class="icon icon-search"></i>查询</button>
                <span class="ui-search-reset btn btn-white" @click="reset"><i class="icon icon-reset"></i>重置</span>
            </div>
        </div>`
};
