import os, tempfile, shutil, subprocess, pathlib, json
from celery import Celery
from jinja2 import Environment, FileSystemLoader

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery = Celery("worker", broker=REDIS_URL, backend=REDIS_URL)

TEMPLATES = pathlib.Path("/app/templates/scripts")

@celery.task(bind=True)
def generate_script(self, payload: dict) -> dict:
  tmp = pathlib.Path(tempfile.mkdtemp())
  try:
    env = Environment(loader=FileSystemLoader(str(TEMPLATES)))
    # pick template by language (you can get more granular)
    tpl = env.get_template(f"{payload['language']}.j2")
    script = tpl.render(**payload)

    out = tmp / ("script.py" if payload["language"] == "python" else "script.txt")
    out.write_text(script, encoding="utf-8")

    # format/lint python; extend for PowerShell with PSScriptAnalyzer
    if payload["language"] == "python":
      subprocess.run(["ruff", "format", str(out)], check=True)

    dist = tmp / "dist"
    dist.mkdir()
    shutil.make_archive(str(dist / "artifact"), "zip", root_dir=tmp)
    # TODO: upload to S3 and return a presigned URL
    return {"status": "ok", "artifact_path": str(dist / "artifact.zip")}
  finally:
    shutil.rmtree(tmp, ignore_errors=True)