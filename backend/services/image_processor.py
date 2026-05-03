import base64
import io
from PIL import Image

def decode_base64_image(b64_string: str) -> Image.Image | None:
    try:
        if "," in b64_string:
            b64_string = b64_string.split(",")[1]
        img_bytes = base64.b64decode(b64_string)
        return Image.open(io.BytesIO(img_bytes))
    except Exception as e:
        print(f"Image decode error: {e}")
        return None

def get_image_stats(image: Image.Image) -> dict:
    rgb = image.convert("RGB").resize((100, 100))
    pixels = list(rgb.getdata())
    n = len(pixels)
    r_mean = sum(p[0] for p in pixels) / n
    g_mean = sum(p[1] for p in pixels) / n
    b_mean = sum(p[2] for p in pixels) / n
    brightness = (r_mean + g_mean + b_mean) / 3
    return {
        "r_mean": round(r_mean, 2),
        "g_mean": round(g_mean, 2),
        "b_mean": round(b_mean, 2),
        "brightness": round(brightness, 2),
    }
