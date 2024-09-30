"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Provider, Branch, Assets, UserMB, Migration
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#####################   USERS SECTION    ########################################

#REGISTER

@api.route('/signup', methods=['POST'])
def signup():
    body=request.json
    user_name = body.get("user_name", None)
    password = body.get("password", None)
    names = body.get("names", None)
    last_names = body.get("last_names", None)
    employee_number = body.get("employee_number", None)
    subzone = body.get("subzone", None)
    is_active = body.get("is_active", None)

    if User.query.filter_by(user_name=user_name).first() is not None:
        return jsonify({"error": "Ese nombre de usuario ya esta siendo utilizado"}), 400
    if User.query.filter_by(employee_number=employee_number).first() is not None:
        return jsonify({"error": "Ese número de empleado ya está siendo utilizado"}), 400
    if user_name is None or password is None or names is None or last_names is None or employee_number is None or subzone is None or is_active is None:
        return jsonify({"error": "Todos los campos son requeridos"}), 400
    password_hash = generate_password_hash(password)
    try:
        new_user = User(user_name=user_name, password=password_hash, names=names, last_names=last_names, employee_number=employee_number, subzone=subzone, is_active=is_active)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"new_user": new_user.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
    

#SIGN IN

@api.route('/signin', methods=['POST'])
def signin():
    body=request.json
    user_name = body.get("user_name",None)
    password = body.get("password", None)
    if user_name is None or password is None:
        return jsonify({"error": "el nombre de usuario y la contraseña son requeridos"}), 400
    user = User.query.filter_by(user_name=user_name).first()
    if user is None:
        return jsonify({"error": "el usuario no existe"}), 404
    if not check_password_hash(user.password, password):
        return jsonify({"error", "se ha producido un error al iniciar sesion, intenta nuevamente"}), 400
    user_token = create_access_token({"id": user.id, "user_name": user.user_name, "names": user.names, "last_names": user.last_names, "employee_number": user.employee_number, "is_active": user.is_active })
    return jsonify({"token": user_token}), 200 


#####################   GETS     ########################################

#GET ME

@api.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_data = get_jwt_identity()
    return jsonify(user_data), 200

#GET ALL USERS

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    if not users:
        return jsonify({"error": "Users not found"}), 404
    users_data = [user.serialize() for user in users]
    return jsonify({"users": users_data}), 200

#GET ALL PROVIDERS

@api.route('/providers', methods=['GET'])
def get_providers():
    providers = Provider.query.all()
    if not providers:
        return jsonify({"error": "Providers not found"}), 404
    providers_data = [provider.serialize() for provider in providers]
    return jsonify({"providers": providers_data}), 200

#GET ALL BRANCHS

@api.route('/branchs', methods=['GET'])
def get_branchs():
    branchs = Branch.query.all()
    if not branchs:
        return jsonify({"error": "Branchs not found"}), 404
    branchs_data = [branch.serialize() for branch in branchs]
    return jsonify({"branchs": branchs_data}), 200

# GET ALL ASSETS

@api.route('/assets', methods=['GET'])
def get_assets():
    assets = Assets.query.all()
    if not assets:
        return jsonify({"error": "Assets not found"}), 404
    assets_data = [asset.serialize() for asset in assets]
    return jsonify({"assets": assets_data}), 200

#GET ALL USERSMB

@api.route('/usersMB', methods=['GET'])
def get_usersMB():
    usersMB = UserMB.query.all()
    if not usersMB:
        return jsonify({"error": "usersMB not found"}), 404
    usersMB_data = [userMB.serialize() for userMB in usersMB]
    return jsonify({"usersMB": usersMB_data}), 200

#GET ALL MIGRATIONS

@api.route('/migrations', methods=['GET'])
def get_migrations():
    migrations = Migration.query.all()
    if not migrations:
        return jsonify({"error": "Migrations not found"}), 404
    migrations_data = [migration.serialize() for migration in migrations]
    return jsonify({"migrations": migrations_data}), 200


#####################  ADD ###################################

#ADD BRANCH

