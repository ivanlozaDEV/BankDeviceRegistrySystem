from werkzeug.security import generate_password_hash

password = "master"  # Replace with your desired password
hashed_password = generate_password_hash(password)
print(hashed_password)