import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserObject } from "../interfaces/user";

const UserProfile = () => {
    const { userID } = useParams();
    const [user, setUser] = useState<UserObject | null>(null);

    const getUser = async () => {
        try {
            const response = await axios.get(`https://reqres.in/api/users/${userID}`);
            if (response.status === 200) {
                setUser(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, [userID]);

    return (
        <div id='user_profile'>
            {user ? (
                <>
                    <h1 className='heading'>{user.first_name}'s Profile is Here</h1>
                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                    <div>
                        <h5>- User ID No : <span>{user.id}</span></h5>
                        <h5>- First Name : <span>{user.first_name}</span></h5>
                        <h5>- Last Name : <span>{user.last_name}</span></h5>
                        <h5>- User Email : <span>{user.email}</span></h5>
                    </div>
                </>
            ) : (
                <p className='loading'>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;