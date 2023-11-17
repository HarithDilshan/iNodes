from django.shortcuts import render
import json
import requests
from .services import get_token_balance 
# , authenticate_challenge, verify_challenge
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta, timezone
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from moralis import auth

# Create your views here.
def get_balance(requests):
    address = requests.GET.get("address")
    result = get_token_balance(address)
    result_json = json.dumps(result)
    return HttpResponse(result_json, content_type="application/json")

def request_challenge(requests):
    # data = json.loads(request.body)
    # print(data)
    chain_id = requests.GET.get("chainId")
    address = requests.GET.get("address")

    #setting request expiration time to 1 minute after the present->
    present = datetime.now(timezone.utc)
    present_plus_one_m = present + timedelta(minutes=1)
    expirationTime = str(present_plus_one_m.isoformat())
    expirationTime = str(expirationTime[:-6]) + 'Z'

    # REQUEST_URL = 'https://authapi.moralis.io/challenge/request/evm'
    # request_object = {
    #   "domain": "iVote.io",
    #   "chainId": data['chainId'],
    #   "address": data['address'],
    #   "statement": "Please confirm",
    #   "uri": "http://localhost:3000/",
    #   "expirationTime": expirationTime,
    #   "notBefore": "2020-01-01T00:00:00.000Z",
    #   "timeout": 15
    # }
    # x = requests.post(
    #     REQUEST_URL,
    #     json=request_object,
    #     headers={'X-API-KEY': 'pgdMtUIzPicdsRhzBcwRiomcPb8BQMGEspkQj8ikvbP4iS8HsVRHWT8JIxugwTQ3'})


    body = {
    "domain": "my.dapp",
    "address": address,
    "statement": "Please confirm",
    "uri": "https://my.dapp/",
    "resources": ["https://docs.moralis.io"],
    "timeout": 15,
    "expiration_time": expirationTime,
    "not_before": "2020-01-01T00:00:00.000Z",
    "chainId": chain_id
    }

    api_key = "pgdMtUIzPicdsRhzBcwRiomcPb8BQMGEspkQj8ikvbP4iS8HsVRHWT8JIxugwTQ3"
    result = auth.challenge.request_challenge_evm(api_key=api_key,body=body,)
    request_json = json.dumps(result)
    return HttpResponse(request_json, content_type="application/json")
    # return JsonResponse(json.loads(x.text))

# def verify_challenge(requests):
#     message = requests.GET.get("message")
#     signature = requests.GET.get("signature")
#     print(message)
#     body = {
#         "message": message,
#         "signature": signature,
#     }

#     api_key = "pgdMtUIzPicdsRhzBcwRiomcPb8BQMGEspkQj8ikvbP4iS8HsVRHWT8JIxugwTQ3"
#     result = auth.challenge.verify_challenge_evm(
#         api_key=api_key,
#         body=body,
#     )
#     verify_json = json.dumps(result)
#     return HttpResponse(verify_json, content_type="application/json")

def verify_challenge(request):
    # message = requests.GET.get("message")
    # signature = requests.GET.get("signature")
    data = json.loads(request.body)
    print(data)

    REQUEST_URL = 'https://authapi.moralis.io/challenge/verify/evm'
    x = requests.post(
        REQUEST_URL,
        json=data,
        headers={'X-API-KEY': 'pgdMtUIzPicdsRhzBcwRiomcPb8BQMGEspkQj8ikvbP4iS8HsVRHWT8JIxugwTQ3'})
    print(json.loads(x.text))
    print(x.status_code)
    if x.status_code == 201:
        # user can authenticate
        eth_address=json.loads(x.text).get('address')
        print("eth address", eth_address)
        try:
            user = User.objects.get(username=eth_address)
        except User.DoesNotExist:
            user = User(username=eth_address)
            user.is_staff = False
            user.is_superuser = False
            user.save()
        if user is not None:
            if user.is_active:
                login(request, user)
                request.session['auth_info'] = data
                request.session['verified_data'] = json.loads(x.text)
                return JsonResponse({'user': user.username})
            else:
                return JsonResponse({'error': 'account disabled'})
    else:
        return JsonResponse(json.loads(x.text))


# def request_challenge(requests):
#     chain_id = requests.GET.get("chainId")
#     address = requests.GET.get("address")
#     request_result = authenticate_challenge(chain_id, address)
#     request_json = json.dumps(request_result)
#     return HttpResponse(request_json, content_type="application/json")


# def verify_challenge(requests):
#     message = requests.GET.get("message")
#     signature = requests.GET.get("signature")
#     verify_result = verify_challenge(message, signature)
#     verify_json = json.dumps(verify_result)
#     return HttpResponse(verify_json, content_type="application/json")
