import styles from "./Sidebar.module.scss";

type Props = {
  chatId?: string;
};

function Sidebar({ chatId }: Props) {
  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <span>Чаты</span>
      </div>
      <div className={styles.panelBody}>
        {chatId && (
          <div className={styles.panelChat}>
            <span>Чат с:</span>
            <span>{chatId}</span>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
