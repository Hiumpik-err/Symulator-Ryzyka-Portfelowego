from fastapi import FastAPI

app = FastAPI(title="MainPage", version = "1.0")

@app.get("/api/v1/test")
def get_first_data():
    return "Hello world"