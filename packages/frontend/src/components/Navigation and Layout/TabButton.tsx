type Props = {
    children: React.ReactNode;
    onSelect: () => void;
    isSelected: boolean;
};


const TabButton: React.FC<Props> = ({children, onSelect, isSelected}) => {
    let buttonClass = `btn btn-outline-primary ${isSelected ? 'active' : ''}`;
    return (
        <button  className={buttonClass} style={{ margin: 5 }} onClick={onSelect}>
            {children}
        </button>
    );
};

export default TabButton;