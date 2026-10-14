"""Martwa natura: dwie kasety filmu 35 mm i wysunięty, zwinięty koniec kliszy.

Render do sekcji "O mnie" (analogowe korzenie Leny). Wszystko proceduralne:
geometria z bmesh/prymitywów, materiały z węzłów, bez zewnętrznych modeli i tekstur.
Na etykietach nie ma żadnych napisów ani logotypów.

Uruchomienie (z katalogu repo):
  blender --background --factory-startup --python-exit-code 1 \
    --python scripts/blender/klisza.py -- --out .claude/render/klisza.png [--preview]

Potem: cwebp -q 84 -alpha_q 90 .claude/render/klisza.png -o public/render/klisza.webp
"""

import math
import sys

import bmesh
import bpy
from mathutils import Matrix, Vector

# ---------------------------------------------------------------- argumenty
argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
OUT = argv[argv.index("--out") + 1] if "--out" in argv else "//klisza.png"
PREVIEW = "--preview" in argv

# ---------------------------------------------------------------- wymiary (metry, skala 1:1)
R_BODY = 0.0123  # promień korpusu kasety
L_BODY = 0.0400  # długość korpusu między denkami
R_CAP = 0.0128
T_CAP = 0.0019
FILM_W = 0.035
FILM_T = 0.00014
PERF_PITCH = 4.75  # mm, perforacja KS
PERF_LEN = 1.98  # mm wzdłuż taśmy
PERF_WID = 2.79  # mm w poprzek
PERF_EDGE = 2.0  # mm od krawędzi



