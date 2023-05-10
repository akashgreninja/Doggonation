# from dotenv import load_dotenv
# import os
# import requests
# import uuid


# load_dotenv()


# key = os.getenv('KEY')
# endpoint = os.getenv('ENDPOINT')
# location = os.getenv('LOCATION')



# print(key)
# print(endpoint)
# print(location)



# text = "नमस्ते मेरा नाम आकाश है"
# target_language = 'en'
# path = '/translate?api-version=3.0'
# target_language_parameter = '&to=' + target_language
# constructed_url = endpoint + path + target_language_parameter
# headers = {
# 'Ocp-Apim-Subscription-Key': key,
# 'Ocp-Apim-Subscription-Region': location,
# 'Content-type': 'application/json',
# 'X-ClientTraceId': str(uuid.uuid4())
# }
# body = [{ 'text': text }]
# translator_request = requests.post(constructed_url, headers=headers, json=body)
# translator_response = translator_request.json()
# translated_text = translator_response[0]['translations'][0]['text']
# print(translated_text)