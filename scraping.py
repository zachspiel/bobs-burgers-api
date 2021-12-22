import requests
import time
import csv
from datetime import date, datetime
from bs4 import BeautifulSoup
import json


def filter_rows(rows, text):
    filtered = []

    for row in rows:
        if(text in row.text.strip()):
            filtered.append(row)
    return filtered


def filter_text(text):
    text_array = text[0].text.strip().split('\n')
    filtered_array = list(filter(
        lambda string: len(string) != 0, text_array))

    return filtered_array[1]


def scrape_characters_page(source_url, soup):
    characters = soup.find_all("a", class_="category-page__member-link")
    urls = []
    file = open('final.json')
    character_objects = json.load(file)
    file.close()

    for each_book in characters:
        new_url = source_url+each_book["href"]
        print("Appending: " + new_url)
        urls.append(new_url)

    for url in urls:
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, "html.parser")
        print("Fetched: " + url)
        info_table = soup.find("table", class_="infobox")

        if info_table != None:
            rows = info_table.find_all("tr")
            character_object = {}
            if rows != None and len(rows) > 2:
                name = rows[2].text.strip()
                image = rows[1].find("img")
                image_link = ""
                if(image != None):
                    image_link = image["src"]
                gender = filter_rows(rows, 'Gender')
                hair = filter_rows(rows, 'Hair')
                occupation = filter_rows(rows, 'Occupation')
                relatives = filter_rows(rows, 'Relatives')
                age = filter_rows(rows, 'Age')
                character_object["url"] = url
                character_object["name"] = name
                character_object["image"] = image_link

                if len(relatives) > 0:
                    relatives_list = relatives[0].text.strip().split('\n')
                    filtered = []
                    for relative in relatives_list:
                        if ('(see ' not in relative) and 'Relative' not in relative and len(relative) > 0:
                            filtered.append(relative)
                    character_object["relatives"] = filtered

                if len(hair) > 0:
                    character_object["hair"] = filter_text(hair)
                if len(gender) > 0:
                    character_object["gender"] = filter_text(gender)
                if len(occupation) > 0:
                    character_object["occupation"] = filter_text(occupation)
                if len(age) > 0:
                    character_object["age"] = filter_text(age)

            character_objects.append(character_object)
            print("Retrieved: " + json.dumps(character_object))

        time.sleep(0.5)

    out_file = open("final.json", "w")

    json.dump(character_objects, out_file, indent=6)

    out_file.close()


def scrape_all_character_pages(seed_url, page_number=0):
    urls = ["", "?from=Duncan", "?from=Marci", "?from=Skip+Marooch"]

    if(page_number == 4):
        return True

    try:
        url = seed_url + urls[page_number]

        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, "html.parser")
        print(f"Now Scraping - {seed_url}")

        if soup.find("a", class_="category-page__member-link") != None:
            scrape_characters_page("https://bobs-burgers.fandom.com", soup)

            time.sleep(3)
            page_number += 1
            return scrape_all_character_pages(seed_url, page_number)
        else:
            return False
    except Exception as e:
        return e


def scrape_storefront_and_trucks(url, file):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, "html.parser")
    print("Fetched: " + url)
    wiki_tables = soup.find_all("table", class_="wikitable")
    stores = []
    id = 0
    if wiki_tables != None:
        table_index = 0
        for wiki_table in wiki_tables:
            if table_index != 8 and table_index != 0:
                rows = wiki_table.find_all("tr")
                if rows != None and len(rows) > 0:

                    for index in range(1, len(rows)):
                        store = {}
                        a_tags = rows[index].find_all("a")

                        name = rows[index].find_all("td")[1].text.strip()
                        if (len(name) != 0):
                            store["name"] = name
                        store["episode"] = a_tags[0].text.strip()
                        store["image"] = a_tags[1]["href"]

                        if table_index > 8:
                            store["season"] = table_index - 1
                        else:
                            store["season"] = table_index
                        store["id"] = id
                        store["url"] = "http://bobs-burgers-api/stores/" + \
                            str(id)
                        stores.append(store)
                        id += 1
            table_index += 1

        out_file = open(file, "w")
        json.dump(stores, out_file, indent=2)
        out_file.close()


def scrap_end_credits(url, file):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, "html.parser")
    print("Fetched: " + url)
    wiki_tables = soup.find_all("table", class_="wikitable")
    stores = []
    id = 13
    if wiki_tables != None:
        table_index = 0
        for wiki_table in wiki_tables:
            rows = wiki_table.find_all("tr")
            if rows != None and len(rows) > 0:
                for index in range(1, len(rows)):
                    store = {}
                    a_tags = rows[index].find_all("a")
                    if(len(a_tags) > 0):
                        store["id"] = id
                        store["episode"] = a_tags[0].text.strip()
                        store["image"] = a_tags[1]["href"]
                        store["season"] = table_index + 2
                        store["url"] = "http://bobs-burgers-api/stores/" + \
                            str(id)
                        stores.append(store)
                        id += 1
            table_index += 1

        out_file = open(file, "w")
        json.dump(stores, out_file, indent=2)
        out_file.close()


def scrape_episodes(url, file):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, "html.parser")
    print("Fetched: " + url)
    wiki_tables = soup.find_all(
        "table", class_="wikitable")
    episodes = []

    id = 1
    if wiki_tables != None:
        table_index = 0
        for wiki_table in wiki_tables:
            rows = wiki_table.find_all("tr")
            if rows != None and len(rows) > 0:

                for index in range(1, len(rows)):
                    episode = {}
                    link = rows[index].find("a")["href"]

                    cells = rows[index].find_all("td")
                    season_episode = cells[2].text.strip().split(",")
                    season_number = season_episode[0].split(" ")[1]
                    episode_number = season_episode[1].strip().split(" ")[
                        1]
                    formatted_episode = episode_number if len(
                        episode_number) > 2 else int(episode_number)

                    total_viewers = scrape_total_Viewers(link, False)
                    name = cells[0].text.strip()

                    episode["id"] = id
                    if (len(name) != 0):
                        episode["name"] = name

                    episode["productionCode"] = cells[1].text.strip()
                    episode["airDate"] = cells[len(cells) - 1].text.strip()
                    episode["season"] = int(season_number)
                    episode["episode"] = formatted_episode

                    if (len(total_viewers) > 0):
                        episode["totalViewers"] = total_viewers
                    episode["url"] = "http://bobs-burgers-api/episodes/" + \
                        str(id)
                    episodes.append(episode)
                    id += 1
            table_index += 1

        out_file = open(file, "w")
        json.dump(episodes, out_file, indent=2)
        out_file.close()


def scrape_total_Viewers(url, retried):
    complete_url = "https://bobs-burgers.fandom.com" + url
    episode_html_text = requests.get(complete_url).text
    # print("Getting episode details for: " + complete_url)

    soup = BeautifulSoup(episode_html_text, "html.parser")
    info_box = soup.find("aside", class_="portable-infobox")

    if info_box != None:
        viewers = info_box.find(
            "div", {"data-source": "viewers"})
        return viewers.text.strip()
    elif(retried == False):
        return scrape_total_Viewers(url + "_(Episode)", True)
    else:
        return ""


'''
if __name__ == "__main__":
    seed_url = "https://bobs-burgers.fandom.com/wiki/Category:Characters"
    print("Web scraping has begun")
    result = scrape_all_character_pages(seed_url)
    print(result)
    if result == True:
        print("Web scraping is now complete!")
    else:
        print(f"Error - {result}")
'''
scrape_episodes(
    "https://bobs-burgers.fandom.com/wiki/List_of_episodes_by_production_order", "episodes.json")