def srgb(hex_color):
    """#RRGGBB (sRGB) -> liniowe RGB dla węzłów."""
    out = []
    for i in (1, 3, 5):
        c = int(hex_color[i : i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return tuple(out)


# paleta strony (krem, sepia, tusz)
CREAM = srgb("#E6D9C3")
SEPIA = srgb("#74553D")
INK = srgb("#1B1713")
CHARCOAL = srgb("#3A342E")
FILM_ORANGE = srgb("#8A4A28")


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    return scene


def smooth(obj, angle=35):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    try:
        bpy.ops.object.shade_smooth_by_angle(angle=math.radians(angle))
    except Exception:
        bpy.ops.object.shade_smooth()
    obj.select_set(False)


def bevel(obj, width, segments=3):
    mod = obj.modifiers.new("Bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.harden_normals = True
    return mod


def node_mat(name):
    mat = bpy.data.materials.new(name)
    try:
        mat.use_nodes = True
    except Exception:
        pass
    nt = mat.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    return mat, nt, out


def principled(nt, color, rough, metal=0.0, coat=0.0):
    p = nt.nodes.new("ShaderNodeBsdfPrincipled")
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metal
    if coat:
        p.inputs["Coat Weight"].default_value = coat
        p.inputs["Coat Roughness"].default_value = 0.12
    return p


def math_node(nt, op, a=None, b=None, clamp=False):
    m = nt.nodes.new("ShaderNodeMath")
    m.operation = op
    m.use_clamp = clamp
    for i, v in enumerate((a, b)):
        if v is None:
            continue
        if isinstance(v, (int, float)):
            m.inputs[i].default_value = v
        else:
            nt.links.new(v, m.inputs[i])
    return m.outputs[0]


# ---------------------------------------------------------------- materiały
def mat_canister_body():
    """Lakierowana blacha: kremowe tło, pas sepii, cienka linia tuszu, kod DX (szachownica)."""
    mat, nt, out = node_mat("KasetaKorpus")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(tc.outputs["Object"], sep.inputs[0])
    ax = sep.outputs["Z"]  # oś kasety = lokalne Z prymitywu

    # pas sepii w środku korpusu
    band = math_node(nt, "LESS_THAN", math_node(nt, "ABSOLUTE", math_node(nt, "SUBTRACT", ax, -0.002)), 0.0085)
    # cienka linia tuszu nad pasem
    line = math_node(nt, "LESS_THAN", math_node(nt, "ABSOLUTE", math_node(nt, "SUBTRACT", ax, 0.0098)), 0.00045)

    mix_band = nt.nodes.new("ShaderNodeMix")
    mix_band.data_type = "RGBA"
    mix_band.inputs[6].default_value = (*CREAM, 1)
    mix_band.inputs[7].default_value = (*SEPIA, 1)
    nt.links.new(band, mix_band.inputs[0])
    mix_line = nt.nodes.new("ShaderNodeMix")
    mix_line.data_type = "RGBA"
    nt.links.new(mix_band.outputs[2], mix_line.inputs[6])
    mix_line.inputs[7].default_value = (*INK, 1)
    nt.links.new(line, mix_line.inputs[0])

    paint = principled(nt, CREAM, 0.32, coat=0.6)
    nt.links.new(mix_line.outputs[2], paint.inputs["Base Color"])
    metal = principled(nt, srgb("#C9C2B6"), 0.22, metal=1.0)

    # kod DX: dwa rzędy po 24 pola przy jednym końcu
    ang = math_node(nt, "ARCTAN2", sep.outputs["Y"], sep.outputs["X"])
    seg = math_node(nt, "FLOOR", math_node(nt, "MULTIPLY", math_node(nt, "ADD", ang, math.pi), 24 / (2 * math.pi)))
    row = math_node(nt, "FLOOR", math_node(nt, "MULTIPLY", math_node(nt, "SUBTRACT", ax, -0.0185), 1 / 0.0028))
    checker = math_node(nt, "FLOORED_MODULO", math_node(nt, "ADD", seg, row), 2)
    in_dx = math_node(
        nt,
        "MULTIPLY",
        math_node(nt, "GREATER_THAN", ax, -0.0185),
        math_node(nt, "LESS_THAN", ax, -0.0185 + 0.0056),
    )
    dx_mask = math_node(nt, "MULTIPLY", in_dx, checker)

    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(dx_mask, mix.inputs[0])
    nt.links.new(paint.outputs[0], mix.inputs[1])
    nt.links.new(metal.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs["Surface"])
    return mat


def mat_simple(name, color, rough, metal=0.0, coat=0.0):
    mat, nt, out = node_mat(name)
    p = principled(nt, color, rough, metal, coat)
    nt.links.new(p.outputs[0], out.inputs["Surface"])
    return mat


def mat_film(length_mm):
    """Podłoże C-41 (pomarańczowa maska), perforacja i przycięty język z alfy."""
    mat, nt, out = node_mat("Klisza")
    uv = nt.nodes.new("ShaderNodeUVMap")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(uv.outputs[0], sep.inputs[0])
    s_mm = math_node(nt, "MULTIPLY", sep.outputs["X"], length_mm)
    v_mm = math_node(nt, "MULTIPLY", sep.outputs["Y"], FILM_W * 1000)

    # perforacja
    local = math_node(nt, "FLOORED_MODULO", s_mm, PERF_PITCH)
    along = math_node(nt, "LESS_THAN", math_node(nt, "ABSOLUTE", math_node(nt, "SUBTRACT", local, PERF_PITCH / 2)), PERF_LEN / 2)
    c1 = PERF_EDGE + PERF_WID / 2
    c2 = FILM_W * 1000 - c1
    across1 = math_node(nt, "LESS_THAN", math_node(nt, "ABSOLUTE", math_node(nt, "SUBTRACT", v_mm, c1)), PERF_WID / 2)
    across2 = math_node(nt, "LESS_THAN", math_node(nt, "ABSOLUTE", math_node(nt, "SUBTRACT", v_mm, c2)), PERF_WID / 2)
    holes = math_node(nt, "MULTIPLY", along, math_node(nt, "MAXIMUM", across1, across2))

    # język: ostatnie ~70 mm ma połowę szerokości, z łagodnym przejściem
    tongue_start = length_mm - 70.0
    ramp = 18.0
    t = math_node(nt, "DIVIDE", math_node(nt, "SUBTRACT", tongue_start, s_mm), ramp, clamp=False)
    t = math_node(nt, "MINIMUM", math_node(nt, "MAXIMUM", t, 0.0), 1.0)
    threshold = math_node(nt, "ADD", 0.52, math_node(nt, "MULTIPLY", t, 0.5))
    cut = math_node(nt, "GREATER_THAN", sep.outputs["Y"], threshold)

    alpha_off = math_node(nt, "MAXIMUM", holes, cut)

    base = principled(nt, FILM_ORANGE, 0.12)
    base.inputs["Transmission Weight"].default_value = 0.2
    trans = nt.nodes.new("ShaderNodeBsdfTranslucent")
    trans.inputs["Color"].default_value = (*srgb("#C98656"), 1)
    film = nt.nodes.new("ShaderNodeMixShader")
    film.inputs[0].default_value = 0.12
    nt.links.new(base.outputs[0], film.inputs[1])
    nt.links.new(trans.outputs[0], film.inputs[2])

    transparent = nt.nodes.new("ShaderNodeBsdfTransparent")
    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(alpha_off, mix.inputs[0])
    nt.links.new(film.outputs[0], mix.inputs[1])
    nt.links.new(transparent.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs["Surface"])
    return mat


# ---------------------------------------------------------------- geometria
def cylinder(name, r, depth, loc, verts=128):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc)
    obj = bpy.context.active_object
    obj.name = name
    return obj


def make_canister(name, mats):
    """Kaseta wzdłuż lokalnej osi Z, środek w (0,0,0). Zwraca pusty obiekt-rodzica."""
    root = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(root)

    body = cylinder(f"{name}_korpus", R_BODY, L_BODY, (0, 0, 0))
    body.data.materials.append(mats["body"])
    bevel(body, 0.0003)

    parts = [body]
    for sgn in (1, -1):
        cap = cylinder(f"{name}_denko", R_CAP, T_CAP, (0, 0, sgn * (L_BODY / 2 + T_CAP / 2 - 0.0003)))
        cap.data.materials.append(mats["cap"])
        bevel(cap, 0.0005, 4)
        parts.append(cap)
        rim = cylinder(f"{name}_wienec", R_CAP - 0.0016, 0.0006, (0, 0, sgn * (L_BODY / 2 + T_CAP - 0.0001)))
        rim.data.materials.append(mats["cap"])
        bevel(rim, 0.00025, 2)
        parts.append(rim)

    # wystająca szpula z wycięciem
    hub = cylinder(f"{name}_szpula", 0.0046, 0.009, (0, 0, L_BODY / 2 + T_CAP + 0.0025), 64)
    hub.data.materials.append(mats["plastic"])
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, L_BODY / 2 + T_CAP + 0.0068))
    slot = bpy.context.active_object
    slot.scale = (0.0013, 0.012, 0.004)
    boolean = hub.modifiers.new("Wyciecie", "BOOLEAN")
    boolean.operation = "DIFFERENCE"
    boolean.object = slot
    slot.hide_render = True
    slot.hide_viewport = True
    bevel(hub, 0.00025, 2)
    parts.append(hub)
    stub = cylinder(f"{name}_czop", 0.0036, 0.004, (0, 0, -(L_BODY / 2 + T_CAP + 0.0006)), 64)
    stub.data.materials.append(mats["plastic"])
    bevel(stub, 0.0003, 2)
    parts.append(stub)

    # wargi światłoszczelne (aksamit) po stronie +X, styczne do korpusu
    bpy.ops.mesh.primitive_cube_add(size=1, location=(R_BODY + 0.0006, -0.0036, 0))
    lip = bpy.context.active_object
    lip.name = f"{name}_warga"
    lip.scale = (0.0028, 0.0075, L_BODY - 0.0016)
    bpy.ops.object.transform_apply(scale=True)
    lip.data.materials.append(mats["velvet"])
    bevel(lip, 0.0007, 4)
    parts.append(lip)

    for p in parts:
        smooth(p)
        p.parent = root
    slot.parent = hub
    return root


