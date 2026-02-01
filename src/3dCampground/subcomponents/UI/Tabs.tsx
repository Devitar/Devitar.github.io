import './Tabs.css';

export type Tab = {
  id: number;
  label: string;
  color?: string;
};

type Props = {
  tabs: Tab[];
  activeTab: number;
  onTabChange?: (tab: Tab) => void;
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
          onClick={() => onTabChange?.(tab)}
          style={!isActive && tab.color ? { backgroundColor: tab.color } : undefined}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);

export default Tabs;
