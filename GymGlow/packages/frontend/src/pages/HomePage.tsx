const HomePage = () => {
    const textColor = { color: '#1A3D6D' };

    return (
        <div className="container text-center py-5 bg-light">
        <h1 className="mb-3" style={textColor}>
            Welcome to Gym Glow
        </h1>
        <p className="lead mb-4" style={textColor}>
            Your personal space to plan, track, and improve your workouts - all in one place.
        </p>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <ul className="list-group list-group-flush text-start">
                    <li className="list-group-item" style={textColor}>
                        <strong>Home</strong> - Start here! Get a quick overview and helpful tips.
                    </li>
                    <li className="list-group-item" style={textColor}>
                        <strong>My Workouts</strong> - View your workout list, edit sessions, or remove ones you no longer need.
                    </li>
                    <li className="list-group-item" style={textColor}>
                        <strong>Create Workout</strong> - Build your own custom workout routines tailored to your goals.
                    </li>
                    <li className="list-group-item" style={textColor}>
                        <strong>Workout Examples</strong> - Browse admin-created workouts for inspiration and guidance.
                    </li>
                    <li className="list-group-item" style={textColor}>
                        <strong>Exercises</strong> - Learn how to perform exercises correctly with clear instructions.
                    </li>
                </ul>
            </div>
        </div>
        </div>
    );
};

export default HomePage;
