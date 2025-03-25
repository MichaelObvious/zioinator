import requests
import time

def get_category_members(category, cmcontinue=None):
    """
    Queries the MediaWiki API for category members.
    """
    url = "https://en.wiktionary.org/w/api.php"
    params = {
        "action": "query",
        "list": "categorymembers",
        "cmtitle": category,
        "cmlimit": "500",  # Maximum allowed per request
        "format": "json",
    }
    if cmcontinue:
        params["cmcontinue"] = cmcontinue
    response = requests.get(url, params=params)
    response.raise_for_status()  # Raises an error for bad responses
    return response.json()

def get_all_category_members(category):
    """
    Retrieves all members of the given category using pagination.
    """
    members = []
    cmcontinue = None
    i = 0
    while True:
        data = get_category_members(category, cmcontinue)
        members.extend(data["query"]["categorymembers"])
        if "continue" in data:
            cmcontinue = data["continue"]["cmcontinue"]
            # Be polite and avoid hammering the server too fast
            time.sleep(0.5)
        else:
            break
        i += 1
        if i % 10 == 0:
            print(i, members[-1]['title'])
    return members

if __name__ == "__main__":
    category = "Category:Italian masculine nouns"
    print("Fetching category members for", category)
    members = get_all_category_members(category)
    print(f"Total nouns found: {len(members)}")
    
    # # Output the titles (the noun words)
    # for member in members:
    #     print(member["title"])
        
    with open('parole.txt', 'w') as f:
        f.write('\n'.join(map(lambda x: x['title'], members)))