import requests

# URL of the application to check
app_url = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"

try:
    # Send GET request
    response = requests.get(app_url, timeout=5)

    # Check HTTP status code
    if response.status_code == 200:
        print(f"✅ Application is UP. (HTTP {response.status_code})")
    else:
        print(
            f"❌ Application is DOWN or returning error. (HTTP {response.status_code})"
        )

except requests.exceptions.RequestException as e:
    # Handles timeouts, connection errors, etc.
    print(f"❌ Application is DOWN or not responding.")
    print(f"Error: {e}")