const driverLogin = r => require.ensure([], () => r(require('../page/driverLogin/driverLogin')), 'driverLogin')
const cash = r => require.ensure([], () => r(require('../page/cash/cash')), 'cash')
const commission = r => require.ensure([], () => r(require('../page/commission/commission')), 'commission')

export default [
  // 司机登陆
  {
    path: '/driverLogin',
    component: driverLogin,
    name: '司机登陆'
  },
  // 司机登陆
  {
    path: '/',
    component: driverLogin,
    name: '司机登陆'
  },
// 提现明细
  {
    path: '/cash',
    component: cash,
    name: '提现明细'
  },
  // 收取佣金
  {
    path: '/commission',
    component: commission,
    name: '收取佣金'
  },
]


