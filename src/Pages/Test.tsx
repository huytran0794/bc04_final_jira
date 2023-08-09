import { Space } from 'antd';
import clsx from 'clsx';
import { useRef, useState } from 'react'
import Container from '../core/Components/Container/Container';
import { to, useSpring, animated, easings } from 'react-spring';
const Test = () => {
    // animation
    let springConfig = {
        from: { bottom: -25 },
        to: { bottom: 0 },
        config: { duration: 300 },
        reset: true
    };
    // const [styles, api] = useSpring(() => (springConfig))
    const styles = useSpring(springConfig);
    const data = [
        { name: "task 1", statusId: "1" },
        { name: "task 2", statusId: "1" },
        { name: "task 3", statusId: "1" },
        { name: "task 4", statusId: "1" },
        { name: "task 5", statusId: "1" },
        { name: "task 6", statusId: "1" },
        { name: "task 7", statusId: "1" },
        { name: "task 8", statusId: "1" },
        { name: "task 9", statusId: "1" },
        { name: "task 10", statusId: "1" },
    ];
    const [taskList, setTaskList] = useState([...data]);
    let cardDrag = useRef<{ name: string, statusId: string }>({ name: "", statusId: "" });
    let cardDragEnter = useRef<{ name: string, statusId: string }>({ name: "", statusId: "" });
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: {}, idx: number) => {
        cardDrag.current = { ...cardDrag.current, ...task };
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, taskDragEnter: { name: string, statusId: string }, idx: number) => {
        styles.bottom.set(0);
        cardDragEnter.current = { ...cardDragEnter.current, ...taskDragEnter };
        // get list of task
        let taskListUpdate = [...taskList];

        // index card dang keo
        let idxTagDrag = taskListUpdate.findIndex(taskItem => taskItem.name === cardDrag.current.name);

        // index card bi keo
        let idxTagDragEnter = taskListUpdate.findIndex(taskItem => taskItem.name === taskDragEnter.name);

        // swap
        let temp = taskListUpdate[idxTagDrag];
        taskListUpdate[idxTagDrag] = taskListUpdate[idxTagDragEnter];
        taskListUpdate[idxTagDragEnter] = temp;

        setTaskList(taskListUpdate);
    }
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('e in drag end');
        console.log(e)
        cardDrag.current = { name: "", statusId: "" };
        setTaskList([...taskList]);
    }

    const renderListTask = () => {
        return taskList.map((item, idx) => {
            let cssDrag = item.name === cardDrag.current.name ? 'dragTag' : "";
            if (item.name === cardDragEnter.current.name) {
                console.log("item.name");
                console.log(item.name);
                console.log(cssDrag);
                return (
                    <animated.div style={{
                        position: 'relative',
                        ...styles,
                    }}
                        id={item.statusId}
                        key={idx}
                        draggable={true}
                        onDragStart={(e) => { handleDragStart(e, item, idx) }}
                        onDragEnter={(e) => { handleDragEnter(e, item, idx) }}
                        onDragEnd={(e) => handleDragEnd(e)}
                        className={clsx(
                            'task task-animation bg-green-500 text-white text-lg uppercase py-2 px-4 w-36 text-center',
                            cssDrag
                        )}
                    >
                        {item.name}
                    </animated.div>
                );
            }
            return (
                <div className=
                    {clsx(
                        'task bg-green-500 text-white text-lg uppercase py-2 px-4 w-36 text-center',
                        cssDrag
                    )}
                    id={item.statusId}
                    key={idx}
                    draggable={true}
                    onDragStart={(e) => { handleDragStart(e, item, idx) }}
                    onDragEnter={(e) => { handleDragEnter(e, item, idx) }}
                    onDragEnd={handleDragEnd}
                >
                    {item.name}
                </div>
            );
        })
    }
    return (
        <Container>
            <div className="wrapper">
                <div className="taskList">
                    <Space direction='vertical' size="middle" align="center" className='items-center w-full'>
                        {renderListTask()}
                    </Space>
                </div>
            </div>
        </Container>
    );
}

export default Test