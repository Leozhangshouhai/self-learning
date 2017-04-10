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
		stateDay,
		HelperFactory,
		vm,
		isNotMonthly,
		$q;
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

	beforeEach(inject(function(_$httpBackend_,_$controller_,_$state_,_$rootScope_,_$compile_,_code_,_AdminMonitorCenterFactory_,_statDay_,_HelperFactory_, _$q_){
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
		$q 							= _$q_;

		stateDay = {
			seven 		: 7,
			thirty 		: 30
		};

		scope = $rootScope.$new();
		element = $compile('<button class="zs-btn btn-day" id="btnQueryTop5-30" ng-class="{\'zs-btn-blue\':(vm.companyTopDay===vm.statDay.thirty)}" ng-click="vm.changeCompanyTop(vm.statDay.thirty)">30天</button>')(scope);

		jasmine.getJSONFixtures().fixturesPath = 'base/json_data';
		getDataOverviewResponse = getJSONFixture('monitor_center_get_data_overview.mock.json');
		queryQuantityCompanyResponse = getJSONFixture('monitor_center_query_quantity_company.mock.json');
		serviceQueryQuantityResponse = getJSONFixture('monitor_center_service_query_quantity.mock.json');


		$httpBackend.whenGET('/api/admin/stat/general?isNotMonthly=false').respond(getDataOverviewResponse);
		$httpBackend.whenGET('/api/admin/stat/query_quantity/company?isNotMonthly=false').respond(queryQuantityCompanyResponse);
		$httpBackend.whenGET('/api/admin/stat/query_quantity/service?isNotMonthly=false').respond(serviceQueryQuantityResponse);

		spyOn(AdminMonitorCenterFactory,'getDataOverview').and.callFake( function(){
			var deferred = $q.defer();
			deferred.resolve( getDataOverviewResponse );
			return deferred.promise;
		});
		spyOn(AdminMonitorCenterFactory,'getQueryQuantityCompany').and.callFake(function(){
			var deferred = $q.defer();
			deferred.resolve(queryQuantityCompanyResponse);
			return deferred.promise;
		});
		spyOn(AdminMonitorCenterFactory,'getServiceQueryQuantity').and.callFake(function(){
			var deferred = $q.defer();
			deferred.resolve(serviceQueryQuantityResponse);
			return deferred.promise;
		});
		spyOn(HelperFactory,'checkUser').and.callThrough();

		monitorCenterCtrl = $controller('monitorCenterCtrl',{
			scope : scope
		});
		vm = monitorCenterCtrl;


		spyOn(monitorCenterCtrl,'getDataOverview').and.callThrough();
		spyOn(monitorCenterCtrl,'queryQuantityCompany').and.callThrough();
		spyOn(monitorCenterCtrl,'serviceQueryQuantity').and.callThrough();

	}));

	describe('测试控制器是否已经定义',function(){
		it('测试控制器是否已经定义',function(){
			expect(monitorCenterCtrl).toBeDefined();
		});
		it('测试monitorCenterCtrl.getDataOverview方法是否已经定义',function(){
			expect(monitorCenterCtrl.getDataOverview).toBeDefined();
		});
		it('测试monitorCenterCtrl.queryQuantityCompany方法是否已经定义',function(){
			expect(monitorCenterCtrl.queryQuantityCompany).toBeDefined();
		});
		it('测试monitorCenterCtrl.serviceQueryQuantity方法是否已经定义',function(){
			expect(monitorCenterCtrl.serviceQueryQuantity).toBeDefined();
		});
	});

	describe('测试monitorCenterCtrl下面的方法是否正确执行',function(){
		it('changeTop5Company正确执行',function(){
			monitorCenterCtrl.companyTops = {
				today:[],
				lastWeek:[],
				lastMonth:[]
			};
			monitorCenterCtrl.companyMatchRatios = {
				today:[],
				lastWeek:[],
				lastMonth:[]
			};
			monitorCenterCtrl.serviceTops = {
				today:[],
				lastWeek:[],
				lastMonth:[]
			};
			monitorCenterCtrl.serviceMatchRatios = {
				today:[],
				lastWeek:[],
				lastMonth:[]
			};
			monitorCenterCtrl.changeTop5Company();
			monitorCenterCtrl.changeTop5Company(7);
			monitorCenterCtrl.changeTop5Company(30);
			monitorCenterCtrl.changeTop5Service();
			monitorCenterCtrl.changeTop5Service(7);
			monitorCenterCtrl.changeTop5Service(30);
			monitorCenterCtrl.changeMonthly();
			expect(AdminMonitorCenterFactory.getDataOverview).toHaveBeenCalled();
			expect(AdminMonitorCenterFactory.getQueryQuantityCompany).toHaveBeenCalled();
			expect(AdminMonitorCenterFactory.getServiceQueryQuantity).toHaveBeenCalled();
		});
	});


	describe('测试监控中心控制器获取数据部分',function(){

		xit('测试monitorCenterCtrl.getDataOverview是否被调用',function(){
			monitorCenterCtrl.getDataOverview(isNotMonthly);
			expect(monitorCenterCtrl.getDataOverview.calls.any()).toEqual(true);
		});

		it('测试adminMonitorCenterCtrl.getDataOverview时，AdminMonitorCenterFactory.getDataOverview是否也被调用，以及调用后的一些返回值',function(){
			var vm = monitorCenterCtrl;
			vm.getDataOverview(isNotMonthly);
			scope.$apply();
			expect(AdminMonitorCenterFactory.getDataOverview).toHaveBeenCalled();
			expect(vm.dataOverView.accumulateQueryTimes).toEqual(87865);
			expect(vm.dataOverView.accumulateSuccessTimes).toEqual(38332);
			expect(vm.dataOverView.accumulateSwitchInCompanies).toEqual(7);
		});

		it('测试当调用adminMonitorCenterCtrl.queryQuantityCompany时，AdminMonitorCenterFactory.getQueryQuantityCompany也将被调用',function(){
			vm.queryQuantityCompany(isNotMonthly);
			scope.$apply();
			expect(AdminMonitorCenterFactory.getQueryQuantityCompany).toHaveBeenCalled();
			expect(vm.companyTops).toEqual(jasmine.any(Object));
			for(key in vm.companyTops.lastMonth[0]){
				expect(vm.companyTops.lastMonth[0][key].value).toEqual(24261);
			}
			expect(vm.companyTopList).toEqual(jasmine.any(Object));
			expect(vm.companyTopMax).toEqual(115);
		});

		it('测试当调用adminMonitorCenterCtrl.serviceQueryQuantity时，AdminMonitorCenterFactory.getServiceQueryQuantity也将被调用',function(){
			vm.serviceQueryQuantity(isNotMonthly);
			scope.$apply();
			expect(AdminMonitorCenterFactory.getServiceQueryQuantity).toHaveBeenCalled();
			expect(vm.serviceTops).toEqual(jasmine.any(Object));
			for(key in vm.serviceTops.lastMonth[0]){
				expect(vm.serviceTops.lastMonth[0][key].value).toEqual(34773);
			}
			expect(vm.serviceTopList.length).toEqual(4);
			expect(vm.serviceQueryQuantityTopMax).toEqual(73);
		});

	});

});