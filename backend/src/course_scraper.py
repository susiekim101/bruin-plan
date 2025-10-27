import requests
import re
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('../firebase-key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def getHTMLdocument(url):
    response = requests.get(url)
    return response.text

url_array = ["https://www.seasoasa.ucla.edu/curric-24-25/23-bioeng-ugstd-24.html",
             "https://www.seasoasa.ucla.edu/curric-24-25/60-matsci-ugstd-24.html"]
majors_array = ["Bioengineering", "Materials Science and Engineering"]
soup_dict = {}

for i in range(1):
    html_document = getHTMLdocument(url_array[i])
    soup = BeautifulSoup(html_document, "html.parser")
    soup_dict[soup] = majors_array[i]

# soup = BeautifulSoup(html_document, "html.parser")
course_id = []
course_titles = []

def scrape_course(soup):
    course_id.clear()
    course_titles.clear()
    for ul in soup.find_all('ul', class_='no-bullets'):
        for list in ul.find_all('li'):
            id_match = re.search(r"^[A-Z 0-9& ]+(?= - )", list.string)
            title_match = re.search(r"(?<= - )[A-Za-z(),-:' ]+$", list.string)
            if id_match:
                course_id.append(id_match.group())
            else:
                print("No match found: " + list.string)

            
            if title_match:
                course_titles.append(title_match.group())
            else:
                print("No match found: " + list.string)

for soup in soup_dict:
    scrape_course(soup)
    major = soup_dict[soup]

    for i in range(len(course_titles)):
        data = {
            "course_id": course_titles[i],
            "status": "Not Taken",
            "major": major
        }
        db.collection("courses").document(course_id[i]).set(data)