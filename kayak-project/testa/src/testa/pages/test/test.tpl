<div class="testa-pages-test content-container" id="testa-pages-test">
  <div class="container-scroll">
    <!--导航部分-->
    <section class="layout-pad-full layout-margin-bottom back-white">
      <d-breadcrumb>
        <d-breadcrumb-item>首页</d-breadcrumb-item>
        <d-breadcrumb-item>列表</d-breadcrumb-item>
        <d-breadcrumb-item>查询表格</d-breadcrumb-item>
      </d-breadcrumb>
    </section>
    <!--导航部分 end-->
    <!--search部分-->
    <section class="layout-pad-full layout-pad-top-nil layout-margin-bottom back-white">
      <h1 class="holder-title">查询表格</h1>
      <d-form class="cabinvue-search-form">
        <d-row :gutter="24">
          <d-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
            <div class="search-form-item">
              <div class="item-label">
                <span>姓名</span>
              </div>
              <div class="item-control">
                <d-input v-decorator="[
                  `rule-name`,
                  {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  }
                ]" placeholder="规则名称" />
              </div>
            </div>
          </d-col>
          <d-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
            <div class="search-form-item">
              <div class="item-label">
                <span>规则名称</span>
              </div>
              <div class="item-control">
                <d-input v-decorator="[
                  `rule-name`,
                  {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  }
                ]" placeholder="规则名称" />
              </div>
            </div>
          </d-col>
          <d-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
            <div class="search-form-item">
              <div class="item-label">
                <span>规则名称规则名称</span>
              </div>
              <div class="item-control">
                <d-select v-decorator="[
                    'use-state',
                    {rules: [{ required: true, message: 'Please select an state!' }]}
                  ]" placeholder="使用状态">
                  <d-select-option value="Large">
                    关闭
                  </d-select-option>
                  <d-select-option value="Middle">
                    运行中
                  </d-select-option>
                </d-select>
              </div>
            </div>
          </d-col>
          <d-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
            <div class="search-form-item">
              <div class="item-label">
                <span>规则名称规则名称</span>
              </div>
              <div class="item-control">
                <d-select v-decorator="[
                    'use-state',
                    {rules: [{ required: true, message: 'Please select an state!' }]}
                  ]" placeholder="使用状态">
                  <d-select-option value="Large">
                    关闭
                  </d-select-option>
                  <d-select-option value="Middle">
                    运行中
                  </d-select-option>
                </d-select>
              </div>
            </div>
          </d-col>
          <d-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
            <div class="search-form-item">
              <div class="item-label">
                <span>调用次数</span>
              </div>
              <div class="item-control">
                <d-input-number style="width: 100%" v-decorator="[
                  `call-times`,
                  {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  }
                ]" placeholder="调用次数" />
              </div>
            </div>
          </d-col>
          <d-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
            <div class="search-form-item">
              <div class="item-label">
                <span>规则名称规则名称</span>
              </div>
              <div class="item-control">
                <d-select v-decorator="[
                    'use-state',
                    {rules: [{ required: true, message: 'Please select an state!' }]}
                  ]" placeholder="使用状态">
                  <d-select-option value="Large">
                    关闭
                  </d-select-option>
                  <d-select-option value="Middle">
                    运行中
                  </d-select-option>
                </d-select>
              </div>
            </div>
          </d-col>
        </d-row>
        <hr />
        <div class="form-option-area">
          <d-button type="primary" class="space-margin-right">查询</d-button>
          <d-button>重置</d-button>
        </div>
      </d-form>
    </section>
    <!--search部分 end-->
    <!--表格部分-->
    <section class="layout-pad-full layout-margin-bottom back-white">
      <div class="table-option-area space-margin-bottom">
        <d-button type="primary" icon="plus" class="space-margin-right" @click="showModal">新建规则</d-button>
        <d-button>批量操作</d-button>
      </div>
      <d-alert :message="selectmsg" type="info" show-icon />
      <d-table :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :data-source="data" />
    </section>
    <!--表格部分 end-->
  </div>
</div>
