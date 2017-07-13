   
# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re
# def test_gy_fund(self):
driver = webdriver.Chrome()
driver.get(
    "http://www.zhuminsheng.com/" + "/fund/public/newfundweb/service/Fund_index.html?param=jbxx&serviceid=undefined&areaid=520100&serviceid=7e0e3013b5cf8978d278d3467b308639&areaid=520100")
driver.find_element_by_id("user_id").clear()
driver.find_element_by_id("user_id").send_keys("520102198608263439")
driver.find_element_by_css_selector("button.search_btn.idCard-page-submit").click()
time.sleep(5)
assertEqual("116112580", driver.find_element_by_css_selector("p.spcode-middle").text)
driver.find_element_by_css_selector("div.search-list-submit").click()
driver.find_element_by_id("password").clear()
driver.find_element_by_id("password").send_keys("860826")
driver.find_element_by_css_selector("button.input-password-btn.make-sure").click()
time.sleep(20)
assertEqual(u"leo", driver.title)