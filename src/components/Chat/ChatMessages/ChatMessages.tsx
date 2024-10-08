import React, { UIEvent, useEffect, useRef, useState } from "react";

import styles from "./ChatMessages.module.css";
import { useSelector } from "react-redux";
import { getChatMessages } from "../../../redux/selectors/chatSelectors";
import { ChatMessage } from "./ChatMessage";

const ChatMessages = () => {
    const messages = useSelector(getChatMessages);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);

    useEffect(() => {
        if (!isAutoScroll) return;
        messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    return (
        <div className={styles.messages__items} onScroll={onScrollHandler}>
            {messages.map((message, id) => {
                return <ChatMessage key={id} id={message.userId} message={message} />;
            })}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};

export default ChatMessages;
