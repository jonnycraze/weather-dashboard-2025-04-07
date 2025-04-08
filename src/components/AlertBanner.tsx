import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
    value: string;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

{/* NOTE: Ideally I would setup styles using CSS Modules */}
const styles = {
    alert: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'lightBlue',
        margin: '2rem 0',
        borderRadius: 12,
        padding: 8,
    },
    close: {
        background: 'white',
        borderRadius: 20,
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default function AlertBanner({ value, visible, setVisible}:Props) {
    if (!visible) return;

    return (
        <div style={styles.alert}>
            {value}
            <button onClick={() => setVisible(false)} style={styles.close}>x</button>
        </div>
    )
}
