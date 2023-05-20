import random
import time

import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from httplib2 import Http
from oauth2client import file, client, tools
import urllib.request
from datetime import datetime


try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

SCOPES = ['https://www.googleapis.com/auth/drive.metadata',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive']
store = file.Storage('storage_.json')
creds = store.get()

if not creds or creds.invalid:
    flow = client.flow_from_clientsecrets('./secret.json', SCOPES)
    creds = tools.run_flow(flow, store, flags) if flags else tools.run_flow(flow, store)

service = build('drive', 'v3', http=creds.authorize(Http()))
folder_id = ""

conn_default = pymongo.MongoClient()
url = ""
conn = MongoClient(url, server_api=ServerApi('1'))

db_name = ""
db = conn.get_database(db_name)

chrome_options= Options()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable0dev-shm-usage')

def scroll(element, classname):
    prev_height = driver.execute_script("return "+element+".scrollHeight")
    wrap = driver.find_element(By.CLASS_NAME, classname)
    #driver.find_elements(By.XPATH, elementpath)
    while True:
        driver.execute_script("arguments[0].scrollBy(0, "+element+".scrollHeight)",wrap)
        time.sleep(1)
        current_height = driver.execute_script("return "+element+".scrollHeight")
        if current_height == prev_height:
            break
        prev_height = current_height
        
def body_scroll():
    doc_height = driver.execute_script("return document.body.scrollHeight")
    current_y = driver.execute_script("return window.pageYOffset")
    if doc_height-current_y < doc_height/2.5:
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
        time.sleep(2)

driver = webdriver.Chrome()
driver.implicitly_wait(3)
driver.get('') #url
driver.find_element(By.ID, 'email').send_keys("")
driver.find_element(By.ID,'password').send_keys("")
driver.find_element(By.XPATH,'//*[@id="app"]/div/section/div/div[2]/div[2]/button').click() #로그인
driver.find_element(By.XPATH, '//*[@id="app"]/div/section/ul/li[1]/a').click()

#Letter 백업
driver.find_element(By.XPATH, '//*[@id="app"]/div/div[1]/nav/span[2]/a').click() #Letter 메뉴
driver.refresh()
collection_name = "letter"
coll = db.get_collection(collection_name)
feed_list = driver.find_element(By.CLASS_NAME, 'feedList').find_elements(By.CSS_SELECTOR, 'li') #전체 피드 목록 받아오기
error_list = []


for i in range(1,1422):
    body_scroll()
    XPATH = '//*[@id="app"]/div/div[2]/ul/li['+str(i)+']/div/a'
    tmp_db = coll.find_one({'_id':i})
    actions = ActionChains(driver).scroll_to_element(driver.find_element(By.XPATH, XPATH))
    actions.perform()
    try:
        time.sleep(3)
        document = {}
        document["_id"] = i
        driver.find_element(By.XPATH, XPATH).click()
        driver.implicitly_wait(5)
        writer = driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div[1]/div[2]/p[1]').text

        if "Artist" not in writer:
            print("get error", i)
            while "Artist" not in writer: #오류시 재시도
                driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[4]/div/div[1]/div/button').click()  # 'X'
                driver.refresh()
                driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
                actions.perform()
                driver.find_element(By.XPATH, XPATH).click()
                writer = driver.find_element(By.XPATH,
                                             '//*[@id="app"]/div/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div[1]/div[2]/p[1]').text
                if "Artist" in writer:
                    print("break error", writer)
                    break
                    
        date = driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div[1]/div[2]/p[2]').text
        contents = driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[4]/div/div[2]/div[1]/div/a/div').text
        etc = driver.find_element(By.XPATH,'//*[@id="app"]/div/div[2]/div[4]/div/div[2]/div[1]/div/a')
        document["writer"] = writer
        document["date"] = date
        document["contents"] = contents
        
        if len(etc.find_elements(By.CSS_SELECTOR, 'div'))>1: #글 외에 사진 존재
            images_content = []
            etc_list = [i.get_property('className') for i in etc.find_elements(By.CSS_SELECTOR, 'div')]
            if 'slider' in etc_list: #사진 여러장
                images = driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[4]/div/div[2]/div[1]/div/a/div[2]/div[2]/div/div').find_elements(By.CSS_SELECTOR, 'img')
                if tmp_db.get('images')==None or len(tmp_db.get('images'))!=len(images):
                    time.sleep(10)
                    for img in images:
                        urllib.request.urlretrieve(img.get_property("src"),"./"+"1.jpg")
                        request_body = {'name':str(datetime.now().microsecond)+str(img)+str(images.index(img)), 'parents':[folder_id], 'uploadType':'resumable'}
                        media = MediaFileUpload("./1.jpg")
                        file_info = service.files().create(body=request_body, media_body=media, fields='id,webViewLink').execute()

                        images_content.append(file_info.get('webViewLink'))
                        
            elif 'thumbnail' in etc_list and (tmp_db.get('images')==None): #사진 한 장
                time.sleep(10)
                image = driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[4]/div/div[2]/div[1]/div/a/div[2]').find_element(By.CSS_SELECTOR,'img')
                src = image.get_property("src")
                urllib.request.urlretrieve(image.get_property("src"),"./1.jpg")
                request_body = {'name': str(datetime.now().microsecond) + str(i)+"1", 'parents': [folder_id],
                                'uploadType': 'resumable'}
                media = MediaFileUpload("./1.jpg")
                file_info = service.files().create(body=request_body, media_body=media,
                                                   fields='id,webViewLink').execute()

                images_content.append(file_info.get('webViewLink'))
                
            if len(images_content)>0:
                document["images"] = images_content
                
        scroll("document.getElementsByClassName('scrollWrap')[0]", "scrollWrap")
        comments = driver.find_element(By.CLASS_NAME, 'container.commentList').find_elements(By.CSS_SELECTOR, 'li')
        comment_content=[]
        comment_items={}
        
        for j in range(len(comments)):
            if 'Artist' in comments[j].text.split("\n")[0]:
                origin = j
                if comments[j].get_property("className")=="feed re":
                    tmp = j-1
                    while True:
                        if comments[tmp].get_property("className")=="feed": #원본 댓글 찾기
                            break
                        tmp-=1

                    if comments[tmp].text in comment_items.keys(): #이미 저장된 적 있음. -> 저장된 이후부터.
                        lenth = len(comment_items[comments[tmp].text])
                        for k in range(tmp+lenth, j+1):
                            comment_items[comments[tmp].text]+=[(comments[k].text.split("\n")[0],comments[k].text.split("\n")[1:])]
                    else: #저장된 적 없다 : 원본 ~ origin까지 저장한다
                        comment_items[comments[tmp].text] = [(comments[tmp].text.split("\n")[0],comments[tmp].text.split("\n")[1:])] #원본 댓글 저장
                        for k in range(tmp+1, j+1):
                            comment_items[comments[tmp].text]+=[(comments[k].text.split("\n")[0],comments[k].text.split("\n")[1:])]
                else:
                    comment_content.append(comments[j].text.split("\n"))
            else:
                continue
                
        if len(comment_content)>0:
            document["comments"]=comment_content
        if len(comment_items)>0:
            document["reply"]=comment_items
            
        #temp_list.append(document)
        if len(document.keys())>0:
            try:
                coll.update_one({"_id": i}, {"$set": document})
                print("updated", i, document)
            except Exception as e:
                print("except", e)
                error_list.append(i)
                print(error_list)
        driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[4]/div/div[1]/div/button').click()  # 'X'
        time.sleep(1)
    except Exception as e:
        print("except",i, e)
        error_list.append(i)
        print("error list", error_list)
        continue
