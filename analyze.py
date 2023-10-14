import json

from acdh_tei_pyutils.tei import TeiReader
from acdh_tei_pyutils.utils import get_birth_death_year
from collections import defaultdict

listperson_url = "https://github.com/semantic-kraus/fa-data/raw/main/data/indices/listperson.xml"
listperson_xml = "listperson.xml"
LIMIT = 20
try:
    doc = TeiReader(listperson_xml)
except OSError:
    print(f"no local version of {listperson_xml} found, fetching data from {listperson_url}")
    doc = TeiReader(listperson_url)
    doc.tree_to_file("listperson.xml")
nsmap = doc.nsmap

gnds = list()

data = {
    "gender": {"male": 0, "female": 0, "not_specified": 0},
    "gnds": [],
    "wikidatas": [],
    "mentions": defaultdict(list),
    "jobs": defaultdict(list),
    "born_in": defaultdict(list),
    "birth_year": defaultdict(list),
    "died_in": defaultdict(list),
    "death_year": defaultdict(list),
}
for x in doc.any_xpath(".//tei:person"):
    fa_id = x.attrib["{http://www.w3.org/XML/1998/namespace}id"]
    data["mentions"][len(x.xpath(".//tei:ptr", namespaces=nsmap))].append(fa_id)
    try:
        sex = x.xpath("./tei:sex/text()", namespaces=nsmap)[0]
        if sex == "male":
            data["gender"]["male"] += 1
        elif sex == "female":
            data["gender"]["female"] += 1
    except IndexError:
        data["gender"]["not_specified"] += 1
    try:
        data["gnds"].append(x.xpath("./tei:idno[@type='GND']", namespaces=nsmap)[0])
    except IndexError:
        pass
    try:
        data["wikidatas"].append(x.xpath("./tei:idno[@type='WikiData']", namespaces=nsmap)[0])
    except IndexError:
        pass
    for job in x.xpath("./tei:occupation", namespaces=nsmap):
        data["jobs"][job.text].append(fa_id)
    for birth in x.xpath("./tei:birth/tei:placeName", namespaces=nsmap):
        data["born_in"][birth.text].append(fa_id)
    for death in x.xpath("./tei:death/tei:placeName", namespaces=nsmap):
        data["died_in"][death.text].append(fa_id)
    birth_year = get_birth_death_year(x)
    if birth_year:
        data["birth_year"][birth_year].append(fa_id)
    death_year = get_birth_death_year(x, birth=False)
    if death_year:
        data["death_year"][death_year].append(fa_id)

new_data = {}
for key, value in data.items():
    if key in ["gnds", "wikidatas"]:
        new_data[key] = len(value)
    elif key in ["gender"]:
        new_data[key] = value
    else:
        new_data[key] = {}
        for x, y in dict(value).items():
            new_data[key][x] = len(y)

with open("./html/data.json", "w", encoding="utf-8") as fp:
    json.dump(new_data, fp, ensure_ascii=False, indent=4)