def film_path():
    """Środkowa linia kliszy w płaszczyźnie (y, z) względem osi kasety.

    Wychodzi z warg w dół, łukiem kładzie się na blacie, biegnie prosto,
    a koniec zwija się w spiralę (krzywizna rośnie liniowo).
    """
    pts = []
    ds = 0.0004
    floor_z = -R_CAP + FILM_T
    y0 = R_BODY + 0.0013
    z = -0.0035
    # pion w wargach
    while z > floor_z + 0.0085:
        pts.append((y0, z))
        z -= ds
    # łuk na blat
    rb = (z - floor_z)
    cy, cz = y0 + rb, z
    steps = int((math.pi / 2) * rb / ds)
    for i in range(1, steps + 1):
        a = math.pi + (math.pi / 2) * i / steps
        pts.append((cy + rb * math.cos(a), cz + rb * math.sin(a)))
    # prosto po blacie
    y, z = pts[-1]
    flat = 0.046
    s = 0.0
    while s < flat:
        y += ds
        s += ds
        pts.append((y, floor_z))
    # zwijający się koniec: krzywizna rośnie liniowo (spirala Eulera)
    curl_len = 0.092
    k_max = 1 / 0.0085
    theta = 0.0
    s = 0.0
    z = floor_z
    while s < curl_len:
        k = k_max * (s / curl_len) ** 1.15
        theta += k * ds
        y += math.cos(theta) * ds
        z += math.sin(theta) * ds
        s += ds
        pts.append((y, z))
    return pts


