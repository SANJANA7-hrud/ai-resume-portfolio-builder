from flask import Flask, request, jsonify
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)
from flask import send_file
from utils.pdf import create_resume_pdf
from flask_cors import CORS
from flask_jwt_extended import(
    JWTManager,
    create_access_token
)

from dotenv import load_dotenv
import os

from models import db, User, Resume
from utils.ai_client import generate_resume

load_dotenv()

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "sqlite:///database.db"
)

app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY"
)

db.init_app(app)

jwt = JWTManager(app)

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return jsonify(
        {"message": "AI Resume Builder API Running"}
    )


@app.route("/register", methods=["POST"])
def register():

    data = request.json

    if User.query.filter_by(
        email=data["email"]
    ).first():
        return jsonify(
            {"error": "Email already exists"}
        ), 400

    user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(
            data["password"]
        )
    )

    db.session.add(user)
    db.session.commit()

    return jsonify(
        {"message": "Registered Successfully"}
    )


@app.route("/login", methods=["POST"])
def login():

    data = request.json

    user = User.query.filter_by(
        email=data["email"]
    ).first()

    if not user:
        return jsonify(
            {"error": "Invalid Credentials"}
        ), 401

    if not check_password_hash(
        user.password,
        data["password"]
    ):
        return jsonify(
            {"error": "Invalid Credentials"}
        ), 401

    token = create_access_token(
        identity=user.id
    )

    return jsonify(
        {
            "token": token,
            "name": user.name,
            "user_id": user.id

        }
    )


@app.route("/generate-resume", methods=["POST"])
def generate():

    print(request.json)

    data = request.json

    prompt = f"""
    Create a professional ATS-friendly resume.

    Name: {data['name']}
    Education: {data['education']}
    Skills: {data['skills']}
    Projects: {data['projects']}
    """

    result = generate_resume(prompt)

    return jsonify(
        {
            "resume": result
        }
    )
@app.route("/save-resume", methods=["POST"])
def save_resume():

    data = request.json

    resume = Resume(
        user_id=data["user_id"],
        title=data["title"],
        content=data["content"]
    )

    db.session.add(resume)
    db.session.commit()

    return jsonify(
        {"message": "Resume Saved"}
    )

@app.route("/resumes/<int:user_id>")
def get_resumes(user_id):

    resumes = Resume.query.filter_by(
        user_id=user_id
    ).all()

    result = []

    for r in resumes:
        result.append({
            "id": r.id,
            "title": r.title,
            "content": r.content,
            "created_at": str(r.created_at)
        })

    return jsonify(result)

@app.route("/generate-cover-letter", methods=["POST"])
def generate_cover_letter():

    data = request.json

    prompt = f"""
    Write a professional cover letter.

    Name: {data['name']}
    Job Role: {data['job_role']}
    Skills: {data['skills']}
    Company: {data['company']}
    """

    result = generate_resume(prompt)

    return jsonify(
        {
            "cover_letter": result
        }
    )

@app.route("/generate-portfolio", methods=["POST"])
def generate_portfolio():

    data = request.json

    prompt = f"""
    Create a professional portfolio website content.

    Name: {data['name']}
    Bio: {data['bio']}
    Skills: {data['skills']}
    Projects: {data['projects']}
    LinkedIn: {data['linkedin']}
    GitHub: {data['github']}
    """

    result = generate_resume(prompt)

    return jsonify({
        "portfolio": result
    })

@app.route("/analyze-ats", methods=["POST"])
def analyze_ats():

    data = request.json

    resume = data["resume"]

    job_description = data.get(
        "job_description", ""
    )

    prompt = f"""
    Analyze this resume for ATS compatibility.

    Resume:
    {resume}

    Job Description:
    {job_description}

    Provide:

    1. ATS Score out of 100

    2. Strengths

    3. Missing Keywords

    4. Improvement Suggestions

    5. Match Score with Job Description

    6. Final Verdict

    Give a professional report.
    """

    result = generate_resume(prompt)

    return jsonify({
        "analysis": result
    })

@app.route(
    "/download-resume",
    methods=["POST"]
)
def download_resume():

    data = request.json

    create_resume_pdf(
        data["resume"],
        "generated_resume.pdf"
    )

    return send_file(
        "generated_resume.pdf",
        as_attachment=True
    )
@app.route("/profile/<int:user_id>")
def get_profile(user_id):

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    resume_count = Resume.query.filter_by(
        user_id=user_id
    ).count()

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "resume_count": resume_count
    })

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )


