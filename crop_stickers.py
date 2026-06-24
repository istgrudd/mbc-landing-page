import cv2, numpy as np, os
from PIL import Image

SRC = r'C:\Users\andra\Downloads\Group 2.png'
OUT = r'C:\Ez\TelU\MBC\mbc_landingpage\mbc-landing-page\public\stickers'
PREVIEW = r'C:\Users\andra\Downloads\stickers_preview.png'
os.makedirs(OUT, exist_ok=True)

arr = np.array(Image.open(SRC).convert('RGBA'))
H, W = arr.shape[:2]
rgb = arr[:, :, :3].astype(np.int16)
alpha = arr[:, :, 3]

# foreground = visible AND not near-white
nearwhite = (rgb[:, :, 0] > 242) & (rgb[:, :, 1] > 242) & (rgb[:, :, 2] > 242)
fg = (((alpha > 16) & (~nearwhite)).astype(np.uint8)) * 255
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)))

# dilate so detached parts of one sticker (goggles, ties, props) merge
dil = cv2.dilate(fg, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (27, 27)))
num, labels, stats, _ = cv2.connectedComponentsWithStats(dil, connectivity=8)


def fill_holes(mask):
    ff = mask.copy()
    m2 = np.zeros((mask.shape[0] + 2, mask.shape[1] + 2), np.uint8)
    cv2.floodFill(ff, m2, (0, 0), 255)
    return cv2.bitwise_or(mask, cv2.bitwise_not(ff))


items = []
for i in range(1, num):
    if stats[i, cv2.CC_STAT_AREA] < 2500:
        continue
    comp = (labels == i).astype(np.uint8) * 255
    compfg = cv2.bitwise_and(fg, comp)
    if cv2.countNonZero(compfg) < 1800:
        continue
    filled = fill_holes(compfg)
    ys, xs = np.where(filled > 0)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    pad = 8
    x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
    x1, y1 = min(W - 1, x1 + pad), min(H - 1, y1 + pad)
    crop = arr[y0:y1 + 1, x0:x1 + 1].copy()
    crop[:, :, 3] = np.minimum(crop[:, :, 3], filled[y0:y1 + 1, x0:x1 + 1])
    items.append((y0, x0, crop))

# reading order: top-to-bottom rows, left-to-right
items.sort(key=lambda t: (round(t[0] / 120), t[1]))

for idx, (_, _, crop) in enumerate(items, 1):
    Image.fromarray(crop).save(os.path.join(OUT, f'sticker-{idx:02d}.png'))

# contact-sheet preview for review
cols, cell = 6, 250
rows = (len(items) + cols - 1) // cols
sheet = Image.new('RGBA', (cols * cell, rows * cell), (232, 233, 236, 255))
for idx, (_, _, crop) in enumerate(items):
    c = Image.fromarray(crop)
    c.thumbnail((cell - 20, cell - 40))
    r, cc = idx // cols, idx % cols
    sheet.paste(c, (cc * cell + (cell - c.width) // 2, r * cell + 12), c)
sheet.convert('RGB').save(PREVIEW)

print('stickers:', len(items))
print('sizes:', [f'{c.shape[1]}x{c.shape[0]}' for _, _, c in items])
