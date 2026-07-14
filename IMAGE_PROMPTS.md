# Image Generation Prompts — Gabriel Lanai Screens

The site currently runs without photos (CSS/SVG placeholders degrade gracefully via `onerror`), so it already looks complete. Once you generate these images, drop them into the `images/` folder using the **exact filenames** below and they will appear automatically — no code changes needed.

General instructions for every prompt:
- Paste the prompt directly into ChatGPT (DALL·E) or your preferred image generator.
- Request **photorealistic, high-resolution, natural lighting** — avoid illustration/cartoon styles.
- Avoid asking the AI to render legible text, logos, or license plates (AI text rendering is unreliable) — none of the prompts below request visible text.
- Recommended aspect ratios are noted per image; crop after generation if the tool doesn't support exact ratios.
- Export as JPG, sized around 1600px on the longest side for good quality without huge file sizes.

---

## 1. Hero image — `images/hero-lanai-repair.jpg`
**Placement:** Large image on the right side of the homepage hero section (first thing visitors see).
**Aspect ratio:** 4:3 (landscape)

**Prompt:**
> A photorealistic outdoor photo of a professional screen repair technician in his 30s, wearing a plain navy-blue polo shirt and work gloves, kneeling beside a large aluminum-framed pool cage enclosure on a sunny Florida lanai. He is carefully stretching a new gray fiberglass screen mesh panel into an aluminum frame using a spline roller tool. In the background, slightly out of focus, is a clean in-ground pool with turquoise water and a few patio lounge chairs, palm trees, and a suburban Florida home with a tile roof. The existing screen panels around him show visible storm damage — torn mesh with jagged holes and a bent frame corner — contrasting with the fresh panel he's installing. Bright midday Florida sunlight, natural shadows, shallow depth of field, shot on a DSLR camera, realistic skin tones and textures, no visible text or logos anywhere in the image.

---

## 2. Gallery — Before photo #1 — `images/gallery-before-1.jpg`
**Placement:** "Before" card in the Before/After gallery grid.
**Aspect ratio:** 1:1 (square)

**Prompt:**
> A photorealistic close-up photograph of a pool cage screen panel severely torn and shredded by strong storm winds. The aluminum frame is visible with large jagged rips and flapping loose mesh, some sections completely missing, exposing the outdoor patio behind it. It is an overcast day right after a Florida storm, with wet pavement and a few fallen palm fronds visible on the pool deck below. The photo looks like a real smartphone photo taken by a homeowner documenting storm damage for an insurance claim — slightly informal composition, realistic lighting, natural colors, no text overlays, no watermarks.

---

## 3. Gallery — After photo #1 — `images/gallery-after-1.jpg`
**Placement:** "After" card paired with the image above.
**Aspect ratio:** 1:1 (square)

**Prompt:**
> A photorealistic close-up photograph of the exact same pool cage screen panel from the same angle and same aluminum frame, now fully repaired with brand-new taut gray fiberglass screen mesh, perfectly smooth and evenly stretched with no wrinkles. The frame has been straightened and cleaned. Bright sunny Florida day, clear blue sky visible through the mesh texture, pool deck now dry and clean. The photo should look like a real "after" photo taken by a contractor on a smartphone, same camera angle and framing as a typical before/after comparison, natural lighting, realistic colors, no text overlays, no watermarks.

---

## 4. Gallery — Before photo #2 — `images/gallery-before-2.jpg`
**Placement:** Second "Before" card in the gallery grid.
**Aspect ratio:** 1:1 (square)

**Prompt:**
> A photorealistic close-up photograph of a lanai screen mesh panel covered in multiple small round puncture holes and dents caused by large hailstones, with a few golf-ball-sized hail dents visible on a nearby aluminum gutter or frame edge. The mesh sags slightly around the punctures. Daytime, slightly cloudy sky visible through the damaged mesh, realistic outdoor lighting, shot like a homeowner's documentation photo on a smartphone, natural and unpolished composition, no text overlays, no watermarks.

---

## 5. Gallery — After photo #2 — `images/gallery-after-2.jpg`
**Placement:** Second "After" card paired with the image above.
**Aspect ratio:** 1:1 (square)

**Prompt:**
> A photorealistic close-up photograph of the same lanai screen area now completely re-screened with new, taut, hole-free mesh, tightly secured into a clean aluminum frame with fresh spline. Bright clear day, sunlight highlighting the fine weave texture of the new screen, blue sky and a hint of green landscaping visible through the mesh. Same framing and angle style as a contractor's "after" comparison photo, natural lighting and realistic color grading, no text overlays, no watermarks.

---

## 6. Service area visual — `images/service-area-map.jpg`
**Placement:** Right side of the "Service Areas" section, paired with a location pin icon fallback.
**Aspect ratio:** 4:3 (landscape)

**Prompt:**
> A photorealistic aerial drone photograph taken above a sunny Central Florida suburban neighborhood with red and gray tile roofs, multiple homes each with a screened-in pool lanai visible from above, curving residential streets lined with palm trees, and a distant view of rolling green landscape typical of the Davenport/Kissimmee/Champions Gate area near Orlando. Golden late-afternoon sunlight, crisp aerial drone photography style, realistic colors, no visible text, road signs, or logos, no watermarks.

---

## 7. Social share cover image — `images/og-cover.jpg`
**Placement:** Used as the Open Graph preview image when the site link is shared on Facebook, WhatsApp, iMessage, etc.
**Aspect ratio:** 1.91:1 (1200x630 recommended)

**Prompt:**
> A photorealistic wide-angle photograph of a beautifully repaired Florida pool lanai enclosure with pristine new screen mesh, taken from inside the lanai looking out toward a sparkling blue pool and a manicured backyard with palm trees under a bright blue sky with a few white clouds. The aluminum screen frame in the foreground is clean and freshly installed. The overall mood is bright, inviting, and high-quality, like a professional real-estate or home-services marketing photo. Natural lighting, realistic textures, no people, no text, no watermarks, wide horizontal composition suitable for a website banner.

---

## Optional extras (not required for launch, but nice upgrades later)

### 8. Technician portrait — `images/technician-portrait.jpg`
> A photorealistic, friendly headshot-style photo of a Hispanic man in his 30s-40s wearing a plain navy polo shirt, standing outdoors in front of a screened pool lanai, arms crossed, warm genuine smile, natural daylight, shallow depth of field with the blurred lanai and pool behind him, shot like a small local business "about us" photo. No text or logos.

### 9. Community-specific hero variant (Solterra) — `images/solterra-community.jpg`
> A photorealistic photo of a modern Central Florida resort-style community pool area with cabanas and screened lanai homes in the background, palm trees, clear blue sky, bright and inviting atmosphere typical of a Davenport, Florida vacation-home community like Solterra or Champions Gate. No visible signage, no text, no watermarks.

---

### How to add these once generated
1. Save each generated image using the exact filename shown in the heading above (e.g. `hero-lanai-repair.jpg`).
2. Drop it into the `images/` folder in this project.
3. Commit and push — Cloudflare Pages will redeploy automatically and the image will appear (no HTML/CSS changes required, since the `<img>` tags already point to these filenames).
