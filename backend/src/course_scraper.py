import requests
import re
from bs4 import BeautifulSoup

def getHTMLdocument(url):
    response = requests.get(url)
    return response.text

url = "https://www.seasoasa.ucla.edu/curric-24-25/23-bioeng-ugstd-24.html"
html_document = getHTMLdocument(url)

soup = BeautifulSoup(html_document, "html.parser")
course_names = []
course_titles = []

def scrape_course(soup):
    for ul in soup.find_all('ul', class_='no-bullets'):
        for list in ul.find_all('li'):
            course_match = re.search(r"^[A-Z 0-9& ]+(?= - )", list.string)
            title_match = re.search(r"(?<= - )[A-Za-z(),-:' ]+$", list.string)
            if course_match:
                course_names.append(course_match.group())
            else:
                print("No match found: " + list.string)

            
            if title_match:
                course_titles.append(title_match.group())
            else:
                print("No match found: " + list.string)