@api.route('/add_branch', methods=['POST'])
@jwt_required()
def add_branch():
    body=request.json
    user_data = get_jwt_identity()
    branch_cr = body.get("branch_cr", None)
    branch_address = body.get("branch_address", None)
    branch_zone = body.get("branch_zone", None)
    branch_subzone = body.get("branch_subzone", None)

    if Branch.query.filter_by(branch_cr=branch_cr).first() is not None:
        return jsonify({"error": "Branch ya existe"}), 400
    if branch_cr is None or branch_address is None or branch_zone is None or branch_subzone is None:
        return jsonify({"error": "Todos los campos son requeridos"}), 400
    try:
        new_branch = Branch(branch_cr=branch_cr, branch_address=branch_address, branch_zone=branch_zone, branch_subzone=branch_subzone, user_id=user_data["id"])
        db.session.add(new_branch)
        db.session.commit()
        return jsonify({"new_branch": new_branch.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500

#ADD PROVIDER

@api.route('/add_provider', methods=['POST'])
@jwt_required()
def add_provider():
    body=request.json
    user_data = get_jwt_identity()
    branch_id = body.get("branch_id", None)
    company_name = body.get("company_name", None)
    rfc = body.get("rfc", None)
    service = body.get("service", None)

    if Provider.query.filter_by(company_name=company_name).first() is not None:
        return jsonify({"error": "Ese nombre de Proveedor ya esta siendo utilizado"}), 400
    branch = Branch.query.get(branch_id)
    if branch is None:
        return jsonify({"error": "branch no encontrado"}), 404 
    if company_name is None or rfc is None or service is None:
        return jsonify({"error": "Todos los campos son requeridos"}), 400
    
    try:
        new_provider = Provider(company_name=company_name, rfc=rfc, service=service, user_id=user_data["id"], branch_id=branch.id)
        db.session.add(new_provider)
        db.session.commit()
        return jsonify({"new_provider": new_provider.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
    
#ADD ASSET

@api.route('/add_asset', methods=['POST'])
@jwt_required()
def add_asset():
    body = request.json
    user_data = get_jwt_identity()
    asset_type = body.get("asset_type", None)
    asset_brand = body.get("asset_brand", None)
    asset_model = body.get("asset_model", None)
    asset_serial = body.get("asset_serial", None)
    asset_inventory_number =  body.get("asset_inventory_number", None)
    branch_id = body.get("branch_id", None)
    migration_id = body.get("migration_id", None)
    provider_id = body.get("provider_id", None)

    if Assets.query.filter_by(asset_serial=asset_serial).first() is not None:
        return jsonify({"error": "Activo ya existe"}), 400
    provider = Provider.query.get(provider_id)
    if provider is None:
        return jsonify({"error": "proveedor no encontrado"}), 404 
    
    if asset_type is None or asset_brand is None or asset_model is None or asset_serial is None or asset_inventory_number is None or provider_id is None:
        return jsonify({"error": "faltan datos"}), 400
    try:
        new_asset = Assets(asset_type=asset_type, asset_brand=asset_brand, asset_model=asset_model, asset_serial=asset_serial, asset_inventory_number=asset_inventory_number, branch_id=branch_id, migration_id=migration_id, provider_id=provider.id, user_id=user_data["id"])
        db.session.add(new_asset)
        db.session.commit()
        return jsonify({"new_asset": new_asset.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
    
#ADD USER MB

@api.route('/add_userMB', methods=['POST'])
@jwt_required()
def add_userMB():
    body=request.json
    user_name_MB = body.get("user_name_MB", None)
    is_active = body.get("is_active", None)
    names = body.get("names", None)
    last_names = body.get("last_names", None)
    employee_number = body.get("employee_number", None)
    branch_id = body.get("branch_id", None)
    asset_id = body.get("asset_id", None)

    if UserMB.query.filter_by(user_name_MB=user_name_MB).first() is not None:
        return jsonify({"error": "usuarioMB ya existe"}), 400
    branch = Branch.query.get(branch_id)
    if branch is None:
        return jsonify({"error": "branch no encontrado"}), 404 
    asset = Assets.query.get(asset_id)
    if asset is None:
        return jsonify({"error": "activo no encontrado"}), 404
    if user_name_MB is None or is_active is None or names is None or last_names is None or employee_number is None or branch_id is None or asset_id is None:
        return jsonify({"error": "faltan datos"}), 400
    
    try:
        new_userMB = UserMB(user_name_MB=user_name_MB, is_active=is_active, names=names, last_names=last_names, employee_number=employee_number, branch_id=branch.id, asset_id=asset.id)
        db.session.add(new_userMB)
        db.session.commit()
        return jsonify({"new_userMB": new_userMB.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
    

#ADD MIGRATION

@api.route('/add_migration', methods=['POST'])
@jwt_required()
def add_migration():
    body=request.json
    user_data = get_jwt_identity()
    installation_date = body.get("installation_date", None)
    migration_date = body.get("migration_date", None)
    migration_description = body.get("migration_description", None)
    migration_status = body.get("migration_status", None)
    provider_id = body.get("provider_id", None)
    branch_id = body.get("branch_id", None)

    provider = Provider.query.get(provider_id)
    if provider is None:
        return jsonify({"error": "proveedor no encontrado"}), 404 
    branch = Branch.query.get(branch_id)
    if branch is None:
        return jsonify({"error": "branch no encontrado"}), 404 
    
    if installation_date is None or migration_date is None or migration_description is None or migration_status is None or provider_id is None or branch_id is None:
        return jsonify({"error": "faltan datos"}), 400

    try:
        new_migration = Migration(installation_date=installation_date, migration_date=migration_date, migration_description=migration_description, migration_status=migration_status, provider_id=provider.id, branch_id=branch.id, user_id=user_data["id"])
        db.session.add(new_migration)
        db.session.commit()
        return jsonify({"new_migration": new_migration.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
        

#####################  EDIT ###################################



#####################  DELETE ###################################





