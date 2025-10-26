import requests
from bs4 import BeautifulSoup

def getHTMLdocument(url):
    response = requests.get(url)
    return response.text

url = "https://www.seasoasa.ucla.edu/curric-24-25/23-bioeng-ugstd-24.html"
html_document = getHTMLdocument(url)

soup = BeautifulSoup(html_document, "html.parser")

def scrape_course(soup):
    for ul in soup.find_all('ul', class_='no-bullets'):
        for list in ul.find_all('li'):
            print(list.string)
