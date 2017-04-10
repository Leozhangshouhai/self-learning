describe('测试监控中心部分',function(){
	var $httpBackend,
		$controller,
		$state,
		$rootScope,
		$compile,
		code,
		AdminMonitorCenterFactory,
		statDay,
		localStorageService,
		monitorCenterCtrl,
		ErrorHandlerFactory,
		scope,
		getDataOverviewResponse,
		queryQuantityCompanyResponse,
		companyMatchRatioResponse,
		serviceQueryQuantityResponse,
		serviceMatchRatioResponse,
		element,
		HelperFactory,
		vm,
		isNotMonthly;
		// btnQueryTop530,
		// btnQueryTop57;

	/**
	 * 模拟errorHandlerFactory
	 * @type {Object}
	 */
	ErrorHandlerFactory = {
		checkCode:function(response){
			return response.data;
		}
	};
	var mockLocalStorageService = {
		get:function(str){
			return{
				username:'test',
				companyId:'1'
			}
		}
	};
	beforeEach(module('DataMarket.helper'));
	beforeEach(module('DataMarket.adminMonitorCenter',function($provide){
		$provide.value('ErrorHandlerFactory', ErrorHandlerFactory);
	}));
	beforeEach(module('DataMarket.config'));
	beforeEach(module('ui.router'));
	beforeEach(module('LocalStorageModule', function( $provide ){
		$provide.value( 'localStorageService', mockLocalStorageService);
	}));

	

	beforeEach(inject(function(_$httpBackend_,_$controller_,_$state_,_$rootScope_,_$compile_,_code_,_AdminMonitorCenterFactory_,_statDay_,_HelperFactory_){
		$httpBackend 				= _$httpBackend_;
		$controller 				= _$controller_;
		$state 						= _$state_;
		$rootScope 					= _$rootScope_;
		$compile 					= _$compile_;
		code 						= _code_;
		AdminMonitorCenterFactory 	= _AdminMonitorCenterFactory_;
		statDay 					= _statDay_;
		localStorageService 		= mockLocalStorageService;
		HelperFactory 				= _HelperFactory_;

		isNotMonthly 				= false;


		scope = $rootScope.$new();
		element = $compile('<button class="zs-btn btn-day" id="btnQueryTop5-30" ng-class="{\'zs-btn-blue\':(vm.companyTopDay===vm.statDay.thirty)}" ng-click="vm.changeCompanyTop(vm.statDay.thirty)">30天</button>')(scope);

		jasmine.getJSONFixtures().fixturesPath = 'base/json_data';
		getDataOverviewResponse = getJSONFixture('monitor_center_get_data_overview.mock.json');
		queryQuantityCompanyResponse = getJSONFixture('monitor_center_query_quantity_company.mock.json');
		serviceQueryQuantityResponse = getJSONFixture('monitor_center_service_query_quantity.mock.json');


		$httpBackend.whenGET('/api/admin/stat/general?isNotMonthly=false').respond(getDataOverviewResponse);
		$httpBackend.whenGET('/api/admin/stat/query_quantity/company?isNotMonthly=false').respond(queryQuantityCompanyResponse);
		$httpBackend.whenGET('/api/admin/stat/query_quantity/service?isNotMonthly=false').respond(serviceQueryQuantityResponse);

	}));

	describe('测试监控中心服务部分',function(){
		it('测试AdminMonitorCenterFactory.getDataOverview调用后的返回值！',function(){
			var responseData;
			var promise = AdminMonitorCenterFactory.getDataOverview( isNotMonthly );
			promise.then(function(response){
				responseData = response;
			});
			$httpBackend.flush();
			/*测试返回值为10000*/
			expect(responseData.code).toEqual(code.SUCCESS);
			/*测试请求的返回值是否正确*/
			expect(responseData.data.accumulateQueryTimes).toEqual(87865);
			expect(responseData.data.accumulateSuccessTimes).toEqual(38332);
			expect(responseData.data.accumulateSwitchInCompanies).toEqual(7);
		});


		it('测试AdminMonitorCenterFactory.getDataOverview调用后的返回值！',function(){
			var responseData;
			var promise = AdminMonitorCenterFactory.getQueryQuantityCompany(isNotMonthly);

			promise.then(function(response){
				responseData = response;
			});
			$httpBackend.flush();
			/*测试返回值为10000*/
			expect(responseData.code).toEqual(code.SUCCESS);
			/*测试请求的返回值的数量是否正确*/
			expect(responseData.data.lastMonth.length).toEqual(5);
			expect(responseData.data.lastWeek.length).toEqual(1);
			/*测试请求返回值的类型*/
			expect(responseData.data.lastMonth[0]).toEqual(jasmine.any(Object));
		});

		it('测试AdminMonitorCenterFactory.getServiceQueryQuantity的返回值情况',function(){
			var responseData;

			var promise = AdminMonitorCenterFactory.getServiceQueryQuantity(isNotMonthly);
			promise.then(function(response){
				responseData = response;
			});
			$httpBackend.flush();
			/*测试返回值为10000*/
			expect(responseData.code).toEqual(code.SUCCESS);
			/*测试请求的返回值的数量是否正确*/
			expect(responseData.data.lastMonth.length).toEqual(5);
			expect(responseData.data.lastWeek.length).toEqual(4);
			/*测试请求返回值的类型*/
			expect(responseData.data.lastMonth[0]).toEqual(jasmine.any(Object));
		});
	});
});