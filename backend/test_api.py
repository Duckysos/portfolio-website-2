import requests
import sys

BASE_URL = "http://localhost:8000"

def test_api():
    print("Starting API Tests...")

    # 1. Create Admin User (This might fail if already exists, which is fine)
    print("\n1. Creating Admin User...")
    try:
        res = requests.post(f"{BASE_URL}/create-admin", json={
            "username": "admin",
            "hashed_password": "password123"
        })
        if res.status_code == 200:
            print(f"Create Admin: {res.status_code} - {res.json()}")
        else:
            print(f"Create Admin Failed: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"Create Admin Exception: {e}")

    # 2. Login
    print("\n2. Logging in...")
    res = requests.post(f"{BASE_URL}/token", data={
        "username": "admin",
        "password": "password123"
    })
    if res.status_code != 200:
        print(f"Login Failed: {res.status_code} - {res.text}")
        sys.exit(1)
    
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login Successful")

    # 3. Create Project
    print("\n3. Creating Project...")
    project_id = None
    try:
        res = requests.post(f"{BASE_URL}/projects", json={
            "title": "Test Project",
            "description": "A test project",
            "tags": ["test", "api"],
            "github_link": "https://github.com/test",
            "color": "red",
            "status": "in-development"
        }, headers=headers)
        if res.status_code == 200:
            print(f"Project Created: {res.json()}")
            project_id = res.json()['id']
        else:
            print(f"Create Project Failed: {res.status_code} - {res.text}")
            sys.exit(1)
    except Exception as e:
        print(f"Create Project Exception: {e}")
        sys.exit(1)

    # 4. Update Project
    if project_id:
        print("\n4. Updating Project...")
        try:
            res = requests.put(f"{BASE_URL}/projects/{project_id}", json={
                "title": "Updated Project",
                "description": "Updated description",
                "tags": ["test", "updated"],
                "github_link": "https://github.com/test/updated",
                "color": "blue",
                "status": "completed"
            }, headers=headers)
            if res.status_code == 200:
                print(f"Project Updated: {res.json()}")
                if res.json()['status'] == 'completed':
                    print("Status update verified.")
                else:
                    print("Status update FAILED.")
            else:
                print(f"Update Project Failed: {res.status_code} - {res.text}")
        except Exception as e:
            print(f"Update Project Exception: {e}")

    # 5. Get Projects
    print("\n5. Getting Projects...")
    try:
        res = requests.get(f"{BASE_URL}/projects")
        if res.status_code == 200:
            print(f"Projects List: {len(res.json())} items")
        else:
            print(f"Get Projects Failed: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"Get Projects Exception: {e}")

    # 6. Create Learning Log
    print("\n6. Creating Learning Log...")
    log_data = {
        "title": "Test Log",
        "description": "A test log description",
        "tags": ["Learning", "Test"],
        "github_link": "https://github.com/test/log",
        "date": "November 2025"
    }
    res = requests.post(f"{BASE_URL}/learning-logs", json=log_data, headers=headers)
    if res.status_code != 200:
        print(f"Create Log Failed: {res.status_code} - {res.text}")
        sys.exit(1)
    log_id = res.json()["id"]
    print(f"Log Created: ID {log_id}")

    # 7. Cleanup (Delete created items)
    print("\n7. Cleaning up...")
    if project_id:
        requests.delete(f"{BASE_URL}/projects/{project_id}", headers=headers)
    if log_id:
        requests.delete(f"{BASE_URL}/learning-logs/{log_id}", headers=headers)
    print("Cleanup Complete")

    print("\nALL TESTS PASSED!")

if __name__ == "__main__":
    test_api()
