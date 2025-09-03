def get_default_exercises():
    from app.db.models import Exercise
    from uuid import uuid4
    return [
        # Chest
        Exercise(
            id=uuid4(),
            name="Push-Up",
            description="Place hands under shoulders, keep body straight, lower chest to floor, then push back up.",
            muscle_group="Chest",
            equipment="None",
            tips="Keep your core tight, don’t let hips sag, and lower until elbows are about 90°."
        ),
        Exercise(
            id=uuid4(),
            name="Bench Press",
            description="Lie on bench, grip bar slightly wider than shoulders, lower to chest, then press upward.",
            muscle_group="Chest",
            equipment="Barbell",
            tips="Keep feet flat on floor, wrists straight, and avoid bouncing the bar off your chest."
        ),

        # Legs
        Exercise(
            id=uuid4(),
            name="Squat",
            description="Stand with feet shoulder-width, bend knees and hips to lower, then push back to standing.",
            muscle_group="Legs",
            equipment="None",
            tips="Keep chest up, weight on heels, and knees tracking over toes."
        ),
        Exercise(
            id=uuid4(),
            name="Lunge",
            description="Step forward, bend both knees to 90°, push through front foot to return to standing.",
            muscle_group="Legs",
            equipment="None",
            tips="Keep torso upright, avoid letting front knee pass toes, and step far enough forward for balance."
        ),
        Exercise(
            id=uuid4(),
            name="Leg Press",
            description="Sit on machine, place feet on platform, push weight upward, then slowly bend knees to return.",
            muscle_group="Legs",
            equipment="Machine",
            tips="Don’t lock out knees at the top, keep lower back against the seat."
        ),

        # Back
        Exercise(
            id=uuid4(),
            name="Pull-Up",
            description="Hang from bar with palms forward, pull chest up toward bar, then lower slowly.",
            muscle_group="Back",
            equipment="Pull-up bar",
            tips="Engage lats, avoid swinging, and lower fully for full range of motion."
        ),
        Exercise(
            id=uuid4(),
            name="Lat Pulldown",
            description="Sit at machine, grip bar wide, pull bar to chest, then return slowly overhead.",
            muscle_group="Back",
            equipment="Cable Machine",
            tips="Pull elbows down and back, don’t lean too far, stop bar at chest level."
        ),
        Exercise(
            id=uuid4(),
            name="Seated Row",
            description="Sit with straight back, pull handles toward torso, squeeze shoulder blades, then extend arms.",
            muscle_group="Back",
            equipment="Cable Machine",
            tips="Keep back straight, avoid shrugging shoulders, and control the return."
        ),

        # Shoulders
        Exercise(
            id=uuid4(),
            name="Overhead Press",
            description="Hold weights at shoulders, press upward until arms straight, then lower with control.",
            muscle_group="Shoulders",
            equipment="Barbell or Dumbbells",
            tips="Brace your core, don’t arch lower back, and lock out arms gently at the top."
        ),
        Exercise(
            id=uuid4(),
            name="Lateral Raise",
            description="Stand tall, raise dumbbells out to sides until arms reach shoulder height, then lower slowly.",
            muscle_group="Shoulders",
            equipment="Dumbbells",
            tips="Slight bend in elbows, lift with shoulders not traps, avoid swinging."
        ),

        # Arms
        Exercise(
            id=uuid4(),
            name="Bicep Curl",
            description="Hold weights at sides, curl arms upward by bending elbows, then lower slowly.",
            muscle_group="Arms",
            equipment="Dumbbells or Barbell",
            tips="Keep elbows close to torso, avoid swinging, full range of motion."
        ),
        Exercise(
            id=uuid4(),
            name="Tricep Pushdown",
            description="Grip bar on cable machine, push bar down until arms straight, then return to start.",
            muscle_group="Arms",
            equipment="Cable Machine",
            tips="Keep elbows tucked, avoid leaning, and don’t let bar rise too high."
        ),

        # Core
        Exercise(
            id=uuid4(),
            name="Plank",
            description="Place forearms on floor, keep body straight from head to heels, hold position.",
            muscle_group="Core",
            equipment="None",
            tips="Don’t let hips sag or rise, squeeze glutes, breathe steadily."
        ),
        Exercise(
            id=uuid4(),
            name="Russian Twist",
            description="Sit with knees bent, lean back slightly, rotate torso side to side while holding weight.",
            muscle_group="Core",
            equipment="Dumbbell or Medicine Ball",
            tips="Keep core tight, move torso not just arms, and control rotation."
        ),
        Exercise(
            id=uuid4(),
            name="Leg Raise",
            description="Lie on back, lift legs straight up toward ceiling, lower slowly without arching back.",
            muscle_group="Core",
            equipment="None",
            tips="Press lower back into floor, avoid swinging legs, move slowly."
        ),
    ]
