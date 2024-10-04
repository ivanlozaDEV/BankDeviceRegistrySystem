from werkzeug.security import generate_password_hash

password = "12345678"  # Replace with your desired password
hashed_password = generate_password_hash(password)
print(hashed_password)