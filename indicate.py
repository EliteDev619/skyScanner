import requests

def search_flight(origin, destination):
url = "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search"
headers = {
"x-api-key": "prtl6749387986743898559646983194",
"Content-Type": "application/json"
}
payload = {
"query": {
"market": "UK",
"locale": "en-GB",
"currency": "GBP",
"queryLegs": [
{
"originPlace": {
"queryPlace": {
"iata": origin
}
},
"destinationPlace": {
"queryPlace": {
"iata": destination
}
},
"anytime": True
}
]
}
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if "results" in data["content"]:
quotes = data["content"]["results"]["quotes"]
if quotes:
print(f"Results for pair: {origin}-{destination}")
for quote_id, quote in quotes.items():
print(f"Quote ID: {quote_id}")
print("Min Price:", quote["minPrice"]["amount"], quote["minPrice"]["unit"])
print("Is Direct:", quote["isDirect"])
print("Outbound Leg:")
print(" - Origin Place ID:", quote["outboundLeg"]["originPlaceId"])
print(" - Destination Place ID:", quote["outboundLeg"]["destinationPlaceId"])
print(" - Departure Date:", quote["outboundLeg"]["departureDateTime"])
print(" - Quote Creation Timestamp:", quote["outboundLeg"]["quoteCreationTimestamp"])
print(" - Marketing Carrier ID:", quote["outboundLeg"]["marketingCarrierId"])
print("Inbound Leg:")
print(" - Origin Place ID:", quote["inboundLeg"]["originPlaceId"])
print(" - Destination Place ID:", quote["inboundLeg"]["destinationPlaceId"])
print(" - Departure Date:", quote["inboundLeg"]["departureDateTime"])
print(" - Quote Creation Timestamp:", quote["inboundLeg"]["quoteCreationTimestamp"])
print(" - Marketing Carrier ID:", quote["inboundLeg"]["marketingCarrierId"])
print()
else:
print(f"No results found for pair: {origin}-{destination}")
else:
print("No results found")

pairs = [
("LHR", "LGW"),
("CDG", "ORY"),
("JFK", "LGA"),
("FRA", "HHN"),
("FCO", "CIA"),
("SYD", "CBR"),
("HND", "NRT"),
("AMS", "RTM"),
("MEL", "AVV"),
("SFO", "OAK"),
("HKG", "MAC"),
("SIN", "XSP"),
("DFW", "DAL"),
("MUC", "NUE"),
("PEK", "NAY"),
("KUL", "SZB"),
("MIA", "FLL"),
("GIG", "SDU"),
("HEL", "TMP"),
("BCN", "GRO"),
("BKK", "DMK"),
("ZRH", "BSL"),
("MXP", "BGY"),
("IST", "SAW"),
("OTP", "BBU"),
("LIS", "FAO"),
("CGK", "HLP"),
("YVR", "YXX"),
("DUB", "SNN"),
("SVO", "VKO"),
("DME", "ZIA"),
("LAX", "BUR"),
("MNL", "CRK"),
("ATL", "PDK"),
("BOM", "PNQ"),
("DXB", "SHJ"),
("IAH", "HOU"),
("LGW", "LCY"),
("HND", "HAC"),
("SYD", "BNE"),
("CDG", "BVA"),
("LHR", "LTN"),
("AMS", "EIN"),
("NRT", "HND"),
("AKL", "WLG"),
("CGK", "CGK"),
("SIN", "TRX"),
("IST", "ISL"),
("ARN", "BMA"),
("CGN", "DUS"),
("DEN", "APA"),
("DOH", "DMM"),
("GVA", "LYS"),
("KIX", "ITM"),
("LPA", "TFN"),
("LGA", "JFK"),
("MEX", "TLC"),
("SJC", "SFO"),
("HKG", "SHZ"),
("YYZ", "YTZ"),
("GRU", "CGH"),
("WAW", "LCJ"),
("NCE", "MCU"),
("AMS", "ANR"),
("BNE", "OOL"),
("BLR", "TRV"),
("CDG", "BES"),
("EDI", "GLA"),
("FRA", "SCN"),
("GDL", "UPN"),
("HKG", "ZAS"),
("IST", "AYT"),
("KUL", "PEN"),
("LGW", "STN"),
("LHR", "LGW"),
("ORD", "MDW"),
("PVG", "SHA"),
("ICN", "GMP"),
("NCE", "CUF"),
("BNE", "WTB"),
("SYD", "NTL"),
("GDL", "GDL"),
("DME", "VKO"),
("CGN", "FMO"),
("DUS", "MGL"),
("BRU", "CRL"),
("HND", "OKO"),
("CTU", "CFD"),
("DFW", "DFW"),
("DCA", "BWI"),
("LAX", "SNA"),
("SYD", "SYD"),
("HND", "KIJ"),
("SFO", "SJC"),
("HKG", "CAN"),
("CDG", "LBG"),
("LHR", "LTN"),
("DXB", "DXB"),
("FRA", "FRA"),
("BCN", "REU"),
("LCY", "STN"),
("MNL", "SFS"),
("BOM", "BOM"),
("ICN", "CJU"),
("SIN", "XXS"),
("LGW", "LTN"),
("DME", "DME"),
("MEL", "CBR"),
("HEL", "TLL"),
("AMS", "AMS"),
("JFK", "EWR"),
("YVR", "YVR"),
("ORD", "ORD"),
("IST", "IST"),
("CDG", "CDG"),
("GVA", "GVA")
]

for origin, destination in pairs:
search_flight(origin, destination)
print()