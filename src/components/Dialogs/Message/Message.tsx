import React from "react";
import styles from "./Message.module.css";

type MessagePropsType = {
    id: number;
    message: string;
};

export const MessageItem = (props: MessagePropsType) => {
    const { message } = props;
    return (
        <div className={styles.root}>
            <div className={styles.message}>{message}</div>
        </div>
    );
};
