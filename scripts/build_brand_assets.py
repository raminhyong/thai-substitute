"""Build web-app icons and the social sharing card from luxe1.png."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Image.open(ROOT / "luxe1.png").convert("RGBA")
OUTPUT = ROOT / "assets"
OUTPUT.mkdir(exist_ok=True)


def contain_icon(size, padding, background=None):
    canvas = Image.new("RGBA", (size, size), background or (0, 0, 0, 0))
    logo = SOURCE.copy()
    logo.thumbnail((size - padding * 2, size - padding * 2), Image.Resampling.LANCZOS)
    canvas.alpha_composite(logo, ((size - logo.width) // 2, (size - logo.height) // 2))
    return canvas


contain_icon(32, 1).save(OUTPUT / "favicon-32.png", optimize=True)
contain_icon(48, 2).save(OUTPUT / "favicon-48.png", optimize=True)
contain_icon(180, 10, (255, 253, 247, 255)).convert("RGB").save(
    OUTPUT / "apple-touch-icon.png", optimize=True, quality=95
)
contain_icon(192, 8, (255, 253, 247, 255)).save(OUTPUT / "icon-192.png", optimize=True)
contain_icon(512, 20, (255, 253, 247, 255)).save(OUTPUT / "icon-512.png", optimize=True)
contain_icon(512, 74, (15, 81, 50, 255)).save(OUTPUT / "icon-maskable-512.png", optimize=True)


# Landscape card used by social apps when the web-app link is shared.
width, height = 1200, 630
share = Image.new("RGB", (width, height), "#fffdf7")
draw = ImageDraw.Draw(share)
draw.rectangle((0, 0, width, 24), fill="#d4a72c")
draw.rectangle((0, height - 22, width, height), fill="#0f5132")
draw.rounded_rectangle(
    (52, 58, width - 52, height - 58),
    radius=36,
    fill="#f7f1df",
    outline="#d4a72c",
    width=3,
)

logo = SOURCE.copy()
logo.thumbnail((430, 430), Image.Resampling.LANCZOS)
share.paste(logo, (82, (height - logo.height) // 2), logo)

font_bold = ImageFont.truetype(r"C:\Windows\Fonts\LeelaUIb.ttf", 57)
font_regular = ImageFont.truetype(r"C:\Windows\Fonts\LeelawUI.ttf", 31)
font_small = ImageFont.truetype(r"C:\Windows\Fonts\LeelawUI.ttf", 25)
draw.text((520, 180), "ระบบจัดการงานสอนแทน", font=font_bold, fill="#0f5132")
draw.text((520, 266), "กลุ่มสาระการเรียนรู้ภาษาไทย", font=font_regular, fill="#334155")
draw.text((520, 316), "โรงเรียนพูลเจริญวิทยาคม", font=font_regular, fill="#334155")
draw.rounded_rectangle((520, 390, 886, 447), radius=28, fill="#0f5132")
draw.text((555, 399), "จัดสรรอย่างเป็นธรรม", font=font_small, fill="#ffffff")
share.save(OUTPUT / "luxe1-share.png", optimize=True)


for asset in sorted(OUTPUT.glob("*.png")):
    image = Image.open(asset)
    print(f"{asset.name}: {image.width}x{image.height} ({asset.stat().st_size} bytes)")
