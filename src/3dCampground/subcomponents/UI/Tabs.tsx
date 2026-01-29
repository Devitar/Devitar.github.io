import './Tabs.css';

type Tab = {
  id: string | number;
  label: string;
  /** Optional background color for this tab */
  color?: string;
};

type Props = {
  tabs: Tab[];
  activeTab: string | number;
  onTabChange?: (tabId: string | number) => void;
  className?: string;
};

const Tabs = ({ tabs, activeTab, onTabChange, className = '' }: Props) => (
  <div className={`binder-tabs ${className}`}>
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          className={`binder-tabs-tab ${isActive ? 'binder-tabs-tab--active' : ''}`}
          onClick={() => onTabChange?.(tab.id)}
          style={!isActive && tab.color ? { backgroundColor: tab.color } : undefined}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);

export default Tabs;
