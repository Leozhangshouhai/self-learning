<!--合同查询-->
<div class="testa-pages-demojq content-container">
  <div class="container-fixed">
    <!--面包屑-->
    <div class="bread">
      <div class="bread-back"></div>
      <div class="bread-content">
        <ul>
          <li><a>首页</a></li>
          <li><a>合同管理</a></li>
          <li class="active"><a>合同查询</a></li>
        </ul>
      </div>
    </div>
  </div>
  <!--滚动内容 需要添加 container-scroll 类-->
  <div class="container-scroll">
    <!--搜索框 stage-->
    <div class="stage">
      <div class="stage-title flag">合同查询</div>
      <div class="cabin-search-form">
        <div class="form-horizontal clearfix">
          <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <label class="control-label">用户姓名</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <label class="control-label">选择日期</label>
            <input type="text" class="form-control icondate J_date_demo" />
          </div>
          <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <label class="control-label">手机号</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <label class="control-label">运营组织</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label class="control-label">选择时间</label>
            <div class="clearfix date-group-box">
              <input type="text" class="form-control icontime" placeholder="选择开始时间">
              <label class="cabin-date-spin">-</label>
              <input type="text" class="form-control icontime" placeholder="选择结束时间">
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="stage-search right btns-box">
        <div class="btn btn-outline">查询</div>
      </div>
    </div>
    <!--搜索框 stage 结束-->
    <!--tab导航-->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#yourtab_no_1" aria-controls="yourtab1" role="tab" data-toggle="tab">tab1</a></li>
      <li role="presentation"><a href="#yourtab_no_2" aria-controls="yourtab2" role="tab" data-toggle="tab">tab2</a></li>
    </ul>
    <!--tab导航结束-->
    <!--搜索结果stage-->
    <div class="stage">
      <!-- tab导航内容-->
      <div class="tab-content">
        <!-- tab导航内容分块1-->
        <div role="tabpanel" class="tab-pane active" id="yourtab_no_1">
          <!--表格盒子-->
          <!--左右滑动表格-->
          <div class="table-responsive">
            <!--注：没标题没按钮组表格没上下边线 有标题加table-top-bordered有分页加table-bottom-bordered-->
            <!--表格-->
            <table class="cabinTable table table-hover  table-bottom-bordered table-event">
              <thead>
                <tr>
                  <th>订单Id</th>
                  <th>门店名称</th>
                  <th>订单状态</th>
                  <th>支付方式</th>
                  <th>下单时间</th>
                  <th>收款时间</th>
                  <th>应付</th>
                  <th>实付</th>
                  <th>稽核人员</th>
                  <th style="width: 100px;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>685518</div>
                  </td>
                  <td>
                    <div>西门店</div>
                  </td>
                  <td>
                    <div>已完成</div>
                  </td>
                  <td>
                    <div>微信支付</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>前端人员</div>
                  </td>
                  <td>
                    <div><span class="event">查看详情</span></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>685518</div>
                  </td>
                  <td>
                    <div>西门店</div>
                  </td>
                  <td>
                    <div>已完成</div>
                  </td>
                  <td>
                    <div>微信支付</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>前端人员</div>
                  </td>
                  <td>
                    <div><span class="event">查看详情</span></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>685518</div>
                  </td>
                  <td>
                    <div>西门店</div>
                  </td>
                  <td>
                    <div>已完成</div>
                  </td>
                  <td>
                    <div>微信支付</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>前端人员</div>
                  </td>
                  <td>
                    <div><span class="event">查看详情</span></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--左右滑动表格end-->
          <!--分页-->
          <div id="page"></div>
          <!--分页end-->
        </div>
        <!-- tab导航内容分块1end-->
        <!-- tab导航内容分块2-->
        <div role="tabpanel" class="tab-pane" id="yourtab_no_2">
          <div class="stage-title">
            <!-- 如果不要标题去掉标题列表名称即可，去掉flag类，如果不要按钮去掉stage-title-btn按钮组 -->
            <div class="stage-title-btn">
              <button class="btn btn-primary" type="button">下载列表</button>
            </div>
          </div>
          <!--注：没标题没按钮组表格没上下边线 有标题加table-top-bordered有分页加table-bottom-bordered-->
          <!--表格盒子-->
          <!--左右滑动表格-->
          <div class="table-responsive">
            <!--表格-->
            <table class="cabinTable table table-hover table-top-bordered table-bottom-bordered table-event">
              <thead>
                <tr>
                  <th>订单Id</th>
                  <th>门店名称</th>
                  <th>订单状态</th>
                  <th>支付方式</th>
                  <th>下单时间</th>
                  <th>收款时间</th>
                  <th>应付</th>
                  <th>实付</th>
                  <th>稽核人员</th>
                  <th style="width: 100px;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>685518</div>
                  </td>
                  <td>
                    <div>西门店</div>
                  </td>
                  <td>
                    <div>已完成</div>
                  </td>
                  <td>
                    <div>微信支付</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>前端人员</div>
                  </td>
                  <td>
                    <div><span class="event">查看详情</span></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>685518</div>
                  </td>
                  <td>
                    <div>西门店</div>
                  </td>
                  <td>
                    <div>已完成</div>
                  </td>
                  <td>
                    <div>微信支付</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>前端人员</div>
                  </td>
                  <td>
                    <div><span class="event">查看详情</span></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>685518</div>
                  </td>
                  <td>
                    <div>西门店</div>
                  </td>
                  <td>
                    <div>已完成</div>
                  </td>
                  <td>
                    <div>微信支付</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>2017.11.11 12:05:00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>55.00</div>
                  </td>
                  <td>
                    <div>前端人员</div>
                  </td>
                  <td>
                    <div><span class="event">查看详情</span></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--左右滑动表格end-->
        </div>
        <!-- tab导航内容分块2end-->
      </div>
      <!-- tab导航内容结束-->
    </div>
    <!--滚动内容end-->
  </div>
