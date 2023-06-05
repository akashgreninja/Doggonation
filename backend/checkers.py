# checkers={
#     "total": 1,
#     "documents": [
#         {
#             "email": "akadsdssasadsddddsdssddsdss@gmail.com",
#             "password": "pbkdf2:sha256:600000$n220kj0RuUIzVWvT$50ecdb616a3e900c7214546863234865569c86ded45ddf354e23e400e6eb2f3f",
#             "name": "name",
#             "gender": None,
#             "dob": None,
#             "profile_pic": "https://images.pexels.com/photos/14918477/pexels-photo-14918477.jpeg?auto=compress&cs=tinysrgb",
#             "$id": "646f11a144a65d326ad7",
#             "$createdAt": "2023-05-25T07:43:29.281+00:00",
#             "$updatedAt": "2023-05-25T07:43:29.281+00:00",
#             "$permissions": [],
#             "$collectionId": "646efcfd07349b8a4ffd",
#             "$databaseId": "646ef96e9f67246e693d",
#         }
#     ],
# }
# print(checkers['documents'][0]['email'])



def binary_search(arr, target, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid ]< target:
        binary_search(arr,target,mid+1,high)
    else:
        binary_search(arr,target,low,mid-1)
    





my_array = [1, 3, 5, 7, 9, 11]
target_value = 7
result = binary_search(my_array, target_value, 0, len(my_array) - 1)
print(result)  # Output: 3
