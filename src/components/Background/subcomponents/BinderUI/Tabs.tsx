import './Tabs.css';

type Tab = {
  id: string | number;
  label: string;
};

type Props = {
  tabs: Tab[];
  activeTab: string | number;
  onTabChange?: (tabId: string | number) => void;
  className?: string;
};

const Tabs = ({ tabs, activeTab, onTabChange, className = '' }: Props) => (
  <div className={`binder-tabs ${className}`}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`binder-tabs-tab ${activeTab === tab.id ? 'binder-tabs-tab--active' : ''}`}
        onClick={() => onTabChange?.(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs;
