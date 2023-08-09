import { Avatar } from 'antd';

/* import local interface */
import { InterfaceProject } from "../../models/Project/Project.interface";



const SimpleMemberAvatar = ({ members }: Partial<InterfaceProject>) => {
    const renderAvatar = () => {
        if (members && members.length > 0) {
            return members.map((member, idx) => <Avatar src={member.avatar} key={(Math.floor(Math.random() * 100) + 1).toString() + idx} />);
        }
        return null;
    }

    return <>{renderAvatar()}</>
}
export default SimpleMemberAvatar;