import {useNavigate} from "react-router-dom";
import TabButton from "./TabButton.tsx";
import {useState} from "react";

type Tab = {
  key: string;
  label: string;
  path: string;
};

const tabs: Tab[] = [
    { key: "home", label: "Home", path: "/root/home" },
    { key: "workouts", label: "My Workouts", path: "/root/workouts" },
    { key: "createWorkout", label: "Create Workout", path: "/root/createWorkout" },
    { key: "example", label: "Workout Example", path: "/root/example" },
    { key: "exercises", label: "Exercises", path: "/root/exercises" },
];

const MainNavigation = () => {
    const [selectedTab, setSelectedTab] = useState<string>("");
    const navigate = useNavigate();

    const handleSelect = (tabKey: string, tabPath: string) => {
        if (selectedTab === tabKey)
        {
            navigate("/root"); // navigating to root if same tab clicked (optional)
            setSelectedTab("");
        }
        else
        {
            setSelectedTab(tabKey);
            navigate(tabPath);
        }
  };

    return (
        <>
            <nav>
                <ul>
                    <div>
                        {tabs.map(({ key, label, path }) => (
                            <TabButton
                                key={key}
                                isSelected={selectedTab === key}
                                onSelect={() => handleSelect(key, path)}
                            >
                                {label}
                            </TabButton>
                        ))}
                    </div>
                </ul>
            </nav>
        </>
    );
};

export default MainNavigation;
