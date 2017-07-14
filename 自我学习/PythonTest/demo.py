
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest,time

driver=webdriver.Chrome()
driver.get("http://www.baidu.com")
self.driver.maximize_window()
builder = ActionChains(driver)
builder.key_down(Keys.F12).perform()
time.sleep(5)