def make_film(mat_factory):
    pts = film_path()
    lengths = [0.0]
    for a, b in zip(pts, pts[1:]):
        lengths.append(lengths[-1] + math.dist(a, b))
    total = lengths[-1]

    mesh = bpy.data.meshes.new("Klisza")
    bm = bmesh.new()
    uv_layer = bm.loops.layers.uv.new("UVMap")
    rows = []
    half = FILM_W / 2
    for (y, z) in pts:
        rows.append((bm.verts.new((-half, y, z)), bm.verts.new((half, y, z))))
    for i in range(len(rows) - 1):
        a0, a1 = rows[i]
        b0, b1 = rows[i + 1]
        f = bm.faces.new((a0, b0, b1, a1))
        u0 = lengths[i] / total
        u1 = lengths[i + 1] / total
        for loop, uv in zip(f.loops, ((u0, 0), (u1, 0), (u1, 1), (u0, 1))):
            loop[uv_layer].uv = uv
    bm.to_mesh(mesh)
    bm.free()

    obj = bpy.data.objects.new("Klisza", mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat_factory(total * 1000))
    sol = obj.modifiers.new("Grubosc", "SOLIDIFY")
    sol.thickness = FILM_T
    sol.offset = 1
    for poly in mesh.polygons:
        poly.use_smooth = True
    return obj


