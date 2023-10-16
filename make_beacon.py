from tqdm import tqdm
from acdh_tei_pyutils.tei import TeiReader


listperson_url = (
    "https://github.com/semantic-kraus/fa-data/raw/main/data/indices/listperson.xml"
)
listperson_xml = "listperson.xml"
try:
    doc = TeiReader(listperson_xml)
except OSError:
    print(
        f"no local version of {listperson_xml} found, fetching data from {listperson_url}"
    )
    doc = TeiReader(listperson_url)
    doc.tree_to_file("listperson.xml")

failed = []
worked = []
nsmap = doc.nsmap
with open("html/beacon.txt", "w", encoding="utf-8") as f:
    f.write("#FORMAT: BEACON\n")
    f.write("#NAME: Hanslick Online\n")

    for x in tqdm(doc.any_xpath(".//tei:person[./tei:idno[@type='GND']/text()]")):
        gnd = x.xpath("./tei:idno[@type='GND']/text()", namespaces=nsmap)[0]
        gnd_uri = f"https://d-nb.info/gnd/{gnd}"
        fackel_uri = x.xpath("./tei:idno[@type='URI']/text()", namespaces=nsmap)[0]
        name = x.xpath("./tei:persName[1]/text()", namespaces=nsmap)[0].strip()
        f.write(f"{gnd_uri}|{name}|{fackel_uri}\n")
