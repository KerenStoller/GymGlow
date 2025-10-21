import {useNavigate} from "react-router-dom";
import TabButton from "./TabButton.tsx";
import {useState, useEffect} from "react";

type Tab = {
  key: string;
  label: string;
  path: string;
};

const tabs: Tab[] = [
    { key: "home", label: "Home", path: "/root/home" },
    { key: "workouts", label: "My My Workouts", path: "/root/workouts" },
    { key: "createWorkout", label: "Create My Workouts", path: "/root/createWorkout" },
    { key: "example", label: "My Workouts Example", path: "/root/example" },
    { key: "exercises", label: "Exercises", path: "/root/exercises" },
];

const MainNavigation = () => {
    const defaultKey = "home";
    const [selectedTab, setSelectedTab] = useState<string>(defaultKey);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(tabs.find(tab => tab.key === defaultKey)!.path);
    }, []);

    const handleSelect = (tabKey: string, tabPath: string) => {
        if (selectedTab === tabKey)
        {
            setSelectedTab(defaultKey);
            navigate(tabs.find(tab => tab.key === defaultKey)!.path);
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