# ---------------------------------------------------------------- scena
def build():
    scene = reset_scene()
    mats = {
        "body": mat_canister_body(),
        "cap": mat_simple("Denko", CHARCOAL, 0.3, metal=0.85),
        "plastic": mat_simple("Szpula", INK, 0.45),
        "velvet": mat_simple("Aksamit", srgb("#2A1D16"), 0.95),
    }

    # kaseta leżąca: oś wzdłuż X świata, klisza wychodzi w stronę +Y
    lying = make_canister("KasetaLezaca", mats)
    lying_root = bpy.data.objects.new("Zestaw", None)
    bpy.context.collection.objects.link(lying_root)
    lying.parent = lying_root
    lying.location = (0, 0, R_CAP)
    # oś kasety (lokalne Z) -> X, wargi (lokalne +X) -> +Y, lokalne +Y -> +Z
    lying.rotation_euler = Matrix(((0, 0, 1), (1, 0, 0), (0, 1, 0))).to_euler()

    film = make_film(mat_film)
    film.parent = lying_root
    film.location = (0, 0, R_CAP)

    lying_root.rotation_euler = (0, 0, math.radians(-58))
    lying_root.location = (0.004, 0.0, 0)

    # kaseta stojąca w tle
    standing = make_canister("KasetaStojaca", mats)
    standing.location = (-0.052, 0.05, L_BODY / 2 + T_CAP + 0.0008)
    standing.rotation_euler = (0, 0, math.radians(140))

    # blat jako łapacz cieni
    bpy.ops.mesh.primitive_plane_add(size=2, location=(0, 0, 0))
    floor = bpy.context.active_object
    floor.is_shadow_catcher = True
    floor.data.materials.append(mat_simple("Blat", CREAM, 0.6))

    # światło: duże okno z lewej, ciepłe; resztę daje jasne otoczenie
    key = bpy.data.lights.new("Okno", "AREA")
    key.shape = "RECTANGLE"
    key.size = 0.7
    key.size_y = 0.5
    key.energy = 26
    key.color = (1.0, 0.94, 0.86)
    key_obj = bpy.data.objects.new("Okno", key)
    bpy.context.collection.objects.link(key_obj)
    key_obj.location = (-0.38, -0.12, 0.34)
    key_obj.rotation_euler = (Vector((0.02, 0.03, 0.0)) - key_obj.location).to_track_quat("-Z", "Y").to_euler()

    world = bpy.data.worlds.new("Pracownia")
    scene.world = world
    try:
        world.use_nodes = True
    except Exception:
        pass
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (*srgb("#F3EFE8"), 1)
    bg.inputs[1].default_value = 0.42

    # kamera: 85 mm, z góry pod kątem, płytka głębia
    cam_data = bpy.data.cameras.new("Aparat")
    cam_data.lens = 85
    cam = bpy.data.objects.new("Aparat", cam_data)
    bpy.context.collection.objects.link(cam)
    scene.camera = cam
    target = Vector((0.016, 0.022, 0.008))
    cam.location = (0.05, -0.36, 0.33)
    cam.rotation_euler = (target - Vector(cam.location)).to_track_quat("-Z", "Y").to_euler()
    cam_data.dof.use_dof = True
    cam_data.dof.focus_distance = (target - Vector(cam.location)).length
    cam_data.dof.aperture_fstop = 8

    # render
    scene.render.engine = "CYCLES"
    prefs = bpy.context.preferences.addons["cycles"].preferences
    try:
        prefs.compute_device_type = "METAL"
        prefs.get_devices()
        for d in prefs.devices:
            d.use = True
        scene.cycles.device = "GPU"
    except Exception as exc:  # CPU zadziała zawsze
        print("GPU niedostępne:", exc)
    scene.cycles.samples = 48 if PREVIEW else 128
    scene.cycles.use_denoising = True
    # kaustyki z metalowych denek dają jasne smugi na łapaczu cieni
    scene.cycles.caustics_reflective = False
    scene.cycles.caustics_refractive = False
    scene.cycles.blur_glossy = 1.0
    scene.render.film_transparent = True
    scene.render.resolution_x = 1800
    scene.render.resolution_y = 1350
    scene.render.resolution_percentage = 50 if PREVIEW else 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    try:
        scene.view_settings.view_transform = "Khronos PBR Neutral"
    except Exception:
        scene.view_settings.view_transform = "Standard"
    scene.view_settings.exposure = -0.55
    scene.render.filepath = OUT
    bpy.ops.render.render(write_still=True)
    print("Zapisano", OUT)


build()
