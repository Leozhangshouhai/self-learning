
# -*- coding:utf-8 -*-
# __author__='zhangshouhai'python+webdriver 查找元素
# __des__='ViolationQuery'
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest,time

class ViolationQuery(unittest.TestCase):
	def setUp(self):
		self.driver = webdriver.Chrome()
		self.base_url = 'http://www.zhuminsheng.com/'
		self.driver.implicitly_wait(30)
		self.verificationErrors = []
		self.accept_next_alert = True
		self.driver.set_window_size(1920,1080)
	def test_fund(self):
		driver = self.driver
		driver.get(
			self.base_url + "/fund/public/newfundweb/service/Fund_index.html?param=jbxx&serviceid=undefined&areaid=520100&serviceid=7e0e3013b5cf8978d278d3467b308639&areaid=520100")
		driver.find_element_by_id("user_id").clear()
		driver.find_element_by_id("user_id").send_keys("520102198608263439")
		driver.find_element_by_css_selector("button.search_btn.idCard-page-submit").click()
		time.sleep(5)
		self.assertEqual("116112580", driver.find_element_by_css_selector("p.spcode-middle").text)
		driver.find_element_by_css_selector("div.search-list-submit").click()
		driver.find_element_by_id("password").clear()
		driver.find_element_by_id("password").send_keys("860826")
		driver.find_element_by_css_selector("button.input-password-btn.make-sure").click()
		time.sleep(20)
		self.assertEqual(u"贵阳市住房公积金网上预申请及查询系统", driver.title)
	def test_volat(self):
		print("开始任务1：违章查询的自动化测试")
		self.driver.get(self.base_url+'ht/traffic-pc/pages/traffic-violation.html?serviceid=f3fe8bd9e266974a5faaa2a037e04247&areaid=520100')
		time.sleep(2)
		num_input=self.driver.find_element_by_id('car-grade')
		num_input.clear()
		num_input.send_keys('3gs86')
		select_kind=self.driver.find_element_by_css_selector('.select-opt')
		# 获取到该元素，模拟点击事件
		select_kind.click()
		#4 #以下定位是查找li标签中class为present的元素，该定位方法重要
		select_kind_detail=self.driver.find_element_by_xpath('//li[@class="present"]')
		select_kind_detail.click()
		car_engine=self.driver.find_element_by_css_selector('#car-engine')
		checkbox_btn=self.driver.find_element_by_css_selector('#checkbox-btn')
		car_engine.clear()
		car_engine.send_keys('606159')
		checkbox_btn.click()
		self.driver.find_element_by_xpath('//button[@class="search_btn"]').click()
		time.sleep(2)
		sign=self.driver.find_element_by_xpath('//div[@class="detail-wrap"]').is_displayed()
		self.assertEqual(True, sign)
		print("测试结果：******%s"%sign)
	def test_schoolMap(self):
		#  模拟点击左侧区县选择栏，验证条件:
		#1.点击后，右边列表框是否出现 
		#2.默认点击第一个，列表框第一个信息是否匹配
		#3.点击小升初，匹配第一个出现的值
		#4.点击关闭按钮，列表框隐藏
		#5.输入框输入“白云区”，出现迷糊搜索的匹配值
		#6.点击匹配值的第一个"白云区实验中学"，验证是否出现对应的值
		#7.点击地图按钮，跳转至相应页面，判断新页面是否匹配
		print('开始任务2：学区地图的自动化测试')
		self.driver.get(self.base_url+'ht/schoolmaph5web/schoolMap/WEB/pages/school_district_map.html')
		time.sleep(1)
		area_1=self.driver.find_element_by_xpath('//li[@uid="520113"]')
		area_1.click()
		time.sleep(3)
		#******************1*****************
		area_1_display=self.driver.find_element_by_css_selector('#right_div_clone').is_displayed()
		print("********结果是:****",area_1_display)
		self.assertEqual(True,area_1_display)
		# *****************2*****************
		area_1_content=self.driver.find_element_by_xpath('//li[@uid="216"]').get_attribute('school_name')
		print(u"显示小学名称是",area_1_content)
		self.assertEqual(u"贵阳市白云区新村展望小学",area_1_content)
		# *****************3******************
		self.driver.find_element_by_css_selector("#xiaoshengchu").click()
		area_1_content_xiaoshengchu=self.driver.find_element_by_xpath('//li[@uid="133"]').get_attribute('school_name')
		self.assertEqual(u'白云区实验中学',area_1_content_xiaoshengchu)
		# *****************4******************
		area_1_close=self.driver.find_element_by_xpath('//img[@class="close_btn"]')
		area_1_close.click()
		time.sleep(1)
		self.assertEqual(False,not area_1_display)
		# *****************5******************
		area_input=self.driver.find_element_by_css_selector('#search_ipn')
		area_input.clear()
		area_input.send_keys("白云区")
		time.sleep(2)
		self.assertEqual(True,self.driver.find_element_by_css_selector('#input-show').is_displayed())
		# *****************6*******************
		area_input_list=self.driver.find_elements_by_xpath('//dd[@class="input-show-dd"]')
		area_input_list.pop(0).click()
		self.assertEqual(u'白云区实验中学',self.driver.find_element_by_xpath('//li[@uid="133"]').get_attribute('school_name'))
		# *****************7*******************
		time.sleep(1)
		self.driver.find_element_by_xpath('//div[@attr_uid="133"]').click()
		time.sleep(2)
		new_page_text=self.driver.find_elements_by_css_selector('.info_header_title').pop(0).text
		self.assertEqual('白云区实验中学',new_page_text)
		print('学区地图测试结果：OK')
	def tearDown(self):
		self.assertEqual([],self.verificationErrors)
		print('\n'.join([''.join([('Love'[(x-y) % len('Love')] if ((x*0.05)**2+(y*0.1)**2-1)**3-(x*0.05)**2*(y*0.1)**3 <= 0 else ' ') for x in range(-30, 30)]) for y in range(13, -13, -1)]))
		
if __name__ == "__main__":
	unittest.main()
	